import Link from "next/link";

// PROTOTYPE JETABLE : trois mises en page candidates pour la page /parcours,
// à comparer en captures (?v=1, ?v=2, ?v=3). Ne pas mettre en production.

export const metadata = {
  title: "Propositions parcours — proto",
  robots: { index: false, follow: false },
};

const construire = [
  {
    num: "01",
    label: "Produit",
    title: "Faire un site",
    desc: "De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au passage.",
    status: "Commence ici",
    cur: true,
  },
  {
    num: "02",
    label: "Savoir-faire",
    title: "Créer ton premier skill",
    desc: "Tu as utilisé des skills tout faits ; celui-ci t'apprend à fabriquer le tien.",
    status: "Après le module 1",
    cur: false,
  },
  {
    num: "03",
    label: "Savoir-faire",
    title: "Automatise ton travail",
    desc: "Sauvegardes toutes seules, garde-fous, rendez-vous programmés : déclenché, pas demandé.",
    status: "Après le module 2",
    cur: false,
  },
];

const automatiser = [
  { title: "Automatiser mes devis", desc: "Ton devis prêt en quelques minutes au lieu d'une heure." },
  { title: "Automatiser mes factures", desc: "Générées et suivies sans que tu y penses." },
  { title: "Tenir ma compta", desc: "Le récap qui sort tout seul chaque mois." },
  { title: "Gérer mes mails", desc: "Trier, répondre, retrouver, sans y passer ta matinée." },
  { title: "Gérer mon agenda", desc: "Tes rendez-vous et rappels organisés à ta place." },
];

const css = `
.pp-quiz { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; margin-top: 2rem; padding: .9rem 1.1rem; border: 1px solid var(--border); border-radius: 10px; background: var(--bg-2); }
.pp-quiz p { margin: 0; font-size: .92rem; color: var(--muted); }
.pp-cat-h { font-size: 1.9rem; font-weight: 800; letter-spacing: -.03em; line-height: 1.1; margin: 0; }
.pp-cat-sub { margin: .45rem 0 0; font-size: .95rem; line-height: 1.55; color: var(--muted); max-width: 56ch; }
.pp-soon-tag { font-family: var(--font-geist-mono), monospace; font-size: .66rem; font-weight: 600; text-transform: uppercase; letter-spacing: .12em; color: var(--faint); white-space: nowrap; }
.pp-sec { margin-top: 3.2rem; }
.pp-sec-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1.5rem; }
.pp-rows { margin-top: 1.2rem; border-bottom: 1px solid var(--border); }
.pp-row { display: grid; grid-template-columns: 52px 1fr auto; gap: 1.1rem; padding: 1.15rem 0; border-top: 1px solid var(--border); align-items: start; color: inherit; }
.pp-row-n { font-family: var(--font-geist-mono), monospace; font-size: .95rem; color: var(--faint); padding-top: .15rem; }
.pp-row-t { display: block; font-size: 1.18rem; font-weight: 700; letter-spacing: -.018em; }
a.pp-row:hover .pp-row-t { color: var(--orange); }
.pp-row-d { display: block; margin-top: .25rem; font-size: .9rem; line-height: 1.5; color: var(--muted); max-width: 56ch; }
.pp-row-s { font-family: var(--font-geist-mono), monospace; font-size: .7rem; text-transform: uppercase; letter-spacing: .1em; color: var(--muted-2); white-space: nowrap; padding-top: .3rem; }
.pp-row-s.cur { color: var(--orange); font-weight: 700; }
.pp-row.soon .pp-row-t { color: var(--muted-2); }
.pp-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; margin-top: 2.6rem; }
.pp-col + .pp-col { border-left: 1px solid var(--border); padding-left: 4rem; }
.pp-rows-c .pp-row { grid-template-columns: 1fr auto; }
.pp-hero1 { margin-top: 2.6rem; border: 1px solid var(--orange); border-radius: 12px; padding: 1.6rem 1.7rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; background: var(--bg-2); }
.pp-hero1 .pp-row-d { max-width: 60ch; }
.pp-suite-h { font-size: 1.15rem; font-weight: 700; letter-spacing: -.015em; margin: 0; }
.pp-panels { display: grid; grid-template-columns: 1fr 1fr; gap: 1.6rem; margin-top: 2.6rem; align-items: start; }
.pp-panel { position: relative; border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem 1.6rem 0.4rem; }
.pp-panel.reco { border-color: var(--orange); }
.pp-panel-count { font-family: var(--font-geist-mono), monospace; font-size: .68rem; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--muted-2); white-space: nowrap; }
.pp-panel .pp-rows { border-bottom: none; margin-top: 1rem; }
.pp-surf { margin-top: 1.15rem; background: var(--bg-2); border-radius: 10px; padding: .2rem 1.2rem; }
.pp-surf .pp-rows { border-bottom: none; margin-top: 0; }
.pp-reco-line { margin: .55rem 0 0; font-family: var(--font-geist-mono), monospace; font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--orange); }
@media (max-width: 860px) {
  .pp-cols, .pp-panels { grid-template-columns: 1fr; }
  .pp-col + .pp-col { border-left: none; padding-left: 0; margin-top: 2.5rem; }
  .pp-hero1 { grid-template-columns: 1fr; }
}
`;

