import { getWorkspaceColorClass } from "@/lib/avatar";
import { cn } from "@/lib/utils";
import type { Workspace } from "@/types/workspace";

const SIZE_CLASS = {
  sm: "size-6 rounded-sm text-xs font-semibold",
  md: "size-8 rounded-sm text-base font-bold",
  lg: "size-16 rounded-lg text-2xl font-bold",
};

interface WorkspaceAvatarProps {
  workspace: Workspace;
  size?: keyof typeof SIZE_CLASS;
}

export function WorkspaceAvatar({
  workspace,
  size = "md",
}: WorkspaceAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        SIZE_CLASS[size],
        getWorkspaceColorClass(workspace.id),
      )}
    >
      {workspace.name.charAt(0).toUpperCase()}
    </span>
  );
}
