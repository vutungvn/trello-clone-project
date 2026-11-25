import { useState } from "react";
import { BoardLayout } from "@/components/layout/BoardLayout";
import { BoardCanvas } from "@/features/board/BoardCanvas";
import { BoardHeader } from "@/features/board/BoardHeader";
import { BoardList } from "@/features/board/BoardList";
import { BoardMenuDrawer } from "@/features/board/BoardMenuDrawer";
import { CardDetailDialog } from "@/features/card/CardDetailDialog";
import { CardItem } from "@/features/card/CardItem";
import type { BoardBackgroundChoice } from "@/lib/board-backgrounds";
import { countCardFilters, filterCards } from "@/lib/card-filter";
import type { PathParams } from "@/lib/match-path";
import { canManageBoard } from "@/lib/permissions";
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
} from "@/mocks";
import { getDragPreview, getPreviewFilter } from "@/mocks/board-preview";
import {
  findWorkspaceAccess,
  type WorkspaceAccess,
} from "@/mocks/workspace-access";
import type { Board, BoardMember } from "@/types/board";
import { NotFoundPage } from "./NotFoundPage";

function byPosition(a: { position: number }, b: { position: number }): number {
  return a.position - b.position;
}

interface BoardPageProps {
  params: PathParams;
}

export function BoardPage({ params }: BoardPageProps) {
  const board = boards.find((item) => item.id === Number(params.boardId));
  if (!board || board.isArchived) return <NotFoundPage kind="board" />;

  const access = findWorkspaceAccess(board.workspaceId.toString());
  const directMembers = boardMembers.filter(
    (member) => member.boardId === board.id,
  );
  const isDirectMember = directMembers.some(
    (member) => member.user.id === currentUser.id,
  );
  if (!access || (board.visibility === "PRIVATE" && !isDirectMember)) {
    return <NotFoundPage kind="board" />;
  }

  return (
    <BoardView board={board} access={access} directMembers={directMembers} />
  );
}

interface BoardViewProps {
  board: Board;
  access: WorkspaceAccess;
  /** Người được thêm thẳng vào bảng */
  directMembers: BoardMember[];
}

function BoardView({ board, access, directMembers }: BoardViewProps) {
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState(() =>
    getPreviewFilter(getPreviewState()),
  );
  // Chỉ xem trước trên trang này, chưa lưu
  const [background, setBackground] = useState<BoardBackgroundChoice>(board);

  // Bảng Riêng tư: thành viên của bảng. Bảng Workspace: mọi thành viên workspace
  const memberInfos =
    board.visibility === "PRIVATE" ? directMembers : access.members;
  const members = memberInfos.map((member) => member.user);
  const canManage = canManageBoard(
    access.role,
    directMembers.find((member) => member.user.id === currentUser.id)?.role,
  );

  const boardLabels = labels.filter((label) => label.boardId === board.id);
  const boardLists = lists.filter((list) => list.boardId === board.id);
  const boardCards = cards.filter((card) => card.boardId === board.id);
  const activeCards = boardCards
    .filter((card) => !card.isArchived)
    .sort(byPosition);

  const preview = getDragPreview(
    getPreviewState(),
    boardLists.filter((list) => !list.isArchived).sort(byPosition),
    filterCards(activeCards, filter),
  );
  const draggingCard = preview.cards.find(
    (card) => card.id === preview.draggingCardId,
  );
  const draggingList = preview.lists.find(
    (list) => list.id === preview.draggingListId,
  );

  const openCard = activeCards.find((card) => card.id === openCardId);
  const openCardList = boardLists.find((list) => list.id === openCard?.listId);

  return (
    <BoardLayout background={background}>
      <title>{`${board.title} — TaskFlow`}</title>
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <BoardHeader
            board={board}
            canManage={canManage}
            members={members}
            labels={boardLabels}
            currentUser={currentUser}
            filter={filter}
            onFilterChange={setFilter}
            visibleCardCount={preview.cards.length}
            isMenuOpen={isMenuOpen}
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            onShare={() => setIsMenuOpen(true)}
          />
          <BoardCanvas
            lists={preview.lists}
            cards={preview.cards}
            now={MOCK_NOW}
            onOpenCard={setOpenCardId}
            isFiltering={countCardFilters(filter) > 0}
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
        </div>

        {isMenuOpen && (
          <BoardMenuDrawer
            board={board}
            canManage={canManage}
            members={memberInfos}
            candidates={access.members
              .map((member) => member.user)
              .filter((user) => !members.some(({ id }) => id === user.id))}
            currentUser={currentUser}
            background={background}
            onBackgroundChange={setBackground}
            archivedCards={boardCards.filter((card) => card.isArchived)}
            archivedLists={boardLists.filter((list) => list.isArchived)}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      {openCard && openCardList && (
        <CardDetailDialog
          key={openCard.id}
          card={openCard}
          listTitle={openCardList.title}
          members={members}
          boardLabels={boardLabels}
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
