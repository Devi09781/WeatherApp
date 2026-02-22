import { motion } from "framer-motion";

interface UnitToggleProps {
  unit: "celsius" | "fahrenheit";
  onToggle: (unit: "celsius" | "fahrenheit") => void;
}

export const UnitToggle = ({ unit, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center gap-1 bg-secondary/70 backdrop-blur-sm rounded-full p-1">
      <ToggleButton
        label="°C"
        isActive={unit === "celsius"}
        onClick={() => onToggle("celsius")}
      />
      <ToggleButton
        label="°F"
        isActive={unit === "fahrenheit"}
        onClick={() => onToggle("fahrenheit")}
      />
    </div>
  );
};

interface ToggleButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ToggleButton = ({ label, isActive, onClick }: ToggleButtonProps) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {isActive && (
      <motion.div
        layoutId="unit-toggle"
        className="absolute inset-0 bg-primary rounded-full shadow-sm"
        transition={{ type: "spring", duration: 0.4 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </button>
);