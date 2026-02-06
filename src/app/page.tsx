import Home from "@/app/(home)/page";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div>
      <Home />
      <Toaster position="top-right" theme="system" />
    </div>
  );
}
