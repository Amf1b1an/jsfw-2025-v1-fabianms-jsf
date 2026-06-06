"use client";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full mt-4 bg-black text-white py-4 px-8 rounded-md font-bold hover:bg-gray-800 transition-colors"
    >
      Add to Cart
    </button>
  );
}
