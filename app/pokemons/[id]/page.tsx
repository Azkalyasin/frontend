"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Pokemon {
  _id: string;
  name: string;
  type: string | string[];
  abilities: string[];
  image: string;
}

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Failed to fetch Pokemon:", error);
        setError("Failed to load Pokemon details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!pokemon) return <div className="text-center p-8">Pokemon not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Pokemon Details */}
            <div className="md:w-1/2 p-8 lg:p-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-8 capitalize">
                {pokemon.name}
              </h1>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-black">Types</h2>
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(pokemon.type) ? (
                      pokemon.type.map((type) => (
                        <span 
                          key={type} 
                          className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium transform hover:scale-105 transition-transform"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium transform hover:scale-105 transition-transform">
                        {pokemon.type}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-black">Abilities</h2>
                  <div className="flex flex-wrap gap-3">
                    {pokemon.abilities.map((ability) => (
                      <span 
                        key={ability} 
                        className="px-6 py-2 bg-gray-100 text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h2 className="text-2xl font-semibold mb-4 text-black">Description</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    A powerful {Array.isArray(pokemon.type) ? pokemon.type.join("/") : pokemon.type} type Pokemon 
                    with exceptional abilities. Known for mastering the arts of{' '}
                    <span className="font-medium text-black">
                      {pokemon.abilities.join(" and ")}.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Pokemon Image */}
            <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="relative h-[600px] w-full">
                <Image 
                  src={pokemon.image} 
                  alt={pokemon.name} 
                  fill 
                  className="object-contain p-8 hover:scale-105 transition-transform duration-300" 
                  priority 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
