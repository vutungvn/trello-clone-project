import { Ellipsis, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardItem } from "@/features/card/CardItem";
import { CardPlaceholder } from "@/features/card/CardPlaceholder";
import { cn } from "@/lib/utils";
import type { List } from "@/types/board";
import type { Card } from "@/types/card";

interface BoardListProps {
  list: List;
  cards: Card[];
  now: Date;
  isFiltering?: boolean;
  /** Thẻ đang được kéo, chỗ của nó hiện ô nét đứt */
  draggingCardId?: number;
  /** Bản đang được kéo, nổi trên board */
  isOverlay?: boolean;
}

export function BoardList({
  list,
  cards,
  now,
  isFiltering = false,
  draggingCardId,
  isOverlay = false,
}: BoardListProps) {
  return (
    <section
      aria-label={list.title}
      className={cn(
        "flex w-68 shrink-0 flex-col gap-2 rounded-xl bg-surface-column p-2",
        isOverlay
          ? "rotate-3 cursor-grabbing shadow-[0_16px_32px_rgba(9,30,66,0.35)]"
          : "max-h-full shadow-sm",
      )}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <h2 className="min-w-0 truncate text-sm font-semibold text-text-primary">
          {list.title}
        </h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Tùy chọn danh sách ${list.title}`}
          className="hover:bg-neutral-hover"
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </div>

      {/* p-0.5 chừa chỗ cho viền xanh khi hover, nếu không sẽ bị vùng cuộn cắt */}
      {cards.length > 0 && (
        <div className="-m-0.5 flex min-h-0 flex-col gap-2 overflow-y-auto p-0.5">
          {cards.map((card) =>
            card.id === draggingCardId ? (
              <CardPlaceholder key={card.id} />
            ) : (
              <CardItem key={card.id} card={card} now={now} />
            ),
          )}
        </div>
      )}

      {cards.length === 0 && isFiltering && (
        <p className="px-2 py-3 text-center text-xs text-text-secondary">
          Không có thẻ phù hợp
        </p>
      )}

      <Button
        variant="ghost"
        className="mt-1 w-full justify-start rounded-lg px-2 hover:bg-neutral-hover"
      >
        <Plus aria-hidden="true" />
        Thêm thẻ
      </Button>
    </section>
  );
}
