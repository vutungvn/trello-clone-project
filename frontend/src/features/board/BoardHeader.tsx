import { Ellipsis, ListFilter, Lock, UserPlus, Users, X } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { AvatarStack } from "@/components/common/AvatarStack";
import { Button } from "@/components/ui/button";
import type { Board, BoardVisibility } from "@/types/board";
import type { User } from "@/types/user";

const VISIBILITY = {
  PRIVATE: { label: "Riêng tư", icon: Lock },
  WORKSPACE: { label: "Workspace", icon: Users },
} satisfies Record<BoardVisibility, unknown>;

interface BoardHeaderProps {
  board: Board;
  members: User[];
  /** Số điều kiện lọc đang bật, 0 là không lọc */
  filterCount: number;
  visibleCardCount: number;
  clearFilterHref: string;
}

export function BoardHeader({
  board,
  members,
  filterCount,
  visibleCardCount,
  clearFilterHref,
}: BoardHeaderProps) {
  const { label: visibilityLabel, icon: VisibilityIcon } =
    VISIBILITY[board.visibility];

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 bg-black/25 px-4">
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="truncate pr-2 text-lg leading-6 font-bold text-on-primary">
          {board.title}
        </h1>
        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm bg-white/20 px-2 text-sm font-medium text-on-primary">
          <VisibilityIcon aria-hidden="true" className="size-4" />
          {visibilityLabel}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {filterCount > 0 ? (
          <>
            <span className="mr-1 text-xs text-on-primary">
              Đang hiển thị {visibleCardCount} thẻ
            </span>
            <div className="flex h-8 items-center rounded-sm bg-neutral-hover pr-1.5 text-text-primary">
              <button
                type="button"
                className="inline-flex h-full items-center gap-1.5 rounded-l-sm px-2 text-sm font-medium transition-colors duration-100 hover:bg-surface"
              >
                <ListFilter aria-hidden="true" className="size-4" />
                Lọc ({filterCount})
              </button>
              <AppLink
                href={clearFilterHref}
                aria-label="Xóa bộ lọc"
                className="inline-flex size-5 items-center justify-center rounded-sm hover:bg-black/10"
              >
                <X aria-hidden="true" className="size-3.5" />
              </AppLink>
            </div>
          </>
        ) : (
          <Button variant="board" className="px-2">
            <ListFilter aria-hidden="true" />
            Lọc
          </Button>
        )}

        <div className="mx-1">
          <AvatarStack users={members} />
        </div>

        <Button variant="board">
          <UserPlus aria-hidden="true" />
          Chia sẻ
        </Button>

        <Button variant="board" size="icon" aria-label="Menu bảng">
          <Ellipsis aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
