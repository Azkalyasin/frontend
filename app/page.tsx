"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Pokemon {
  id: string;
  name: string;
  image: string;
  types: string[];
}

interface News {
  id: string;
  title: string;
  content: string;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokemonRes, newsRes] = await Promise.all([axios.get("http://localhost:3000/api/pokemon"), axios.get("http://localhost:3000/api/news")]);

        setPokemons(pokemonRes.data);
        setNews(newsRes.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan saat mengambil data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">Error: {error}</p>;

  const displayedPokemons = pokemons.slice(0, 4); // hanya tampilkan 4 saja

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Pokemon List</h2>
          <Link
            href="/pokemons" // Changed from /pokemons to /pokemon
            className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            See All Pokemon
          </Link>
        </div>
        {displayedPokemons.length === 0 ? (
          <p>Tidak ada data Pokemon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedPokemons.map((pokemon) => (
              <div key={pokemon.id}>
                <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer">
                  <Image src={pokemon.image} alt={pokemon.name} width={200} height={200} className="w-full h-48 object-contain mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{pokemon.name}</h3>
                  {pokemon.types && (
                    <div className="flex gap-2 flex-wrap">
                      {pokemon.types.map((type, index) => (
                        <span key={`${pokemon.id}-type-${index}`} className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* News Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest News</h2>
        {news.length === 0 ? (
          <p>Belum ada berita terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
