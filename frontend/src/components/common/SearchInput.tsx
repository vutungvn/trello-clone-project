import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
  /** Tên của ô nhập cho trình đọc màn hình */
  label: string;
};

export function SearchInput({ label, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-2.5 size-4 text-text-subtle"
      />
      <Input
        type="search"
        aria-label={label}
        className="h-8 border pl-8"
        {...props}
      />
    </div>
  );
}
