// Le juge du module 2 : un skill est un fichier local, sans URL. Le serveur ne peut pas
// y accéder, alors l'utilisateur colle le contenu de son SKILL.md. On vérifie une checklist
// gratuite côté serveur (pas d'API payante) et on renvoie un verdict + l'étape à reprendre.

type Critere = { key: string; label: string; ok: boolean; etape: string; detail?: string };

const MAX_LEN = 50000;

// Nettoie un collage imparfait : la personne colle souvent la réponse entière de
// Claude Code (phrase d'intro, numéros de ligne, clôtures de bloc de code) au lieu
// du seul contenu du fichier. On rattrape ce qu'on peut avant de juger.
function cleanPaste(raw: string): string {
  let text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");

  // Clôtures de bloc de code markdown (```yaml, ``` …).
  text = text
    .split("\n")
    .filter((l) => !/^\s*```/.test(l.trim()))
    .join("\n");

  // Numéros de ligne en tête (« 1→--- », « 12 | name: … », «   3: … ») : on ne les
  // retire que si la majorité des lignes en ont, pour ne pas abîmer un vrai contenu.
  const lines = text.split("\n");
  const numRe = /^\s*\d+\s*(?:→|\||:|\t| {2})\s?/;
  const numbered = lines.filter((l) => l.trim() !== "" && numRe.test(l)).length;
  const nonEmpty = lines.filter((l) => l.trim() !== "").length;
  if (nonEmpty > 0 && numbered / nonEmpty > 0.6) {
    text = lines.map((l) => l.replace(numRe, "")).join("\n");
  }

  // Texte d'intro avant le fichier (« Voici ton skill : » …) : on démarre à la
  // première ligne --- si elle n'est pas déjà au début.
  const firstDash = text.split("\n").findIndex((l) => /^\s*---\s*$/.test(l));
  if (firstDash > 0) {
    text = text.split("\n").slice(firstDash).join("\n");
  }

  return text;
}

function parseFrontmatter(raw: string): { fm: string | null; body: string } {
  const text = cleanPaste(raw);
  // Frontmatter YAML entre deux lignes ---, tout en haut du fichier.
  const m = text.match(/^\s*---\s*\n([\s\S]*?)\n---\s*(?:\n([\s\S]*))?$/);
  if (!m) return { fm: null, body: text.trim() };
  return { fm: m[1], body: (m[2] ?? "").trim() };
}

function extractField(fm: string, key: string): string | null {
  const lines = fm.split("\n");
  const re = new RegExp(`^${key}\\s*:\\s*(.*)$`, "i");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(re);
    if (!m) continue;
    let val = m[1].trim();
    // Bloc YAML multi-lignes (| ou >) : on ramasse les lignes indentées qui suivent.
    if (/^[|>][-+]?$/.test(val) || val === "") {
      const collected: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (/^\s+\S/.test(lines[j])) collected.push(lines[j].trim());
        else if (lines[j].trim() === "") collected.push("");
        else break;
      }
      val = collected.join(" ").trim();
    } else {
      // Scalaire "plain" replié sur plusieurs lignes (style généré par les sérialiseurs
      // YAML) : les lignes indentées qui suivent, tant qu'elles ne sont pas une nouvelle
      // clé, font partie de la même valeur. Sans ça, on ne lirait que la première ligne
      // d'une longue description et on recalerait des skills parfaitement bons.
      for (let j = i + 1; j < lines.length; j++) {
        if (/^\s+\S/.test(lines[j]) && !/^\s*[\w-]+\s*:(\s|$)/.test(lines[j])) {
          val += " " + lines[j].trim();
        } else break;
      }
    }
    return val.replace(/^["']|["']$/g, "").trim();
  }
  return null;
}

// Un nom de skill = le nom d'un dossier : minuscules, chiffres, tirets ou underscores, sans espace.
const NAME_RE = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

// Marqueurs qui signalent que la description dit bien QUAND utiliser le skill.
const WHEN_CUES = [
  "use when",
  "quand",
  "lorsqu",
  "dès que",
  "des que",
  "si tu",
  "si je",
  "si l",
  "when ",
  "à utiliser quand",
  "a utiliser quand",
  "se déclenche",
  "se declenche",
  "chaque fois",
  "trigger",
];

function deburr(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

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

  // Le champ peut arriver dans n'importe quel type (client tiers, appel manuel) :
  // on ne suppose pas que c'est une chaîne, sinon .slice() plante en 500.
  const champ = (body as { contenu?: unknown }).contenu;
  const contenu = typeof champ === "string" ? champ.slice(0, MAX_LEN) : "";
  if (!contenu.trim()) {
    return Response.json(
      { error: "Colle le contenu de ton fichier SKILL.md pour que le juge puisse le lire." },
      { status: 400 },
    );
  }

  const { fm, body: instructions } = parseFrontmatter(contenu);
  const name = fm ? extractField(fm, "name") : null;
  const description = fm ? extractField(fm, "description") : null;

  const nameOk = !!name && NAME_RE.test(name);
  const descPresent = !!description && description.trim().length >= 15;

  const descText = deburr(description ?? "");
  const descLen = (description ?? "").trim().length;
  const hasWhenCue = WHEN_CUES.some((c) => descText.includes(deburr(c)));
  // Elle dit "quand" si elle a un marqueur de déclenchement (même courte), ou si elle
  // est assez détaillée pour l'impliquer.
  const descWhenOk = descPresent && (hasWhenCue || descLen >= 90);

  const instrOk = instructions.trim().length >= 30;

  const criteres: Critere[] = [
    {
      key: "frontmatter",
      label: "Ton fichier a un en-tête (le bloc entre deux ---)",
      ok: !!fm,
      etape: "2",
      detail: fm
        ? undefined
        : "on ne trouve pas le bloc --- en haut. Tu as peut-être copié plus (ou moins) que le contenu du fichier : demande à Claude Code « montre-moi uniquement le contenu de mon fichier SKILL.md, en entier », copie exactement ça et recolle-le ici",
    },
    {
      key: "name",
      label: "Ton skill a un nom valide",
      ok: nameOk,
      etape: "2",
      detail: nameOk
        ? undefined
        : name
          ? "un nom s'écrit en minuscules avec des tirets, sans espace (ex. documente-mon-projet)"
          : "il manque le champ name dans l'en-tête",
    },
    {
      key: "description",
      label: "Ton skill a une description",
      ok: descPresent,
      etape: "2",
      detail: descPresent
        ? undefined
        : description
          ? "ta description est trop courte pour dire quelque chose d'utile"
          : "il manque le champ description dans l'en-tête",
    },
    {
      key: "description-quand",
      label: "La description dit quand utiliser le skill",
      ok: descWhenOk,
      etape: "3",
      detail: descWhenOk
        ? undefined
        : "ajoute quand ton skill doit se déclencher, par exemple : « à utiliser quand je prépare un article »",
    },
    {
      key: "instructions",
      label: "Ton skill a des instructions",
      ok: instrOk,
      etape: "2",
      detail: instrOk ? undefined : "le corps du skill (tes instructions) est vide ou très court",
    },
  ];

  const allOk = criteres.every((c) => c.ok);
  const premierManque = criteres.find((c) => !c.ok);

  const message = allOk
    ? "Ton skill est bien formé : un nom valide, une description qui dit quand l'utiliser, et de vraies instructions. Il a tout ce qu'il faut pour se déclencher au bon moment."
    : `Il manque encore quelque chose : ${premierManque?.label.toLowerCase()}${premierManque?.detail ? " (" + premierManque.detail + ")" : ""}. Retourne à l'étape ${premierManque?.etape}, corrige, et repasse le juge. Tu y es presque.`;

  return Response.json({
    valide: allOk,
    criteres,
    message,
    // Le juge lit le fichier, mais il ne peut pas le lancer à la place de l'utilisateur.
    aTesterToiMeme:
      "Le juge vérifie que ton skill est bien écrit, mais il ne peut pas le lancer à ta place. Seul toi peux confirmer qu'il se déclenche vraiment au bon moment sur ta machine : teste-le pour de vrai (étape 3). Et pour une revue de fond, fais-le passer par le skill Improve (offert).",
  });
}
