import { useState } from "react";
import { Plus } from "lucide-react";
import { EditableText } from "@/components/common/EditableText";
import { Button } from "@/components/ui/button";
import { AddCardForm } from "@/features/card/AddCardForm";
import { CardItem } from "@/features/card/CardItem";
import { CardPlaceholder } from "@/features/card/CardPlaceholder";
import { cn } from "@/lib/utils";
import type { List } from "@/types/board";
import type { Card } from "@/types/card";
import { ListMenu } from "./ListMenu";

interface BoardListProps {
  list: List;
  cards: Card[];
  now: Date;
  onOpenCard?: (cardId: number) => void;
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
  onOpenCard,
  isFiltering = false,
  draggingCardId,
  isOverlay = false,
}: BoardListProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

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
      <div className="flex items-center justify-between gap-1.5 py-1 pr-2">
        <h2 className="min-w-0 flex-1 text-sm font-semibold text-text-primary">
          <EditableText
            value={list.title}
            label="Tên danh sách"
            className="h-7 px-2"
            buttonClassName="block truncate"
            isEditing={isRenaming}
            onEditingChange={setIsRenaming}
          />
        </h2>
        <ListMenu
          listTitle={list.title}
          onAddCard={() => setIsAddingCard(true)}
          onRename={() => setIsRenaming(true)}
        />
      </div>

      {/* p-0.5 chừa chỗ cho viền xanh khi hover, nếu không sẽ bị vùng cuộn cắt */}
      {cards.length > 0 && (
        <div className="-m-0.5 flex min-h-0 flex-col gap-2 overflow-y-auto p-0.5">
          {cards.map((card) =>
            card.id === draggingCardId ? (
              <CardPlaceholder key={card.id} />
            ) : (
              <CardItem
                key={card.id}
                card={card}
                now={now}
                onOpen={onOpenCard}
              />
            ),
          )}
        </div>
      )}

      {cards.length === 0 && isFiltering && (
        <p className="px-2 py-3 text-center text-xs text-text-secondary">
          Không có thẻ phù hợp
        </p>
      )}

      {isAddingCard ? (
        <AddCardForm onClose={() => setIsAddingCard(false)} />
      ) : (
        <Button
          variant="ghost"
          onClick={() => setIsAddingCard(true)}
          className="mt-1 w-full justify-start rounded-lg px-2 hover:bg-neutral-hover"
        >
          <Plus aria-hidden="true" />
          Thêm thẻ
        </Button>
      )}
    </section>
  );
}
