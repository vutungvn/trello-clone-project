import { type ComponentProps, useState } from "react";
import {
  Archive,
  ArrowLeft,
  type LucideIcon,
  Palette,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  type BoardBackgroundChoice,
  getBoardBackground,
} from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";
import type { Board, List } from "@/types/board";
import type { Card } from "@/types/card";
import type { User } from "@/types/user";
import { ArchivedItems } from "./ArchivedItems";
import { BackgroundPicker } from "./BackgroundPicker";
import { type BoardMemberInfo, BoardMembersSection } from "./BoardMembersSection";

type View = "menu" | "background" | "archived";

const VIEW_TITLE: Record<View, string> = {
  menu: "Menu",
  background: "Đổi phông nền",
  archived: "Mục đã lưu trữ",
};

interface BoardMenuDrawerProps {
  board: Board;
  canManage: boolean;
  members: BoardMemberInfo[];
  /** Thành viên workspace chưa ở trong bảng */
  candidates: User[];
  currentUser: User;
  background: BoardBackgroundChoice;
  onBackgroundChange: (background: BoardBackgroundChoice) => void;
  archivedCards: Card[];
  archivedLists: List[];
  onClose: () => void;
}

export function BoardMenuDrawer({
  board,
  canManage,
  members,
  candidates,
  currentUser,
  background,
  onBackgroundChange,
  archivedCards,
  archivedLists,
  onClose,
}: BoardMenuDrawerProps) {
  const [view, setView] = useState<View>("menu");
  const [isMembersOpen, setIsMembersOpen] = useState(true);
  const preview = getBoardBackground(background);

  return (
    <aside
      aria-label="Menu bảng"
      // Esc trong hộp xác nhận hoặc danh sách thả xuống đã được chúng xử lý
      onKeyDown={(event) => {
        if (event.key === "Escape" && !event.defaultPrevented) onClose();
      }}
      className="z-30 flex w-85 shrink-0 flex-col border-l border-border bg-surface shadow-[-8px_0_16px_rgba(9,30,66,0.16)]"
    >
      <header className="relative flex h-12 shrink-0 items-center justify-center border-b border-border px-4">
        {view !== "menu" && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Quay lại menu"
            onClick={() => setView("menu")}
            className="absolute left-3"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
        )}
        <h2 className="text-sm font-semibold text-text-primary">
          {VIEW_TITLE[view]}
        </h2>
        <Button
          autoFocus
          variant="ghost"
          size="icon"
          aria-label="Đóng menu"
          onClick={onClose}
          className="absolute right-3"
        >
          <X aria-hidden="true" />
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
        {view === "menu" && (
          <>
            <div className="flex flex-col">
              {canManage && (
                <MenuItem
                  icon={Palette}
                  label="Đổi phông nền"
                  onClick={() => setView("background")}
                >
                  <span
                    aria-hidden="true"
                    style={preview.style}
                    className={cn(
                      "ml-auto h-5 w-8 rounded-sm",
                      preview.className,
                    )}
                  />
                </MenuItem>
              )}
              <MenuItem
                icon={Archive}
                label="Mục đã lưu trữ"
                onClick={() => setView("archived")}
              />
              <MenuItem
                icon={Users}
                label="Thành viên bảng"
                aria-expanded={isMembersOpen}
                onClick={() => setIsMembersOpen(!isMembersOpen)}
              />
            </div>

            {isMembersOpen && (
              <BoardMembersSection
                visibility={board.visibility}
                canManage={canManage}
                members={members}
                candidates={candidates}
                currentUser={currentUser}
              />
            )}

            {canManage && (
              <div className="flex flex-col border-t border-border pt-3">
                <MenuItem
                  icon={Archive}
                  label="Lưu trữ bảng"
                  onClick={onClose}
                />
                <ConfirmDialog
                  title={`Xóa bảng “${board.title}”?`}
                  description="Toàn bộ danh sách, thẻ và bình luận trong bảng sẽ bị xóa vĩnh viễn."
                  onConfirm={onClose}
                  trigger={
                    <MenuItem
                      icon={Trash2}
                      label="Xóa bảng"
                      className="text-danger [&_svg]:text-danger"
                    />
                  }
                />
              </div>
            )}
          </>
        )}

        {view === "background" && (
          <BackgroundPicker value={background} onChange={onBackgroundChange} />
        )}

        {view === "archived" && (
          <ArchivedItems cards={archivedCards} lists={archivedLists} />
        )}
      </div>
    </aside>
  );
}

type MenuItemProps = ComponentProps<"button"> & {
  icon: LucideIcon;
  label: string;
};

function MenuItem({
  icon: Icon,
  label,
  className,
  children,
  ...props
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-sm px-2 py-2 text-left text-sm font-medium text-text-primary transition-colors duration-100 outline-none hover:bg-neutral-subtle focus-visible:bg-neutral-subtle",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-4 text-text-secondary" />
      {label}
      {children}
    </button>
  );
}
