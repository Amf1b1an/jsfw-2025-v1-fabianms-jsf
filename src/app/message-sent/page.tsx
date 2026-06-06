"use client";
import React from "react";
import Link from "next/link";

export default function MessageSentPage() {
  return (
    <main className="p-10 bg-mist-300 border-8 border-cyan-700 h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-sky-950 mb-4">
        Message has been sent!
      </h1>
      <div className="flex gap-4">
        <Link
          href="/catalogue"
          className="bg-sky-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-900 transition"
        >
          Back to Shop
        </Link>
        <Link
          href="/"
          className="border-2 border-sky-950 text-sky-950 px-6 py-3 rounded-lg font-semibold hover:bg-sky-50 transition"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
