import { Plus } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceDialog } from "@/features/workspace/CreateWorkspaceDialog";
import { WelcomeEmptyState } from "@/features/workspace/WelcomeEmptyState";
import { WorkspaceSection } from "@/features/workspace/WorkspaceSection";
import { getPreviewState } from "@/lib/preview-state";
import {
  boards,
  currentUser,
  workspaceMembers,
  workspaces as mockWorkspaces,
} from "@/mocks";

export function HomePage() {
  const workspaces = getPreviewState() === "empty" ? [] : mockWorkspaces;

  return (
    <MainLayout workspaces={workspaces}>
      <title>Trang chủ — TaskFlow</title>
      {workspaces.length === 0 ? (
        <WelcomeEmptyState />
      ) : (
        <div className="flex flex-col gap-10">
          <h1 className="sr-only">Bảng của bạn</h1>
          {workspaces.map((workspace) => {
            const membership = workspaceMembers.find(
              (member) =>
                member.workspaceId === workspace.id &&
                member.user.id === currentUser.id,
            );
            return (
              membership && (
                <WorkspaceSection
                  key={workspace.id}
                  workspace={workspace}
                  role={membership.role}
                  boards={boards.filter(
                    (board) =>
                      board.workspaceId === workspace.id && !board.isArchived,
                  )}
                  workspaces={workspaces}
                />
              )
            );
          })}
          <CreateWorkspaceDialog
            trigger={
              <Button variant="secondary" size="lg" className="self-start">
                <Plus aria-hidden="true" />
                Tạo Workspace mới
              </Button>
            }
          />
        </div>
      )}
    </MainLayout>
  );
}
