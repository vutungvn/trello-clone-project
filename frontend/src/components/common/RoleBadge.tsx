import { WORKSPACE_ROLE_LABEL } from "@/lib/roles";
import { cn } from "@/lib/utils";
import type { WorkspaceRole } from "@/types/workspace";

interface RoleBadgeProps {
  role: WorkspaceRole;
  /** Tô xanh Chủ sở hữu và Quản trị viên, dùng trong bảng */
  highlight?: boolean;
}

export function RoleBadge({ role, highlight = false }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm px-2 py-0.5 text-xs font-semibold",
        highlight && "h-6",
        highlight && role !== "MEMBER"
          ? "bg-primary-soft text-on-primary-soft"
          : "bg-neutral-subtle text-text-secondary",
      )}
    >
      {WORKSPACE_ROLE_LABEL[role]}
    </span>
  );
}
