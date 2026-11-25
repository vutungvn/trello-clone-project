import { useState } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { ArchivedBoards } from "@/features/board/ArchivedBoards";
import { BoardTile } from "@/features/board/BoardTile";
import { CreateBoardPopover } from "@/features/board/CreateBoardPopover";
import { CreateBoardTile } from "@/features/board/CreateBoardTile";
import type { PathParams } from "@/lib/match-path";
import { matchesKeyword } from "@/lib/text";
import { boards, workspaces } from "@/mocks";
import { findWorkspaceAccess } from "@/mocks/workspace-access";
import { NotFoundPage } from "./NotFoundPage";

interface WorkspaceBoardsPageProps {
  params: PathParams;
}

export function WorkspaceBoardsPage({ params }: WorkspaceBoardsPageProps) {
  const [keyword, setKeyword] = useState("");

  const access = findWorkspaceAccess(params.workspaceId);
  if (!access) return <NotFoundPage kind="workspace" />;

  const { workspace, members, role } = access;
  const workspaceBoards = boards.filter(
    (board) => board.workspaceId === workspace.id,
  );
  const visibleBoards = workspaceBoards.filter(
    (board) => !board.isArchived && matchesKeyword(board.title, keyword),
  );
  const archivedBoards = workspaceBoards.filter((board) => board.isArchived);

  return (
    <WorkspaceLayout workspace={workspace} role={role} members={members}>
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
