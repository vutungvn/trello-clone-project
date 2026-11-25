import { Kanban, Settings, Users } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { RoleBadge } from "@/components/common/RoleBadge";
import { WorkspaceAvatar } from "@/components/common/WorkspaceAvatar";
import { Button } from "@/components/ui/button";
import { BoardTile } from "@/features/board/BoardTile";
import { CreateBoardPopover } from "@/features/board/CreateBoardPopover";
import { CreateBoardTile } from "@/features/board/CreateBoardTile";
import type { Board } from "@/types/board";
import type { Workspace, WorkspaceRole } from "@/types/workspace";

interface WorkspaceSectionProps {
  workspace: Workspace;
  role: WorkspaceRole;
  boards: Board[];
  /** Để chọn workspace khác khi tạo bảng */
  workspaces: Workspace[];
}

export function WorkspaceSection({
  workspace,
  role,
  boards,
  workspaces,
}: WorkspaceSectionProps) {
  const headingId = `workspace-${workspace.id}`;
  const links = [
    { label: "Bảng", icon: Kanban, href: `/w/${workspace.id}` },
    { label: "Thành viên", icon: Users, href: `/w/${workspace.id}/members` },
    { label: "Cài đặt", icon: Settings, href: `/w/${workspace.id}/settings` },
  ];

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <WorkspaceAvatar workspace={workspace} />
          <h2
            id={headingId}
            className="truncate text-base leading-6 font-bold text-text-primary"
          >
            {workspace.name}
          </h2>
          <RoleBadge role={role} />
        </div>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <Button key={link.href} asChild variant="secondary">
              <AppLink href={link.href}>
                <link.icon aria-hidden="true" className="text-text-secondary" />
                {link.label}
              </AppLink>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {boards.map((board) => (
          <BoardTile key={board.id} board={board} />
        ))}
        <CreateBoardPopover
          trigger={<CreateBoardTile />}
          workspaces={workspaces}
          defaultWorkspaceId={workspace.id}
        />
      </div>
    </section>
  );
}
