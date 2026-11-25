import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { DeleteWorkspaceCard } from "@/features/workspace/DeleteWorkspaceCard";
import { TransferOwnershipCard } from "@/features/workspace/TransferOwnershipCard";
import { WorkspaceInfoCard } from "@/features/workspace/WorkspaceInfoCard";
import type { PathParams } from "@/lib/match-path";
import { canManageWorkspace } from "@/lib/permissions";
import { boards } from "@/mocks";
import { findWorkspaceAccess } from "@/mocks/workspace-access";
import { NotFoundPage } from "./NotFoundPage";

interface WorkspaceSettingsPageProps {
  params: PathParams;
}

export function WorkspaceSettingsPage({ params }: WorkspaceSettingsPageProps) {
  const access = findWorkspaceAccess(params.workspaceId);
  if (!access) return <NotFoundPage kind="workspace" />;

  const { workspace, members, role } = access;
  const boardCount = boards.filter(
    (board) => board.workspaceId === workspace.id,
  ).length;

  return (
    <WorkspaceLayout workspace={workspace} role={role} members={members}>
      <title>{`Cài đặt · ${workspace.name} — TaskFlow`}</title>
      <div className="flex w-full max-w-180 flex-col gap-6">
        <WorkspaceInfoCard
          workspace={workspace}
          canEdit={canManageWorkspace(role)}
        />
        {role === "OWNER" && (
          <>
            <TransferOwnershipCard
              admins={members.filter((member) => member.role === "ADMIN")}
            />
            <DeleteWorkspaceCard
              workspace={workspace}
              boardCount={boardCount}
            />
          </>
        )}
      </div>
    </WorkspaceLayout>
  );
}
