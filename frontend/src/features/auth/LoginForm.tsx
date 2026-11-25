import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { PasswordInput } from "./PasswordInput";

interface LoginFormProps {
  defaultEmail?: string;
  defaultPassword?: string;
  error?: string;
}

export function LoginForm({
  defaultEmail,
  defaultPassword,
  error,
}: LoginFormProps) {
  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-4"
    >
      <FormField id="login-email" label="Email">
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ban@congty.com"
          defaultValue={defaultEmail}
        />
      </FormField>

      <FormField id="login-password" label="Mật khẩu">
        <PasswordInput
          id="login-password"
          name="password"
          autoComplete="current-password"
          defaultValue={defaultPassword}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "login-error" : undefined}
        />
      </FormField>

      {error && (
        <div
          id="login-error"
          role="alert"
          className="flex items-center gap-2 rounded-sm border border-label-red bg-[#FFF0EF] px-3 py-2 text-sm font-medium text-danger"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        Đăng nhập
      </Button>
    </form>
  );
}
