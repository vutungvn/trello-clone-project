import { type ComponentProps, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <div className="relative flex items-center">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className="pr-9"
      />
      <button
        type="button"
        aria-label={isVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-2 inline-flex size-6 items-center justify-center rounded-sm text-text-secondary outline-none hover:bg-neutral-subtle focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <Icon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
