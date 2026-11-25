import type { CSSProperties } from "react";
import type { Board, BoardBackground } from "@/types/board";

export const BOARD_BACKGROUND_CLASS: Record<BoardBackground, string> = {
  blue: "bg-[linear-gradient(135deg,#005C99_0%,#2E3F8F_100%)]",
  purple: "bg-[linear-gradient(135deg,#5E4DB2_0%,#3D2E8C_100%)]",
  teal: "bg-[linear-gradient(135deg,#0F6D78_0%,#0A4D56_100%)]",
  orange: "bg-[linear-gradient(135deg,#B65C02_0%,#8C4300_100%)]",
  pink: "bg-[linear-gradient(135deg,#AE2E74_0%,#801D54_100%)]",
  slate: "bg-[linear-gradient(135deg,#344563_0%,#172B4D_100%)]",
};

/** Thứ tự hiển thị khi chọn màu nền */
export const BOARD_BACKGROUNDS: { value: BoardBackground; name: string }[] = [
  { value: "blue", name: "xanh dương" },
  { value: "purple", name: "tím" },
  { value: "teal", name: "xanh ngọc" },
  { value: "orange", name: "cam" },
  { value: "pink", name: "hồng" },
  { value: "slate", name: "xám đậm" },
];

/** Ảnh nằm ở public/backgrounds */
export const BOARD_BACKGROUND_IMAGES: { url: string; name: string }[] = [
  { url: "/backgrounds/mountain.svg", name: "núi" },
  { url: "/backgrounds/sea.svg", name: "biển" },
  { url: "/backgrounds/city.svg", name: "thành phố" },
  { url: "/backgrounds/abstract.svg", name: "trừu tượng" },
];

export type BoardBackgroundChoice = Pick<
  Board,
  "backgroundColor" | "backgroundImageUrl"
>;

/** Có ảnh thì dùng ảnh, không thì dùng màu */
export function getBoardBackground({
  backgroundColor,
  backgroundImageUrl,
}: BoardBackgroundChoice): { className: string; style?: CSSProperties } {
  if (backgroundImageUrl === null) {
    return { className: BOARD_BACKGROUND_CLASS[backgroundColor] };
  }
  return {
    className: "bg-cover bg-center",
    style: { backgroundImage: `url("${backgroundImageUrl}")` },
  };
}
