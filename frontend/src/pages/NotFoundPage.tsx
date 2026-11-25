import { AppLink } from "@/components/common/AppLink";
import { LockedBoardIllustration } from "@/components/common/LockedBoardIllustration";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";

const CONTENT = {
  page: {
    title: "Không tìm thấy trang",
    description: "Trang này không tồn tại hoặc đã bị xóa.",
  },
  board: {
    title: "Không tìm thấy bảng",
    description:
      "Bảng này không tồn tại hoặc là bảng riêng tư mà bạn chưa được thêm vào. Hãy liên hệ quản trị viên của bảng để được cấp quyền.",
  },
};

interface NotFoundPageProps {
  kind?: keyof typeof CONTENT;
}

export function NotFoundPage({ kind = "page" }: NotFoundPageProps) {
  const { title, description } = CONTENT[kind];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <title>{`${title} — TaskFlow`}</title>
      <AppHeader />

      <main className="flex flex-1 items-center justify-center p-10">
        <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
          <div className="mb-2">
            <LockedBoardIllustration />
          </div>
          <h1 className="text-xl leading-6 font-bold text-text-primary">
            {title}
          </h1>
          <p className="text-sm text-pretty text-text-secondary">
            {description}
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Button asChild className="px-4">
              <AppLink href="/">Về trang chủ</AppLink>
            </Button>
            <Button
              variant="ghost"
              className="px-4"
              onClick={() => window.history.back()}
            >
              Quay lại
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
