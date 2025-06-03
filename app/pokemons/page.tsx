"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import debounce from "lodash/debounce";

interface Pokemon {
  _id: string;
  name: string;
  type: string | string[];
  abilities: string[];
  image: string;
}

const pokemonTypes = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];

const PokemonPage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter();

  const fetchAllPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/pokemon");
      setPokemon(response.data);
    } catch (error) {
      console.error("Failed to fetch Pokemon:", error);
      setError("Failed to load Pokemon");
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        fetchAllPokemon();
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/pokemon/search?q=${query}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Search failed:", error);
        setError("Search failed");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleTypeFilter = async (type: string) => {
    setSelectedType(type);
    if (!type) {
      fetchAllPokemon();
      return;
    }

    try {
      setLoading(true);
      console.log("Filtering by type:", type); // ⬅️ Debug log
      const response = await axios.get(`http://localhost:3000/api/pokemon/filter/type?q=${type}`);
      console.log("Filtered response:", response.data); // ⬅️ Debug log
      setPokemon(response.data);
    } catch (error) {
      console.error("Filter failed:", error);
      setError("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Pokemon Collection</h1>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Pokemon..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </div>
              <select 
                value={selectedType} 
                onChange={(e) => handleTypeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
              >
                <option value="">All Types</option>
                {pokemonTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">No Pokemon found</div>
        ) : (
          pokemon.map((poke) => (
            <div key={poke._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1" onClick={() => router.push(`/pokemons/${poke._id}`)}>
              <div className="relative w-full h-40 bg-gray-50 rounded-t-lg p-4">
                <Image src={poke.image} alt={poke.name} fill className="object-contain p-2" priority />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold text-black capitalize mb-2">{poke.name}</h2>

                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(poke.type) ? (
                      poke.type.map((type) => (
                        <span key={type} className="px-2 py-1 bg-black text-white text-xs rounded-full">
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 bg-black text-white text-xs rounded-full">{poke.type}</span>
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <span className="font-medium">Abilities: </span>
                  {poke.abilities.join(", ")}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
