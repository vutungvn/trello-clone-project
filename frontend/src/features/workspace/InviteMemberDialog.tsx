import { type ReactNode, useState } from "react";
import { Mail, X } from "lucide-react";
import { FormDialog } from "@/components/common/FormDialog";
import { FormField } from "@/components/common/FormField";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORKSPACE_ROLE_LABEL } from "@/lib/roles";
import { isEmail, matchesKeyword } from "@/lib/text";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";
import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace";

const INVITABLE_ROLES: WorkspaceRole[] = ["ADMIN", "MEMBER"];

const SUGGESTION_CLASS =
  "flex w-full items-center gap-3 px-3 py-2 text-left outline-none hover:bg-neutral-subtle focus-visible:bg-neutral-subtle disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent";

interface InviteMemberDialogProps {
  /** Nút mở hộp thoại */
  trigger: ReactNode;
  /** Mọi người dùng trong hệ thống */
  users: User[];
  members: WorkspaceMember[];
}

export function InviteMemberDialog({
  trigger,
  users,
  members,
}: InviteMemberDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [emails, setEmails] = useState<string[]>([]);

  const query = keyword.trim();
  const memberEmails = members.map((member) => member.user.email);
  const suggestions =
    query === ""
      ? []
      : users.filter(
          (user) =>
            matchesKeyword(`${user.name} ${user.email}`, query) &&
            !emails.includes(user.email),
        );
  const canInviteByEmail =
    isEmail(query) &&
    !emails.includes(query) &&
    !users.some((user) => user.email === query);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    setKeyword("");
    setEmails([]);
  }

  function addEmail(email: string) {
    setEmails([...emails, email]);
    setKeyword("");
  }

  /** Enter chọn email vừa gõ, hoặc người duy nhất còn mời được trong gợi ý */
  function addFromKeyword() {
    if (canInviteByEmail) {
      addEmail(query);
      return;
    }
    const available = suggestions.filter(
      (user) => !memberEmails.includes(user.email),
    );
    if (available.length === 1) addEmail(available[0].email);
  }

  return (
    <FormDialog
      trigger={trigger}
      open={isOpen}
      onOpenChange={handleOpenChange}
      title="Mời vào Workspace"
      submitLabel="Gửi lời mời"
      isSubmitDisabled={emails.length === 0}
      className="sm:max-w-130"
    >
      <FormField id="invite-keyword" label="Email hoặc tên">
        <Input
          id="invite-keyword"
          autoComplete="off"
          placeholder="Nhập tên hoặc địa chỉ email…"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addFromKeyword();
            }
          }}
        />
        {query !== "" && (
          <ul
            aria-label="Gợi ý người dùng"
            className="mt-1 flex max-h-48 flex-col overflow-y-auto rounded-lg border border-border bg-surface py-1.5 shadow-[0_8px_12px_#091E4226]"
          >
            {suggestions.map((user) => {
              const isMember = memberEmails.includes(user.email);
              return (
                <li key={user.id}>
                  <button
                    type="button"
                    disabled={isMember}
                    onClick={() => addEmail(user.email)}
                    className={SUGGESTION_CLASS}
                  >
                    <UserAvatar
                      user={user}
                      className={cn(isMember && "grayscale")}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold text-text-primary">
                        {user.name}
                        {isMember && " — Đã là thành viên"}
                      </span>
                      <span className="truncate text-xs text-text-subtle">
                        {user.email}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
            {canInviteByEmail && (
              <li>
                <button
                  type="button"
                  onClick={() => addEmail(query)}
                  className={SUGGESTION_CLASS}
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-subtle text-text-secondary">
                    <Mail aria-hidden="true" className="size-4" />
                  </span>
                  <span className="truncate text-sm font-semibold text-text-primary">
                    Mời {query}
                  </span>
                </button>
              </li>
            )}
            {suggestions.length === 0 && !canInviteByEmail && (
              <li className="px-3 py-2 text-sm text-text-secondary">
                Không tìm thấy người dùng. Nhập email đầy đủ để mời người chưa
                có tài khoản.
              </li>
            )}
          </ul>
        )}
      </FormField>

      {emails.length > 0 && (
        <ul
          aria-label="Người sẽ được mời"
          className="flex flex-wrap items-center gap-2"
        >
          {emails.map((email) => (
            <li
              key={email}
              className="inline-flex h-7 max-w-full items-center gap-1.5 rounded-sm bg-primary-soft pr-1.5 pl-2.5 text-sm font-medium text-on-primary-soft"
            >
              <span className="truncate">{email}</span>
              <button
                type="button"
                aria-label={`Xóa ${email}`}
                onClick={() =>
                  setEmails(emails.filter((item) => item !== email))
                }
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm outline-none hover:bg-primary/15 focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <FormField
        id="invite-role"
        label="Vai trò"
        helper="Người chưa có tài khoản sẽ nhận email mời, lời mời hết hạn sau 7 ngày."
      >
        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger
            id="invite-role"
            aria-describedby="invite-role-message"
            className="w-full"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {INVITABLE_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {WORKSPACE_ROLE_LABEL[role]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>
    </FormDialog>
  );
}
