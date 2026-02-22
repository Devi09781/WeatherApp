import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface FavoriteCity {
  id: string;
  city_name: string;
  country_code: string | null;
  created_at: string;
}

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("favorite_cities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = useCallback(async (cityName: string, countryCode?: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { error } = await supabase
        .from("favorite_cities")
        .insert({
          user_id: user.id,
          city_name: cityName,
          country_code: countryCode || null,
        });

      if (error) {
        if (error.code === "23505") {
          return { error: new Error("City already in favorites") };
        }
        throw error;
      }

      await fetchFavorites();
      return { error: null };
    } catch (error) {
      console.error("Error adding favorite:", error);
      return { error: error as Error };
    }
  }, [user, fetchFavorites]);

  const removeFavorite = useCallback(async (cityName: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    try {
      const { error } = await supabase
        .from("favorite_cities")
        .delete()
        .eq("city_name", cityName);

      if (error) throw error;

      await fetchFavorites();
      return { error: null };
    } catch (error) {
      console.error("Error removing favorite:", error);
      return { error: error as Error };
    }
  }, [user, fetchFavorites]);

  const isFavorite = useCallback((cityName: string) => {
    return favorites.some(
      (fav) => fav.city_name.toLowerCase() === cityName.toLowerCase()
    );
  }, [favorites]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: fetchFavorites,
  };
};
