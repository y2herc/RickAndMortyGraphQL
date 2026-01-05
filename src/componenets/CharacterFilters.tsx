import { useCharacterStore, type SortOption, type FilterOption, type StatusFilter } from '../store/characterStore';
import '../styles/CharacterFilters.css';

export function CharacterFilters() {
  const { sortBy, filterBySpecies, filterByStatus, setSortBy, setFilterBySpecies, setFilterByStatus, reset } = useCharacterStore();

  const speciesOptions: FilterOption[] = ['all', 'Human', 'Alien', 'Humanoid', 'Robot', 'Poopybutthole', 'Mythological Creature', 'Unknown'];
  const statusOptions: StatusFilter[] = ['all', 'Alive', 'Dead', 'unknown'];
  const sortOptions: SortOption[] = ['name', 'species', 'status'];

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="filter-select"
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="species-select">Species:</label>
        <select
          id="species-select"
          value={filterBySpecies}
          onChange={(e) => setFilterBySpecies(e.target.value as FilterOption)}
          className="filter-select"
        >
          {speciesOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All Species' : opt}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status-select">Status:</label>
        <select
          id="status-select"
          value={filterByStatus}
          onChange={(e) => setFilterByStatus(e.target.value as StatusFilter)}
          className="filter-select"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === 'all' ? 'All Status' : opt}
            </option>
          ))}
        </select>
      </div>

      <button className="filter-reset-btn" onClick={reset}>
        Reset Filters
      </button>
    </div>
  );
};
