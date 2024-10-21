import { SimplePokemon, PokemonsResponse, PokemonGrid } from "@/pokemons";

export const metadata = {
  title: "Pokémons",
  description: "Lista de todos los pokemones",
};

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((response) => response.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

export default async function PokemonPage() {
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokémons <small className="text-blue-500">estático</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
