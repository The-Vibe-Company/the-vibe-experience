// Le juge : visite le site déployé, vérifie la checklist technique du module,
// et renvoie un verdict + l'étape à reprendre. Sans jugement de goût.

type Critere = {
  key: string;
  label: string;
  ok: boolean;
  etape: string;
  detail?: string;
};

function normalizeUrl(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const withProto = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  try {
    const u = new URL(withProto);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    const host = u.hostname.toLowerCase();
    // Garde-fou basique : pas de localhost / adresses privées.
    if (
      host === "localhost" ||
      host.startsWith("127.") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.endsWith(".local")
    ) {
      return null;
    }
    return u.toString();
  } catch {
    return null;
  }
}

function textFromHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchWithTimeout(url: string, ms: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": "TheVibeExperience-Juge/1.0" },
    });
  } finally {
    clearTimeout(id);
  }
}

function deburr(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Marqueurs des templates de démo laissés tels quels (pas le vrai contenu de la personne).
const BOILERPLATE = [
  "lorem ipsum",
  "get started by editing",
  "save and see your changes",
  "create next app",
  "welcome to next.js",
  "app/page.tsx",
  "read our docs",
  "deploy now",
  "edit src/app",
];

// Mots vides : trop courants pour être distinctifs d'un sujet.
const STOPWORDS = new Set([
  "le", "la", "les", "un", "une", "des", "de", "du", "pour", "mes", "mon", "ma", "tes", "ton",
  "ta", "ses", "son", "sa", "et", "ou", "au", "aux", "qui", "que", "quoi", "sur", "avec", "en",
  "dans", "par", "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "ce", "cet",
  "cette", "ces", "est", "sont", "plus", "tout", "tous", "site", "page", "web", "internet",
  "faire", "creer", "monter", "preferes", "prefere",
]);

// Vérification gratuite, côté serveur : le contenu de la page colle-t-il au sujet déclaré ?
// Le titre d'onglet est vérifié à part (critère dédié) : ici on ne juge que le corps de la page.
function judgeSubject(sujet: string, pageText: string): { ok: boolean; detail?: string } {
  const text = deburr(pageText);

  // 1. Template de démo laissé en l'état ?
  if (BOILERPLATE.some((b) => text.includes(deburr(b)))) {
    return {
      ok: false,
      detail:
        "on dirait encore le template de démo. Dis à Claude Code : « il reste du texte du template de départ sur mon site, remplace-le par mon vrai contenu »",
    };
  }

  // 2. Les mots-clés du sujet se retrouvent-ils dans la page ?
  const keywords = Array.from(
    new Set(
      deburr(sujet)
        .split(/[^a-z0-9]+/)
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w)),
    ),
  );
  if (keywords.length === 0) {
    // Sujet trop générique pour être vérifié : on ne pénalise pas.
    return { ok: text.length > 60 };
  }
  const bases = keywords.map((w) => (w.length > 4 ? w.replace(/s$/, "") : w));
  const matched = bases.filter((b) => text.includes(b)).length;
  const needed = keywords.length <= 2 ? 1 : Math.ceil(keywords.length * 0.4);
  if (matched >= needed) return { ok: true };
  return {
    ok: false,
    detail:
      "le contenu ne semble pas parler de ton sujet. Si tu es sûr que si, reformule ton sujet avec des mots qui apparaissent vraiment sur ta page, ou laisse le champ sujet vide, il est optionnel",
  };
}

