// Text helpers for WordPress content (titles and excerpts arrive as HTML with entities).

const NAMED: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", laquo: "«", raquo: "»",
};

export function decodeEntities(text = ""): string {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

/** Plain text from an HTML fragment. */
export function plainText(html = ""): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** "5 min de leitura" (200 words per minute). */
export function readingTime(html = ""): string {
  const words = plainText(html).split(" ").filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min de leitura`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

/** First sentence-ish chunk of a long text, for ledes and card summaries. */
export function summary(text = "", max = 160): string {
  const t = plainText(text);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
