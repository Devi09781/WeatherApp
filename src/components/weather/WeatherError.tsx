import { motion } from "framer-motion";
import { CloudOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WeatherErrorProps {
  message: string;
  onRetry?: () => void;
}

export const WeatherError = ({ message, onRetry }: WeatherErrorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-3xl p-8 text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <CloudOff className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
      </motion.div>
      
      <h3 className="text-xl font-display font-semibold text-foreground mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-muted-foreground mb-6">{message}</p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="gap-2 rounded-xl"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};