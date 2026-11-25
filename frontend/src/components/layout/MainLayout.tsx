import type { ReactNode } from "react";
import { workspaces as mockWorkspaces } from "@/mocks";
import type { Workspace } from "@/types/workspace";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  workspaces?: Workspace[];
  children: ReactNode;
}

/** Header, sidebar trái và nội dung */
export function MainLayout({
  workspaces = mockWorkspaces,
  children,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader workspaces={workspaces} />
      <div className="mx-auto flex w-full max-w-339 flex-1 items-start">
        <AppSidebar workspaces={workspaces} />
        <main className="max-w-275 min-w-0 flex-1 p-10">{children}</main>
      </div>
    </div>
  );
}
