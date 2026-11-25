import { useState } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { ArchivedBoards } from "@/features/board/ArchivedBoards";
import { BoardTile } from "@/features/board/BoardTile";
import { CreateBoardPopover } from "@/features/board/CreateBoardPopover";
import { CreateBoardTile } from "@/features/board/CreateBoardTile";
import type { PathParams } from "@/lib/match-path";
import { boards, currentUser, workspaceMembers, workspaces } from "@/mocks";
import { NotFoundPage } from "./NotFoundPage";

interface WorkspaceBoardsPageProps {
  params: PathParams;
}

export function WorkspaceBoardsPage({ params }: WorkspaceBoardsPageProps) {
  const [keyword, setKeyword] = useState("");

  const workspace = workspaces.find(
    (item) => item.id === Number(params.workspaceId),
  );
  const members = workspaceMembers.filter(
    (member) => member.workspaceId === workspace?.id,
  );
  const membership = members.find(
    (member) => member.user.id === currentUser.id,
  );
  if (!workspace || !membership) return <NotFoundPage kind="workspace" />;

  const workspaceBoards = boards.filter(
    (board) => board.workspaceId === workspace.id,
  );
  const visibleBoards = workspaceBoards.filter(
    (board) =>
      !board.isArchived &&
      board.title.toLowerCase().includes(keyword.trim().toLowerCase()),
  );
  const archivedBoards = workspaceBoards.filter((board) => board.isArchived);

  return (
    <WorkspaceLayout
      workspace={workspace}
      role={membership.role}
      memberCount={members.length}
    >
      <title>{`${workspace.name} — TaskFlow`}</title>
      <SearchInput
        label="Tìm bảng"
        placeholder="Tìm bảng…"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        className="w-64"
      />

      <section aria-label="Danh sách bảng" className="flex flex-wrap gap-4">
        {visibleBoards.map((board) => (
          <BoardTile key={board.id} board={board} size="lg" />
        ))}
        <CreateBoardPopover
          trigger={<CreateBoardTile size="lg" />}
          workspaces={workspaces}
          defaultWorkspaceId={workspace.id}
        />
      </section>

      {archivedBoards.length > 0 && <ArchivedBoards boards={archivedBoards} />}
    </WorkspaceLayout>
  );
}
