import type {
  Workspace,
  WorkspaceInvitation,
  WorkspaceMember,
} from "@/types/workspace";
import { an, binh, cuong, dung, ha, khanh } from "./users";

export const workspaces: Workspace[] = [
  {
    id: 1,
    name: "Phòng Kỹ thuật",
    description: "Nhóm phát triển sản phẩm thương mại điện tử",
  },
  { id: 2, name: "Dự án cá nhân", description: null },
  { id: 3, name: "Nhóm Marketing", description: null },
];

export const workspaceMembers: WorkspaceMember[] = [
  {
    id: 1,
    workspaceId: 1,
    role: "OWNER",
    joinedAt: "2026-01-12T08:30:00",
    user: an,
  },
  {
    id: 2,
    workspaceId: 1,
    role: "ADMIN",
    joinedAt: "2026-02-03T10:00:00",
    user: binh,
  },
  {
    id: 3,
    workspaceId: 1,
    role: "MEMBER",
    joinedAt: "2026-03-21T07:45:00",
    user: cuong,
  },
  {
    id: 4,
    workspaceId: 1,
    role: "MEMBER",
    joinedAt: "2026-04-09T16:10:00",
    user: dung,
  },
  {
    id: 5,
    workspaceId: 1,
    role: "MEMBER",
    joinedAt: "2026-05-14T09:00:00",
    user: ha,
  },
  {
    id: 6,
    workspaceId: 1,
    role: "MEMBER",
    joinedAt: "2026-06-02T13:25:00",
    user: khanh,
  },
  {
    id: 7,
    workspaceId: 2,
    role: "OWNER",
    joinedAt: "2026-01-20T08:00:00",
    user: binh,
  },
  {
    id: 8,
    workspaceId: 2,
    role: "MEMBER",
    joinedAt: "2026-01-21T08:00:00",
    user: an,
  },
  {
    id: 9,
    workspaceId: 3,
    role: "OWNER",
    joinedAt: "2026-02-10T08:00:00",
    user: ha,
  },
  {
    id: 10,
    workspaceId: 3,
    role: "MEMBER",
    joinedAt: "2026-02-11T08:00:00",
    user: an,
  },
];

export const workspaceInvitations: WorkspaceInvitation[] = [
  {
    id: 1,
    workspaceId: 1,
    email: "khanh.tran@gmail.com",
    role: "MEMBER",
    token: "wrong-email",
    status: "PENDING",
    invitedBy: an,
    expiresAt: "2026-11-29T09:00:00",
  },
  {
    id: 2,
    workspaceId: 1,
    email: "lan.dang@congty.vn",
    role: "ADMIN",
    token: "lan-dang",
    status: "PENDING",
    invitedBy: binh,
    expiresAt: "2026-11-24T18:00:00",
  },
];
