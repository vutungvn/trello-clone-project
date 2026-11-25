import type { WorkspaceRole } from "@/types/workspace";

/** Mời thành viên, sửa thông tin workspace */
export function canManageWorkspace(role: WorkspaceRole): boolean {
  return role !== "MEMBER";
}

/** Đổi vai trò hoặc xóa một thành viên. Chỉ OWNER động được vào ADMIN */
export function canManageMember(
  viewerRole: WorkspaceRole,
  targetRole: WorkspaceRole,
): boolean {
  if (viewerRole === "OWNER") return targetRole !== "OWNER";
  return viewerRole === "ADMIN" && targetRole === "MEMBER";
}
