import { NotFoundPage } from "./NotFoundPage";

// Nội dung bảng làm ở đợt 2, hiện mọi bảng đều vào màn "Không tìm thấy bảng"
export function BoardPage() {
  return <NotFoundPage kind="board" />;
}
