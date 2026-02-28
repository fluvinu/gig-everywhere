import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center bg-card border border-border rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50">
        <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search for any service..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60 text-foreground"
        />
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1.5 rounded-lg ml-2 hover:bg-primary/20 transition-colors"
        >
          <MapPin className="w-3 h-3" />
          Nearby
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
