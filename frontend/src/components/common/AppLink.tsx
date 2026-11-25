import type { ComponentProps } from "react";

type AppLinkProps = ComponentProps<"a"> & { href: string };

/** Mọi link nội bộ đi qua đây, khi dùng react-router chỉ cần sửa file này */
export function AppLink(props: AppLinkProps) {
  return <a {...props} />;
}
