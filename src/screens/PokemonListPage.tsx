import React, { useState } from 'react';
import { tss } from '../tss';
import { useGetPokemonDetails, useGetPokemons } from 'src/hooks/useGetPokemons';
import { Modal } from "antd";

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();
  const { detailsData, detailsLoading, detailsError } = useGetPokemonDetails("");
  const [search, setSearch] = useState('');

  const filteredData = data?.filter((pokemon) =>
    pokemon.name?.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className={classes.warningText}>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.warningText}>
        <span>An error has occurred.</span>
      </div>
    );
  }

  if (filteredData.length === 0) {
    return (
      <div className={classes.root}>
        <input
          className={classes.search}
          type="text"
          placeholder="Search for a pokemon by name..."
          value={search}
          onChange={(action) => setSearch(action.target.value)}
        />
        <div className={classes.warningText}>
          <span>No results found. Please search by pokemon name.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <input
        className={classes.search}
        type="text"
        placeholder="Search for a pokemon by name..."
        value={search}
        onChange={(action) => setSearch(action.target.value)}
      />
      <ul>
        {filteredData?.map((d) => (
          <li key={d.id} className={classes.listItem}>
            <div className={classes.listItemContents}>
              <div>{d.name}</div>
              <div>{d.id}</div>
              <div>{d.types?.join(' ')}</div>
              <img src={d.sprite} alt={d.name} style={{ width: 200, height: 200 }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  listItem: {
    height: 300,
    width: 300,
    border: '1px white solid',
    padding: 10,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
    },
  },
  listItemContents: {
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  warningText: {
    padding: 8,
    color: theme.color.text.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  search: {
    padding: 8,
    fontSize: 16,
    marginInlineStart: 34,
    border: '1px solid white',
    borderRadius: 10,
    backgroundColor: 'inherit',
    color: 'white',
    outline: 'none',
  },
}));
