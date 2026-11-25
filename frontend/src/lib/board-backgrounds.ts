import type { BoardBackground } from "@/types/board";

export const BOARD_BACKGROUND_CLASS: Record<BoardBackground, string> = {
  blue: "bg-[linear-gradient(135deg,#005C99_0%,#2E3F8F_100%)]",
  purple: "bg-[linear-gradient(135deg,#5E4DB2_0%,#3D2E8C_100%)]",
  teal: "bg-[linear-gradient(135deg,#0F6D78_0%,#0A4D56_100%)]",
  orange: "bg-[linear-gradient(135deg,#B65C02_0%,#8C4300_100%)]",
  pink: "bg-[linear-gradient(135deg,#AE2E74_0%,#801D54_100%)]",
  slate: "bg-[linear-gradient(135deg,#344563_0%,#172B4D_100%)]",
};
