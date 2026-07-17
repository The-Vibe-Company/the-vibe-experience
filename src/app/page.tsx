import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "The Vibe Experience",
  description: "Parcours The Vibe Experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  redirect("/parcours");
}
