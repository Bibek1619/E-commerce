export default function SearchSuggestions({ suggestions, onSelect }) {
  return (
    <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10">
      {suggestions.map((p) => (
        <div
          key={p._id}
          onClick={() => onSelect(p.name)}
          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}
