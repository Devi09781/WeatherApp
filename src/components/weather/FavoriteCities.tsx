import { motion } from "framer-motion";
import { Star, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteCitiesProps {
  onCityClick: (city: string) => void;
  currentCity?: string;
}

export const FavoriteCities = ({ onCityClick, currentCity }: FavoriteCitiesProps) => {
  const { favorites, removeFavorite, isLoading } = useFavorites();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-9 w-24 rounded-full bg-secondary/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-muted-foreground">Favorites</span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {favorites.map((fav, index) => {
          const isActive = currentCity?.toLowerCase() === fav.city_name.toLowerCase();
          return (
            <motion.div
              key={fav.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0"
            >
              <div
                className={`group flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 hover:bg-secondary text-foreground"
                }`}
              >
                <button
                  onClick={() => onCityClick(fav.city_name)}
                  className="flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{fav.city_name}</span>
                  {fav.country_code && (
                    <span className="text-xs opacity-70">{fav.country_code}</span>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(fav.city_name);
                  }}
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
