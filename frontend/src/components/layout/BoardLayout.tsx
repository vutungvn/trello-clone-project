import type { ReactNode } from "react";
import {
  type BoardBackgroundChoice,
  getBoardBackground,
} from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import { AppHeader } from "./AppHeader";

interface BoardLayoutProps {
  background: BoardBackgroundChoice;
  children: ReactNode;
}

export function BoardLayout({ background, children }: BoardLayoutProps) {
  const { className, style } = getBoardBackground(background);

  return (
    <div
      style={style}
      className={cn(
        "flex h-screen flex-col overflow-hidden",
        className,
      )}
    >
      <AppHeader variant="board" />
      {children}
    </div>
  );
}
