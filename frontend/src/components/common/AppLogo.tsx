import { Kanban } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "md" | "lg";
  /** Đặt trên nền tối của board */
  inverted?: boolean;
}

export function AppLogo({ size = "md", inverted = false }: AppLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-bold",
        size === "lg" ? "gap-2 text-xl leading-6" : "gap-1 text-lg leading-6",
        inverted ? "text-on-primary" : "text-text-primary",
      )}
    >
      <Kanban
        aria-hidden="true"
        className={cn(
          size === "lg" ? "size-6" : "size-4",
          !inverted && "text-primary",
        )}
      />
      TaskFlow
    </span>
  );
}
