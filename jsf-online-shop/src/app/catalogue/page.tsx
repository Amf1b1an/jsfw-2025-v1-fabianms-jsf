"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

interface Review {
  id: string;
  username: string;
  rating: number;
  description: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  tags: string[];
  reviews: Review[];
}

interface ApiResponse {
  data: Product[];
}

export default function Catalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("default");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const result: ApiResponse = await response.json();
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;

    return (
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.discountedPrice - b.discountedPrice;
    }
    if (sortBy === "price-high") {
      return b.discountedPrice - a.discountedPrice;
    }
    return 0;
  });

  if (loading)
    return <p className="p-10 text-center font-bold">Loading Catalogue...</p>;

  return (
    <main className="bg-mist-300 min-h-screen">
      <div className="p-8 space-y-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b-4 border-sky-950 pb-2">
          <h2 className="text-3xl font-black text-sky-950 uppercase">
            Catalogue
          </h2>
          <header className="text-3xl font-black text-sky-950 uppercase">
            <SearchBar />
          </header>
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="font-bold text-sky-950 uppercase text-sm"
            >
              Sort
            </label>
            <select
              id="sort"
              className="p-2 border-2 border-sky-950 bg-white text-sky-950 font-bold shadow-[4px_4px_0px_0px_rgba(8,145,178,1)] outline-none"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-low">Lowest price</option>
              <option value="price-high">Highest price</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center p-12">
            <p className="text-xl font-bold text-sky-950">
              No products found matching "{searchParams.get("q")}"
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try checking your spelling or searching for something else.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="border-4 border-sky-950 p-6 shadow-[8px_8px_0px_0px_rgba(8,145,178,1)] bg-sky-950 text-mist-300 flex flex-col gap-2"
              >
                <img
                  src={product.image.url}
                  alt={product.image.alt}
                  className="w-full h-64 object-cover mb-4"
                />
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <h3 className="text-2xl font-black text-white mt-2">
                  {product.discountedPrice} kr
                </h3>

                <p className="text-sm text-blue-600 mb-4">
                  {product.reviews.length} reviews
                </p>

                <div className="bg-gray-50 p-4 mt-4 flex flex-col ">
                  <h3 className="font-semibold mb-2">Customer Feedback:</h3>
                  {product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="border-b last:border-0 py-2">
                        <p className="text-sm italic text-black">
                          "{rev.description}"
                        </p>
                        <p className="text-xs text-gray-500">
                          - {rev.username} ({rev.rating}/5)
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No reviews yet.</p>
                  )}
                </div>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-auto self-center text-center bg-mist-300 text-sky-950 font-black p-3 border-2 border-sky-950 hover:bg-sky-100 transition uppercase text-sm shadow-[4px_4px_0px_0px_rgba(8,145,178,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(8,145,178,1)]"
                >
                  View Product Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
