import type { Card } from "@/types/card";
import { matchesKeyword } from "./text";

export interface CardFilter {
  keyword: string;
  assigneeIds: number[];
  /** Thẻ chưa có người phụ trách */
  isUnassigned: boolean;
  labelIds: number[];
  /** Thẻ không có nhãn */
  isUnlabeled: boolean;
}

export const EMPTY_CARD_FILTER: CardFilter = {
  keyword: "",
  assigneeIds: [],
  isUnassigned: false,
  labelIds: [],
  isUnlabeled: false,
};

/** Số điều kiện đang bật */
export function countCardFilters(filter: CardFilter): number {
  return (
    (filter.keyword.trim() === "" ? 0 : 1) +
    filter.assigneeIds.length +
    (filter.isUnassigned ? 1 : 0) +
    filter.labelIds.length +
    (filter.isUnlabeled ? 1 : 0)
  );
}

/** Trong một nhóm chỉ cần khớp một điều kiện, giữa các nhóm phải khớp tất cả */
export function filterCards(cards: Card[], filter: CardFilter): Card[] {
  const hasAssigneeFilter =
    filter.assigneeIds.length > 0 || filter.isUnassigned;
  const hasLabelFilter = filter.labelIds.length > 0 || filter.isUnlabeled;

  return cards.filter((card) => {
    const matchesAssignee =
      !hasAssigneeFilter ||
      (filter.isUnassigned && card.assignees.length === 0) ||
      card.assignees.some((user) => filter.assigneeIds.includes(user.id));
    const matchesLabel =
      !hasLabelFilter ||
      (filter.isUnlabeled && card.labels.length === 0) ||
      card.labels.some((label) => filter.labelIds.includes(label.id));

    return (
      matchesKeyword(card.title, filter.keyword) &&
      matchesAssignee &&
      matchesLabel
    );
  });
}
