import { Toaster } from "sonner";
import { UsersPage } from "./pages/users/UsersPage";

function App() {
  return (
    <>
      <UsersPage />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
