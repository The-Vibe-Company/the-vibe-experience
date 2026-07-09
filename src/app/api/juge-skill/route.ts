// Le juge du module 2 : un skill est un fichier local, sans URL. Le serveur ne peut pas
// y accéder, alors l'utilisateur colle le contenu de son SKILL.md. On vérifie une checklist
// gratuite côté serveur (pas d'API payante) et on renvoie un verdict + l'étape à reprendre.

type Critere = { key: string; label: string; ok: boolean; etape: string; detail?: string };

const MAX_LEN = 50000;

function parseFrontmatter(raw: string): { fm: string | null; body: string } {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
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
  let body: { contenu?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const contenu = (body.contenu ?? "").slice(0, MAX_LEN);
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
  // Elle dit "quand" si elle a un marqueur de déclenchement, ou si elle est assez détaillée pour l'impliquer.
  const descWhenOk = descPresent && descLen >= 40 && (hasWhenCue || descLen >= 90);

  const instrOk = instructions.trim().length >= 30;

  const criteres: Critere[] = [
    {
      key: "frontmatter",
      label: "Ton fichier a un en-tête (le bloc entre deux ---)",
      ok: !!fm,
      etape: "2",
      detail: fm ? undefined : "on ne trouve pas le bloc --- en haut du fichier",
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
        : "ajoute quand ton skill doit se déclencher (par ex. « à utiliser quand… »)",
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
