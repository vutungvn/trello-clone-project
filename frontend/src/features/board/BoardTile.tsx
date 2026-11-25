import { Lock } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { getBoardBackground } from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import type { Board } from "@/types/board";
import { BOARD_TILE_SIZE_CLASS, type BoardTileSize } from "./board-tile-size";

interface BoardTileProps {
  board: Board;
  size?: BoardTileSize;
}

export function BoardTile({ board, size = "md" }: BoardTileProps) {
  const background = getBoardBackground(board);

  return (
    <AppLink
      href={`/b/${board.id}`}
      style={background.style}
      className={cn(
        "flex flex-col justify-between overflow-hidden rounded-sm p-3 outline-none hover:brightness-90 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        BOARD_TILE_SIZE_CLASS[size],
        background.className,
      )}
    >
      <span className="line-clamp-2 text-base leading-5 font-bold text-on-primary">
        {board.title}
      </span>
      {board.visibility === "PRIVATE" && (
        <span className="inline-flex items-center gap-1 text-xs text-on-primary/90">
          <Lock aria-hidden="true" className="size-3.5" />
          <span className={cn(size === "md" && "sr-only")}>Riêng tư</span>
        </span>
      )}
    </AppLink>
  );
}
