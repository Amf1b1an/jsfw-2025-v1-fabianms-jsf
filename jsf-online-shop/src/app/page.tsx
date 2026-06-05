import Link from "next/link";

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
  image: { url: string; alt: string };
  rating: number;
  tags: string[];
  reviews: Review[];
}

interface ApiResponse {
  data: Product[];
}

export default async function HomePage() {
  const response = await fetch("https://v2.api.noroff.dev/online-shop");

  if (!response.ok) {
    return (
      <p className="p-10 text-center font-bold">
        Error loading shop: {response.status}
      </p>
    );
  }

  const result: ApiResponse = await response.json();
  const allProducts = result.data;

  const topRated = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const mostReviewed = [...allProducts]
    .sort((a, b) => b.reviews.length - a.reviews.length)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-mist-300">
      <div className="p-8 space-y-20 max-w-7xl mx-auto">
        <section>
          <div className="flex justify-between items-center mb-8 border-b-4 border-sky-950 pb-2">
            <h2 className="text-3xl font-black text-sky-950 uppercase">
              Top Rated
            </h2>
            <Link
              href="/catalogue"
              className="bg-cyan-700 text-white px-4 py-1 font-bold hover:bg-sky-950 transition"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {topRated.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-8 border-b-4 border-sky-950 pb-2">
            <h2 className="text-3xl font-black text-sky-950 uppercase">
              Most Popular
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {mostReviewed.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductItem({ product }: { product: Product }) {
  const discount = product.price - product.discountedPrice;

  return (
    <div className="border-4 border-sky-950 p-4 bg-sky-950 text-mist-300 flex flex-col h-full shadow-[8px_8px_0px_0px_rgba(8,145,178,1)]">
      <div className="relative">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="w-full h-48 object-cover mb-4 border-2 border-mist-300"
        />
        {discount > 0 && (
          <span className="absolute -top-2 -right-2 bg-cyan-500 text-sky-950 font-black px-2 py-1 text-xs border-2 border-sky-950">
            OFFER
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold line-clamp-1 mb-1 uppercase italic">
        {product.title}
      </h3>
      <p className="text-xs font-bold text-cyan-400 mb-4 tracking-widest">
        {product.reviews.length} REVIEWS | {product.rating}/5 ⭐
      </p>

      <div className="mt-auto">
        <p className="text-2xl font-black mb-4 text-white">
          {product.discountedPrice} kr
        </p>
        <Link
          href={`/product/${product.id}`}
          className="block text-center bg-mist-300 text-sky-950 font-black p-3 border-2 border-sky-950 hover:bg-cyan-500 transition uppercase text-sm"
        >
          View Item
        </Link>
      </div>
    </div>
  );
}
