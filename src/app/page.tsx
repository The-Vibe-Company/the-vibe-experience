import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Vibe Experience - Site en preparation",
  description: "The Vibe Experience arrive bientot.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return (
    <section className="maintenance">
      <div className="maintenance-inner">
        <div className="maintenance-kicker">The Vibe Experience</div>
        <h1>Site en préparation</h1>
        <p>
          Le parcours est en construction. Il sera remis en ligne quand la version publique sera
          prête.
        </p>
      </div>
    </section>
  );
}
