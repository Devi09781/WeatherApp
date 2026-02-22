import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, Moon } from "lucide-react";
import { SearchBar } from "@/components/weather/SearchBar";
import { CurrentWeather } from "@/components/weather/CurrentWeather";
import { ForecastList } from "@/components/weather/ForecastList";
import { UnitToggle } from "@/components/weather/UnitToggle";
import { WeatherError } from "@/components/weather/WeatherError";
import { WeatherSkeleton } from "@/components/weather/WeatherSkeleton";
import { FavoriteCities } from "@/components/weather/FavoriteCities";
import { UserMenu } from "@/components/weather/UserMenu";
import { useWeather } from "@/hooks/useWeather";
import { useAuth } from "@/hooks/useAuth";
import { TimeBackground, useTimeOfDay } from "@/components/weather/TimeBackground";

const Index = () => {
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");
  const [lastSearchedCity, setLastSearchedCity] = useState("");
  const { weatherData, isLoading, error, fetchWeather, convertTemperature } = useWeather();
  const { user } = useAuth();
  const timeOfDay = useTimeOfDay();
  const isDark = timeOfDay === "night" || timeOfDay === "evening";

  const handleSearch = (city: string) => {
    setLastSearchedCity(city);
    fetchWeather(city);
  };

  const handleRetry = () => {
    if (lastSearchedCity) {
      fetchWeather(lastSearchedCity);
    }
  };

  const getConvertedTemp = (temp: number) => {
    return unit === "fahrenheit" ? convertTemperature(temp, "fahrenheit") : temp;
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? "dark-time" : ""}`}>
      <TimeBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {isDark ? (
                  <Moon className="w-10 h-10 text-yellow-300" />
                ) : (
                  <Sun className="w-10 h-10 text-accent" />
                )}
              </motion.div>
              <h1 className={`text-4xl md:text-5xl font-display font-bold ${isDark ? "text-white" : "text-gradient"}`}>
                SkyCast
              </h1>
              <motion.div
                animate={{ x: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Cloud className={`w-10 h-10 ${isDark ? "text-blue-300" : "text-primary"}`} />
              </motion.div>
            </div>
            <div className="flex-1 flex justify-end">
              <UserMenu />
            </div>
          </div>
          <p className={`text-lg font-medium text-center mt-2 ${isDark ? "text-white/70" : "text-foreground/70"}`}>
            Your personal weather companion
          </p>
        </motion.header>

        {/* Search & Unit Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex-1 w-full sm:max-w-lg">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UnitToggle unit={unit} onToggle={setUnit} />
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto">
          {/* Favorite Cities - only show when logged in */}
          {user && (
            <FavoriteCities
              onCityClick={handleSearch}
              currentCity={weatherData?.current.city}
            />
          )}

          {isLoading && <WeatherSkeleton />}

          {error && !isLoading && (
            <WeatherError message={error} onRetry={handleRetry} />
          )}

          {weatherData && !isLoading && !error && (
            <>
              <CurrentWeather
                city={weatherData.current.city}
                country={weatherData.current.country}
                temperature={getConvertedTemp(weatherData.current.temperature)}
                feelsLike={getConvertedTemp(weatherData.current.feelsLike)}
                condition={weatherData.current.condition}
                description={weatherData.current.description}
                humidity={weatherData.current.humidity}
                windSpeed={weatherData.current.windSpeed}
                visibility={weatherData.current.visibility}
                pressure={weatherData.current.pressure}
                unit={unit}
              />

              <ForecastList
                forecast={weatherData.forecast.map((day) => ({
                  ...day,
                  tempHigh: getConvertedTemp(day.tempHigh),
                  tempLow: getConvertedTemp(day.tempLow),
                }))}
                unit={unit}
              />
            </>
          )}

          {/* Empty State */}
          {!weatherData && !isLoading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <Sun className="w-24 h-24 text-accent/30" />
                  <Cloud className="w-16 h-16 text-primary/40 absolute -bottom-2 -right-4" />
                </div>
              </motion.div>
              <h2 className={`text-2xl font-display font-bold mb-2 ${isDark ? "text-white" : "text-foreground"}`}>
                Search for a city
              </h2>
              <p className={`max-w-md mx-auto font-medium ${isDark ? "text-white/70" : "text-foreground/60"}`}>
                Enter a city name above to get current weather conditions and a 5-day forecast
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-center mt-16 text-sm font-medium ${isDark ? "text-white/50" : "text-foreground/50"}`}
        >
          <p>Built with ❤️ • Powered by OpenWeatherMap</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;