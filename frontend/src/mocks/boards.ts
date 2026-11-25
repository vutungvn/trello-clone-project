import type { Board, BoardMember, Label, List } from "@/types/board";
import { an, binh, cuong, dung, ha, khanh } from "./users";

export const boards: Board[] = [
  {
    id: 1,
    workspaceId: 1,
    title: "Website bán hàng",
    visibility: "PRIVATE",
    backgroundColor: "blue",
    isArchived: false,
  },
  {
    id: 2,
    workspaceId: 2,
    title: "Dự án mới",
    visibility: "PRIVATE",
    backgroundColor: "blue",
    isArchived: false,
  },
  {
    id: 3,
    workspaceId: 1,
    title: "App mobile",
    visibility: "WORKSPACE",
    backgroundColor: "purple",
    isArchived: false,
  },
  {
    id: 4,
    workspaceId: 1,
    title: "Hạ tầng server",
    visibility: "WORKSPACE",
    backgroundColor: "teal",
    isArchived: false,
  },
  {
    id: 5,
    workspaceId: 1,
    title: "Tuyển dụng Q4",
    visibility: "WORKSPACE",
    backgroundColor: "orange",
    isArchived: false,
  },
  {
    id: 6,
    workspaceId: 2,
    title: "Học tiếng Anh",
    visibility: "WORKSPACE",
    backgroundColor: "orange",
    isArchived: false,
  },
  {
    id: 7,
    workspaceId: 2,
    title: "Kế hoạch du lịch",
    visibility: "WORKSPACE",
    backgroundColor: "pink",
    isArchived: false,
  },
  {
    id: 8,
    workspaceId: 3,
    title: "Chiến dịch Tết 2027",
    visibility: "WORKSPACE",
    backgroundColor: "slate",
    isArchived: false,
  },
  {
    id: 9,
    workspaceId: 1,
    title: "Landing page cũ",
    visibility: "WORKSPACE",
    backgroundColor: "pink",
    isArchived: true,
  },
  {
    id: 10,
    workspaceId: 1,
    title: "Sprint tháng 9",
    visibility: "WORKSPACE",
    backgroundColor: "slate",
    isArchived: true,
  },
];

export const boardMembers: BoardMember[] = [
  { id: 1, boardId: 1, role: "ADMIN", user: an },
  { id: 2, boardId: 1, role: "MEMBER", user: binh },
  { id: 3, boardId: 1, role: "MEMBER", user: cuong },
  { id: 4, boardId: 1, role: "MEMBER", user: dung },
  { id: 5, boardId: 1, role: "MEMBER", user: ha },
  { id: 6, boardId: 1, role: "MEMBER", user: khanh },
  { id: 7, boardId: 2, role: "ADMIN", user: an },
];

export const lists: List[] = [
  { id: 1, boardId: 1, title: "Cần làm", position: 65536, isArchived: false },
  { id: 2, boardId: 1, title: "Đang làm", position: 131072, isArchived: false },
  {
    id: 3,
    boardId: 1,
    title: "Đang review",
    position: 196608,
    isArchived: false,
  },
  {
    id: 4,
    boardId: 1,
    title: "Hoàn thành",
    position: 262144,
    isArchived: false,
  },
];

export const featureLabel: Label = {
  id: 1,
  boardId: 1,
  name: "Tính năng",
  color: "purple",
};
export const bugLabel: Label = { id: 2, boardId: 1, name: "Bug", color: "red" };
export const urgentLabel: Label = {
  id: 3,
  boardId: 1,
  name: "Khẩn cấp",
  color: "orange",
};
export const frontendLabel: Label = {
  id: 4,
  boardId: 1,
  name: "Frontend",
  color: "green",
};
export const performanceLabel: Label = {
  id: 5,
  boardId: 1,
  name: "Hiệu năng",
  color: "blue",
};
export const unnamedLabel: Label = {
  id: 6,
  boardId: 1,
  name: null,
  color: "yellow",
};

export const labels: Label[] = [
  featureLabel,
  bugLabel,
  urgentLabel,
  frontendLabel,
  performanceLabel,
  unnamedLabel,
];
