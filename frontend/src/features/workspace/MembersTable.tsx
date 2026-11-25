import { ChevronDown } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { RoleBadge } from "@/components/common/RoleBadge";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/date";
import { canManageMember } from "@/lib/permissions";
import { WORKSPACE_ROLE_LABEL } from "@/lib/roles";
import type { User } from "@/types/user";
import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace";
import { DataTable } from "./DataTable";

const COLUMNS = [
  { label: "Thành viên" },
  { label: "Vai trò", className: "w-48" },
  { label: "Ngày tham gia", className: "w-36" },
];

const ASSIGNABLE_ROLES: WorkspaceRole[] = ["ADMIN", "MEMBER"];

interface MembersTableProps {
  members: WorkspaceMember[];
  currentUser: User;
  /** Vai trò của người đang đăng nhập */
  viewerRole: WorkspaceRole;
}

export function MembersTable({
  members,
  currentUser,
  viewerRole,
}: MembersTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      isEmpty={members.length === 0}
      emptyText="Không tìm thấy thành viên"
    >
      {members.map((member) => {
        const canManage = canManageMember(viewerRole, member.role);
        return (
          <tr
            key={member.id}
            className="transition-colors duration-100 hover:bg-surface-column/50"
          >
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <UserAvatar user={member.user} />
                <div className="flex min-w-0 flex-col">
                  <span className="font-semibold text-text-primary">
                    {member.user.name}
                    {member.user.id === currentUser.id && " (bạn)"}
                  </span>
                  <span className="text-xs text-text-subtle">
                    {member.user.email}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-4 py-3">
              {canManage ? (
                <RoleMenu member={member} />
              ) : (
                <RoleBadge role={member.role} highlight />
              )}
            </td>
            <td className="px-4 py-3 text-text-secondary tabular-nums">
              {formatDate(member.joinedAt)}
            </td>
            <td className="px-4 py-3 text-right">
              {canManage && (
                <ConfirmDialog
                  title={`Xóa ${member.user.name} khỏi Workspace?`}
                  description="Người này sẽ mất quyền truy cập mọi bảng trong workspace và được gỡ khỏi các thẻ đang phụ trách."
                  trigger={
                    <Button
                      variant="ghost"
                      className="text-danger hover:text-danger"
                    >
                      Xóa
                    </Button>
                  }
                />
              )}
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
}

function RoleMenu({ member }: { member: WorkspaceMember }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          aria-label={`Vai trò của ${member.user.name}: ${WORKSPACE_ROLE_LABEL[member.role]}`}
          className="gap-2 px-2.5 aria-expanded:bg-primary-soft aria-expanded:text-on-primary-soft"
        >
          {WORKSPACE_ROLE_LABEL[member.role]}
          <ChevronDown aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52 px-0 py-1.5">
        <DropdownMenuRadioGroup value={member.role}>
          {ASSIGNABLE_ROLES.map((role) => (
            <DropdownMenuRadioItem
              key={role}
              value={role}
              className="cursor-pointer rounded-none px-3 py-2 data-[state=checked]:bg-primary-soft/60 data-[state=checked]:font-medium data-[state=checked]:text-primary"
            >
              {WORKSPACE_ROLE_LABEL[role]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
