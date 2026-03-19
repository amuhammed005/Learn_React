//
import WatchListItem from "./WatchListItem";

function WatchList({ watchList, onRemove }) {
  return (
    <div>
      <h2 className="py-10 text-4xl text-amber-400">Watch List</h2>

      {watchList.length === 0 && (
        <p className="text-white text-lg">No movie in watch list</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchList.map((movie) => (
          <WatchListItem key={movie.imdbID} movie={movie} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

export default WatchList;