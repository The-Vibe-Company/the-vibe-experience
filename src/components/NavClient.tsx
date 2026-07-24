"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContinueLearningLink, {
  type ProgressCatalog,
} from "@/components/ContinueLearningLink";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/parcours", label: "Parcours" },
  { href: "/journal", label: "Journal de bord" },
  { href: "/ressources", label: "Ressources" },
  { href: "/a-propos", label: "À propos" },
];

const modulePaths = [
  "/module",
  "/creer-un-skill",
  "/automatiser-ton-travail",
  "/automatiser-tes-devis",
  "/automatiser-tes-factures",
  "/juge",
];

export default function NavClient({ modules }: { modules: ProgressCatalog }) {
  const pathname = usePathname();
  const [accountLabel, setAccountLabel] = useState("Compte");
  const [loginReturnPath, setLoginReturnPath] = useState(pathname);

  useEffect(() => {
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setAccountLabel(data.user ? "Mon compte" : "Se connecter");
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccountLabel(session?.user ? "Mon compte" : "Se connecter");
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const updateReturnPath = () => {
      setLoginReturnPath(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      );
    };
    updateReturnPath();
    window.addEventListener("hashchange", updateReturnPath);
    return () => window.removeEventListener("hashchange", updateReturnPath);
  }, [pathname]);

  const accountHref =
    accountLabel === "Mon compte"
      ? "/compte"
      : `/connexion?next=${encodeURIComponent(loginReturnPath)}`;

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <div className="brand">
          <Link href="/">The Vibe Experience</Link>
        </div>
        <div className="nav-links">
          {links.map((link) => {
            const active =
              link.href === "/parcours"
                ? pathname.startsWith("/parcours") ||
                  modulePaths.some((modulePath) => pathname.startsWith(modulePath))
                : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} className={active ? "active" : ""}>
                {link.label}
              </Link>
            );
          })}
          <ContinueLearningLink modules={modules} />
          <Link
            href={accountHref}
            className={
              pathname.startsWith("/compte") || pathname.startsWith("/connexion")
                ? "active"
                : ""
            }
          >
            {accountLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
