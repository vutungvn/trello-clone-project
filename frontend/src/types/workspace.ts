import type { User } from "./user";

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";

export interface Workspace {
  id: number;
  name: string;
  description: string | null;
}

export interface WorkspaceMember {
  id: number;
  workspaceId: number;
  role: WorkspaceRole;
  joinedAt: string;
  user: User;
}

export interface WorkspaceInvitation {
  id: number;
  workspaceId: number;
  email: string;
  role: WorkspaceRole;
  token: string;
  status: InvitationStatus;
  invitedBy: User;
  expiresAt: string;
}

/** Thông tin hiện cho người mở link mời */
export interface InvitationDetail {
  token: string;
  email: string;
  role: WorkspaceRole;
  status: InvitationStatus;
  invitedBy: User;
  expiresAt: string;
  workspace: Workspace;
  memberCount: number;
  boardCount: number;
}
