import axios, { AxiosRequestConfig } from "axios";

interface ForecastParams {
  query: string;
  days?: number;
}

export async function getForecastWeather({ query, days = 3 }: ForecastParams) {

  if (!query?.trim()) throw new Error('Query parameter is required');
  if (days && (days < 1 || days > 10)) throw new Error('Days must be between 1 and 10');

  const host = process.env.NEXT_PUBLIC_RAPID_API_HOST;
  const key = process.env.NEXT_PUBLIC_RAPID_API_KEY;

  if (!host || !key) {
    throw new Error('Missing API configuration. Please check environment variables.');
  }

  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://${host}/forecast.json`,
    params: {
      q: query.trim(),
      days
    },
    headers: {
      "x-rapidapi-key": key,
      "x-rapidapi-host": host,
    },
    timeout: 10000,
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      const status = error.response?.status;
      throw new Error(`Weather API error${status ? ` (${status})` : ''}: ${message}`);
    }
    throw error;
  }
}