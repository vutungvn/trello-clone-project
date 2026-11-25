import { useState } from "react";
import { AlignLeft } from "lucide-react";
import { MarkdownText } from "@/components/common/MarkdownText";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CardDescriptionProps {
  description: string | null;
}

export function CardDescription({ description }: CardDescriptionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const close = () => setIsEditing(false);

  return (
    <section aria-labelledby="card-description" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlignLeft
            aria-hidden="true"
            className="size-6 shrink-0 text-text-secondary"
          />
          <h3
            id="card-description"
            className="text-base leading-6 font-semibold text-text-primary"
          >
            Mô tả
          </h3>
        </div>
        {description !== null && !isEditing && (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="pl-9">
        {isEditing ? (
          <form
            data-inline-edit
            onSubmit={(event) => {
              event.preventDefault();
              close();
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") close();
            }}
            className="flex flex-col gap-2"
          >
            <Textarea
              autoFocus
              name="description"
              aria-label="Mô tả"
              placeholder="Thêm mô tả chi tiết hơn, hỗ trợ Markdown…"
              defaultValue={description ?? ""}
              className="min-h-32"
            />
            <div className="flex items-center gap-2">
              <Button type="submit">Lưu</Button>
              <Button variant="ghost" onClick={close}>
                Hủy
              </Button>
            </div>
          </form>
        ) : description !== null ? (
          <MarkdownText>{description}</MarkdownText>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="min-h-14 w-full rounded-sm bg-black/6 px-3 py-2 text-left text-sm text-text-secondary outline-none hover:bg-neutral-hover focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            Thêm mô tả chi tiết hơn…
          </button>
        )}
      </div>
    </section>
  );
}
