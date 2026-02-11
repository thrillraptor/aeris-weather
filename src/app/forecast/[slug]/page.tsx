import { getForecastWeather } from "@/services/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ForecastWeatherClient from "./forecast-weather-client";

export default async function ForecastWeatherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const query = decodeURIComponent(slug);  

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["forecast", query],
    queryFn: () => getForecastWeather({ query, days: 3 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ForecastWeatherClient query={query} />
    </HydrationBoundary>
  );
}
