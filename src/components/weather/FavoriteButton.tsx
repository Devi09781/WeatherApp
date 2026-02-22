import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface FavoriteButtonProps {
  cityName: string;
  countryCode?: string;
}

export const FavoriteButton = ({ cityName, countryCode }: FavoriteButtonProps) => {
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isFav = isFavorite(cityName);

  const handleClick = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorite cities.",
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        ),
      });
      return;
    }

    if (isFav) {
      const { error } = await removeFavorite(cityName);
      if (!error) {
        toast({
          title: "Removed from favorites",
          description: `${cityName} has been removed from your favorites.`,
        });
      }
    } else {
      const { error } = await addFavorite(cityName, countryCode);
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Added to favorites",
          description: `${cityName} has been added to your favorites.`,
        });
      }
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={`rounded-full ${
          isFav 
            ? "text-accent hover:text-accent/80" 
            : "text-muted-foreground hover:text-accent"
        }`}
      >
        <Star
          className={`w-5 h-5 transition-all ${isFav ? "fill-current" : ""}`}
        />
      </Button>
    </motion.div>
  );
};
