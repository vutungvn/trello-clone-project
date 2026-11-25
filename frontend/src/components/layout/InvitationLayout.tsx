import type { ReactNode } from "react";
import { AppLink } from "@/components/common/AppLink";
import { AppLogo } from "@/components/common/AppLogo";
import { currentUser } from "@/mocks";
import { AccountMenu } from "./AccountMenu";
import { AuthIllustrations } from "./AuthIllustrations";

interface InvitationLayoutProps {
  children: ReactNode;
}

/** Header tối giản và một thẻ ở giữa trang */
export function InvitationLayout({ children }: InvitationLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-[#FAFBFC]">
      <header className="relative z-20 flex h-12 shrink-0 items-center justify-between border-b border-border bg-surface px-4">
        <AppLink
          href="/"
          className="flex h-8 items-center rounded-sm px-2 transition-colors duration-100 hover:bg-neutral-subtle"
        >
          <AppLogo />
        </AppLink>
        <AccountMenu user={currentUser} isOnBoard={false} />
      </header>

      <div className="relative flex flex-1 items-center justify-center p-6">
        <AuthIllustrations />
        <main className="relative z-10 flex w-120 max-w-full flex-col items-center gap-5 rounded-sm bg-surface p-8 text-center shadow-[0_0_10px_rgba(0,0,0,0.1)]">
          {children}
        </main>
      </div>
    </div>
  );
}
