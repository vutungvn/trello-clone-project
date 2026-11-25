import { useState } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvitationsTable } from "@/features/workspace/InvitationsTable";
import { InviteMemberDialog } from "@/features/workspace/InviteMemberDialog";
import { MembersTable } from "@/features/workspace/MembersTable";
import type { PathParams } from "@/lib/match-path";
import { canManageWorkspace } from "@/lib/permissions";
import { matchesKeyword } from "@/lib/text";
import { currentUser, MOCK_NOW, users, workspaceInvitations } from "@/mocks";
import { findWorkspaceAccess } from "@/mocks/workspace-access";
import { NotFoundPage } from "./NotFoundPage";

const TAB_CLASS =
  "h-7 flex-none rounded-sm px-3 text-text-secondary after:hidden hover:text-text-primary data-active:font-semibold data-active:text-primary data-active:hover:text-primary";

interface WorkspaceMembersPageProps {
  params: PathParams;
}

export function WorkspaceMembersPage({ params }: WorkspaceMembersPageProps) {
  const [keyword, setKeyword] = useState("");

  const access = findWorkspaceAccess(params.workspaceId);
  if (!access) return <NotFoundPage kind="workspace" />;

  const { workspace, members, role } = access;
  const canManage = canManageWorkspace(role);
  const pendingInvitations = workspaceInvitations.filter(
    (invitation) =>
      invitation.workspaceId === workspace.id &&
      invitation.status === "PENDING",
  );

  return (
    <WorkspaceLayout workspace={workspace} role={role} members={members}>
      <title>{`Thành viên · ${workspace.name} — TaskFlow`}</title>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg leading-6 font-bold text-text-primary">
            Thành viên Workspace
          </h2>
          <p className="text-sm text-text-secondary">
            Thành viên có thể xem và tạo bảng trong workspace này.
          </p>
        </div>
        {canManage && (
          <InviteMemberDialog
            users={users}
            members={members}
            trigger={<Button>Mời thành viên</Button>}
          />
        )}
      </div>

      <Tabs defaultValue="members" className="gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {canManage && (
            <TabsList
              aria-label="Danh sách thành viên và lời mời"
              className="gap-1 bg-surface-column p-1 group-data-horizontal/tabs:h-auto"
            >
              <TabsTrigger value="members" className={TAB_CLASS}>
                Thành viên ({members.length})
              </TabsTrigger>
              <TabsTrigger value="invitations" className={TAB_CLASS}>
                Lời mời đang chờ ({pendingInvitations.length})
              </TabsTrigger>
            </TabsList>
          )}
          <SearchInput
            label="Lọc theo tên hoặc email"
            placeholder="Lọc theo tên hoặc email…"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="w-72"
          />
        </div>

        <TabsContent value="members">
          <MembersTable
            members={members.filter((member) =>
              matchesKeyword(
                `${member.user.name} ${member.user.email}`,
                keyword,
              ),
            )}
            currentUser={currentUser}
            viewerRole={role}
          />
        </TabsContent>
        {canManage && (
          <TabsContent value="invitations">
            <InvitationsTable
              invitations={pendingInvitations.filter((invitation) =>
                matchesKeyword(invitation.email, keyword),
              )}
              now={MOCK_NOW}
            />
          </TabsContent>
        )}
      </Tabs>
    </WorkspaceLayout>
  );
}
