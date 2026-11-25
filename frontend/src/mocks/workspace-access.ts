import type {
  Workspace,
  WorkspaceMember,
  WorkspaceRole,
} from "@/types/workspace";
import { currentUser } from "./users";
import { workspaceMembers, workspaces } from "./workspaces";

export interface WorkspaceAccess {
  workspace: Workspace;
  members: WorkspaceMember[];
  /** Vai trò của người đang đăng nhập */
  role: WorkspaceRole;
}

/** null nếu workspace không tồn tại hoặc người đang đăng nhập không phải thành viên */
export function findWorkspaceAccess(
  workspaceId: string,
): WorkspaceAccess | null {
  const workspace = workspaces.find((item) => item.id === Number(workspaceId));
  if (!workspace) return null;

  const members = workspaceMembers.filter(
    (member) => member.workspaceId === workspace.id,
  );
  const membership = members.find(
    (member) => member.user.id === currentUser.id,
  );
  return membership ? { workspace, members, role: membership.role } : null;
}
