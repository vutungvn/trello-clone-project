import type { User } from "./user";

export type BoardRole = "ADMIN" | "MEMBER";

export type BoardVisibility = "WORKSPACE" | "PRIVATE";

/** Giá trị lưu ở cột boards.background_color */
export type BoardBackground =
  | "blue"
  | "purple"
  | "teal"
  | "orange"
  | "pink"
  | "slate";

export interface Board {
  id: number;
  workspaceId: number;
  title: string;
  visibility: BoardVisibility;
  backgroundColor: BoardBackground;
  backgroundImageUrl: string | null;
  isArchived: boolean;
}

export interface BoardMember {
  id: number;
  boardId: number;
  role: BoardRole;
  user: User;
}

export interface List {
  id: number;
  boardId: number;
  title: string;
  position: number;
  isArchived: boolean;
}

/** Giá trị lưu ở cột labels.color */
export type LabelColor =
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "blue"
  | "sky"
  | "lime"
  | "pink"
  | "gray";

export interface Label {
  id: number;
  boardId: number;
  name: string | null;
  color: LabelColor;
}
