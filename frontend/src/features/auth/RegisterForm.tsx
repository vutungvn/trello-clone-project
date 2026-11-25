import { FormField } from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigateTo } from "@/lib/navigation";
import { PasswordInput } from "./PasswordInput";

export interface RegisterDefaultValues {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface RegisterFormProps {
  defaultValues?: RegisterDefaultValues;
  confirmPasswordError?: string;
}

export function RegisterForm({
  defaultValues,
  confirmPasswordError,
}: RegisterFormProps) {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        navigateTo("/");
      }}
      className="flex flex-col gap-4"
    >
      <FormField id="register-name" label="Họ và tên">
        <Input
          id="register-name"
          name="name"
          autoComplete="name"
          placeholder="Nguyễn Văn An"
          defaultValue={defaultValues?.name}
        />
      </FormField>

      <FormField id="register-email" label="Email">
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ban@congty.com"
          defaultValue={defaultValues?.email}
        />
      </FormField>

      <FormField
        id="register-password"
        label="Mật khẩu"
        helper="Tối thiểu 8 ký tự"
      >
        <PasswordInput
          id="register-password"
          name="password"
          autoComplete="new-password"
          defaultValue={defaultValues?.password}
          aria-describedby="register-password-message"
        />
      </FormField>

      <FormField
        id="register-confirm-password"
        label="Nhập lại mật khẩu"
        error={confirmPasswordError}
      >
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          defaultValue={defaultValues?.confirmPassword}
          aria-invalid={Boolean(confirmPasswordError)}
          aria-describedby={
            confirmPasswordError
              ? "register-confirm-password-message"
              : undefined
          }
        />
      </FormField>

      <Button type="submit" size="lg" className="mt-1 w-full">
        Đăng ký
      </Button>
    </form>
  );
}
