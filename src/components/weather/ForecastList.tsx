import { motion } from "framer-motion";
import { ForecastCard } from "./ForecastCard";

interface ForecastDay {
  day: string;
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
}

interface ForecastListProps {
  forecast: ForecastDay[];
  unit: "celsius" | "fahrenheit";
}

export const ForecastList = ({ forecast, unit }: ForecastListProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <h3 className="text-xl font-display font-semibold text-foreground mb-4">
        5-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard
            key={day.date}
            day={day.day}
            date={day.date}
            tempHigh={day.tempHigh}
            tempLow={day.tempLow}
            condition={day.condition}
            unit={unit}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};