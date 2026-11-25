import { useState } from "react";
import { X } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { RoleBadge } from "@/components/common/RoleBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BoardVisibility } from "@/types/board";
import type { User } from "@/types/user";
import type { WorkspaceRole } from "@/types/workspace";

export interface BoardMemberInfo {
  user: User;
  role: WorkspaceRole;
}

interface BoardMembersSectionProps {
  visibility: BoardVisibility;
  canManage: boolean;
  members: BoardMemberInfo[];
  /** Thành viên workspace chưa ở trong bảng */
  candidates: User[];
  currentUser: User;
}

export function BoardMembersSection({
  visibility,
  canManage,
  members,
  candidates,
  currentUser,
}: BoardMembersSectionProps) {
  const isPrivate = visibility === "PRIVATE";

  return (
    <div className="flex flex-col gap-3 px-1">
      <p className="text-xs text-text-secondary">
        {isPrivate
          ? "Bảng riêng tư — chỉ thành viên dưới đây xem được"
          : "Mọi thành viên workspace đều xem được bảng này"}
      </p>

      <ul className="flex flex-col gap-2">
        {members.map(({ user, role }) => (
          <li key={user.id} className="flex items-center gap-2.5">
            <UserAvatar user={user} />
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-text-primary">
              {user.name}
            </span>
            <RoleBadge role={role} />
            {isPrivate && canManage && user.id !== currentUser.id && (
              <ConfirmDialog
                title={`Xóa ${user.name} khỏi bảng?`}
                description="Người này sẽ không xem được bảng và được gỡ khỏi các thẻ đang phụ trách."
                trigger={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Xóa ${user.name} khỏi bảng`}
                  >
                    <X aria-hidden="true" />
                  </Button>
                }
              />
            )}
          </li>
        ))}
      </ul>

      {isPrivate && canManage && <AddBoardMember candidates={candidates} />}
    </div>
  );
}

function AddBoardMember({ candidates }: { candidates: User[] }) {
  const [selectedId, setSelectedId] = useState("");

  if (candidates.length === 0) {
    return (
      <p className="text-xs text-text-subtle">
        Mọi thành viên workspace đã ở trong bảng.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger
          size="sm"
          aria-label="Thêm thành viên từ workspace"
          className="min-w-0 flex-1"
        >
          <SelectValue placeholder="Thêm thành viên từ workspace…" />
        </SelectTrigger>
        <SelectContent position="popper">
          {candidates.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button disabled={selectedId === ""} onClick={() => setSelectedId("")}>
        Thêm
      </Button>
    </div>
  );
}
