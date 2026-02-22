import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-base rounded-2xl bg-card/80 backdrop-blur-lg border-border/50 shadow-soft focus:shadow-glass focus:border-primary/50 transition-all duration-300"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !query.trim()}
          className="rounded-2xl px-6 py-6 bg-primary hover:bg-primary/90 shadow-glass transition-all duration-300"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </Button>
      </div>
    </motion.form>
  );
};