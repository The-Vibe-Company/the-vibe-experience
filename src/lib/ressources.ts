import { etapesDetail, type EtapeDetail } from "./module-faire-un-site";
import { etapesDetailSkill, skillGifts } from "./module-creer-un-skill";

export type Cost = "gratuit" | "gratuit-debut" | "payant";

export const costLabel: Record<Cost, string> = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

export type ActionRessource =
  | { kind: "parcours"; href: string }
  | { kind: "installer"; href: string; name: string }
  | { kind: "copier" };

export type Ressource = {
  cat: "outils" | "skills" | "prompts";
  type: string;
  title: string;
  text: string;
  cost?: Cost;
  optionnel?: boolean;
  prompt?: string;
  action: ActionRessource;
};

// Les prompts affichés sont ceux des modules, pas des copies : si un module
// change son prompt, la page Ressources suit. Le paramètre debut ancre le
// lookup au contenu : si les sous-étapes sont réordonnées, le build casse au
// lieu d'afficher le mauvais prompt sous un titre devenu faux.
function promptDuParcours(etapes: EtapeDetail[], slug: string, sousIndex: number, debut: string): string {
  const p = etapes.find((e) => e.slug === slug)?.sous[sousIndex]?.prompt;
  if (!p) throw new Error(`Prompt introuvable dans le parcours : étape ${slug}, sous-étape ${sousIndex + 1}`);
  if (!p.startsWith(debut)) {
    throw new Error(
      `Le prompt de l'étape ${slug}, sous-étape ${sousIndex + 1} ne commence plus par « ${debut} » : mettre à jour la page Ressources (titre, texte, index).`
    );
  }
  return p;
}

function skillOffert(slug: string) {
  const g = skillGifts.find((x) => x.slug === slug);
  if (!g) throw new Error(`Skill offert introuvable : ${slug}`);
  return g;
}

const creator = skillOffert("create-skill-tools");
const improve = skillOffert("improve-skill-tools");

