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
        const [pokemonRes, newsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/pokemon"),
          axios.get("http://localhost:3000/api/news"),
        ]);

        console.log("Pokemon IDs:", pokemonRes.data.map((p: Pokemon) => p.id));
        console.log("News IDs:", newsRes.data.map((n: News) => n.id));

        if (Array.isArray(pokemonRes.data)) {
          setPokemons(pokemonRes.data);
        }
        if (Array.isArray(newsRes.data)) {
          setNews(newsRes.data);
        }
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

  const displayedPokemons = pokemons.slice(0, 4);
  const displayedNews = news.slice(0, 3);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Pokemon Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Pokemon</h2>
          <Link
            href="/pokemons"
            className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            See All Pokemon
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map((pokemon, index) => (
                <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow" key={`${pokemon.name}-${index}`}>
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 capitalize">
                    {pokemon.name}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.types?.map((type) => (
                      <span
                        key={`${pokemon.name}-${type}`}
                        className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
            ))
          ) : (
            <p>No Pokemon available</p>
          )}
        </div>
      </section>

      {/* News Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedNews.length > 0 ? (
            displayedNews.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 line-clamp-3">{item.content}</p>
              </div>
            ))
          ) : (
            <p>No news available</p>
          )}
        </div>
      </section>
    </div>
  );
}
