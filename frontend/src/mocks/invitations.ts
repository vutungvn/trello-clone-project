import type {
  InvitationDetail,
  InvitationStatus,
  Workspace,
} from "@/types/workspace";
import { an, binh } from "./users";

/** Workspace mà người đang đăng nhập chưa tham gia */
const designWorkspace: Workspace = {
  id: 4,
  name: "Phòng Thiết kế",
  description: null,
};

function createInvitation(
  token: string,
  status: InvitationStatus,
  email = an.email,
): InvitationDetail {
  return {
    token,
    email,
    role: "MEMBER",
    status,
    invitedBy: binh,
    expiresAt: "2026-11-30T09:00:00",
    workspace: designWorkspace,
    memberCount: 6,
    boardCount: 4,
  };
}

/** Mở bằng /invite/<token> */
export const receivedInvitations: InvitationDetail[] = [
  createInvitation("valid", "PENDING"),
  createInvitation("expired", "EXPIRED"),
  createInvitation("revoked", "REVOKED"),
  createInvitation("accepted", "ACCEPTED"),
  createInvitation("wrong-email", "PENDING", "khanh.tran@gmail.com"),
];
