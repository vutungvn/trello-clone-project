import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { getBoardBackground } from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import type { Board } from "@/types/board";

interface ArchivedBoardsProps {
  boards: Board[];
}

export function ArchivedBoards({ boards }: ArchivedBoardsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const Chevron = isExpanded ? ChevronUp : ChevronDown;

  return (
    <section className="flex flex-col gap-3 border-t border-border pt-4">
      <h2>
        <button
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-text-secondary transition-colors duration-100 outline-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Chevron aria-hidden="true" className="size-4" />
          Bảng đã lưu trữ ({boards.length})
        </button>
      </h2>

      {isExpanded && (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
          {boards.map((board) => {
            const background = getBoardBackground(board);
            return (
              <li
                key={board.id}
                className="flex items-center justify-between gap-4 px-4 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    style={background.style}
                    className={cn(
                      "size-3 shrink-0 rounded-full",
                      background.className,
                    )}
                  />
                  <span className="truncate text-sm font-medium text-text-primary">
                    {board.title}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="ghost">Khôi phục</Button>
                  <ConfirmDialog
                    title={`Xóa bảng “${board.title}”?`}
                    description="Toàn bộ danh sách, thẻ và bình luận trong bảng sẽ bị xóa vĩnh viễn."
                    trigger={
                      <Button
                        variant="ghost"
                        className="text-danger hover:text-danger"
                      >
                        Xóa
                      </Button>
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
