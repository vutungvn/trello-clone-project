import { ChevronDown } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { AppLogo } from "@/components/common/AppLogo";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { currentUser, workspaces } from "@/mocks";

interface AppHeaderProps {
  /** light: nền trắng, board: nền tối trong suốt đặt trên màu của bảng */
  variant?: "light" | "board";
}

export function AppHeader({ variant = "light" }: AppHeaderProps) {
  const isBoard = variant === "board";
  const itemClass = isBoard
    ? "text-on-primary hover:bg-white/20 hover:text-on-primary aria-expanded:bg-white/20 aria-expanded:text-on-primary"
    : "text-text-primary";

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
            <Button variant="ghost" className={cn("gap-1 px-2", itemClass)}>
              Workspace
              <ChevronDown aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {workspaces.map((workspace) => (
              <DropdownMenuItem key={workspace.id} asChild>
                <AppLink href={`/w/${workspace.id}`}>{workspace.name}</AppLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button>Tạo</Button>
      </div>

      <button
        type="button"
        aria-label="Mở menu tài khoản"
        className={cn(
          "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-focus-ring",
          isBoard && "ring-2 ring-white/40",
        )}
      >
        <UserAvatar user={currentUser} size="md" />
      </button>
    </header>
  );
}
