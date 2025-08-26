import WeatherHome from "@/components/WeatherHome";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div>
      <Toaster position="top-right" theme="system" />
      <WeatherHome />
    </div>
  );
}
