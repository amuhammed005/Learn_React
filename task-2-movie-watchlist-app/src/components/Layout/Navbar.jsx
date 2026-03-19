import SearchInput from "../common/SearchInput";
import Logo from "./Logo";

function Navbar({ query, setQuery }) {
  return (
    <div className="w-full fixed top-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-500/20 shadow-md">
      <div className="md:w-3/4 mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-5 gap-4">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <div className="w-full md:w-1/2">
          <SearchInput query={query} setQuery={setQuery} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;