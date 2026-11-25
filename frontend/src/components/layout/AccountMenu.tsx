import { LogOut, User as UserIcon } from "lucide-react";
import { AppLink } from "@/components/common/AppLink";
import { UserAvatar } from "@/components/common/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

const ITEM_CLASS = "gap-2.5 rounded-none px-4 py-2";
const SEPARATOR_CLASS = "mx-0 my-1.5";

interface AccountMenuProps {
  user: User;
  /** Nút nằm trên nền tối của board */
  isOnBoard: boolean;
}

export function AccountMenu({ user, isOnBoard }: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Mở menu tài khoản"
        className={cn(
          "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-focus-ring aria-expanded:ring-2 aria-expanded:ring-focus-ring",
          isOnBoard && "ring-2 ring-white/40",
        )}
      >
        <UserAvatar user={user} size="md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-70 px-0 py-2"
      >
        <p className="px-4 py-1.5 text-xs font-semibold text-text-secondary">
          Tài khoản
        </p>
        <div className="flex items-center gap-3 px-4 py-2">
          <UserAvatar user={user} size="xl" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-text-primary">
              {user.name}
            </span>
            <span className="truncate text-xs text-text-secondary">
              {user.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator className={SEPARATOR_CLASS} />
        <DropdownMenuItem asChild className={ITEM_CLASS}>
          <AppLink href="/profile">
            <UserIcon aria-hidden="true" className="text-text-secondary" />
            Hồ sơ cá nhân
          </AppLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator className={SEPARATOR_CLASS} />
        <DropdownMenuItem asChild className={ITEM_CLASS}>
          <AppLink href="/login">
            <LogOut aria-hidden="true" className="text-text-secondary" />
            Đăng xuất
          </AppLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
