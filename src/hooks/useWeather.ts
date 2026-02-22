import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CurrentWeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
}

interface ForecastDay {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
}

interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastDay[];
}

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("get-weather", {
        body: { city },
      });

      if (fnError) {
        throw new Error(fnError.message || "Failed to fetch weather data");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setWeatherData(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const convertTemperature = (temp: number, toUnit: "celsius" | "fahrenheit"): number => {
    if (toUnit === "fahrenheit") {
      return (temp * 9) / 5 + 32;
    }
    return temp;
  };

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    convertTemperature,
  };
};