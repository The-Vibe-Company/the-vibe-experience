"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import ParcoursModule1 from "@/components/ParcoursModule1";
import { useAnyModuleStarted } from "@/lib/progress";

type Branche = "construire" | "automatiser";
type Vue = "bandeau" | "tout";

const CHOIX_KEY = "tve_parcours_branche";

const businessSoon = [
  {
    titre: "Automatiser mes devis",
    desc: "Ton devis prêt en quelques minutes au lieu d'une heure, au bon format à chaque fois.",
  },
  {
    titre: "Automatiser mes factures",
    desc: "Tes factures générées et suivies sans que tu y penses.",
  },
  {
    titre: "Tenir ma compta",
    desc: "Le récap qui sort tout seul, chaque mois, prêt à envoyer au comptable.",
  },
  { titre: "Gérer mes mails", desc: "Trier, répondre, retrouver, sans y passer ta matinée." },
  { titre: "Gérer mon agenda", desc: "Tes rendez-vous et tes rappels organisés à ta place." },
];

// Bandeau horizontal de modules : défile en boucle, revient au début après le tour.
// Le tour est simulé en doublant les cartes ; dès qu'on dépasse le premier jeu,
// on se recale d'un jeu en arrière, pixel pour pixel, donc sans saut visible.
function Bandeau({ cards }: { cards: { key: string; node: ReactNode }[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapT = useRef<number | undefined>(undefined);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => {
      const setWidth = loop ? el.scrollWidth / 2 : el.scrollWidth;
      setLoop(setWidth > el.clientWidth + 4);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [loop]);

  const step = () => {
    const el = trackRef.current!;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return (card?.offsetWidth ?? el.clientWidth) + gap;
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || !loop) return;
    window.clearTimeout(wrapT.current);
    wrapT.current = window.setTimeout(() => {
      const w = el.scrollWidth / 2;
      if (el.scrollLeft >= w) el.scrollLeft -= w;
    }, 120);
  };

  const next = () => {
    trackRef.current?.scrollBy({ left: step(), behavior: "smooth" });
  };

  const prev = () => {
    const el = trackRef.current;
    if (!el) return;
    if (loop && el.scrollLeft < 8) el.scrollLeft += el.scrollWidth / 2;
    el.scrollBy({ left: -step(), behavior: "smooth" });
  };

  return (
    <div className="pc-band">
      {loop && (
        <div className="pc-band-nav">
          <button
            type="button"
            className="pc-band-btn"
            onClick={prev}
            aria-label="Modules précédents"
          >
            ←
          </button>
          <button
            type="button"
            className="pc-band-btn"
            onClick={next}
            aria-label="Modules suivants"
          >
            →
          </button>
        </div>
      )}
      <div className="pc-band-track" ref={trackRef} onScroll={onScroll}>
        {cards.map((c) => (
          <div className="pc-band-card" key={c.key}>
            {c.node}
          </div>
        ))}
        {loop &&
          cards.map((c) => (
            <div className="pc-band-card" key={`clone-${c.key}`} aria-hidden inert>
              {c.node}
            </div>
          ))}
      </div>
    </div>
  );
}

export default function ParcoursFamilies() {
  const [branche, setBranche] = useState<Branche | null>(null);
  const [reco, setReco] = useState<Branche | null>(null);
  const [vue, setVue] = useState<Vue>("bandeau");
  const moduleStarted = useAnyModuleStarted();

  useEffect(() => {
    queueMicrotask(() => {
      // Choix explicite mémorisé ("" = volontairement replié).
      let choix: Branche | "" | null = null;
      try {
        const saved = localStorage.getItem(CHOIX_KEY);
        if (saved === "construire" || saved === "automatiser" || saved === "") choix = saved;
      } catch {}

      if (moduleStarted.started) {
        // Un module est lancé : la reco du quiz n'a plus lieu d'être.
        setReco(null);
        try {
          const raw = localStorage.getItem("tve_quiz_reco");
          if (raw) {
            const r = JSON.parse(raw);
            delete r.branche;
            localStorage.setItem("tve_quiz_reco", JSON.stringify(r));
          }
        } catch {}
        setBranche(choix === null ? "construire" : choix || null);
        return;
      }

      let quizReco: Branche | null = null;
      try {
        const raw = localStorage.getItem("tve_quiz_reco");
        if (raw) {
          const r = JSON.parse(raw);
          if (r.branche === "construire" || r.branche === "automatiser") quizReco = r.branche;
        }
      } catch {}
      setReco(quizReco);
      setBranche(choix === null ? quizReco : choix || null);
    });
  }, [moduleStarted.started]);

  const choisir = (b: Branche) => {
    const next = branche === b ? null : b;
    setBranche(next);
    setVue("bandeau");
    try {
      localStorage.setItem(CHOIX_KEY, next ?? "");
    } catch {}
  };

  const carte = (b: Branche, titre: string, desc: string, count: string, soon?: boolean) => {
    const on = branche === b;
    return (
      <button
        type="button"
        className={on ? "pc-cat on" : "pc-cat"}
        onClick={() => choisir(b)}
        aria-expanded={on}
        aria-controls="pc-panel"
      >
        {reco === b && <span className="pc-reco-tag">Parcours conseillé</span>}
        <span className="pc-cat-head">
          <span className="pc-cat-title">{titre}</span>
          {soon && <span className="pc-fam-soon">En préparation</span>}
        </span>
        <span className="pc-cat-desc">{desc}</span>
        <span className="pc-cat-foot">
          <span className="pc-cat-count">{count}</span>
          <span className="pc-cat-cta" aria-hidden>
            {on ? "Replier ↑" : "Voir les modules ↓"}
          </span>
        </span>
      </button>
    );
  };

  const construireCards = [
    { key: "module-01", node: <ParcoursModule1 /> },
    {
      key: "module-02",
      node: (
        <Link className="pc-mc" href="/creer-un-skill">
          <div className="pc-mc-head">
            <span className="label">Module 02 · Savoir-faire</span>
            <span className="pc-mc-status">Disponible →</span>
          </div>
          <span className="pc-mc-title">Créer ton premier skill</span>
          <p className="pc-mc-desc">
            Tu as utilisé des skills tout faits ; celui-ci t&apos;apprend à fabriquer le tien,
            réutilisable dans ton prochain produit.
          </p>
          <span className="pc-mc-meta">Savoir-faire · après le module 1</span>
        </Link>
      ),
    },
  ];

  const automatiserCards = businessSoon.map((m) => ({
    key: m.titre,
    node: (
      <div className="pc-mc pc-mc-soon">
        <div className="pc-mc-head">
          <span className="pc-mc-status">Bientôt</span>
        </div>
        <span className="pc-mc-title">{m.titre}</span>
        <p className="pc-mc-desc">{m.desc}</p>
        <div className="pc-soon-bar" aria-disabled="true">
          Bientôt disponible
        </div>
      </div>
    ),
  }));

  const panel = (intro: string, cards: { key: string; node: ReactNode }[]) => (
    <div className="pc-panel" id="pc-panel">
      <p className="pc-panel-intro">{intro}</p>
      {vue === "bandeau" ? (
        <Bandeau cards={cards} />
      ) : (
        <div className="pc-lib">
          {cards.map((c) => (
            <Fragment key={c.key}>{c.node}</Fragment>
          ))}
        </div>
      )}
      <div className="pc-all">
        <button
          type="button"
          className="pc-all-btn"
          onClick={() => setVue(vue === "bandeau" ? "tout" : "bandeau")}
        >
          {vue === "bandeau" ? "Voir tous les modules ↓" : "Replier la bibliothèque ↑"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="pc-pick">
      <div className="pc-cats">
        {carte(
          "construire",
          "Apprendre à construire",
          "Tu fabriques tes propres trucs, pas à pas, et tu montes en compétence. Le chemin fait partie de la valeur.",
          "2 modules disponibles"
        )}
        {carte(
          "automatiser",
          "Automatiser ton business",
          "Tu mets l'IA au travail sur les tâches qui te font perdre du temps. Un résultat, sans devoir tout construire.",
          "5 modules à venir",
          true
        )}
      </div>

      {branche === null && (
        <p className="pc-pick-hint">Clique sur une catégorie pour découvrir ses modules.</p>
      )}

      {branche === "construire" &&
        panel(
          "Des modules guidés où tu construis un vrai truc à toi, en apprenant les vrais outils au passage.",
          construireCards
        )}

      {branche === "automatiser" &&
        panel(
          "Des skills prêts à l'emploi, tu apprends juste à t'en servir. Ces modules sont en préparation, ils arrivent bientôt.",
          automatiserCards
        )}
    </div>
  );
}