function Quiz({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pp-quiz">
      <p>
        {compact
          ? "Tu hésites entre les deux ? Deux minutes de questions et on te dit où commencer."
          : "Pas sûr de ce qui te correspond ? Deux minutes de questions et on te dit où commencer. À faire une fois, jamais obligatoire."}
      </p>
      <Link href="/demarrer" className="btn btn-ghost">
        Faire le quiz →
      </Link>
    </div>
  );
}

function RowsConstruire({ compactCols = false }: { compactCols?: boolean }) {
  return (
    <div className={`pp-rows${compactCols ? " pp-rows-c" : ""}`}>
      {construire.map((m) => (
        <Link href="/module" className="pp-row" key={m.num}>
          {!compactCols && <span className="pp-row-n">{m.num}</span>}
          <span>
            <span className="pp-row-t">{m.title}</span>
            <span className="pp-row-d">{m.desc}</span>
          </span>
          <span className={`pp-row-s${m.cur ? " cur" : ""}`}>
            {m.cur ? "Commence ici →" : m.status}
          </span>
        </Link>
      ))}
    </div>
  );
}

function RowsAutomatiser({ compactCols = false }: { compactCols?: boolean }) {
  return (
    <div className={`pp-rows${compactCols ? " pp-rows-c" : ""}`}>
      {automatiser.map((m, i) => (
        <div className="pp-row soon" key={m.title}>
          {!compactCols && <span className="pp-row-n">{String(i + 1).padStart(2, "0")}</span>}
          <span>
            <span className="pp-row-t">{m.title}</span>
            <span className="pp-row-d">{m.desc}</span>
          </span>
          <span className="pp-row-s">Bientôt</span>
        </div>
      ))}
    </div>
  );
}

