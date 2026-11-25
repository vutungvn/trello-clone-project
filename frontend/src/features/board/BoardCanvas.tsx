import type { ReactNode } from "react";
import type { List } from "@/types/board";
import type { Card } from "@/types/card";
import { AddListForm } from "./AddListForm";
import { BoardList } from "./BoardList";
import { ListPlaceholder } from "./ListPlaceholder";

interface BoardCanvasProps {
  /** Đã sắp theo position */
  lists: List[];
  /** Đã sắp theo position */
  cards: Card[];
  now: Date;
  isFiltering?: boolean;
  draggingCardId?: number;
  draggingListId?: number;
  /** Thẻ hoặc danh sách đang được kéo */
  overlay?: ReactNode;
}

export function BoardCanvas({
  lists,
  cards,
  now,
  isFiltering,
  draggingCardId,
  draggingListId,
  overlay,
}: BoardCanvasProps) {
  return (
    <main className="min-h-0 flex-1 overflow-x-auto p-3">
      <div className="relative flex h-full min-w-max items-start gap-3">
        {lists.map((list) =>
          list.id === draggingListId ? (
            <ListPlaceholder key={list.id} />
          ) : (
            <BoardList
              key={list.id}
              list={list}
              cards={cards.filter((card) => card.listId === list.id)}
              now={now}
              isFiltering={isFiltering}
              draggingCardId={draggingCardId}
            />
          ),
        )}
        <AddListForm defaultOpen={lists.length === 0} />
        {overlay}
      </div>
    </main>
  );
}
