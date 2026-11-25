import { ChevronDown } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { AppLogo } from "@/components/common/AppLogo";
import { WorkspaceAvatar } from "@/components/common/WorkspaceAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { currentUser, workspaces as mockWorkspaces } from "@/mocks";
import type { Workspace } from "@/types/workspace";
import { AccountMenu } from "./AccountMenu";
import { CreateMenu } from "./CreateMenu";

interface AppHeaderProps {
  /** light: nền trắng, board: nền tối trong suốt đặt trên màu của bảng */
  variant?: "light" | "board";
  workspaces?: Workspace[];
}

export function AppHeader({
  variant = "light",
  workspaces = mockWorkspaces,
}: AppHeaderProps) {
  const isBoard = variant === "board";

  return (
    <header
      className={cn(
        "z-20 flex h-12 shrink-0 items-center justify-between gap-4 border-b px-4",
        isBoard
          ? "border-white/15 bg-black/35"
          : "sticky top-0 border-border bg-surface",
      )}
    >
      <div className="flex items-center gap-2">
        <AppLink
          href="/"
          className={cn(
            "flex h-8 items-center rounded-sm px-2 transition-colors duration-100",
            isBoard ? "hover:bg-white/20" : "hover:bg-neutral-subtle",
          )}
        >
          <AppLogo inverted={isBoard} />
        </AppLink>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "gap-1 px-2",
                isBoard
                  ? "text-on-primary hover:bg-white/20 hover:text-on-primary aria-expanded:bg-white/20 aria-expanded:text-on-primary"
                  : "text-text-primary",
              )}
            >
              Workspace
              <ChevronDown aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            {workspaces.length === 0 && (
              <DropdownMenuItem disabled>Chưa có workspace</DropdownMenuItem>
            )}
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.id} asChild>
                <AppLink href={`/w/${workspace.id}`}>
                  <WorkspaceAvatar workspace={workspace} size="sm" />
                  <span className="truncate">{workspace.name}</span>
                </AppLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CreateMenu workspaces={workspaces} />
      </div>

      <AccountMenu user={currentUser} isOnBoard={isBoard} />
    </header>
  );
}
