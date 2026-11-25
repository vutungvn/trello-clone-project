import type { List } from "@/types/board";
import type { Card } from "@/types/card";
import { featureLabel, frontendLabel } from "./boards";

/** Tạm thời: dựng các trạng thái của board qua ?state=, gỡ khi có kéo-thả và lọc thật */
export interface BoardPreview {
  lists: List[];
  cards: Card[];
  filterCount: number;
  draggingCardId?: number;
  draggingListId?: number;
}

const DRAGGING_CARD_ID = 5;
const DRAGGING_LIST_ID = 3;
const FILTER_LABEL_IDS = [featureLabel.id, frontendLabel.id];

export function getBoardPreview(
  state: string | null,
  lists: List[],
  cards: Card[],
): BoardPreview {
  if (state === "filtered") {
    return {
      lists,
      cards: cards.filter((card) =>
        card.labels.some((label) => FILTER_LABEL_IDS.includes(label.id)),
      ),
      filterCount: FILTER_LABEL_IDS.length,
    };
  }

  // Thẻ VNPay đang ở giữa hai thẻ của "Đang review"
  if (state === "drag-card") {
    const draggingCard = cards.find((card) => card.id === DRAGGING_CARD_ID);
    if (draggingCard) {
      const others = cards.filter((card) => card.id !== DRAGGING_CARD_ID);
      const targetIndex = others.findIndex((card) => card.id === 9);
      return {
        lists,
        cards: others.toSpliced(targetIndex, 0, { ...draggingCard, listId: 3 }),
        filterCount: 0,
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
        filterCount: 0,
        draggingListId: DRAGGING_LIST_ID,
      };
    }
  }

  return { lists, cards, filterCount: 0 };
}
