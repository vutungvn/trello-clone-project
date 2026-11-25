import { AppLink } from "@/components/common/AppLink";
import { WorkspaceAvatar } from "@/components/common/WorkspaceAvatar";
import { Button } from "@/components/ui/button";
import { WORKSPACE_ROLE_LABEL } from "@/lib/roles";
import type { User } from "@/types/user";
import type { InvitationDetail } from "@/types/workspace";

interface AcceptInvitationProps {
  invitation: InvitationDetail;
  currentUser: User;
}

export function AcceptInvitation({
  invitation,
  currentUser,
}: AcceptInvitationProps) {
  const { workspace, invitedBy, role, memberCount, boardCount } = invitation;

  return (
    <>
      <WorkspaceAvatar workspace={workspace} size="lg" />

      <div className="flex flex-col items-center gap-1.5 text-sm text-text-secondary">
        <p>{invitedBy.name} đã mời bạn tham gia</p>
        <h1 className="text-2xl leading-8 font-semibold text-text-primary">
          {workspace.name}
        </h1>
        <p>
          với vai trò{" "}
          <span className="font-semibold text-text-primary">
            {WORKSPACE_ROLE_LABEL[role]}
          </span>
        </p>
        <p className="mt-1 text-xs text-text-subtle tabular-nums">
          {memberCount} thành viên · {boardCount} bảng
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 pt-1">
        <Button asChild size="lg" className="w-full">
          <AppLink href="/">Tham gia Workspace</AppLink>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full">
          <AppLink href="/">Để sau</AppLink>
        </Button>
      </div>

      <footer className="w-full border-t border-border pt-4 text-xs text-text-subtle">
        Bạn đang đăng nhập với{" "}
        <span className="font-medium text-text-secondary">
          {currentUser.email}
        </span>
      </footer>
    </>
  );
}