export const ressources: Ressource[] = [
  // Outils : ceux que le parcours installe ou utilise vraiment, avec leur vrai coût.
  {
    cat: "outils",
    type: "Outil",
    title: "Claude Code",
    text: "Ton atelier. Tu construis en parlant à l'IA, elle écrit le code pour toi. Le plan Pro, environ 20 $ par mois, suffit pour tout le parcours : pas besoin d'un plan plus cher.",
    cost: "payant",
    action: { kind: "parcours", href: "/module/0" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "Le terminal",
    text: "La fenêtre où tu écris du texte à l'ordinateur au lieu de cliquer. Déjà sur ton Mac, rien à installer : tu l'apprivoises à l'étape 2 du module Faire un site.",
    cost: "gratuit",
    action: { kind: "parcours", href: "/module/2" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "Homebrew",
    text: "L'installateur du terminal. Une commande pour installer ce qu'il te faut, sans galérer.",
    cost: "gratuit",
    action: { kind: "parcours", href: "/module/2" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "GitHub",
    text: "Le coffre-fort de ton code : rien ne se perd, et c'est aussi ce qui sert à mettre ton site en ligne. Le plan gratuit suffit pour le parcours.",
    cost: "gratuit-debut",
    action: { kind: "parcours", href: "/module/2" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "Supabase",
    text: "Les comptes et la base de données de tes utilisateurs. Le plan gratuit suffit largement pour un premier site.",
    cost: "gratuit-debut",
    action: { kind: "parcours", href: "/module/4" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "Vercel",
    text: "L'hébergeur : il met ton site en ligne en un clic et te donne un lien à partager. Gratuit pour un projet perso comme celui du parcours.",
    cost: "gratuit-debut",
    action: { kind: "parcours", href: "/module/5" },
  },
  {
    cat: "outils",
    type: "Outil",
    title: "SuperWhisper",
    text: "Pour parler à l'IA au lieu de tout taper. Purement optionnel : c'est du confort et du temps gagné, ça ne change rien aux modules ni au résultat.",
    cost: "payant",
    optionnel: true,
    action: { kind: "parcours", href: "/module" },
  },

  // Skills : ceux que le parcours utilise, et les deux qu'on donne.
  {
    cat: "skills",
    type: "Skill",
    title: "Impeccable",
    text: "Le skill qui rend ton interface propre et pro, sans être designer. Tu l'utilises à l'étape 3 du module Faire un site, qui t'explique aussi comment l'installer.",
    action: { kind: "parcours", href: "/module/3" },
  },
  {
    cat: "skills",
    type: "Skill",
    title: "Agent Browser",
    text: "L'IA qui parcourt ton site comme un vrai visiteur et repère ce qui cloche. Il tourne en boucle avec Impeccable à l'étape 3 du module Faire un site.",
    action: { kind: "parcours", href: "/module/3" },
  },
  {
    cat: "skills",
    type: "Skill",
    title: creator.n,
    text: `${creator.d} On te le donne au module Créer ton premier skill.`,
    action: { kind: "installer", href: creator.href, name: creator.n },
  },
  {
    cat: "skills",
    type: "Skill",
    title: improve.n,
    text: `${improve.d} Offert lui aussi, au même module.`,
    action: { kind: "installer", href: improve.href, name: improve.n },
  },

  // Prompts : les prompts exacts fournis dans les modules, prêts à copier.
  {
    cat: "prompts",
    type: "Prompt",
    title: "Démarrer ton site",
    text: "Le prompt de l'étape 1.2 du module Faire un site, celui qui m'a donné mon premier site, une liste d'animés. Il te fait un premier site de débutant pour te lancer, pas un site pro.",
    prompt: promptDuParcours(etapesDetail, "1", 1, "Fais-moi un site pour"),
    action: { kind: "copier" },
  },
  {
    cat: "prompts",
    type: "Prompt",
    title: "Voir ton site en local",
    text: "Le prompt de l'étape 1.3, pour lancer ton site sur ta machine et l'ouvrir dans ton navigateur.",
    prompt: promptDuParcours(etapesDetail, "1", 2, "Lance mon site en local"),
    action: { kind: "copier" },
  },
  {
    cat: "prompts",
    type: "Prompt",
    title: "Automatiser tes sauvegardes GitHub",
    text: "Le prompt de l'étape 2.3. Tu le donnes une fois, et tes changements partent tout seuls sur GitHub.",
    prompt: promptDuParcours(etapesDetail, "2", 2, "À partir de maintenant"),
    action: { kind: "copier" },
  },
  {
    cat: "prompts",
    type: "Prompt",
    title: "Ta première loop : Impeccable + Agent Browser",
    text: "Le prompt de l'étape 3.4. Tes deux skills s'enchaînent tout seuls, vérif, test, correction, jusqu'à ce que tout soit propre.",
    prompt: promptDuParcours(etapesDetail, "3", 3, "Fais travailler tes deux skills"),
    action: { kind: "copier" },
  },
  {
    cat: "prompts",
    type: "Prompt",
    title: "Ajouter une fonctionnalité en étant guidé",
    text: "Le prompt de l'étape 4.2, écrit pour les débutants : l'IA s'arrête et t'attend à chaque fois qu'il faut créer un compte ou copier une clé.",
    prompt: promptDuParcours(etapesDetail, "4", 1, "Je veux ajouter"),
    action: { kind: "copier" },
  },
  {
    cat: "prompts",
    type: "Prompt",
    title: "Créer un skill avec un simple prompt",
    text: "Celui de l'étape 2.1 du module Créer ton premier skill. Tu décris ce que tu répètes, quand ça doit se déclencher, ce que ça doit faire. Pas besoin d'outil en plus.",
    prompt: promptDuParcours(etapesDetailSkill, "2", 0, "Crée-moi un skill"),
    action: { kind: "copier" },
  },
];
