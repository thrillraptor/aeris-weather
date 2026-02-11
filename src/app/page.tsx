"use client";

import { useLocation } from "../hooks/useLocation";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Loader2,
  Navigation,
  Cloud,
  Sun,
  CloudRain,
  Zap,
  Users,
  Globe,
  Wind,
  Droplets,
  Eye,
  MapPin,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
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
      },
    );
  };

  const stats = [
    {
      value: "7K+",
      label: "Cities Covered",
      icon: Globe,
      color: "from-emerald-400 to-teal-500",
    },
    {
      value: "1K+",
      label: "Active Users",
      icon: Users,
      color: "from-blue-400 to-indigo-500",
    },
    {
      value: "99.9%",
      label: "Accuracy Rate",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "7-Day Forecast",
      description: "Plan ahead with accurate extended forecasts",
    },
    {
      icon: MapPin,
      title: "Global Coverage",
      description: "Weather data from any where in the world",
    },
    {
      icon: Sparkles,
      title: "Real-time Updates",
      description: "Live weather conditions updated every minute",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Aeris Weather
              </h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">Live</span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="flex flex-col justify-center space-y-8">
              <div className="inline-block w-fit">
                <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-full px-5 py-2 border border-blue-200/50">
                  <span className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <Sparkles className="h-4 w-4" />
                    Real-time Weather Intelligence
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
                  Your Trusted
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Weather Companion
                  </span>
                </h2>

                <p className="text-xl text-slate-600 leading-relaxed">
                  Experience precise weather forecasts powered by advanced
                  meteorological data. Make informed decisions with confidence,
                  any where in the world.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleGetLocation}
                    size="lg"
                    disabled={locationState.isLoading}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    {locationState.isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Detecting Location...
                      </>
                    ) : (
                      <>
                        <Navigation className="h-5 w-5 mr-2 group-hover:rotate-45 transition-transform duration-300" />
                        Use My Location
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 font-semibold py-6 px-8 rounded-2xl transition-all duration-300"
                  >
                    Explore Features
                  </Button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-blue-300 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather Preview Card */}
            <div className="relative lg:mt-0 mt-8">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full -ml-30 -mb-30" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">
                        Sample Location
                      </p>
                      <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Rawalpindi, PK
                      </h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                      <Sun className="h-10 w-10 text-yellow-300 drop-shadow-lg" />
                    </div>
                  </div>

                  <div className="text-center py-8">
                    <div className="text-7xl font-bold text-white mb-2">
                      24°
                    </div>
                    <p className="text-xl text-blue-100 font-medium">
                      Partly Sunny
                    </p>
                    <p className="text-sm text-blue-200 mt-2">
                      Feels like 26°C
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-8">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <Wind className="h-5 w-5 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">12</p>
                      <p className="text-blue-100 text-xs">km/h</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <Droplets className="h-5 w-5 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">45</p>
                      <p className="text-blue-100 text-xs">%</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <Eye className="h-5 w-5 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">10</p>
                      <p className="text-blue-100 text-xs">km</p>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <CloudRain className="h-5 w-5 text-white mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm">0</p>
                      <p className="text-blue-100 text-xs">mm</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                    <p className="text-center text-sm text-blue-100">
                      <span className="font-semibold">↑ 28°</span> ·{" "}
                      <span className="font-semibold">↓ 18°</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl animate-pulse delay-500" />
            </div>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold text-slate-800">
                Trusted by Weather Enthusiasts
              </h3>
              <p className="text-slate-600">
                Join thousands who rely on Aeris for accurate forecasts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 hover:border-blue-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div
                        className={`bg-gradient-to-br ${stat.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                          {stat.value}
                        </div>
                        <p className="text-slate-600 font-medium">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Experience weather forecasting like never before. Precise,
                reliable, and beautifully designed.
              </p>
              <Button
                onClick={handleGetLocation}
                size="lg"
                disabled={locationState.isLoading}
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-6 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {locationState.isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Getting Your Weather...
                  </>
                ) : (
                  <>
                    <Navigation className="h-5 w-5 mr-2" />
                    Get Your Local Weather
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
                <span className="text-slate-700 font-semibold">
                  Aeris Weather
                </span>
              </div>
              <p className="text-slate-600 text-sm">© 2026 Aeris Weather.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
