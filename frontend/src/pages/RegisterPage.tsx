import { AppLink } from "@/components/common/AppLink";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { RegisterForm } from "@/features/auth/RegisterForm";
import { getPreviewState } from "@/lib/preview-state";

const ERROR_PREVIEW_VALUES = {
  name: "Nguyễn Văn An",
  email: "an.nguyen@congty.com",
  password: "taskflow2026",
  confirmPassword: "taskflow9999",
};

export function RegisterPage() {
  const hasError = getPreviewState() === "error";

  return (
    <AuthLayout
      title="Tạo tài khoản"
      description="Bắt đầu quản lý công việc cùng nhóm của bạn"
      footer={
        <>
          Đã có tài khoản?{" "}
          <AppLink
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Đăng nhập
          </AppLink>
        </>
      }
    >
      <title>Đăng ký — TaskFlow</title>
      <RegisterForm
        defaultValues={hasError ? ERROR_PREVIEW_VALUES : undefined}
        confirmPasswordError={hasError ? "Mật khẩu không khớp" : undefined}
      />
    </AuthLayout>
  );
}
