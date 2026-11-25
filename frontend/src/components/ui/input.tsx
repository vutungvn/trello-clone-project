import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-sm border-2 border-border-input bg-surface px-2.5 py-1 text-sm text-text-primary transition-colors duration-100 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-disabled focus-visible:border-focus-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-column disabled:text-text-subtle aria-invalid:border-danger dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
