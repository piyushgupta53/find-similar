"use client";

import React, { useState } from "react";
import { Loader, Search } from "lucide-react";
import ProductResults from "./ProductCard";

interface Result {
  author: string;
  highlightScores?: number[];
  highlights?: string[];
  id: string;
  publishedDate: string;
  score: number;
  title: string;
  url: string;
  image?: string;
  summary?: string;
}

const HomePage = () => {
  const [url, setUrl] = useState("");
  const [includePhrase, setIncludePhrase] = useState("");
  const [excludePhrase, setExcludePhrase] = useState("");
  const [searchResults, setSearchResults] = useState<{
    data: { results: Result[] };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("/api/findproducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        includeText: includePhrase,
        excludeText: excludePhrase,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setSearchResults(result);
        console.log(result);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching similar products:", error);
        setSearchResults(null);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      {/* Marquee Header */}
      <div className="bg-black p-3 overflow-hidden">
        <div className="text-center text-wrap">
          🌟 The Ultimate Shopping Hack 🌟 Find Similar Products 🌟
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-yellow-300 animate-pulse">
            Linkalike
          </h1>
          <div className="bg-black text-green-400 inline-block px-4 py-2 rotate-2">
            <p className="text-xl">Find your product&apos;s twin!</p>
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-gray-900 p-8 rounded-lg border-4 border-yellow-300"
          >
            {/* URL Input */}
            <div className="space-y-2">
              <label className="block text-xl text-yellow-300">
                Product URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 bg-black border-2 border-green-400 text-green-400 placeholder-green-700 focus:outline-none focus:border-yellow-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 text-black px-6 py-2 font-bold flex items-center gap-2 transform hover:scale-105 transition-transform"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader className="animate-spin" size={24} />
                  ) : (
                    <Search size={24} />
                  )}
                  {isLoading ? "Searching" : "Search"}
                </button>
              </div>
            </div>

            {/* Include Phrases */}
            <div className="space-y-2">
              <label className="block text-xl text-yellow-300">
                Include Phrases:
              </label>
              <input
                type="text"
                value={includePhrase}
                onChange={(e) => setIncludePhrase(e.target.value)}
                placeholder="vintage, handmade, limited edition"
                className="w-full px-4 py-2 bg-black border-2 border-green-400 text-green-400 placeholder-green-700 focus:outline-none focus:border-yellow-300"
                disabled={isLoading}
              />
            </div>

            {/* Exclude Phrases */}
            <div className="space-y-2">
              <label className="block text-xl text-yellow-300">
                Exclude Phrases:
              </label>
              <input
                type="text"
                value={excludePhrase}
                onChange={(e) => setExcludePhrase(e.target.value)}
                placeholder="used, refurbished, damaged"
                className="w-full px-4 py-2 bg-black border-2 border-green-400 text-green-400 placeholder-green-700 focus:outline-none focus:border-yellow-300"
                disabled={isLoading}
              />
            </div>
          </form>

          {/* Retro Decorative Elements */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-4 h-4 bg-yellow-300 animate-bounce"></div>
            <div className="w-4 h-4 bg-green-400 animate-bounce delay-100"></div>
            <div className="w-4 h-4 bg-pink-500 animate-bounce delay-200"></div>
          </div>
        </div>

        <ProductResults results={searchResults?.data?.results || []} />
      </div>
    </div>
  );
};

export default HomePage;
