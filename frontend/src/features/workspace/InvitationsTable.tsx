import { Mail } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { RoleBadge } from "@/components/common/RoleBadge";
import { Button } from "@/components/ui/button";
import { getInvitationExpiry } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { WorkspaceInvitation } from "@/types/workspace";
import { DataTable } from "./DataTable";

const COLUMNS = [
  { label: "Email" },
  { label: "Vai trò", className: "w-40" },
  { label: "Người mời", className: "w-44" },
  { label: "Hết hạn", className: "w-40" },
];

interface InvitationsTableProps {
  invitations: WorkspaceInvitation[];
  now: Date;
}

export function InvitationsTable({ invitations, now }: InvitationsTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      isEmpty={invitations.length === 0}
      emptyText="Không có lời mời nào"
    >
      {invitations.map((invitation) => {
        const expiry = getInvitationExpiry(invitation.expiresAt, now);
        return (
          <tr
            key={invitation.id}
            className="transition-colors duration-100 hover:bg-surface-column/50"
          >
            <td className="px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-subtle text-text-secondary">
                  <Mail aria-hidden="true" className="size-4" />
                </span>
                <span className="font-semibold text-text-primary">
                  {invitation.email}
                </span>
              </div>
            </td>
            <td className="px-4 py-3.5">
              <RoleBadge role={invitation.role} highlight />
            </td>
            <td className="px-4 py-3.5 text-text-primary">
              {invitation.invitedBy.name}
            </td>
            <td
              className={cn(
                "px-4 py-3.5",
                expiry.isUrgent
                  ? "font-medium text-danger"
                  : "text-text-secondary",
              )}
            >
              {expiry.text}
            </td>
            <td className="px-4 py-3.5">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost">Gửi lại</Button>
                <ConfirmDialog
                  title={`Hủy lời mời gửi tới ${invitation.email}?`}
                  description="Link trong email mời sẽ không còn dùng được."
                  confirmLabel="Hủy lời mời"
                  cancelLabel="Quay lại"
                  trigger={
                    <Button
                      variant="ghost"
                      className="text-danger hover:text-danger"
                    >
                      Hủy lời mời
                    </Button>
                  }
                />
              </div>
            </td>
          </tr>
        );
      })}
    </DataTable>
  );
}
