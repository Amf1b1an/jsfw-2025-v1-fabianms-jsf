import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

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

interface ApiSingleResponse {
  data: Product;
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;

  const response = await fetch(
    `https://v2.api.noroff.dev/online-shop/${productId}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      return <p>"{productId}" couldt not be found.</p>;
    }

    const body = await response.text();
    console.error(
      `Failed to fetch product ${productId}:`,
      response.status,
      body,
    );

    return <p> Trouble loading the product, try again later</p>;
  }

  const result: ApiSingleResponse = await response.json();
  const product = result.data;

  if (!product) {
    return <p>Data not accessable</p>;
  }

  const isDiscounted = product.discountedPrice < product.price;

  return (
    <main className="p-10 bg-mist-300 border-8 border-cyan-700">
      <div className="p-8 max-w-300 m-auto bg-sky-950 rounded-lg">
        <Link
          href="/catalogue"
          style={{ display: "block", marginBottom: "20px" }}
        >
          &larr; Return to catalogue
        </Link>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 items-start">
          <div>
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-300">
              {product.title}
            </h1>
            <p className="text-md">{product.description}</p>

            <p className="text-l">
              <strong>Price:</strong>{" "}
              {isDiscounted ? (
                <>
                  <span style={{ fontWeight: 700, color: "#d9534f" }}>
                    {product.discountedPrice} kr
                  </span>{" "}
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#666",
                      fontSize: "0.9em",
                    }}
                  >
                    {product.price} kr
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 700 }}>{product.price} kr</span>
              )}
            </p>

            <p>
              <strong>Rating:</strong> {product.rating}/5
            </p>

            <AddToCartButton product={product} />

            <div style={{ marginTop: "3rem" }}>
              <h2>Reviews</h2>
              {product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{ borderTop: "1px solid #ddd", padding: "15px 0" }}
                  >
                    <p style={{ fontStyle: "italic", margin: "0 0 5px 0" }}>
                      "{rev.description}"
                    </p>
                    <p
                      style={{ fontSize: "0.85rem", color: "#666", margin: 0 }}
                    >
                      — {rev.username} ({rev.rating}/5)
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
