import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Page d'accueil publique : présenter le produit, créer un compte, passer le
// quiz. Tout est centré, dans l'esprit d'une page produit. Une fois connecté,
// on n'y repasse pas : direction le parcours.

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/parcours");

  return (
    <div className="hwrap hcen">
      <section className="hcen-hero">
        <div className="hsup">Le fil rouge · The Vibe Company</div>
        <h1 className="hh1">
          Deviens builder avec l&apos;IA. <em>En partant de zéro.</em>
        </h1>
        <p className="hlead">
          Le parcours réel de quelqu&apos;un qui n&apos;avait jamais codé, qui construit un vrai
          produit avec l&apos;IA, et te montre exactement comment refaire la même chose.
        </p>
        <div className="hcta">
          <Link href="/inscription" className="btn">
            Crée ton compte gratuit
          </Link>
          <Link href="/demarrer" className="hcta-link">
            Ou passe le quiz d&apos;orientation (2 min) →
          </Link>
        </div>
      </section>

      <div className="hcen-art">
        <Image
          src="/hero.png"
          alt="Victor en train de builder son site avec la mascotte The Vibe Company"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 880px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="hfacts">
        <span>0 ligne de code au départ</span>
        <span className="hfsep">·</span>
        <span>1 vrai produit en ligne</span>
        <span className="hfsep">·</span>
        <span>100 % construit avec l&apos;IA</span>
      </div>

      <section className="hsec">
        <div className="label">Comment ça marche</div>
        <h2 className="hh2">Tu apprends en construisant.</h2>
        <div className="hcen-points">
          <div className="hcen-point">
            <strong>Choisis ton chemin</strong>
            <p>
              Apprendre à construire tes propres produits, ou automatiser les tâches qui te
              bouffent du temps. Si tu hésites, le quiz t&apos;oriente en deux minutes.
            </p>
          </div>
          <div className="hcen-point">
            <strong>Construis pour de vrai</strong>
            <p>
              Des modules guidés, étape par étape. Chacun se termine par un truc qui existe : ton
              site en ligne, ton skill qui tourne. Pas un quiz de fin, pas un certificat.
            </p>
          </div>
          <div className="hcen-point">
            <strong>Avance à ton rythme</strong>
            <p>
              Ta progression est gardée sur ton compte. Tu t&apos;arrêtes quand tu veux, tu reprends
              exactement où tu en étais, sur n&apos;importe quelle machine.
            </p>
          </div>
        </div>
      </section>

      <section className="hfin">
        <h2 className="hh2">Prêt à te lancer ?</h2>
        <p className="hp">
          Crée ton compte, choisis ton parcours, et dans une heure ou deux tu as quelque chose qui
          tourne sur ta machine.
        </p>
        <div className="hcta">
          <Link href="/inscription" className="btn">
            Créer mon compte
          </Link>
          <Link href="/parcours" className="hcta-link">
            Découvrir le parcours →
          </Link>
        </div>
      </section>
    </div>
  );
}
