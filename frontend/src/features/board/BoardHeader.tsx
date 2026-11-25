import { Ellipsis, ListFilter, Lock, UserPlus, Users, X } from "lucide-react";
import { AvatarStack } from "@/components/common/AvatarStack";
import { EditableText } from "@/components/common/EditableText";
import { Button } from "@/components/ui/button";
import {
  type CardFilter,
  countCardFilters,
  EMPTY_CARD_FILTER,
} from "@/lib/card-filter";
import type { Board, BoardVisibility, Label } from "@/types/board";
import type { User } from "@/types/user";
import { FilterPopover } from "./FilterPopover";

const VISIBILITY = {
  PRIVATE: { label: "Riêng tư", icon: Lock },
  WORKSPACE: { label: "Workspace", icon: Users },
} satisfies Record<BoardVisibility, unknown>;

interface BoardHeaderProps {
  board: Board;
  canManage: boolean;
  members: User[];
  labels: Label[];
  currentUser: User;
  filter: CardFilter;
  onFilterChange: (filter: CardFilter) => void;
  visibleCardCount: number;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onShare: () => void;
}

export function BoardHeader({
  board,
  canManage,
  members,
  labels,
  currentUser,
  filter,
  onFilterChange,
  visibleCardCount,
  isMenuOpen,
  onToggleMenu,
  onShare,
}: BoardHeaderProps) {
  const { label: visibilityLabel, icon: VisibilityIcon } =
    VISIBILITY[board.visibility];
  const filterCount = countCardFilters(filter);
  const isFiltering = filterCount > 0;

  return (
    <div className="flex h-14 shrink-0 items-center justify-between gap-4 bg-black/25 px-4">
      <div className="flex min-w-0 items-center gap-2">
        <h1 className="-ml-2 min-w-0 text-lg leading-6 font-bold text-on-primary">
          {canManage ? (
            <EditableText
              value={board.title}
              label="Tên bảng"
              className="px-2 py-1"
              buttonClassName="block truncate hover:bg-white/20"
            />
          ) : (
            <span className="block truncate px-2 py-1">{board.title}</span>
          )}
        </h1>
        <span className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-sm bg-white/20 px-2 text-sm font-medium text-on-primary">
          <VisibilityIcon aria-hidden="true" className="size-4" />
          {visibilityLabel}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isFiltering && (
          <span role="status" className="mr-1 text-xs text-on-primary">
            Đang hiển thị {visibleCardCount} thẻ
          </span>
        )}
        <div
          className={
            isFiltering
              ? "flex h-8 items-center rounded-sm bg-neutral-hover pr-1.5 text-text-primary"
              : undefined
          }
        >
          <FilterPopover
            filter={filter}
            onFilterChange={onFilterChange}
            members={members}
            labels={labels}
            currentUser={currentUser}
            trigger={
              <Button
                variant="board"
                className={
                  isFiltering
                    ? "bg-transparent px-2 text-text-primary hover:bg-surface"
                    : "px-2"
                }
              >
                <ListFilter aria-hidden="true" />
                {isFiltering ? `Lọc (${filterCount})` : "Lọc"}
              </Button>
            }
          />
          {isFiltering && (
            <button
              type="button"
              aria-label="Xóa bộ lọc"
              onClick={() => onFilterChange(EMPTY_CARD_FILTER)}
              className="inline-flex size-5 items-center justify-center rounded-sm outline-none hover:bg-black/10 focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          )}
        </div>

        <div className="mx-1">
          <AvatarStack users={members} />
        </div>

        <Button variant="board" onClick={onShare}>
          <UserPlus aria-hidden="true" />
          Chia sẻ
        </Button>

        <Button
          variant="board"
          size="icon"
          aria-label="Menu bảng"
          aria-expanded={isMenuOpen}
          onClick={onToggleMenu}
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
