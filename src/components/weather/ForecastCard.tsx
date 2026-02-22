import { motion } from "framer-motion";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastCardProps {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
  unit: "celsius" | "fahrenheit";
  index: number;
}

export const ForecastCard = ({
  day,
  date,
  tempHigh,
  tempLow,
  condition,
  unit,
  index,
}: ForecastCardProps) => {
  const tempSymbol = unit === "celsius" ? "°" : "°";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer transition-shadow hover:shadow-glass"
    >
      <p className="text-sm font-semibold text-foreground">{day}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
      
      <WeatherIcon condition={condition} size="md" animated={false} />
      
      <p className="text-xs capitalize text-muted-foreground text-center leading-tight">
        {condition}
      </p>
      
      <div className="flex items-center gap-2 mt-1">
        <span className="text-lg font-bold text-foreground">
          {Math.round(tempHigh)}{tempSymbol}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(tempLow)}{tempSymbol}
        </span>
      </div>
    </motion.div>
  );
};