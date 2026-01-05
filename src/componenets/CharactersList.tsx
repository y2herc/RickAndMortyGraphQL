// src/components/CharactersList.tsx
import { useState, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { GetCharactersDocument } from '../generated/graphql';
import { useCharacterStore } from '../store/characterStore';
import { CharacterFilters } from './CharacterFilters';
import { Pagination } from './Pagination';
import '../styles/CharactersList.css';
import '../styles/Pagination.css';
import type { GetCharactersQuery, GetCharactersQueryVariables } from '../generated/graphql';

export function CharactersList() {
  const [page, setPage] = useState(1);
  const { sortBy, filterBySpecies, filterByStatus } = useCharacterStore();
  const { data, loading, error } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  type CharacterResult = NonNullable<NonNullable<GetCharactersQuery['characters']>['results']>[number];
  const rawResults = (data?.characters?.results ?? []) as CharacterResult[];

  // Filter and sort locally without refetching
  const filteredAndSorted = useMemo(() => {
    let filtered = rawResults;

    // Apply species filter
    if (filterBySpecies !== 'all') {
      filtered = filtered.filter((c) => c?.species === filterBySpecies);
    }

    // Apply status filter
    if (filterByStatus !== 'all') {
      filtered = filtered.filter((c) => c?.status === filterByStatus);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (!a || !b) return 0;
      if (sortBy === 'name') {
        return (a.name ?? '').localeCompare(b.name ?? '');
      } else if (sortBy === 'species') {
        return (a.species ?? '').localeCompare(b.species ?? '');
      } else if (sortBy === 'status') {
        return (a.status ?? '').localeCompare(b.status ?? '');
      }
      return 0;
    });

    return sorted;
  }, [rawResults, sortBy, filterBySpecies, filterByStatus]);

  // Early returns AFTER all hooks
  if (loading) return <div className="loading">Loading characters…</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const nextPage = data?.characters?.info?.next ?? null;
  const prevPage = data?.characters?.info?.prev ?? null;

  return (
    <>
      <CharacterFilters />
      
      {!filteredAndSorted.length ? (
        <div className="empty">No characters found</div>
      ) : (
        <>
          <ul className="characters" role="list">
            {filteredAndSorted.map((c) => (c ? (
              <li key={c.id} className="character-card">
                {c.image ? (
                  <img className="avatar" src={c.image} alt={c.name ?? 'character'} width={100} height={100} />
                ) : (
                  <div className="avatar placeholder" aria-hidden>{(c.name && c.name[0]) ?? '?'}</div>
                )}

                <div className="character-info">
                  <span className="name">{c.name}</span>
                  <span className="species">{c.species}</span>
                  <span className="gender">{c.gender}</span>
                  <span className="status">{c.status}</span>           
                </div>
              </li>
            ) : null))}
          </ul>

          <Pagination
            page={page}
            onPageChange={setPage}
            totalPages={data?.characters?.info?.pages ?? null}
            hasNextPage={!!nextPage}
            hasPrevPage={!!prevPage}
          />
        </>
      )}
    </>
  );
};