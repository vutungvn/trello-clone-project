import { Check } from "lucide-react";
import {
  BOARD_BACKGROUND_CLASS,
  BOARD_BACKGROUND_IMAGES,
  BOARD_BACKGROUNDS,
  type BoardBackgroundChoice,
} from "@/lib/board-backgrounds";
import { cn } from "@/lib/utils";

const SWATCH_CLASS =
  "overflow-hidden rounded-sm outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-text-primary aria-pressed:ring-2 aria-pressed:ring-focus-ring aria-pressed:ring-offset-1";

interface BackgroundPickerProps {
  value: BoardBackgroundChoice;
  onChange: (value: BoardBackgroundChoice) => void;
}

/** Chọn ảnh hoặc màu nền cho bảng */
export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-1.5">
        {BOARD_BACKGROUND_IMAGES.map((image) => (
          <button
            key={image.url}
            type="button"
            aria-label={`Ảnh nền ${image.name}`}
            aria-pressed={value.backgroundImageUrl === image.url}
            onClick={() => onChange({ ...value, backgroundImageUrl: image.url })}
            className={cn("h-10 border border-border", SWATCH_CLASS)}
          >
            <img src={image.url} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {BOARD_BACKGROUNDS.map((color) => {
          const isSelected =
            value.backgroundImageUrl === null &&
            value.backgroundColor === color.value;
          return (
            <button
              key={color.value}
              type="button"
              aria-label={`Màu ${color.name}`}
              aria-pressed={isSelected}
              onClick={() =>
                onChange({
                  backgroundColor: color.value,
                  backgroundImageUrl: null,
                })
              }
              className={cn(
                "inline-flex h-8 items-center justify-center text-on-primary",
                SWATCH_CLASS,
                BOARD_BACKGROUND_CLASS[color.value],
              )}
            >
              {isSelected && <Check aria-hidden="true" className="size-4" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
