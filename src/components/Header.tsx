import Link from "next/link";
import Search from "@/components/SearchBar";

export default function Header() {
  return (
    <header className="p-6  bg-sky-950 border-b-8 border-cyan-700 w-screen">
      <nav className="flex justify-center md:justify-evenly gap-2 md:gap-6 px-7">
        <Link
          href="/"
          className="bg-mist-300 border-2 border-cyan-700 text-sky-950 font-black uppercase rounded-lg py-1 hover:bg-cyan-700 hover:border-mist-300 hover:text-mist-300 hover:italic w-32 text-center p-2  text-xs md:text-base"
        >
          Home
        </Link>
        <Link
          href="/catalogue"
          className="bg-mist-300 border-2 border-cyan-700 text-sky-950 font-black uppercase rounded-lg py-1 hover:bg-cyan-700 hover:border-mist-300 hover:text-mist-300 hover:italic w-32 text-center p-2 text-xs md:text-base"
        >
          Catalogue
        </Link>
        <Link
          href="/contact"
          className="bg-mist-300 border-2 border-cyan-700 text-sky-950 font-black uppercase rounded-lg py-1 hover:bg-cyan-700 hover:border-mist-300 hover:text-mist-300 hover:italic w-32 text-center p-2 text-xs md:text-base"
        >
          Contact
        </Link>
        <Link
          href="/cart"
          className="bg-mist-300 border-2 border-cyan-700 text-sky-950 font-black uppercase rounded-lg py-1 hover:bg-cyan-700 hover:border-mist-300 hover:text-mist-300 hover:italic w-32 text-center p-2 text-xs md:text-base"
        >
          Cart
        </Link>
      </nav>
      <div className="p-8 bg-sky-950  text-center">
        <h1 className="text-5xl font-extrabold text-mist-300 tracking-tighter">
          the Shop
        </h1>
      </div>
    </header>
  );
}
