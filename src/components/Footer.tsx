import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <div className="foot-brand">The Vibe Experience · un fil rouge The Vibe Company</div>
        <div className="foot-links">
          <Link href="/parcours">Parcours</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/ressources">Ressources</Link>
          <Link href="/a-propos">À propos</Link>
        </div>
      </div>
    </footer>
  );
}
