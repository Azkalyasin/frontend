"use client"
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header Section */}
          <h1 className="text-3xl font-bold text-center text-black">
            About Pokemon World
          </h1>
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/logo.png"
                  alt="Pokemon Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-black">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Welcome to Pokemon World, your ultimate destination for everything Pokemon! 
                Were dedicated to providing comprehensive information about Pokemon, 
                their abilities, types, and evolution chains.
              </p>
            </div>
          </div>

          {/* What We Offer Section */}
          <div className="bg-black rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Database Card */}
              <div className="bg-gray-900 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Pokemon Database
                </h3>
                <p className="text-gray-300">
                  Extensive collection of Pokemon information
                </p>
              </div>

              {/* Type Analysis Card */}
              <div className="bg-gray-900 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Type Analysis
                </h3>
                <p className="text-gray-300">
                  Detailed Pokemon type information
                </p>
              </div>

              {/* Mobile Friendly Card */}
              <div className="bg-gray-900 rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Mobile Friendly
                </h3>
                <p className="text-gray-300">
                  Access information on any device
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}