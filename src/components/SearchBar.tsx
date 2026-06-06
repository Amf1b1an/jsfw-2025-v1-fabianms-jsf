"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = "SEARCH PRODUCTS...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`${pathname}?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(pathname);
    }
  }

  function handleClear() {
    setQuery("");
    router.push(pathname);
    inputRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex items-start gap-4 w-full max-w-xl ${className}`}
    >
      <div
        className={[
          "relative flex items-center flex-1 bg-white border-4 border-sky-950 transition-all duration-150",
          isFocused
            ? "shadow-[1px_1px_0px_0px_rgba(8,145,178,1)] translate-x-0.75 translate-y-0.75"
            : "shadow-[4px_4px_0px_0px_rgba(8,145,178,1)]",
        ].join(" ")}
      >
        <span className="pl-3 text-sky-950 pointer-events-none shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          type="text" /* Changed from "search" to "text" to disable default browser clear icons crashing into ours */
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder.toUpperCase()}
          aria-label="Search products"
          className="w-full pl-3 pr-12 py-2 bg-transparent text-sm font-black text-sky-950 placeholder:text-gray-400 outline-none uppercase"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-950 transition-colors z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      <button
        type="submit"
        aria-label="Submit search"
        className={[
          "px-5 py-2 border-4 border-sky-950 bg-cyan-700 text-white text-sm font-black uppercase tracking-wider",
          "hover:bg-sky-950 active:translate-x-0.75 active:translate-y-0.75 active:shadow-[1px_1px_0px_0px_rgba(8,145,178,1)]",
          "shadow-[4px_4px_0px_0px_rgba(8,145,178,1)] transition-all duration-150 shrink-0",
        ].join(" ")}
      >
        Search
      </button>
    </form>
  );
}
