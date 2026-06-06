"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { cart, clearCart } = useCart();
  const [purchasedItems, setPurchasedItems] = useState<any[]>([]);
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    if (cart.length > 0 && !hasProcessed) {
      setPurchasedItems(cart);

      clearCart();

      setHasProcessed(true);
    }
  }, [cart, clearCart, hasProcessed]);

  return (
    <main className="p-10 bg-mist-300 border-8 border-cyan-700 h-screen flex flex-col items-center">
      <div className="text-3xl font-bold text-sky-950 mb-4 gap-6 flex flex-col items-center">
        <h1 className="text-sky-950 text-5xl font-black uppercase tracking-tighter">
          Thank you
        </h1>
        <div className="space-y-2 flex flex-col">
          <h3 className="text-sky-800 text-2xl uppercase">
            Your purchase have been successfull
          </h3>
          <div className="bg-white p-4 border-4 border-sky-950 shadow-[4px_4px_0px_0px_rgba(8,145,178,1)]">
            <p className="text-sm text-gray-500 uppercase font-black mb-2">
              Items ordered:
            </p>
            <ul className="space-y-3">
              {purchasedItems.length > 0 ? (
                purchasedItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b border-sky-900 pb-2 last:border-0"
                  >
                    <span className="italic text-lg">{item.title}</span>
                    <span className="font-black bg-mist-300 border-2 border-sky-950 text-sky-950 px-2 py-1 text-sm rounded">
                      x{item.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-sm italic">Processing the items</p>
              )}
            </ul>
          </div>
        </div>
        <div className="flex">
          <Link
            href="/"
            className="border-2 border-sky-950 text-sky-950 px-6 py-3 rounded-lg font-semibold hover:bg-sky-950 hover:text-mist-300 uppercase transition"
          >
            Return to shop
          </Link>
        </div>
      </div>
    </main>
  );
}
