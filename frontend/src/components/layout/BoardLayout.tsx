import type { ReactNode } from "react";
import { BOARD_BACKGROUND_CLASS } from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import type { BoardBackground } from "@/types/board";
import { AppHeader } from "./AppHeader";

interface BoardLayoutProps {
  background: BoardBackground;
  children: ReactNode;
}

export function BoardLayout({ background, children }: BoardLayoutProps) {
  return (
    <div
      className={cn(
        "flex h-screen flex-col overflow-hidden",
        BOARD_BACKGROUND_CLASS[background],
      )}
    >
      <AppHeader variant="board" />
      {children}
    </div>
  );
}
