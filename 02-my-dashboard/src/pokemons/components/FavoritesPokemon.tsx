"use client";

import { PokemonGrid } from "./PokemonGrid";
import { useAppSelector } from "@/stores";
import { IoHeartOutline } from "react-icons/io5";

export const FavoritesPokemon = () => {
  const favoritesPokemons = useAppSelector((state) =>
    Object.values(state.pokemons.favorites)
  );

  return favoritesPokemons.length ? (
    <PokemonGrid pokemons={favoritesPokemons} />
  ) : (
    <NoFavorites />
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
