// src/components/CharactersList.tsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GetCharactersDocument } from '../generated/graphql';
import './CharactersList.css';
import type { GetCharactersQuery, GetCharactersQueryVariables } from '../generated/graphql';

export const CharactersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(GetCharactersDocument, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <div className="loading">Loading characters…</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  type CharacterResult = NonNullable<NonNullable<GetCharactersQuery['characters']>['results']>[number];
  const results = (data?.characters?.results ?? []) as CharacterResult[];
  if (!results.length) return <div className="empty">No characters found</div>;

  const nextPage = data?.characters?.info?.next ?? null;
  const prevPage = data?.characters?.info?.prev ?? null;

  return (
    <>
      <ul className="characters" role="list">
        {results.map((c) => (c ? (
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

      <div className="pagination" role="navigation" aria-label="Characters pagination">
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={!prevPage || page === 1}
        >
          ← Prev
        </button>

        <span className="page-label">Page {page} {data?.characters?.info?.pages ? `of ${data.characters.info.pages}` : null}</span>

        <button
          className="page-btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={!nextPage}
        >
          Next →
        </button>
      </div>
    </>
  );
};