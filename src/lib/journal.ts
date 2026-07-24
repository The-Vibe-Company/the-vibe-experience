// Journal de bord = les articles « Victor's Story » publiés sur thevibecompany.co,
// récupérés automatiquement. Dès que Victor publie, l'article remonte ici tout seul
// (rafraîchi par ISR). On ne recopie rien à la main.

const SITE = "https://www.thevibecompany.co";
const REVALIDATE = 1800; // 30 min : nouvel article visible dans la demi-heure

// Calque « Avec le recul » : ce que Victor sait AUJOURD'HUI que l'article ne
// pouvait pas dire (ce qui a évolué depuis, si la leçon a tenu, une correction,
// un lien vers ce qui est venu après). PAS un résumé de l'article : s'il n'y a
// rien de neuf à ajouter, on laisse vide. Par slug.
const RECUL: Record<string, string> = {};

export type JournalEntry = {
  slug: string;
  title: string;
  date: string; // ISO
  dateLabel: string; // « 9 juil. »
  lead: string;
  bodyHtml: string;
  image?: string;
  recul?: string;
};

const MONTHS = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];

function decodeEntities(s: string): string {
  return s
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/").replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function frDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return "";
  const day = parseInt(m[3], 10);
  return `${day === 1 ? "1er" : day} ${MONTHS[parseInt(m[2], 10) - 1]}`;
}

const ALLOWED = new Set([
  "p", "h2", "h3", "h4", "ul", "ol", "li",
  "strong", "em", "b", "i", "a", "blockquote", "br", "code", "pre",
]);

function sanitize(html: string): string {
  html = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, "");
  return html
    .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (full, tagRaw, attrs) => {
      const tag = String(tagRaw).toLowerCase();
      if (!ALLOWED.has(tag)) return "";
      if (full[1] === "/") return `</${tag}>`;
      if (tag === "a") {
        const href = String(attrs).match(/\shref\s*=\s*"([^"]*)"/i);
        return href
          ? `<a href="${href[1]}" target="_blank" rel="noopener noreferrer">`
          : "<a>";
      }
      return `<${tag}>`;
    })
    .trim();
}

function extractBody(html: string): string | null {
  const re = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g;
  const START = /^\s*<(p|h1|h2|h3|ul|ol|blockquote)[\s>]/i;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    let s: string;
    try {
      s = JSON.parse(m[1]);
    } catch {
      continue;
    }
    let content = s;
    const pre = s.match(/^[0-9a-f]+:T[0-9a-f]+,([\s\S]*)$/);
    if (pre) content = pre[1];
    if (START.test(content)) return content;
  }
  return null;
}

function firstParagraph(bodyHtml: string): string {
  const m = bodyHtml.match(/<p>([\s\S]*?)<\/p>/i);
  if (!m) return "";
  const text = decodeEntities(m[1].replace(/<[^>]+>/g, "").trim());
  if (text.length <= 190) return text;

  const excerpt = text.slice(0, 187).trimEnd();
  const lastSpace = excerpt.lastIndexOf(" ");
  const cleanCut = lastSpace >= 140 ? excerpt.slice(0, lastSpace) : excerpt;
  return `${cleanCut.replace(/[,:;.!?]+$/, "")}.`;
}

async function fetchArticle(slug: string): Promise<JournalEntry | null> {
  let html: string;
  try {
    const res = await fetch(`${SITE}/resources/articles/${slug}`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    html = await res.text();
  } catch {
    return null;
  }
  // Filtre : seulement la section « Victor's Story ».
  if (!html.includes("Victor&#x27;s Story")) return null;

  const titleM = html.match(/<title>([^<]*)<\/title>/);
  const title = titleM
    ? decodeEntities(titleM[1]).replace(/\s*\|\s*The Vibe Company\s*/g, "").trim()
    : slug;

  const dateM = html.match(/article:published_time"\s+content="([0-9T:.\-]+)"/);
  const date = dateM ? dateM[1] : "";

  const rawBody = extractBody(html);
  if (!rawBody) return null;
  const bodyHtml = sanitize(rawBody);

  const descM = html.match(/(?:og:description"\s+content|name="description"\s+content)="([^"]*)"/);
  const lead = descM ? decodeEntities(descM[1]) : firstParagraph(bodyHtml);

  const imgM = html.match(/og:image"\s+content="([^"]*)"/);
  const image = imgM ? imgM[1] : undefined;

  return { slug, title, date, dateLabel: frDate(date), lead, bodyHtml, image, recul: RECUL[slug] };
}

async function fetchSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${SITE}/sitemap.xml`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...new Set([...xml.matchAll(/resources\/articles\/([a-z0-9-]+)/g)].map((m) => m[1]))];
  } catch {
    return [];
  }
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const slugs = await fetchSlugs();
  const all = await Promise.all(slugs.map(fetchArticle));
  return all
    .filter((e): e is JournalEntry => e !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticle(slug: string): Promise<JournalEntry | null> {
  return fetchArticle(slug);
}
