import { FavoritesPokemon } from "@/pokemons";

export const metadata = {
  title: "Pokémons Favoritos",
  description: "Lista de todos mis pokemones favoritos",
};

export default async function FavoritesPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokémons Favoritos
        <small className="text-blue-500">Global State</small>
      </span>

      <FavoritesPokemon />
    </div>
  );
}
