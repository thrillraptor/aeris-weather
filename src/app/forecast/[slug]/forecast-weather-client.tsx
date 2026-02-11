"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Navigation,
  Calendar,
  Clock,
  MapPin,
  Sunrise,
  Sunset,
  CloudDrizzle,
  Snowflake,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Link from "next/link";
import { getForecastWeather } from "@/services/api";

export default function ForecastWeatherClient({ query }: { query: string }) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["forecast", query],
    queryFn: () => getForecastWeather({ query, days: 3 }),
    enabled: !!query,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getWeatherIcon = (code: number, isDay: boolean = true) => {
    const iconClass = "h-10 w-10";

    if (code === 1000) {
      return isDay ? (
        <Sun className={`${iconClass} text-amber-400 drop-shadow-lg`} />
      ) : (
        <Moon className={`${iconClass} text-slate-300 drop-shadow-lg`} />
      );
    }
    if (code === 1003)
      return <Cloud className={`${iconClass} text-slate-400`} />;
    if (code >= 1180 && code <= 1201)
      return <CloudRain className={`${iconClass} text-blue-500`} />;
    if (code >= 1063 && code <= 1072)
      return <CloudDrizzle className={`${iconClass} text-blue-400`} />;
    if (code >= 1210 && code <= 1225)
      return <Snowflake className={`${iconClass} text-blue-200`} />;

    return isDay ? (
      <Sun className={`${iconClass} text-amber-400`} />
    ) : (
      <Moon className={`${iconClass} text-slate-300`} />
    );
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2)
      return { text: "Low", color: "text-green-600", bg: "bg-green-50" };
    if (uv <= 5)
      return { text: "Moderate", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (uv <= 7)
      return { text: "High", color: "text-orange-600", bg: "bg-orange-50" };
    if (uv <= 10)
      return { text: "Very High", color: "text-red-600", bg: "bg-red-50" };
    return { text: "Extreme", color: "text-purple-600", bg: "bg-purple-50" };
  };

  const getAirQualityText = (visibility: number) => {
    if (visibility >= 10) return { text: "Excellent", color: "text-green-600" };
    if (visibility >= 5) return { text: "Good", color: "text-blue-600" };
    if (visibility >= 2) return { text: "Moderate", color: "text-yellow-600" };
    return { text: "Poor", color: "text-red-600" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-96 rounded-3xl lg:col-span-2" />
            <Skeleton className="h-96 rounded-3xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4 border-red-200">
            <AlertDescription className="text-center">
              Unable to load weather data. Please check your connection and try
              again.
            </AlertDescription>
          </Alert>
          <Button asChild className="w-full" size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Alert className="mb-4">
            <AlertDescription>
              No weather data available for this location.
            </AlertDescription>
          </Alert>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const { location, current, forecast } = data;
  const todayForecast = forecast.forecastday[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-rose-500" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                {location.name}
              </h1>
            </div>
            <p className="text-slate-600 ml-8">
              {location.region && `${location.region}, `}
              {location.country}
            </p>
            <p className="text-sm text-slate-500 ml-8 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {formatDate(location.localtime)} |{" "}
              {new Date(location.localtime).toLocaleTimeString("en-PK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="shadow-sm">
            <Link href="/">
              <Navigation className="h-4 w-4 mr-2" />
              Change Location
            </Link>
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Weather - Large Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />

            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">
                    Current Weather
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Last updated{" "}
                    {new Date(current.last_updated).toLocaleTimeString(
                      "en-PK",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </CardDescription>
                </div>
                {getWeatherIcon(current.condition.code, current.is_day === 1)}
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-7xl md:text-8xl font-bold mb-2">
                    {Math.round(current.temp_c)}°
                  </div>
                  <p className="text-xl text-blue-100">
                    Feels like {Math.round(current.feelslike_c)}°C
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold mb-1">
                    {current.condition.text}
                  </p>
                  <div className="flex items-center gap-2 text-blue-100">
                    <TrendingUp className="h-5 w-5" />
                    <span>H {Math.round(todayForecast.day.maxtemp_c)}°</span>
                    <TrendingDown className="h-5 w-5" />
                    <span>L {Math.round(todayForecast.day.mintemp_c)}°</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="h-5 w-5" />
                    <span className="text-sm font-medium">Wind</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {Math.round(current.wind_kph)}
                  </p>
                  <p className="text-sm text-blue-100">
                    km/h {current.wind_dir}
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="h-5 w-5" />
                    <span className="text-sm font-medium">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold">{current.humidity}</p>
                  <p className="text-sm text-blue-100">percent</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">Visibility</span>
                  </div>
                  <p className="text-2xl font-bold">{current.vis_km}</p>
                  <p className="text-sm text-blue-100">kilometers</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="h-5 w-5" />
                    <span className="text-sm font-medium">Pressure</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {Math.round(current.pressure_mb)}
                  </p>
                  <p className="text-sm text-blue-100">hPa</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sun & Moon Card */}
          <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Sun & Moon</CardTitle>
              <CardDescription className="text-orange-100">
                Today&apos;s astronomical data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Sunrise className="h-12 w-12 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Sunrise</p>
                <p className="text-3xl font-bold">
                  {todayForecast.astro.sunrise}
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Sunset className="h-12 w-12 mx-auto mb-3" />
                <p className="text-sm font-medium mb-1">Sunset</p>
                <p className="text-3xl font-bold">
                  {todayForecast.astro.sunset}
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Moon className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium mb-1">Moon Phase</p>
                <p className="text-lg font-semibold">
                  {todayForecast.astro.moon_phase}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3-Day Forecast */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-indigo-600" />
            3-Day Forecast
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forecast.forecastday.map((day: any, index: number) => {
              const uvInfo = getUVLevel(day.day.uv);

              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold">
                      {index === 0 ? "Today" : formatShortDate(day.date)}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {day.day.condition.text}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center py-4">
                      {getWeatherIcon(day.day.condition.code, true)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium text-slate-600">
                            High
                          </span>
                        </div>
                        <span className="text-xl font-bold text-slate-800">
                          {Math.round(day.day.maxtemp_c)}°C
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium text-slate-600">
                            Low
                          </span>
                        </div>
                        <span className="text-xl font-bold text-slate-800">
                          {Math.round(day.day.mintemp_c)}°C
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <CloudRain className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-slate-600">
                            Rain
                          </span>
                        </div>
                        <span className="text-xl font-bold text-blue-600">
                          {day.day.daily_chance_of_rain}%
                        </span>
                      </div>

                      <div
                        className={`flex justify-between items-center p-3 ${uvInfo.bg} rounded-xl`}
                      >
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-amber-500" />
                          <span className="text-sm font-medium text-slate-600">
                            UV Index
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-slate-800">
                            {day.day.uv}
                          </span>
                          <span
                            className={`block text-xs font-semibold ${uvInfo.color}`}
                          >
                            {uvInfo.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {day.day.daily_will_it_rain === 1 && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-sm text-blue-800 font-medium text-center">
                          ☂️ Umbrella recommended
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-red-600" />
            Additional Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Thermometer className="h-8 w-8 text-red-500" />
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    Feels Like
                  </span>
                </div>
                <p className="text-4xl font-bold text-slate-800 mb-2">
                  {Math.round(current.feelslike_c)}°C
                </p>
                <p className="text-sm text-slate-600">
                  {Math.abs(current.feelslike_c - current.temp_c) < 1
                    ? "Same as actual"
                    : current.feelslike_c > current.temp_c
                      ? `${Math.round(current.feelslike_c - current.temp_c)}° warmer`
                      : `${Math.round(current.temp_c - current.feelslike_c)}° cooler`}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <CloudRain className="h-8 w-8 text-blue-500" />
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    Precipitation
                  </span>
                </div>
                <p className="text-4xl font-bold text-slate-800 mb-2">
                  {current.precip_mm} mm
                </p>
                <p className="text-sm text-slate-600">
                  {current.precip_mm === 0
                    ? "No rain"
                    : current.precip_mm < 2.5
                      ? "Light rain"
                      : current.precip_mm < 7.6
                        ? "Moderate rain"
                        : "Heavy rain"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Wind className="h-8 w-8 text-indigo-500" />
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    Wind Gusts
                  </span>
                </div>
                <p className="text-4xl font-bold text-slate-800 mb-2">
                  {Math.round(current.gust_kph)}
                </p>
                <p className="text-sm text-slate-600">km/h</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Eye className="h-8 w-8 text-purple-500" />
                  <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                    Air Quality
                  </span>
                </div>
                <p className="text-4xl font-bold text-slate-800 mb-2">
                  {current.vis_km} km
                </p>
                <p
                  className={`text-sm font-semibold ${getAirQualityText(current.vis_km).color}`}
                >
                  {getAirQualityText(current.vis_km).text}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
