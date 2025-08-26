"use client";

import { useLocation } from "@/hooks/useLocation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Navigation,
  Cloud,
  Sun,
  CloudRain,
  Zap,
  Users,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WeatherHome() {
  const [locationState, setLocationState] = useState<{ isLoading: boolean }>({
    isLoading: false,
  });

  const router = useRouter();
  const { getCurrentLocation } = useLocation();

  const handleGetLocation = async () => {
    setLocationState((prev) => ({ ...prev, isLoading: true }));
    getCurrentLocation(
      (location) => {
        setLocationState((prev) => ({
          ...prev,
          isLoading: false,
        }));
        location = encodeURIComponent(location);
        router.push(`/forecast/${location}`);
      },
      (error) => {
        setLocationState((prev) => ({
          ...prev,
          isLoading: false,
        }));
        toast("Geolocation Error", {
          description:
            error
              .charAt(0)
              .toUpperCase()
              .concat(error.slice(1).toLowerCase()) || "Failed to get location",
        });
      }
    );
  };

  const stats = [
    { value: "7K+", label: "Cities", icon: <Globe /> },
    {
      value: "1K+",
      label: "Active Users",
      icon: <Users />,
    },
    { value: "99.9%", label: "Accuracy", icon: <Zap /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#00FFA3] via-[#00C2FF] to-[#7B61FF] p-4 md:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 md:mb-16">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Aeris Weather</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-block w-fit bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-white mb-4">
              <span className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Real-time weather updates
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Discover Accurate Weather Forecasts
            </h2>

            <p className="text-lg text-white/90">
              Aeris is a modern weather application that delivers accurate,
              real-time forecasts with an intuitive interface. Plan your day
              with confidence.
            </p>

            <Button
              onClick={handleGetLocation}
              className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg flex items-center hover:cursor-pointer w-[200px]"
              aria-label="Access current location"
              disabled={locationState.isLoading}
            >
              {locationState.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Navigation />
              )}
              {locationState.isLoading ? "Detecting" : "Use My Location"}
            </Button>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Current Weather
                  </h3>
                </div>
                <div className="bg-white/20 rounded-full p-2">
                  <Sun className="h-6 w-6 text-yellow-300" />
                </div>
              </div>

              <div className="text-center py-6">
                <div className="text-6xl font-bold text-white">24 °C</div>
                <p className="text-white/80 mt-2">Sunny</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <CloudRain className="h-5 w-5 text-white mx-auto mb-1" />
                  <p className="text-white text-sm">24 %</p>
                  <p className="text-white/70 text-xs">Humidity</p>
                </div>
                <div className="text-center">
                  <Navigation className="h-5 w-5 text-white mx-auto mb-1" />
                  <p className="text-white text-sm">12 km/h</p>
                  <p className="text-white/70 text-xs">Wind</p>
                </div>
                <div className="text-center">
                  <Cloud className="h-5 w-5 text-white mx-auto mb-1" />
                  <p className="text-white text-sm">0.0 mm</p>
                  <p className="text-white/70 text-xs">Precip</p>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/25 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
              <p className="text-white/80 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
