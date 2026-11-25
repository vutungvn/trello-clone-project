import { type ReactNode, useState } from "react";
import { Check } from "lucide-react";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import type { User } from "@/types/user";

interface MembersPopoverProps {
  /** Nút mở popover */
  trigger: ReactNode;
  members: User[];
  assignees: User[];
}

export function MembersPopover({
  trigger,
  members,
  assignees,
}: MembersPopoverProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPanel title="Thành viên" className="w-76">
        <MemberPicker members={members} assignees={assignees} />
      </PopoverPanel>
    </Popover>
  );
}

/** Tách riêng để lựa chọn được đặt lại mỗi lần mở popover */
function MemberPicker({
  members,
  assignees,
}: Pick<MembersPopoverProps, "members" | "assignees">) {
  const [keyword, setKeyword] = useState("");
  const [selectedIds, setSelectedIds] = useState(
    assignees.map((user) => user.id),
  );

  const visibleMembers = members.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(keyword.trim().toLowerCase()),
  );

  function toggle(userId: number) {
    setSelectedIds((ids) =>
      ids.includes(userId)
        ? ids.filter((id) => id !== userId)
        : [...ids, userId],
    );
  }

  return (
    <>
      <Input
        type="search"
        aria-label="Tìm thành viên"
        placeholder="Tìm thành viên…"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="h-8 shrink-0"
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-text-secondary">
          Thành viên của bảng
        </span>
        {visibleMembers.length === 0 && (
          <p className="px-2 py-1.5 text-xs text-text-secondary">
            Không tìm thấy thành viên
          </p>
        )}
        <ul className="flex flex-col gap-0.5">
          {visibleMembers.map((user) => {
            const isSelected = selectedIds.includes(user.id);
            return (
              <li key={user.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggle(user.id)}
                  className="flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left outline-none hover:bg-neutral-subtle focus-visible:bg-neutral-subtle"
                >
                  <UserAvatar user={user} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-text-primary">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-text-secondary">
                      {user.email}
                    </span>
                  </span>
                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
