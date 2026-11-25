import { CircleCheck, CircleX, Clock, UserX } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { InvitationLayout } from "@/components/layout/InvitationLayout";
import { Button } from "@/components/ui/button";
import { AcceptInvitation } from "@/features/invitation/AcceptInvitation";
import { InvitationMessage } from "@/features/invitation/InvitationMessage";
import type { PathParams } from "@/lib/match-path";
import { currentUser, MOCK_NOW, receivedInvitations } from "@/mocks";
import type { InvitationDetail } from "@/types/workspace";
import { NotFoundPage } from "./NotFoundPage";

const homeButton = (
  <Button asChild size="lg" className="w-full">
    <AppLink href="/">Về trang chủ</AppLink>
  </Button>
);

interface InvitationPageProps {
  params: PathParams;
}

export function InvitationPage({ params }: InvitationPageProps) {
  const invitation = receivedInvitations.find(
    (item) => item.token === params.token,
  );
  if (!invitation) return <NotFoundPage />;

  return (
    <InvitationLayout>
      <title>Lời mời tham gia Workspace — TaskFlow</title>
      <InvitationContent invitation={invitation} />
    </InvitationLayout>
  );
}

function InvitationContent({ invitation }: { invitation: InvitationDetail }) {
  const { status, email, expiresAt } = invitation;

  if (status === "REVOKED") {
    return (
      <InvitationMessage
        icon={CircleX}
        iconClassName="bg-[#FFF0EF] text-danger"
        title="Lời mời đã bị hủy"
        description="Quản trị viên workspace đã thu hồi lời mời này."
      >
        {homeButton}
      </InvitationMessage>
    );
  }

  if (status === "ACCEPTED") {
    return (
      <InvitationMessage
        icon={CircleCheck}
        iconClassName="bg-primary-soft text-primary"
        title="Lời mời đã được sử dụng"
        description="Lời mời này đã được chấp nhận trước đó."
      >
        {homeButton}
      </InvitationMessage>
    );
  }

  if (status === "EXPIRED" || new Date(expiresAt) < MOCK_NOW) {
    return (
      <InvitationMessage
        icon={Clock}
        iconClassName="bg-[#FFF7D6] text-[#B65C02]"
        title="Lời mời đã hết hạn"
        description="Lời mời này đã quá 7 ngày. Hãy nhờ quản trị viên gửi lại lời mời mới."
      >
        {homeButton}
      </InvitationMessage>
    );
  }

  if (email !== currentUser.email) {
    return (
      <InvitationMessage
        icon={UserX}
        iconClassName="bg-neutral-subtle text-text-secondary"
        title="Lời mời không dành cho tài khoản này"
        description={
          <>
            Lời mời được gửi tới{" "}
            <span className="font-medium text-text-primary">{email}</span> nhưng
            bạn đang đăng nhập bằng{" "}
            <span className="font-medium text-text-primary">
              {currentUser.email}
            </span>
            .
          </>
        }
      >
        <Button asChild size="lg" className="w-full">
          <AppLink href="/login">Đăng xuất và đổi tài khoản</AppLink>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full">
          <AppLink href="/">Về trang chủ</AppLink>
        </Button>
      </InvitationMessage>
    );
  }

  return (
    <AcceptInvitation invitation={invitation} currentUser={currentUser} />
  );
}
