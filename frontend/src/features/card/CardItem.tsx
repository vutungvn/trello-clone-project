import { AlignLeft, MessageSquare, Pencil } from "lucide-react";
import { LabelChip } from "@/components/common/LabelChip";
import { UserAvatar } from "@/components/common/UserAvatar";
import { cn } from "@/lib/utils";
import type { Card } from "@/types/card";
import { DueDateBadge } from "./DueDateBadge";

interface CardItemProps {
  card: Card;
  now: Date;
  /** Bản đang được kéo, nổi trên board */
  isOverlay?: boolean;
}

export function CardItem({ card, now, isOverlay = false }: CardItemProps) {
  const hasBadges =
    card.dueDate !== null || card.description !== null || card.commentCount > 0;
  const hasFooter = hasBadges || card.assignees.length > 0;

  return (
    <article
      className={cn(
        "group/card relative flex flex-col gap-1.5 rounded-lg bg-surface px-3 py-2",
        isOverlay
          ? "w-64 rotate-4 cursor-grabbing shadow-[0_12px_24px_rgba(9,30,66,0.32)]"
          : "shadow-[0_1px_1px_#091E4240] focus-within:ring-2 focus-within:ring-focus-ring hover:ring-2 hover:ring-focus-ring",
      )}
    >
      {!isOverlay && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 hidden size-6 items-center justify-center rounded-sm bg-surface-column text-text-primary group-hover/card:inline-flex"
        >
          <Pencil className="size-3.5" />
        </span>
      )}

      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 pr-6">
          {card.labels.map((label) => (
            <LabelChip key={label.id} label={label} />
          ))}
        </div>
      )}

      {/* Vùng bấm của nút phủ kín cả thẻ */}
      <button
        type="button"
        className="text-left text-sm text-text-primary outline-none after:absolute after:inset-0 after:rounded-lg"
      >
        {card.title}
      </button>

      {hasFooter && (
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-text-secondary">
            {card.dueDate !== null && (
              <DueDateBadge
                dueDate={card.dueDate}
                isCompleted={card.isCompleted}
                now={now}
              />
            )}
            {card.description !== null && (
              <span title="Có mô tả" className="inline-flex items-center">
                <AlignLeft aria-label="Có mô tả" className="size-3.5" />
              </span>
            )}
            {card.commentCount > 0 && (
              <span
                title={`${card.commentCount} bình luận`}
                className="inline-flex items-center gap-1 text-xs tabular-nums"
              >
                <MessageSquare aria-hidden="true" className="size-3.5" />
                {card.commentCount}
              </span>
            )}
          </div>

          {card.assignees.length > 0 && (
            <div className="flex shrink-0 items-center gap-0.5">
              {card.assignees.map((user) => (
                <UserAvatar key={user.id} user={user} size="sm" />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
