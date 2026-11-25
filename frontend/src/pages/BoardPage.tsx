import { useState } from "react";
import { BoardLayout } from "@/components/layout/BoardLayout";
import { BoardCanvas } from "@/features/board/BoardCanvas";
import { BoardHeader } from "@/features/board/BoardHeader";
import { BoardList } from "@/features/board/BoardList";
import { CardDetailDialog } from "@/features/card/CardDetailDialog";
import { CardItem } from "@/features/card/CardItem";
import type { PathParams } from "@/lib/match-path";
import { getPreviewState } from "@/lib/preview-state";
import {
  boardMembers,
  boards,
  cards,
  comments,
  currentUser,
  labels,
  lists,
  MOCK_NOW,
  workspaceMembers,
} from "@/mocks";
import { getBoardPreview } from "@/mocks/board-preview";
import type { Board } from "@/types/board";
import type { User } from "@/types/user";
import { NotFoundPage } from "./NotFoundPage";

function byPosition(a: { position: number }, b: { position: number }): number {
  return a.position - b.position;
}

/** Bảng Riêng tư: thành viên của bảng. Bảng Workspace: mọi thành viên workspace */
function getMembers(board: Board): User[] {
  const members =
    board.visibility === "PRIVATE"
      ? boardMembers.filter((member) => member.boardId === board.id)
      : workspaceMembers.filter(
          (member) => member.workspaceId === board.workspaceId,
        );
  return members.map((member) => member.user);
}

interface BoardPageProps {
  params: PathParams;
}

export function BoardPage({ params }: BoardPageProps) {
  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const board = boards.find((item) => item.id === Number(params.boardId));
  if (!board || board.isArchived) return <NotFoundPage kind="board" />;

  const preview = getBoardPreview(
    getPreviewState(),
    lists
      .filter((list) => list.boardId === board.id && !list.isArchived)
      .sort(byPosition),
    cards
      .filter((card) => card.boardId === board.id && !card.isArchived)
      .sort(byPosition),
  );
  const draggingCard = preview.cards.find(
    (card) => card.id === preview.draggingCardId,
  );
  const draggingList = preview.lists.find(
    (list) => list.id === preview.draggingListId,
  );

  const members = getMembers(board);
  const openCard = preview.cards.find((card) => card.id === openCardId);
  const openCardList = lists.find((list) => list.id === openCard?.listId);

  return (
    <BoardLayout background={board.backgroundColor}>
      <title>{`${board.title} — TaskFlow`}</title>
      <BoardHeader
        board={board}
        members={members}
        filterCount={preview.filterCount}
        visibleCardCount={preview.cards.length}
        clearFilterHref={`/b/${board.id}`}
      />
      <BoardCanvas
        lists={preview.lists}
        cards={preview.cards}
        now={MOCK_NOW}
        onOpenCard={setOpenCardId}
        isFiltering={preview.filterCount > 0}
        draggingCardId={preview.draggingCardId}
        draggingListId={preview.draggingListId}
        overlay={
          <>
            {draggingCard && (
              <div className="absolute top-16 left-108 z-30">
                <CardItem card={draggingCard} now={MOCK_NOW} isOverlay />
              </div>
            )}
            {draggingList && (
              <div className="absolute top-6 left-76 z-30">
                <BoardList
                  list={draggingList}
                  cards={preview.cards.filter(
                    (card) => card.listId === draggingList.id,
                  )}
                  now={MOCK_NOW}
                  isOverlay
                />
              </div>
            )}
          </>
        }
      />
      {openCard && openCardList && (
        <CardDetailDialog
          key={openCard.id}
          card={openCard}
          listTitle={openCardList.title}
          members={members}
          boardLabels={labels.filter((label) => label.boardId === board.id)}
          comments={comments
            .filter((comment) => comment.cardId === openCard.id)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
          currentUser={currentUser}
          now={MOCK_NOW}
          onClose={() => setOpenCardId(null)}
        />
      )}
    </BoardLayout>
  );
}
