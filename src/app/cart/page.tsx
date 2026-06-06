"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="text-blue-600 underline">
          Go back to shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-10 h-screen bg-mist-300 border-8 border-cyan-700">
      <h1 className="text-3xl font-bold mb-8 text-mist-300 bg-sky-950 flex justify-center py-2 rounded-lg">
        Shopping Cart
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border-b p-6 bg-sky-950"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image?.url || "/placeholder-image.png"}
                alt={item.image?.alt || "Product image"}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-xl font-bold t">{item.title}</h2>
                <p className="text-gray-600">{item.discountedPrice} kr each</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-slate-400 rounded-lg flex flex-col items-center">
        <h2 className="text-2xl text-sky-950 font-bold mb-4">
          Total: {total.toFixed(2)} kr
        </h2>

        <Link
          href="/checkout-success"
          className="px-10 py-4 bg-black text-white font-bold rounded hover:bg-gray-800 transition"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
