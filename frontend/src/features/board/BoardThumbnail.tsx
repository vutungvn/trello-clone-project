import {
  type BoardBackgroundChoice,
  getBoardBackground,
} from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";

/** Chiều rộng tiêu đề và chiều cao các thẻ của 3 cột */
const COLUMNS = [
  { title: "w-8", cards: ["h-2.5", "h-2.5", "h-2"] },
  { title: "w-9", cards: ["h-3", "h-2"] },
  { title: "w-7", cards: ["h-2.5"] },
];

interface BoardThumbnailProps {
  background: BoardBackgroundChoice;
}

/** Hình thu nhỏ của bảng để xem trước nền đang chọn */
export function BoardThumbnail({ background }: BoardThumbnailProps) {
  const { className, style } = getBoardBackground(background);

  return (
    <div
      aria-hidden="true"
      style={style}
      className={cn(
        "flex h-28 w-48 items-start gap-2 rounded-sm p-2.5 shadow-sm",
        className,
      )}
    >
      {COLUMNS.map((column) => (
        <div
          key={column.title}
          className="flex flex-1 flex-col gap-1 rounded-sm bg-white/85 p-1.5"
        >
          <div
            className={cn("h-1.5 rounded-full bg-text-primary/30", column.title)}
          />
          {column.cards.map((height, index) => (
            <div key={index} className={cn("rounded-sm bg-white", height)} />
          ))}
        </div>
      ))}
    </div>
  );
}
