import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance"; // use your axios instance
import SearchSuggestions from "./SearchSuggestions";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      // ✅ Use axiosInstance with BASE_URL
      const res = await axiosInstance.get(`/api/products/search?q=${encodeURIComponent(query)}`);

      setSuggestions(res.data.products || []);
      setShowDropdown(true);

      // Navigate to search page
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelect = (name) => {
    setQuery(name);
    navigate(`/search?q=${encodeURIComponent(name)}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-500 cursor-pointer">
          Search
        </button>
      </form>

      {showDropdown && suggestions && suggestions.length > 0 && (
        <SearchSuggestions suggestions={suggestions} onSelect={handleSelect} />
      )}
    </div>
  );
}
