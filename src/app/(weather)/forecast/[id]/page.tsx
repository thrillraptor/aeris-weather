"use client";

import { getForecastWeather } from "@/services/weather-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";

export default function ForecastPage() {
  const { id } = useParams<{ id: string }>();
  const query = decodeURIComponent(id);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["forecast", query],
    queryFn: () => getForecastWeather(query),
    enabled: !!query,
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-PK", {
      weekday: "long",
      month: "long",
      day: "2-digit",
    });
  };

  // Get weather icon based on condition code
  const getWeatherIcon = (code: number, isDay: boolean = true) => {
    if (code === 1000)
      return isDay ? (
        <Sun className="h-8 w-8 text-yellow-500" />
      ) : (
        <Moon className="h-8 w-8 text-blue-300" />
      );
    if (code === 1003) return <Cloud className="h-8 w-8 text-gray-400" />;
    if (code >= 1063 && code <= 1201)
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    if (code >= 1210 && code <= 1225)
      return <CloudSnow className="h-8 w-8 text-blue-200" />;
    return isDay ? (
      <Sun className="h-8 w-8 text-yellow-500" />
    ) : (
      <Moon className="h-8 w-8 text-blue-300" />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#9FA8DA] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Skeleton className="h-80 rounded-2xl" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-60 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#9FA8DA] p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>Failed to load weather data.</AlertDescription>
          </Alert>
          <Button asChild className="w-full">
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#9FA8DA] p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <Alert className="mb-4">
            <AlertDescription>
              No weather data available for this location.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { location, current, forecast } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#9FA8DA] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex">
              <MapPin className="h-8 w-8 mr-2 mt-1 text-red-500" />
              <div>
                {location.name}, {location.country}
                <p className="text-gray-600 text-base font-normal">
                  {formatDate(location.localtime)} •{" "}
                  {new Date(location.localtime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </h1>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/">
              <Navigation className="h-4 w-4 mr-2" />
              Change Location
            </Link>
          </Button>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Weather</span>
                {getWeatherIcon(current.condition.code, current.is_day === 1)}
              </CardTitle>
              <CardDescription>
                As of{" "}
                {new Date(current.last_updated).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="flex items-end h-full justify-between">
                <div className="text-5xl font-bold text-gray-800">
                  {current.temp_c}°C
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-700">
                    {current.condition.text}
                  </p>
                  <p className="text-gray-600">
                    Feels like {current.feelslike_c}°C
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent>
                <div className="flex items-center mb-2">
                  <Wind className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-sm font-medium">Wind</span>
                </div>
                <p className="text-2xl font-bold">{current.wind_kph} km/h</p>
                <p className="text-sm text-gray-600">{current.wind_dir}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent>
                <div className="flex items-center mb-2">
                  <Droplets className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="text-sm font-medium">Humidity</span>
                </div>
                <p className="text-2xl font-bold">{current.humidity}%</p>
                <p className="text-sm text-gray-600">
                  {current.precip_mm > 0
                    ? `${current.precip_mm}mm precip`
                    : "No precipitation"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent>
                <div className="flex items-center mb-2">
                  <Eye className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">Visibility</span>
                </div>
                <p className="text-2xl font-bold">{current.vis_km} km</p>
                <p className="text-sm text-gray-600">
                  {current.vis_km > 10
                    ? "Excellent"
                    : current.vis_km > 5
                    ? "Good"
                    : "Poor"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent>
                <div className="flex items-center mb-2">
                  <Gauge className="h-5 w-5 mr-2 text-purple-500" />
                  <span className="text-sm font-medium">Pressure</span>
                </div>
                <p className="text-2xl font-bold">{current.pressure_mb} hPa</p>
                <p className="text-sm text-gray-600">
                  {current.pressure_mb > 1013
                    ? "High"
                    : current.pressure_mb > 1000
                    ? "Normal"
                    : "Low"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          3-Day Forecast
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {forecast.forecastday.slice(0, 3).map((day: any, index: number) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {index === 0 ? "Today" : formatDate(day.date)}
                </CardTitle>
                <CardDescription>{day.day.condition.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-4">
                  {getWeatherIcon(day.day.condition.code, true)}
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">High</span>
                  <span className="text-xl font-bold">
                    {day.day.maxtemp_c}°C
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Low</span>
                  <span className="text-xl font-bold">
                    {day.day.mintemp_c}°C
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Rain</span>
                  <span className="text-xl font-bold">
                    {day.day.daily_chance_of_rain}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">UV</span>
                  <span className="text-xl font-bold">{day.day.uv}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Highlights */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="h-6 w-6 mr-2" />
          Today{"'"}s Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                Sunrise & Sunset
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Sunrise</p>
                  <p className="text-xl font-bold">
                    {forecast.forecastday[0].astro.sunrise}
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Sunset</p>
                  <p className="text-xl font-bold">
                    {forecast.forecastday[0].astro.sunset}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Thermometer className="h-5 w-5 mr-2 text-red-500" />
                Feels Like
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">
                  {current.feelslike_c}°C
                </p>
                <p className="text-gray-600">
                  {current.feelslike_c > current.temp_c
                    ? "Warmer than actual temperature"
                    : current.feelslike_c < current.temp_c
                    ? "Cooler than actual temperature"
                    : "Similar to actual temperature"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-blue-400" />
                Precipitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">{current.precip_mm}mm</p>
                <p className="text-gray-600">
                  {current.precip_mm === 0
                    ? "No precipitation"
                    : current.precip_mm < 2.5
                    ? "Light precipitation"
                    : current.precip_mm < 7.6
                    ? "Moderate precipitation"
                    : "Heavy precipitation"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wind className="h-5 w-5 mr-2 text-blue-500" />
                Wind Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold mb-2">
                  {current.wind_kph} km/h
                </p>
                <p className="text-gray-600">Direction: {current.wind_dir}</p>
                <p className="text-gray-600">Gusts: {current.gust_kph} km/h</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
