import { type ComponentProps, type ReactNode, useId } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PopoverPanelProps
  extends Pick<
    ComponentProps<typeof PopoverContent>,
    "align" | "side" | "className"
  > {
  title: string;
  /** Có thì hiện nút quay lại */
  onBack?: () => void;
  children: ReactNode;
}

/** Khung popover: tiêu đề ở giữa, nút đóng bên phải */
export function PopoverPanel({
  title,
  onBack,
  align = "start",
  side,
  className,
  children,
}: PopoverPanelProps) {
  const titleId = useId();

  return (
    <PopoverContent
      align={align}
      side={side}
      sideOffset={8}
      collisionPadding={8}
      aria-labelledby={titleId}
      className={cn(
        "max-h-(--radix-popover-content-available-height) w-75 gap-3 overflow-y-auto rounded-lg border border-border p-3 shadow-[0_8px_12px_#091E4226] ring-0",
        className,
      )}
    >
      <header className="relative flex h-7 shrink-0 items-center justify-center">
        {onBack && (
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Quay lại"
            onClick={onBack}
            className="absolute left-0"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
        )}
        <h3 id={titleId} className="text-sm font-semibold text-text-secondary">
          {title}
        </h3>
        <PopoverPrimitive.Close asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Đóng"
            className="absolute right-0"
          >
            <X aria-hidden="true" />
          </Button>
        </PopoverPrimitive.Close>
      </header>
      {children}
    </PopoverContent>
  );
}
