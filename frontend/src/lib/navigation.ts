/** Khi dùng react-router chỉ cần sửa file này, AppLink và App */
export function navigateTo(path: string): void {
  window.location.assign(path);
}

export function getCurrentPath(): string {
  return window.location.pathname;
}
