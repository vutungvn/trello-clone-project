import { type ReactNode, useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { LabelChip } from "@/components/common/LabelChip";
import { SearchInput } from "@/components/common/SearchInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { matchesKeyword } from "@/lib/text";
import type { List } from "@/types/board";
import type { Card } from "@/types/card";

const TAB_CLASS =
  "h-7 rounded-sm font-normal text-text-secondary after:hidden hover:text-text-primary data-active:font-medium data-active:text-text-primary";

interface ArchivedItemsProps {
  cards: Card[];
  lists: List[];
}

/** Thẻ và danh sách đã lưu trữ của bảng */
export function ArchivedItems({ cards, lists }: ArchivedItemsProps) {
  const [keyword, setKeyword] = useState("");

  const visibleCards = cards.filter((card) =>
    matchesKeyword(card.title, keyword),
  );
  const visibleLists = lists.filter((list) =>
    matchesKeyword(list.title, keyword),
  );

  return (
    <Tabs defaultValue="cards" className="gap-3">
      <TabsList
        aria-label="Loại mục đã lưu trữ"
        className="grid w-full grid-cols-2 gap-1 rounded-sm border border-border bg-neutral-subtle p-1 group-data-horizontal/tabs:h-auto"
      >
        <TabsTrigger value="cards" className={TAB_CLASS}>
          Thẻ
        </TabsTrigger>
        <TabsTrigger value="lists" className={TAB_CLASS}>
          Danh sách
        </TabsTrigger>
      </TabsList>

      <SearchInput
        label="Tìm mục đã lưu trữ"
        placeholder="Tìm mục đã lưu trữ…"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />

      <TabsContent value="cards">
        <ItemList isEmpty={visibleCards.length === 0}>
          {visibleCards.map((card) => (
            <ArchivedItem
              key={card.id}
              title={`Xóa thẻ “${card.title}”?`}
              description="Thẻ và toàn bộ bình luận sẽ bị xóa vĩnh viễn."
            >
              {card.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {card.labels.map((label) => (
                    <LabelChip key={label.id} label={label} />
                  ))}
                </div>
              )}
              {card.title}
            </ArchivedItem>
          ))}
        </ItemList>
      </TabsContent>

      <TabsContent value="lists">
        <ItemList isEmpty={visibleLists.length === 0}>
          {visibleLists.map((list) => (
            <ArchivedItem
              key={list.id}
              title={`Xóa danh sách “${list.title}”?`}
              description="Danh sách và toàn bộ thẻ bên trong sẽ bị xóa vĩnh viễn."
            >
              {list.title}
            </ArchivedItem>
          ))}
        </ItemList>
      </TabsContent>
    </Tabs>
  );
}

function ItemList({
  isEmpty,
  children,
}: {
  isEmpty: boolean;
  children: ReactNode;
}) {
  if (isEmpty) {
    return (
      <p className="py-4 text-center text-sm text-text-secondary">
        Không có mục nào
      </p>
    );
  }
  return <ul className="flex flex-col gap-3 pt-1">{children}</ul>;
}

interface ArchivedItemProps {
  /** Tiêu đề hộp xác nhận xóa */
  title: string;
  description: string;
  children: ReactNode;
}

function ArchivedItem({ title, description, children }: ArchivedItemProps) {
  return (
    <li className="flex flex-col gap-1.5">
      <article className="flex flex-col gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary shadow-[0_1px_1px_#091E4240]">
        {children}
      </article>
      <div className="flex items-center gap-1.5 px-1 text-xs text-text-secondary">
        <button
          type="button"
          className="rounded-sm underline-offset-2 outline-none hover:text-text-primary hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          Khôi phục
        </button>
        <span aria-hidden="true">·</span>
        <ConfirmDialog
          title={title}
          description={description}
          trigger={
            <button
              type="button"
              className="rounded-sm underline-offset-2 outline-none hover:text-danger hover:underline focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              Xóa
            </button>
          }
        />
      </div>
    </li>
  );
}
