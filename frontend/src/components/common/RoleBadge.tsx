import { WORKSPACE_ROLE_LABEL } from "@/lib/roles";
import type { WorkspaceRole } from "@/types/workspace";

interface RoleBadgeProps {
  role: WorkspaceRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-sm bg-neutral-subtle px-2 py-0.5 text-xs font-semibold text-text-secondary">
      {WORKSPACE_ROLE_LABEL[role]}
    </span>
  );
}
