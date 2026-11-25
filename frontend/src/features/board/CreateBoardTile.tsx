import type { ComponentProps } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { BOARD_TILE_SIZE_CLASS, type BoardTileSize } from "./board-tile-size";

type CreateBoardTileProps = ComponentProps<"button"> & {
  size?: BoardTileSize;
};

export function CreateBoardTile({
  size = "md",
  className,
  ...props
}: CreateBoardTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-1 rounded-sm border border-dashed border-border-input bg-surface-column p-3 text-sm font-medium text-text-primary transition-colors duration-100 outline-none hover:bg-neutral-hover focus-visible:ring-2 focus-visible:ring-focus-ring aria-expanded:bg-neutral-hover",
        BOARD_TILE_SIZE_CLASS[size],
        className,
      )}
      {...props}
    >
      <Plus aria-hidden="true" className="size-4" />
      Tạo bảng mới
    </button>
  );
}
