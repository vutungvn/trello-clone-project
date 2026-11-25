import type { ReactNode } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { RoleBadge } from "@/components/common/RoleBadge";
import { WorkspaceAvatar } from "@/components/common/WorkspaceAvatar";
import { Button } from "@/components/ui/button";
import { getCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { Workspace, WorkspaceRole } from "@/types/workspace";
import { MainLayout } from "./MainLayout";

interface WorkspaceLayoutProps {
  workspace: Workspace;
  /** Vai trò của người đang đăng nhập */
  role: WorkspaceRole;
  memberCount: number;
  children: ReactNode;
}

export function WorkspaceLayout({
  workspace,
  role,
  memberCount,
  children,
}: WorkspaceLayoutProps) {
  const canManage = role !== "MEMBER";
  const path = getCurrentPath();
  const basePath = `/w/${workspace.id}`;
  const tabs = [
    { label: "Bảng", href: basePath },
    { label: `Thành viên (${memberCount})`, href: `${basePath}/members` },
    { label: "Cài đặt", href: `${basePath}/settings` },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <WorkspaceAvatar workspace={workspace} size="lg" />
            <div className="flex min-w-0 flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl leading-8 font-semibold text-text-primary">
                  {workspace.name}
                </h1>
                {canManage && (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Chỉnh sửa thông tin Workspace"
                  >
                    <AppLink href={`${basePath}/settings`}>
                      <Pencil aria-hidden="true" />
                    </AppLink>
                  </Button>
                )}
                <RoleBadge role={role} />
              </div>
              {workspace.description !== null && (
                <p className="text-sm text-text-secondary">
                  {workspace.description}
                </p>
              )}
            </div>
          </div>

          {canManage && (
            <Button>
              <UserPlus aria-hidden="true" />
              Mời thành viên
            </Button>
          )}
        </header>

        <nav
          aria-label="Mục Workspace"
          className="flex items-center gap-6 border-b border-border"
        >
          {tabs.map((tab) => {
            const isActive = path === tab.href;
            return (
              <AppLink
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "-mb-px border-b-2 pb-2.5 text-sm transition-colors duration-100",
                  isActive
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent font-medium text-text-secondary hover:text-text-primary",
                )}
              >
                {tab.label}
              </AppLink>
            );
          })}
        </nav>

        {children}
      </div>
    </MainLayout>
  );
}
