import Image from "next/image";
import React from "react";

interface Product {
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

interface ProductResultsProps {
  results: Product[] | Product | null | undefined;
}

const ProductResults: React.FC<ProductResultsProps> = ({ results }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-400";
    if (score >= 0.6) return "text-yellow-300";
    return "text-red-400";
  };

  if (!results) {
    return (
      <div className="text-center mt-8">
        <p className="text-yellow-300">
          No results to display yet. Try searching for products!
        </p>
      </div>
    );
  }

  const productsArray = Array.isArray(results) ? results : [results];

  if (productsArray.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-yellow-300">Start your search...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-4 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-block bg-black p-4 transform -rotate-1">
          <h2 className="text-3xl font-bold text-yellow-300 animate-pulse">
            🌟 Similar Products Found! 🌟
          </h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {productsArray.map((product, index) => (
          <div
            key={product.id || index}
            className="w-full bg-gray-900 border-4 border-yellow-300 p-4 transform hover:scale-102 transition-transform"
          >
            <div className="flex flex-col md:flex-row gap-6 h-full">
              {/* Left Column - Image or Placeholder */}
              <div className="w-full md:w-1/3 h-full">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-cover"
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Right Column - Content */}
              <div className="w-full md:w-2/3">
                {/* Score Badge */}
                <div className="mb-4">
                  <div className="bg-black px-3 py-1 inline-block">
                    <span className="font-bold">Match Score:</span>
                    <span className={`ml-2 ${getScoreColor(product.score)}`}>
                      {(product.score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Product Title */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-4 hover:underline"
                >
                  <h3 className="text-xl font-bold text-green-400 bg-black p-2 line-clamp-2">
                    {product.title}
                  </h3>
                </a>

                {/* Highlights */}
                {product.summary && (
                  <div className="bg-black p-4 border-2 border-green-400">
                    <h4 className="text-yellow-300 mb-2 font-bold">Summary:</h4>
                    <p className="text-green-400 font-mono text-sm">
                      {product.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductResults;
