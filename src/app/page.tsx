import Link from "next/link";
import Image from "next/image";
import ParcoursCta from "@/components/ParcoursCta";

export default function Home() {
  return (
    <div className="hwrap">
      <section className="hhero">
        <div className="hhero-left">
          <div className="hsup">Le fil rouge · The Vibe Company</div>
          <h1 className="hh1">
            Deviens builder avec l&apos;IA. <em>En partant de zéro.</em>
          </h1>
          <p className="hlead">
            Le parcours réel de quelqu&apos;un qui n&apos;avait jamais codé, qui construit un vrai
            produit avec l&apos;IA, et te montre exactement comment refaire la même chose.
          </p>
          <div className="hcta">
            <ParcoursCta />
            <a href="#parcours" className="hcta-link">
              Voir les modules ↓
            </a>
          </div>
        </div>
        <div className="hhero-right">
          <div className="hart">
            <Image
              src="/hero.png"
              alt="Victor en train de builder son site avec la mascotte The Vibe Company"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <div className="hfacts">
        <span>0 ligne de code au départ</span>
        <span className="hfsep">·</span>
        <span>1 vrai produit en ligne</span>
        <span className="hfsep">·</span>
        <span>100 % construit avec l&apos;IA</span>
      </div>

      <section className="hsec" id="parcours">
        <div className="label">Le parcours</div>
        <h2 className="hh2">Tu apprends en construisant.</h2>
        <p className="hp">
          Chaque module te fait construire pour de vrai. Un produit, puis un savoir-faire, et on
          recommence. Tu ne regardes pas une théorie, tu builds.
        </p>
        <div className="hmods">
          <Link className="hmod" href="/module">
            <span className="hmod-num">01</span>
            <span className="hmod-body">
              <span className="hmod-title">Faire un site</span>
              <span className="hmod-desc">
                Construis TON site, du premier écran en local jusqu&apos;à la mise en ligne, en
                apprenant les vrais outils au passage.
              </span>
              <span className="hmod-meta">Produit · 6 étapes · ≈ 4 à 5 h</span>
            </span>
          </Link>
          <Link className="hmod" href="/creer-un-skill">
            <span className="hmod-num">02</span>
            <span className="hmod-body">
              <span className="hmod-title">Créer ton premier skill</span>
              <span className="hmod-desc">
                Fabrique une compétence que tu apprends une fois à l&apos;IA et qu&apos;elle
                réutilise ensuite toute seule, sur tous tes projets.
              </span>
              <span className="hmod-meta">Savoir-faire · 5 étapes · ≈ 1 h 30</span>
            </span>
          </Link>
          <div className="hmod-more">
            Et on recommence : un produit, un savoir-faire, un produit. La suite s&apos;écrit en
            public.
          </div>
        </div>
      </section>

      <section className="htwo">
        <div className="htwo-col">
          <div className="label">Journal de bord</div>
          <h3 className="hh3">Ce que j&apos;apprends, en direct.</h3>
          <p className="hp">
            Les vraies étapes, les blocages, les déclics, semaine après semaine. Rien n&apos;est
            lissé.
          </p>
          <div className="hlist">
            <Link href="/journal" className="hlrow">
              <span className="hldate">Sem. 12</span>
              <span className="hltitle">Comment j&apos;ai posé les bases du fil rouge</span>
            </Link>
            <Link href="/journal" className="hlrow">
              <span className="hldate">Sem. 11</span>
              <span className="hltitle">Le juge : valider sans jamais noter</span>
            </Link>
            <Link href="/journal" className="hlrow">
              <span className="hldate">Sem. 10</span>
              <span className="hltitle">Mon premier site, du prompt à la mise en ligne</span>
            </Link>
          </div>
          <Link href="/journal" className="hmorelink">
            Tout le journal →
          </Link>
        </div>
        <div className="htwo-col">
          <div className="label">Ressources</div>
          <h3 className="hh3">Les prompts et templates que je réutilise.</h3>
          <p className="hp">Tout ce qui m&apos;a servi à avancer, prêt à copier pour ton projet.</p>
          <div className="hlist">
            <Link href="/ressources" className="hlrow2">
              <span>Prompts de démarrage</span>
              <span className="harrow">→</span>
            </Link>
            <Link href="/ressources" className="hlrow2">
              <span>Templates de page</span>
              <span className="harrow">→</span>
            </Link>
            <Link href="/ressources" className="hlrow2">
              <span>Checklist déploiement</span>
              <span className="harrow">→</span>
            </Link>
            <Link href="/ressources" className="hlrow2">
              <span>Erreurs à éviter</span>
              <span className="harrow">→</span>
            </Link>
          </div>
          <Link href="/ressources" className="hmorelink">
            Toutes les ressources →
          </Link>
        </div>
      </section>

      <section className="hfin">
        <h2 className="hh2">Prêt à builder ton premier produit ?</h2>
        <p className="hp">
          Commence maintenant. Dans une heure ou deux, tu as quelque chose qui tourne sur ta
          machine.
        </p>
        <ParcoursCta newHref="/module" newLabel="Commencer le module" />
      </section>
    </div>
  );
}