export default async function Proto({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v = "1" } = await searchParams;

  return (
    <div className="pgwrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Le parcours
      </div>
      <h1 className="pg-h1">
        Choisis <em>ce que tu veux faire</em>.
      </h1>
      <p className="pg-lead">
        Apprendre à construire tes propres produits, ou automatiser les tâches qui te bouffent du
        temps. Tout est là, commence par ce qui te parle.
      </p>

      {v === "1" && (
        <>
          <Quiz />
          <div className="pp-sec">
            <div className="pp-sec-head">
              <h2 className="pp-cat-h">Apprendre à construire</h2>
            </div>
            <p className="pp-cat-sub">
              Tu fabriques tes propres trucs, pas à pas, et tu montes en compétence. Le chemin fait
              partie de la valeur.
            </p>
            <RowsConstruire />
          </div>
          <div className="pp-sec">
            <div className="pp-sec-head">
              <h2 className="pp-cat-h">Automatiser ton business</h2>
              <span className="pp-soon-tag">En préparation</span>
            </div>
            <p className="pp-cat-sub">
              Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps. Un résultat,
              sans devoir tout construire.
            </p>
            <RowsAutomatiser />
          </div>
        </>
      )}

      {v === "2" && (
        <>
          <div className="pp-cols">
            <div className="pp-col">
              <h2 className="pp-cat-h">Apprendre à construire</h2>
              <p className="pp-cat-sub">
                Tu fabriques tes propres trucs, pas à pas, et tu montes en compétence.
              </p>
              <RowsConstruire compactCols />
            </div>
            <div className="pp-col">
              <div className="pp-sec-head">
                <h2 className="pp-cat-h">Automatiser ton business</h2>
                <span className="pp-soon-tag">En préparation</span>
              </div>
              <p className="pp-cat-sub">
                Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps.
              </p>
              <RowsAutomatiser compactCols />
            </div>
          </div>
          <div style={{ marginTop: "2.6rem" }}>
            <Quiz compact />
          </div>
        </>
      )}

      {v === "4" && (
        <>
          <div className="pp-panels">
            <div className="pp-panel reco">
              <span className="pc-reco-tag">Conseillé d&apos;après ton quiz</span>
              <div className="pp-sec-head">
                <h2 className="pp-cat-h" style={{ fontSize: "1.6rem" }}>
                  Apprendre à construire
                </h2>
                <span className="pp-panel-count">3 modules</span>
              </div>
              <p className="pp-cat-sub">
                Tu fabriques tes propres trucs, pas à pas, et tu montes en compétence.
              </p>
              <RowsConstruire compactCols />
            </div>
            <div className="pp-panel">
              <div className="pp-sec-head">
                <h2 className="pp-cat-h" style={{ fontSize: "1.6rem" }}>
                  Automatiser ton business
                </h2>
                <span className="pp-panel-count">En préparation</span>
              </div>
              <p className="pp-cat-sub">
                Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps.
              </p>
              <RowsAutomatiser compactCols />
            </div>
          </div>
          <div style={{ marginTop: "2rem" }}>
            <Quiz compact />
          </div>
        </>
      )}

      {v === "5" && (
        <>
          <div className="pp-cols" style={{ gap: "0 3.5rem" }}>
            <div className="pp-col">
              <h2 className="pp-cat-h">Apprendre à construire</h2>
              <p className="pp-reco-line">Conseillé d&apos;après ton quiz</p>
              <p className="pp-cat-sub">
                Tu fabriques tes propres trucs, pas à pas, et tu montes en compétence.
              </p>
              <div className="pp-surf">
                <RowsConstruire compactCols />
              </div>
            </div>
            <div className="pp-col" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <div className="pp-sec-head">
                <h2 className="pp-cat-h">Automatiser ton business</h2>
                <span className="pp-soon-tag">En préparation</span>
              </div>
              <p className="pp-cat-sub" style={{ marginTop: "1.5rem" }}>
                Tu mets l&apos;IA au travail sur les tâches qui te font perdre du temps.
              </p>
              <div className="pp-surf">
                <RowsAutomatiser compactCols />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "2.4rem" }}>
            <Quiz compact />
          </div>
        </>
      )}

      {v === "3" && (
        <>
          <div className="pp-hero1">
            <span>
              <span className="label">Commence ici · Module 01</span>
              <span className="pp-row-t" style={{ fontSize: "1.5rem", marginTop: ".4rem" }}>
                Faire un site
              </span>
              <span className="pp-row-d">
                De ton idée à en ligne : tu construis TON site en apprenant les vrais outils au
                passage. Aucune connaissance requise, c&apos;est le point de départ de tout le
                monde.
              </span>
            </span>
            <Link href="/module" className="btn">
              Commencer →
            </Link>
          </div>
          <p className="pp-cat-sub" style={{ marginTop: ".8rem" }}>
            Pas sûr que ce soit pour toi ?{" "}
            <Link href="/demarrer" style={{ textDecoration: "underline" }}>
              Fais le quiz, deux minutes.
            </Link>
          </p>
          <div className="pp-sec">
            <div className="pp-sec-head">
              <h2 className="pp-cat-h" style={{ fontSize: "1.45rem" }}>
                La suite : apprendre à construire
              </h2>
            </div>
            <div className="pp-rows pp-rows-c">
              {construire.slice(1).map((m) => (
                <Link href="/module" className="pp-row" key={m.num}>
                  <span>
                    <span className="pp-row-t">{m.title}</span>
                    <span className="pp-row-d">{m.desc}</span>
                  </span>
                  <span className="pp-row-s">{m.status}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="pp-sec">
            <div className="pp-sec-head">
              <h2 className="pp-cat-h" style={{ fontSize: "1.45rem" }}>
                Automatiser ton business
              </h2>
              <span className="pp-soon-tag">En préparation</span>
            </div>
            <RowsAutomatiser compactCols />
          </div>
        </>
      )}
    </div>
  );
}
