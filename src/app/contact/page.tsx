import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="p-10 bg-mist-300 border-8 border-cyan-700 h-screen">
      <ContactForm />
    </main>
  );
}
