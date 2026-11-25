import type { Label } from "./board";
import type { User } from "./user";

export interface Card {
  id: number;
  listId: number;
  boardId: number;
  title: string;
  description: string | null;
  position: number;
  dueDate: string | null;
  isCompleted: boolean;
  isArchived: boolean;
  assignees: User[];
  labels: Label[];
  commentCount: number;
}

export interface Comment {
  id: number;
  cardId: number;
  content: string;
  createdAt: string;
  user: User;
}