export async function POST(request: Request) {
  let body: { url?: string; sujet?: string; repoUrl?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const url = normalizeUrl(body.url ?? "");
  const sujet = (body.sujet ?? "").trim();
  if (!url) {
    return Response.json(
      { error: "Donne l'adresse en ligne de ton site (ton lien .vercel.app, pas localhost)." },
      { status: 400 },
    );
  }

  // Visite du site déployé.
  let status = 0;
  let html = "";
  let reachable = true;
  try {
    const res = await fetchWithTimeout(url, 12000);
    status = res.status;
    html = await res.text();
  } catch {
    reachable = false;
  }

  const lowerHtml = html.toLowerCase();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const pageText = textFromHtml(html);
  const hasInteractive = /<a\s[^>]*href|<button/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(lowerHtml);

  // App construite dans le navigateur (le HTML brut est une coquille vide + scripts) :
  // le site marche peut-être très bien, mais le juge ne peut pas le voir. On le dit
  // clairement au lieu de laisser croire que le site est vide.
  const looksJsShell =
    /<div[^>]+id=["'](?:root|app|__next)["']/i.test(html) || /<script[^>]+src=/i.test(html);
  const pageOk = reachable && title.length > 0 && pageText.length > 60;
  const pageDetail = pageOk
    ? undefined
    : !reachable
      ? undefined
      : pageText.length <= 60 && looksJsShell
        ? "ta page se construit avec JavaScript, le juge ne voit que le HTML brut. Ton site marche peut-être très bien dans ton navigateur ! Dis à Claude Code : « le juge ne voit pas mon contenu sans JavaScript, rends le contenu principal de mon site visible directement dans le HTML (rendu côté serveur) », puis renvoie sur GitHub et repasse le juge"
        : title.length === 0
          ? "ta page n'a pas de titre d'onglet. Dis à Claude Code : « donne un vrai titre d'onglet à mon site »"
          : "la page semble presque vide (très peu de texte)";

  // Titre d'onglet resté celui du template : le site peut être bon, mais l'onglet trahit.
  const titleIsTemplate = title.length > 0 && BOILERPLATE.some((b) => deburr(title).includes(deburr(b)));

  const criteres: Critere[] = [
    {
      key: "enligne",
      label: "Ton site répond en ligne",
      ok: reachable && status >= 200 && status < 400,
      etape: "5",
      detail: reachable ? `réponse ${status}` : "le site n'a pas répondu",
    },
    {
      key: "page",
      label: "Une vraie page s'affiche (titre et contenu)",
      ok: pageOk,
      etape: "1",
      detail: pageDetail,
    },
    {
      key: "onglet",
      label: "Ton onglet porte le nom de ton site",
      ok: reachable && !titleIsTemplate,
      etape: "1",
      detail: titleIsTemplate
        ? `ton onglet affiche encore « ${title} », le titre du template de départ. Dis à Claude Code : « change le titre de l'onglet de mon site pour [le nom de ton site] »`
        : undefined,
    },
    {
      key: "interactif",
      label: "Il y a des boutons ou des liens",
      ok: hasInteractive,
      etape: "3",
    },
    {
      key: "mobile",
      label: "Le site est prêt pour le mobile",
      ok: hasViewport,
      etape: "3",
      detail: hasViewport ? undefined : "il manque la balise viewport",
    },
  ];

  // Repo GitHub, seulement si fourni.
  const repoRaw = (body.repoUrl ?? "").trim();
  if (repoRaw) {
    const repoUrl = /^https?:\/\//i.test(repoRaw) ? repoRaw : `https://${repoRaw}`;
    let repoOk = false;
    try {
      const u = new URL(repoUrl);
      if (u.hostname.toLowerCase().endsWith("github.com")) {
        const parts = u.pathname.replace(/^\/+/, "").split("/");
        if (parts.length >= 2 && parts[0] && parts[1]) {
          const owner = parts[0];
          const repo = parts[1].replace(/\.git$/, "");
          // API GitHub : 200 = repo public existant, plus fiable que la page HTML.
          const rr = await fetchWithTimeout(
            `https://api.github.com/repos/${owner}/${repo}`,
            8000,
          );
          repoOk = rr.status === 200;
        }
      }
    } catch {
      repoOk = false;
    }
    criteres.push({
      key: "github",
      label: "Ton code est sauvegardé sur GitHub",
      ok: repoOk,
      etape: "2",
    });
  }

  // Le contenu correspond-il au sujet ? Vérification gratuite côté serveur (pas d'API payante).
  if (sujet && reachable) {
    const sub = judgeSubject(sujet, pageText);
    criteres.splice(2, 0, {
      key: "sujet",
      label: "Le contenu correspond à ton idée",
      ok: sub.ok,
      etape: "1",
      detail: sub.ok ? undefined : sub.detail,
    });
  }

  const allOk = criteres.every((c) => c.ok);
  const premierManque = criteres.find((c) => !c.ok);

  const message = allOk
    ? "Tout est bon côté technique, bravo. Ton site est en ligne, il répond, il a du contenu qui parle bien de ton sujet, et il est prêt pour le mobile."
    : `Il manque encore quelque chose : ${premierManque?.label.toLowerCase()}${premierManque?.detail ? " (" + premierManque.detail + ")" : ""}. Retourne à l'étape ${premierManque?.etape}, corrige, et repasse le juge. Tu y es presque.`;

  return Response.json({
    valide: allOk,
    criteres,
    message,
    // La fonctionnalité (comptes, formulaire) ne se vérifie pas d'une simple visite.
    aTesterToiMeme:
      "Ta ou tes fonctionnalités (comptes, formulaire…) ne peuvent pas être vérifiées d'une simple visite. Teste-les toi-même de bout en bout sur ton lien en ligne, comme un vrai visiteur (étape 4).",
  });
}
