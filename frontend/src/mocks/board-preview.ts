import { type CardFilter, EMPTY_CARD_FILTER } from "@/lib/card-filter";
import type { List } from "@/types/board";
import type { Card } from "@/types/card";
import { featureLabel, frontendLabel } from "./boards";

/** Tạm thời: dựng các trạng thái của board qua ?state=, gỡ khi có kéo-thả thật */
export interface DragPreview {
  lists: List[];
  cards: Card[];
  draggingCardId?: number;
  draggingListId?: number;
}

const DRAGGING_CARD_ID = 5;
const DRAGGING_LIST_ID = 3;

export function getPreviewFilter(state: string | null): CardFilter {
  return state === "filtered"
    ? { ...EMPTY_CARD_FILTER, labelIds: [featureLabel.id, frontendLabel.id] }
    : EMPTY_CARD_FILTER;
}

export function getDragPreview(
  state: string | null,
  lists: List[],
  cards: Card[],
): DragPreview {
  // Thẻ VNPay đang ở giữa hai thẻ của "Đang review"
  if (state === "drag-card") {
    const draggingCard = cards.find((card) => card.id === DRAGGING_CARD_ID);
    if (draggingCard) {
      const others = cards.filter((card) => card.id !== DRAGGING_CARD_ID);
      const targetIndex = others.findIndex((card) => card.id === 9);
      return {
        lists,
        cards: others.toSpliced(targetIndex, 0, { ...draggingCard, listId: 3 }),
        draggingCardId: DRAGGING_CARD_ID,
      };
    }
  }

  // "Đang review" đang ở giữa "Cần làm" và "Đang làm"
  if (state === "drag-list") {
    const draggingList = lists.find((list) => list.id === DRAGGING_LIST_ID);
    if (draggingList) {
      const others = lists.filter((list) => list.id !== DRAGGING_LIST_ID);
      return {
        lists: others.toSpliced(1, 0, draggingList),
        cards,
        draggingListId: DRAGGING_LIST_ID,
      };
    }
  }

  return { lists, cards };
}
