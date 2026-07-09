"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/parcours", label: "Parcours" },
  { href: "/journal", label: "Journal de bord" },
  { href: "/ressources", label: "Ressources" },
  { href: "/a-propos", label: "À propos" },
  { href: "/compte", label: "Mon compte" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="brand">
          <Link href="/">The Vibe Experience</Link>
        </div>
        <div className="nav-links">
          {links.map((l) => {
            const active =
              l.href === "/parcours"
                ? pathname.startsWith("/parcours") || pathname.startsWith("/module")
                : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : ""}>
                {l.label}
              </Link>
            );
          })}
          <Link href="/demarrer" className="btn">
            Commence le parcours
          </Link>
        </div>
      </div>
    </nav>
  );
}
