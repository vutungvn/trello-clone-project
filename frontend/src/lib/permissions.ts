import type { BoardRole } from "@/types/board";
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

/** Đổi tên, đổi nền, lưu trữ, xóa bảng và quản lý thành viên của bảng */
export function canManageBoard(
  workspaceRole: WorkspaceRole,
  boardRole: BoardRole | undefined,
): boolean {
  return boardRole === "ADMIN" || canManageWorkspace(workspaceRole);
}
