/**
 * Tạm thời: xem các trạng thái chưa có logic thật qua URL, ví dụ /login?state=error.
 * Gỡ khi nối API.
 */
export function getPreviewState(): string | null {
  return new URLSearchParams(window.location.search).get("state");
}
