import Link from "next/link";

export const metadata = { title: "Journal de bord — The Vibe Experience" };

const entries = [
  {
    date: "Sem. 12",
    title: "Comment j'ai posé les bases du fil rouge",
    text: "Définir le public, la promesse et le parcours avant d'écrire une ligne. Pourquoi ce cadrage m'a évité de partir dans tous les sens.",
    read: "6 min",
  },
  {
    date: "Sem. 10",
    title: "Mon premier site, du prompt à la mise en ligne",
    text: "Le récit complet de mon tout premier site, celui sur les animés. Ce qui a marché du premier coup, et ce qui m'a fait galérer.",
    read: "9 min",
  },
  {
    date: "Sem. 08",
    title: "Les outils que j'utilise pour builder sans savoir coder",
    text: "Ma stack du moment et pourquoi je l'ai choisie. Comment je parle à l'IA pour qu'elle produise ce que j'ai en tête.",
    read: "7 min",
  },
  {
    date: "Sem. 06",
    title: "Le jour où j'ai cassé mon site (et comment je l'ai réparé)",
    text: "Un vrai blocage, la panique, puis la méthode pour s'en sortir avec l'IA sans tout comprendre du code.",
    read: "5 min",
  },
  {
    date: "Sem. 04",
    title: "Mes premières erreurs de débutant, assumées",
    text: "Les réflexes que je n'avais pas, les pièges où je suis tombé, et ce que je ferais différemment aujourd'hui.",
    read: "6 min",
  },
  {
    date: "Sem. 01",
    title: "J'arrive chez The Vibe Company, je n'ai jamais codé",
    text: "Le point de départ. Pourquoi je me lance, ce que je vise, et à quoi ressemble le zéro absolu.",
    read: "4 min",
  },
];

export default function Journal() {
  const [feat, ...rest] = entries;
  return (
    <div className="nwrap">
      <div className="crumb">
        <Link href="/">Accueil</Link>
        <span className="sep">/</span>
        <span>Journal de bord</span>
      </div>
      <div className="label" style={{ marginTop: "1.1rem" }}>
        Journal de bord
      </div>
      <h1 className="pg-h1">
        Ce que j&apos;apprends, <em>en direct</em>.
      </h1>
      <p className="pg-lead">
        Les vraies étapes, les blocages, les décisions et les déclics, au fur et à mesure que je
        construis. Rien n&apos;est lissé, les erreurs sont dedans aussi.
      </p>

      <Link href="/journal" className="jfeat">
        <span className="jfeat-cap">Dernière entrée · {feat.date}</span>
        <span className="jfeat-title">{feat.title}</span>
        <span className="jfeat-text">{feat.text}</span>
        <span className="jfeat-link">Lire l&apos;entrée →</span>
      </Link>

      <div className="jfil">
        {rest.map((e) => (
          <Link className="jrow" href="/journal" key={e.title}>
            <span className="jrow-date">{e.date}</span>
            <span>
              <span className="jrow-title">{e.title}</span>
              <span className="jrow-text" style={{ display: "block" }}>
                {e.text}
              </span>
            </span>
            <span className="jrow-read">{e.read}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
