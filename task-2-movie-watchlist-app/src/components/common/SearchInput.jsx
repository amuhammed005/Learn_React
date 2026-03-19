import { IoSearch } from "react-icons/io5";

function SearchInput({ query, setQuery }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="relative w-full">
        
        {/* Icon */}
        <span className="absolute inset-y-0 left-4 flex items-center text-amber-400 text-xl">
          <IoSearch />
        </span>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="
            w-full
            bg-gray-900/80
            border border-amber-500/40
            rounded-full
            pl-12 pr-5 py-3 md:py-4
            text-lg md:text-xl
            text-gray-200
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-amber-500
            focus:border-amber-500
            transition-all duration-300
            shadow-sm hover:shadow-md
          "
        />
      </div>
    </form>
  );
}

export default SearchInput;
