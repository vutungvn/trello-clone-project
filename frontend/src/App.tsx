import { Kanban } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <main className="min-h-screen bg-[linear-gradient(135deg,#005C99_0%,#2E3F8F_100%)] p-6">
        <h1 className="flex items-center gap-2 text-lg font-bold text-on-primary">
          <Kanban className="size-5" /> Website bán hàng
        </h1>
        <section className="mt-4 w-68 rounded-xl bg-surface-column p-2">
          <article className="rounded-lg bg-surface px-3 py-2 text-sm">
            <span className="rounded-sm bg-label-purple px-2 text-xs font-semibold">
              Tính năng
            </span>
            <p className="mt-1">Tích hợp cổng thanh toán VNPay</p>
          </article>
          <Button className="mt-2">Thêm thẻ</Button>
        </section>
      </main>
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
