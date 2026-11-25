import type { LabelColor } from "@/types/board";

export const LABEL_COLOR_CLASS: Record<LabelColor, string> = {
  green: "bg-label-green",
  yellow: "bg-label-yellow",
  orange: "bg-label-orange",
  red: "bg-label-red",
  purple: "bg-label-purple",
  blue: "bg-label-blue",
  sky: "bg-label-sky",
  lime: "bg-label-lime",
  pink: "bg-label-pink",
  gray: "bg-label-gray",
};

/** Thứ tự hiển thị trong bảng chọn màu */
export const LABEL_COLORS: { value: LabelColor; name: string }[] = [
  { value: "green", name: "xanh lá" },
  { value: "yellow", name: "vàng" },
  { value: "orange", name: "cam" },
  { value: "red", name: "đỏ" },
  { value: "purple", name: "tím" },
  { value: "blue", name: "xanh dương" },
  { value: "sky", name: "xanh da trời" },
  { value: "lime", name: "xanh chanh" },
  { value: "pink", name: "hồng" },
  { value: "gray", name: "xám" },
];

export function getLabelColorName(color: LabelColor): string {
  return LABEL_COLORS.find((item) => item.value === color)?.name ?? color;
}
