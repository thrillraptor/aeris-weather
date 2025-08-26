import axios, { AxiosRequestConfig } from "axios";

export async function getForecastWeather(query: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://${process.env.NEXT_PUBLIC_RAPID_API_HOST}/forecast.json?q=${query}&days=3`,
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "x-rapidapi-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
