import { motion } from "framer-motion";
import { WeatherIcon } from "./WeatherIcon";
import { FavoriteButton } from "./FavoriteButton";
import { Droplets, Wind, Eye, Gauge } from "lucide-react";

interface CurrentWeatherProps {
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
  unit: "celsius" | "fahrenheit";
}

export const CurrentWeather = ({
  city,
  country,
  temperature,
  feelsLike,
  condition,
  description,
  humidity,
  windSpeed,
  visibility,
  pressure,
  unit,
}: CurrentWeatherProps) => {
  const tempSymbol = unit === "celsius" ? "°C" : "°F";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card rounded-3xl p-8 md:p-10 shadow-glass"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Location & Main Temp */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start justify-between"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                {city}
              </h2>
              <p className="text-muted-foreground text-lg">{country}</p>
            </div>
            <FavoriteButton cityName={city} countryCode={country} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-6"
          >
            <span className="text-7xl md:text-8xl font-display font-bold text-gradient">
              {Math.round(temperature)}{tempSymbol}
            </span>
            <div className="flex flex-col">
              <WeatherIcon condition={condition} size="xl" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-2"
          >
            <p className="text-lg capitalize text-foreground font-medium">{description}</p>
            <p className="text-muted-foreground">
              Feels like {Math.round(feelsLike)}{tempSymbol}
            </p>
          </motion.div>
        </div>

        {/* Weather Details Grid */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4"
        >
          <WeatherDetailCard
            icon={<Droplets className="w-5 h-5 text-primary" />}
            label="Humidity"
            value={`${humidity}%`}
          />
          <WeatherDetailCard
            icon={<Wind className="w-5 h-5 text-primary" />}
            label="Wind"
            value={`${windSpeed} m/s`}
          />
          <WeatherDetailCard
            icon={<Eye className="w-5 h-5 text-primary" />}
            label="Visibility"
            value={`${(visibility / 1000).toFixed(1)} km`}
          />
          <WeatherDetailCard
            icon={<Gauge className="w-5 h-5 text-primary" />}
            label="Pressure"
            value={`${pressure} hPa`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

interface WeatherDetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const WeatherDetailCard = ({ icon, label, value }: WeatherDetailCardProps) => (
  <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
    {icon}
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  </div>
);