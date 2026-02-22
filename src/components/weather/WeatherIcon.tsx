import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, CloudSun, Moon, CloudMoon, Wind, Droplets } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherIconProps {
  condition: string;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const getWeatherIcon = (condition: string, className: string) => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return <CloudLightning className={className} />;
  }
  if (lowerCondition.includes("snow") || lowerCondition.includes("sleet")) {
    return <CloudSnow className={className} />;
  }
  if (lowerCondition.includes("rain") || lowerCondition.includes("shower")) {
    return <CloudRain className={className} />;
  }
  if (lowerCondition.includes("drizzle")) {
    return <CloudDrizzle className={className} />;
  }
  if (lowerCondition.includes("cloud") && lowerCondition.includes("sun")) {
    return <CloudSun className={className} />;
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return <Cloud className={className} />;
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return <Sun className={className} />;
  }
  if (lowerCondition.includes("mist") || lowerCondition.includes("fog")) {
    return <Wind className={className} />;
  }
  
  return <Sun className={className} />;
};

export const WeatherIcon = ({ condition, size = "md", animated = true }: WeatherIconProps) => {
  const className = `${sizeClasses[size]} text-primary`;
  
  if (!animated) {
    return getWeatherIcon(condition, className);
  }
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="animate-float"
    >
      {getWeatherIcon(condition, className)}
    </motion.div>
  );
};

export const getConditionColor = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return "text-weather-stormy";
  }
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) {
    return "text-weather-rainy";
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return "text-weather-cloudy";
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return "text-weather-sunny";
  }
  
  return "text-primary";
};