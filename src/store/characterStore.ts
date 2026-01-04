import { create } from 'zustand';

export type SortOption = 'name' | 'species' | 'status';
export type FilterOption = 'all' | 'Human' | 'Alien' | 'Humanoid' | 'Robot' | 'Poopybutthole' | 'Mythological Creature' | 'Unknown';
export type StatusFilter = 'all' | 'Alive' | 'Dead' | 'unknown';

interface CharacterStore {
  sortBy: SortOption;
  filterBySpecies: FilterOption;
  filterByStatus: StatusFilter;
  setSortBy: (sort: SortOption) => void;
  setFilterBySpecies: (species: FilterOption) => void;
  setFilterByStatus: (status: StatusFilter) => void;
  reset: () => void;
}

export const useCharacterStore = create<CharacterStore>((set) => ({
  sortBy: 'name',
  filterBySpecies: 'all',
  filterByStatus: 'all',
  setSortBy: (sort) => set({ sortBy: sort }),
  setFilterBySpecies: (species) => set({ filterBySpecies: species }),
  setFilterByStatus: (status) => set({ filterByStatus: status }),
  reset: () => set({ sortBy: 'name', filterBySpecies: 'all', filterByStatus: 'all' }),
}));
