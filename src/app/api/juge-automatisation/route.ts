// Le juge du module 3 : une automatisation vit sur la machine de l'utilisateur, le
// serveur ne peut ni la voir ni la déclencher. L'utilisateur colle donc sa CONSIGNE
// (le texte donné à Claude Code), et on vérifie les trois morceaux enseignés à
// l'étape 0 : un déclencheur clair, une action claire, un garde-fou. Checklist
// gratuite côté serveur (pas d'API payante), même modèle que le juge des skills.

type Critere = { key: string; label: string; ok: boolean; etape: string; detail?: string };

const MAX_LEN = 5000;

function deburr(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Déclencheur, famille « un événement » : quelque chose arrive.
const EVENT_CUES = [
  "a chaque fois",
  "chaque fois qu",
  "a chaque ",
  "des qu",
  "des que",
  "quand ",
  "lorsqu",
  "apres chaque",
  "avant chaque",
  "a la fin de chaque",
  "au moment ou",
];

// Déclencheur, famille « l'heure » : un rendez-vous.
const TIME_CUES = [
  "chaque lundi",
  "chaque mardi",
  "chaque mercredi",
  "chaque jeudi",
  "chaque vendredi",
  "chaque samedi",
  "chaque dimanche",
  "chaque jour",
  "chaque matin",
  "chaque soir",
  "chaque semaine",
  "chaque mois",
  "tous les jours",
  "tous les matins",
  "tous les soirs",
  "tous les lundis",
  "tous les vendredis",
  "toutes les semaines",
  "hebdomadaire",
  "quotidien",
  "midi",
  "minuit",
];

// Une heure écrite : « à 9h », « 17 h », « 9h30 ».
const HOUR_RE = /\b\d{1,2}\s*h(?:\d{2})?\b/;

// L'action : un verbe qui fait quelque chose.
const ACTION_CUES = [
  "envoie",
  "enregistre",
  "sauvegarde",
  "fais",
  "cree",
  "range",
  "prepare",
  "montre",
  "propose",
  "redige",
  "ecris",
  "mets",
  "genere",
  "publie",
  "supprime",
  "nettoie",
  "resume",
  "liste",
  "previens",
  "alerte",
  "corrige",
  "teste",
  "lance",
  "cherche",
  "choisis les",
  "dis-moi",
  "dis moi",
  "analyse",
  "classe",
  "trie",
  "compile",
  "construis",
  "ajoute",
  "releve",
  "surveille",
  "regarde",
  "verifie",
  "bloque",
];

// Le garde-fou : ce qui vérifie, bloque, ou garde l'humain au bout de la chaîne.
const GARDEFOU_CUES = [
  "bloque",
  "empeche",
  "refuse",
  "ne modifie pas",
  "ne modifie rien",
  "ne change rien",
  "ne touche pas",
  "ne touche a rien",
  "ne publie pas",
  "ne pousse pas",
  "ne pousse rien",
  "ne supprime rien",
  "n'envoie rien",
  "nenvoie rien",
  "rien sans",
  "pas sans moi",
  "sans mon accord",
  "je choisis",
  "je valide",
  "je decide",
  "que je valide",
  "ma validation",
  "mon accord",
  "demande-moi",
  "demande moi",
  "attends mon",
  "attends que je",
  "verifie que",
  "verifie qu",
  "verifie d'abord",
  "verifie dabord",
  "jamais",
  "seulement si",
  "sauf si",
  "uniquement si",
  "si ca casse",
  "sinon",
];

// Les repères se cherchent sur des MOTS entiers, jamais en sous-chaîne : sinon
// « industrie » contient « trie », « permets » contient « mets », et n'importe
// quelle phrase finit par cocher les trois critères.
function compile(cues: string[]): RegExp[] {
  return cues.map((c) => {
    const motif = deburr(c).trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|[^a-z0-9])${motif}(?:[^a-z0-9]|$)`);
  });
}

function hasCue(text: string, cues: RegExp[]): boolean {
  return cues.some((re) => re.test(text));
}

const EVENT_RE = compile(EVENT_CUES);
const TIME_RE = compile(TIME_CUES);
const ACTION_RE = compile(ACTION_CUES);
const GARDEFOU_RE = compile(GARDEFOU_CUES);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  // Un corps `null` ou non-objet est un JSON valide : sans ce garde, la lecture
  // du champ plante en 500 au lieu de renvoyer une erreur propre.
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  const champ = (body as { consigne?: unknown }).consigne;

  // Le champ peut arriver dans n'importe quel type (client tiers, appel manuel) :
  // on ne suppose pas que c'est une chaîne, sinon .slice() plante en 500.
  const consigne = typeof champ === "string" ? champ.slice(0, MAX_LEN) : "";
  if (consigne.trim().length < 15) {
    return Response.json(
      {
        error:
          "Colle la consigne de ton automatisation (le texte que tu as donné à Claude Code) pour que le juge puisse la lire.",
      },
      { status: 400 },
    );
  }

  const text = deburr(consigne);

  const eventOk = hasCue(text, EVENT_RE);
  const timeOk = hasCue(text, TIME_RE) || HOUR_RE.test(text);
  const declencheurOk = eventOk || timeOk;
  const famille =
    eventOk && timeOk ? "un événement et l'heure" : eventOk ? "un événement" : "l'heure";

  // Un verbe nié (« ne publie jamais », « ne modifie rien ») est un garde-fou, pas une
  // action : on retire ces tournures avant de chercher l'action.
  const actionText = text
    .replace(/\bne\s+\S+(?:\s+\S+)?\s+(?:pas|rien|jamais)\b/g, " ")
    .replace(/\bn'\S+\s+(?:pas|rien|jamais)\b/g, " ");
  const actionOk = hasCue(actionText, ACTION_RE);
  const gardefouOk = hasCue(text, GARDEFOU_RE);

  const criteres: Critere[] = [
    {
      key: "declencheur",
      label: "Ta consigne a un déclencheur clair",
      ok: declencheurOk,
      etape: "0",
      detail: declencheurOk
        ? `famille repérée : ${famille}`
        : "on ne trouve ni un événement (« à chaque fois que... ») ni un rendez-vous (« chaque vendredi à 17h »). Commence ta consigne par ce qui la réveille",
    },
    {
      key: "action",
      label: "Ta consigne a une action claire",
      ok: actionOk,
      etape: "1",
      detail: actionOk
        ? undefined
        : "on ne voit pas ce qu'elle FAIT : après le déclencheur, dis l'action avec un verbe (« envoie... », « prépare... », « range... »)",
    },
    {
      key: "gardefou",
      label: "Ta consigne a un garde-fou",
      ok: gardefouOk,
      etape: "2",
      detail: gardefouOk
        ? undefined
        : "ajoute la phrase de contrôle : « ne modifie pas mon site directement », « bloque si ça casse » ou « je choisis moi-même ce qui part ». Si tu as collé un seul hook et que ton garde-fou est ailleurs, colle plutôt ton automatisation complète : c'est l'ensemble qui doit tenir",
    },
  ];

  const allOk = criteres.every((c) => c.ok);
  const premierManque = criteres.find((c) => !c.ok);

  const message = allOk
    ? "Ton automatisation a ses trois morceaux : un déclencheur clair, une action claire, un garde-fou. C'est le format des automatisations solides."
    : `Il manque encore quelque chose : ${premierManque?.label.toLowerCase()}${premierManque?.detail ? " (" + premierManque.detail + ")" : ""}. Retourne à l'étape ${premierManque?.etape}, corrige ta consigne, et repasse le juge. Tu y es presque.`;

  return Response.json({
    valide: allOk,
    criteres,
    message,
    // Le juge lit la consigne, mais il ne voit pas la machine de l'utilisateur.
    aTesterToiMeme:
      "Le juge lit ta consigne, mais il ne voit pas ta machine : il ne peut pas vérifier que l'automatisation tourne vraiment. La preuve reste la même qu'aux étapes 1 et 3 : déclenche l'événement exprès, ou programme un passage d'essai dans 2 minutes, et regarde-la partir sans toi.",
  });
}
