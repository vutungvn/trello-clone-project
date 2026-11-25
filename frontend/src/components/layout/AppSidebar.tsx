import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Kanban,
  type LucideIcon,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { WorkspaceAvatar } from "@/components/common/WorkspaceAvatar";
import { Button } from "@/components/ui/button";
import { CreateWorkspaceDialog } from "@/features/workspace/CreateWorkspaceDialog";
import { getCurrentPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { Workspace } from "@/types/workspace";

interface AppSidebarProps {
  workspaces: Workspace[];
}

export function AppSidebar({ workspaces }: AppSidebarProps) {
  return (
    <aside
      aria-label="Điều hướng chính"
      className="flex w-64 shrink-0 flex-col gap-4 pt-10 pr-2 pl-4"
    >
      <nav className="flex flex-col gap-1">
        <SidebarLink href="/" label="Bảng" icon={Kanban} className="h-9" />
      </nav>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <div className="flex items-center justify-between px-3">
          <span className="text-xs font-semibold text-text-secondary">
            Các Workspace
          </span>
          <CreateWorkspaceDialog
            trigger={
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Tạo Workspace mới"
              >
                <Plus aria-hidden="true" className="size-4" />
              </Button>
            }
          />
        </div>

        {workspaces.map((workspace, index) => (
          <SidebarWorkspace
            key={workspace.id}
            workspace={workspace}
            isFirst={index === 0}
          />
        ))}
      </div>
    </aside>
  );
}

interface SidebarWorkspaceProps {
  workspace: Workspace;
  isFirst: boolean;
}

/** Mở sẵn workspace đang xem; ở trang khác thì mở workspace đầu tiên */
function SidebarWorkspace({ workspace, isFirst }: SidebarWorkspaceProps) {
  const path = getCurrentPath();
  const basePath = `/w/${workspace.id}`;
  const isCurrent = path === basePath || path.startsWith(`${basePath}/`);
  const [isExpanded, setIsExpanded] = useState(
    isCurrent || (isFirst && !path.startsWith("/w/")),
  );
  const Chevron = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex h-9 w-full items-center justify-between gap-2 rounded-lg px-3 text-text-primary transition-colors duration-100 outline-none hover:bg-neutral-subtle focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <WorkspaceAvatar workspace={workspace} size="sm" />
          <span className="truncate text-sm font-semibold">
            {workspace.name}
          </span>
        </span>
        <Chevron
          aria-hidden="true"
          className="size-4 shrink-0 text-text-secondary"
        />
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-0.5 pl-4">
          <SidebarLink
            href={basePath}
            label="Bảng"
            icon={Kanban}
            className="h-8"
          />
          <SidebarLink
            href={`${basePath}/members`}
            label="Thành viên"
            icon={Users}
            className="h-8"
          />
          <SidebarLink
            href={`${basePath}/settings`}
            label="Cài đặt"
            icon={Settings}
            className="h-8"
          />
        </div>
      )}
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  className: string;
}

function SidebarLink({ href, label, icon: Icon, className }: SidebarLinkProps) {
  const isActive = getCurrentPath() === href;

  return (
    <AppLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 text-sm transition-colors duration-100 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
        isActive
          ? "bg-primary-soft font-semibold text-on-primary-soft"
          : "text-text-secondary hover:bg-neutral-subtle hover:text-text-primary",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      {label}
    </AppLink>
  );
}
