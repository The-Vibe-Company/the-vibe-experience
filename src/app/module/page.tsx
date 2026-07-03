import Link from "next/link";

export const metadata = { title: "Module · Faire un site — The Vibe Experience" };

const toolbox = [
  { n: "Éditeur IA (Claude Code / Cursor)", d: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code." },
  { n: "Homebrew", d: "L'installateur du terminal. Une commande pour installer ce qu'il te faut." },
  { n: "GitHub", d: "Le coffre-fort de ton code. Il sauvegarde ton projet et son historique." },
  { n: "Vercel", d: "L'hébergeur. Il met ton site en ligne en un clic." },
  { n: "SuperWhisper (option)", d: "Pour parler à l'IA au lieu de tout taper." },
];

type Etape = {
  num: string;
  titre: string;
  tag: [string, string];
  dur: string;
  obj: string;
  sub: string[];
  prompt?: { label: string; text: string };
  fiches?: { n: string; d: string }[];
  choix?: string[];
  auto?: string;
  livrable: string;
  reussite: string;
};

const etapes: Etape[] = [
  {
    num: "1",
    titre: "Ton idée devient une page",
    tag: ["Build", "t-build"],
    dur: "≈ 45 min · en local",
    obj: "Passer de ton idée à une vraie page qui tourne sur ta machine.",
    sub: [
      "Trouve ton sujet, et garde-le simple.",
      "Explique ta page à l'IA en une phrase (prompt fourni).",
      "Regarde-la tourner en local, dans ton navigateur. C'est normal que ce soit brut.",
      "Ajuste par petites touches, une demande à la fois.",
    ],
    prompt: {
      label: "Prompt de démarrage",
      text: "Crée une page d'accueil pour [ton sujet], avec un grand titre, un sous-titre et un bouton.",
    },
    livrable: "Une page qui tourne en local.",
    reussite: "Elle s'affiche avec un titre et un bouton.",
  },
  {
    num: "2",
    titre: "Pose ton projet sur GitHub",
    tag: ["Build", "t-build"],
    dur: "≈ 1 h · en local",
    obj: "Sauvegarder ton code et l'automatiser, pour ne plus jamais perdre ton travail.",
    sub: [
      "Installe ce qu'il te manque via le terminal (on t'accompagne).",
      "Connecte GitHub pour sauvegarder ton code.",
      "Automatise : branche Claude à GitHub pour qu'il pousse tes modifs tout seul.",
    ],
    fiches: [
      { n: "Homebrew", d: "L'installateur du terminal, sans galérer." },
      { n: "GitHub", d: "Le coffre-fort de ton code et de son historique." },
    ],
    auto: "Le réflexe clé : dès que tu ajoutes un outil, tu le connectes et tu l'automatises. Un petit effort une fois, un temps fou gagné ensuite.",
    livrable: "Ton projet sauvegardé sur GitHub, en automatique.",
    reussite: "Tes changements se sauvegardent sans que tu y penses.",
  },
  {
    num: "3",
    titre: "Rends ton site à ton image",
    tag: ["Build", "t-build"],
    dur: "≈ 1 h 30 · en local",
    obj: "Fais que ton site te ressemble et te plaise, et rends-le propre. (Plusieurs pages = optionnel, une seule page est très bien.)",
    sub: [
      "Travaille l'apparence : couleurs, style, ton, ta DA.",
      "Si tu veux, ajoute des pages et un menu.",
      "Soigne le design avec Impeccable.",
      "Teste avec Agent Browser et corrige ce qu'il remonte.",
    ],
    fiches: [
      { n: "Impeccable", d: "Un skill qui rend ton interface propre et pro, sans être designer." },
      { n: "Agent Browser", d: "L'IA parcourt ton site comme un visiteur et repère ce qui cloche." },
    ],
    livrable: "Un site à ton image, propre, en local.",
    reussite: "Le rendu est propre, les boutons et liens marchent, mobile et desktop.",
  },
  {
    num: "4",
    titre: "Ajoute une ou plusieurs fonctionnalités",
    tag: ["Produit", "t-product"],
    dur: "≈ 1 h 30 à 2 h · en local",
    obj: "Donne des super-pouvoirs à ton site. Tu choisis dans un menu de valeurs sûres, une seule ou plusieurs, on ne limite pas.",
    sub: [
      "Choisis ta ou tes fonctionnalités.",
      "Implémente-la avec l'IA, qui t'accompagne.",
      "Teste de bout en bout (crée un compte test, soumets le formulaire…).",
    ],
    choix: ["Comptes utilisateurs", "Multilingue", "Formulaire de contact"],
    fiches: [
      { n: "Supabase", d: "Les comptes + la base de données de tes utilisateurs." },
      { n: "API", d: "Un branchement vers un service extérieur (traduction, paiement…)." },
    ],
    livrable: "La ou les fonctionnalité(s) qui marchent, en local.",
    reussite: "Chaque fonctionnalité choisie fonctionne.",
  },
  {
    num: "5",
    titre: "Mets-le en ligne et partage",
    tag: ["Ship", "t-ship"],
    dur: "≈ 1 h",
    obj: "Rends ton site officiel. C'est ici que le juge valide ton travail.",
    sub: [
      "Connecte Vercel et déploie.",
      "En option, ajoute un nom de domaine.",
      "Vérifie le mobile et la vitesse.",
      "Le juge visite ton site et coche la checklist. S'il manque un critère, il te renvoie précisément à l'étape à reprendre.",
      "Partage ton lien.",
    ],
    fiches: [{ n: "Vercel", d: "Héberge ton site et le met en ligne en un clic." }],
    livrable: "Ton site en ligne, partagé.",
    reussite: "Le juge valide toute la checklist du module.",
  },
];

export default function Module() {
  return (
    <>
      <header className="phead">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">/</span>
            <Link href="/parcours">Modules</Link>
            <span className="sep">/</span>
            <span>Faire un site</span>
          </div>
          <div className="label" style={{ marginTop: "1rem" }}>
            Module · Produit
          </div>
          <h1>
            Faire un site, <em>de ton idée à en ligne</em>.
          </h1>
          <p>
            Le module fondateur : tu construis TON site, du premier écran en local jusqu&apos;à la
            mise en ligne, en apprenant les vrais outils au passage. On ne t&apos;impose rien, on
            t&apos;accompagne pas à pas.
          </p>
          <div className="mtotal">
            <span>5 étapes</span>
            <span>≈ 5 à 6 h au total</span>
            <span>Niveau : débutant</span>
          </div>
        </div>
      </header>

      <section className="block" style={{ paddingTop: "1.5rem" }}>
        <div className="wrap-narrow">
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: ".4rem" }}>
            Ta boîte à outils
          </h2>
          <p style={{ color: "var(--muted)", fontSize: ".97rem", marginBottom: "0" }}>
            À installer une fois, avant tout. Ça te resservira pour tous tes projets.
          </p>
          <div className="toolbox">
            {toolbox.map((t) => (
              <div className="tool" key={t.n}>
                <h4>{t.n}</h4>
                <p>{t.d}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
            Les étapes
          </h2>

          {etapes.map((e) => (
            <div className="etape" key={e.num}>
              <div className="etape-head">
                <span className="etape-num">{e.num}</span>
                <h3>{e.titre}</h3>
                <span className={`tag ${e.tag[1]}`}>{e.tag[0]}</span>
                <span className="etape-dur">{e.dur}</span>
              </div>
              <p className="etape-obj">{e.obj}</p>
              <ol className="sub">
                {e.sub.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              {e.choix && (
                <div className="choix">
                  {e.choix.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {e.prompt && (
                <div className="prompt">
                  <span className="plabel">{e.prompt.label}</span>
                  {e.prompt.text}
                </div>
              )}

              {e.fiches && (
                <div className="fiches">
                  {e.fiches.map((f) => (
                    <div className="fiche" key={f.n}>
                      <span className="fn">{f.n}</span>
                      <span className="fd">{f.d}</span>
                    </div>
                  ))}
                </div>
              )}

              {e.auto && <div className="callout-auto">⚡ {e.auto}</div>}

              <div className="livrable-line">
                <strong>Livrable :</strong> {e.livrable}
              </div>
              <div className="reussite">
                <strong>Réussite :</strong> {e.reussite}
              </div>
            </div>
          ))}

          <div className="after">
            <div className="label">Et après ?</div>
            <h3>Créer ton premier skill</h3>
            <p>
              Tu viens d&apos;utiliser des skills tout faits (Impeccable, Agent Browser). Le module
              suivant, un savoir-faire, t&apos;apprend à fabriquer le tien, que tu réutiliseras dans
              ton prochain produit. C&apos;est l&apos;alternance : un produit, un savoir-faire, et on
              recommence.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
