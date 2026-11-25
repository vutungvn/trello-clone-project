import { AppLink } from "@/components/common/AppLink";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/features/auth/LoginForm";
import { getPreviewState } from "@/lib/preview-state";

export function LoginPage() {
  const hasError = getPreviewState() === "error";

  return (
    <AuthLayout
      title="Đăng nhập"
      description="Chào mừng bạn quay lại!"
      footer={
        <>
          Chưa có tài khoản?{" "}
          <AppLink
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Đăng ký
          </AppLink>
        </>
      }
    >
      <title>Đăng nhập — TaskFlow</title>
      <LoginForm
        defaultEmail={hasError ? "an.nguyen@congty.com" : undefined}
        defaultPassword={hasError ? "matkhausai" : undefined}
        error={hasError ? "Email hoặc mật khẩu không đúng" : undefined}
      />
    </AuthLayout>
  );
}
