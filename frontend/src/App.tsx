import { Toaster } from "sonner";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { resolveRoute } from "@/routes";

// Chuyển trang là tải lại nên chỉ cần tìm route một lần
const match = resolveRoute(window.location.pathname);

function App() {
  return (
    <>
      {match ? <match.page params={match.params} /> : <NotFoundPage />}
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
