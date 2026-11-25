import { useRef, useState } from "react";
import { Ellipsis } from "lucide-react";
import { PopoverPanel } from "@/components/common/PopoverPanel";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

const ITEM_CLASS =
  "w-full rounded-sm px-2.5 py-1.5 text-left text-sm text-text-primary transition-colors duration-100 outline-none hover:bg-neutral-subtle focus-visible:bg-neutral-subtle";

interface ListMenuProps {
  listTitle: string;
  onAddCard: () => void;
  onRename: () => void;
}

export function ListMenu({ listTitle, onAddCard, onRename }: ListMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Ô nhập vừa mở phải giữ con trỏ, không trả về nút menu khi popover đóng
  const shouldKeepFocus = useRef(false);

  function openInput(open: () => void) {
    shouldKeepFocus.current = true;
    open();
    setIsOpen(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Tùy chọn danh sách ${listTitle}`}
          className="hover:bg-neutral-hover aria-expanded:bg-neutral-hover"
        >
          <Ellipsis aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverPanel
        title="Thao tác danh sách"
        className="w-60 gap-2"
        onCloseAutoFocus={(event) => {
          if (shouldKeepFocus.current) event.preventDefault();
          shouldKeepFocus.current = false;
        }}
      >
        <div className="-mx-1.5 flex flex-col">
          <button
            type="button"
            onClick={() => openInput(onAddCard)}
            className={ITEM_CLASS}
          >
            Thêm thẻ
          </button>
          <button
            type="button"
            onClick={() => openInput(onRename)}
            className={ITEM_CLASS}
          >
            Đổi tên danh sách
          </button>
          <hr className="my-1 border-border" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={ITEM_CLASS}
          >
            Lưu trữ danh sách này
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
