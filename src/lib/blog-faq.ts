/**
 * Pulls the `## Frequently asked questions` section out of a post body and
 * returns the Q&A pairs as plain text. Used to emit FAQPage JSON-LD on
 * every post that has an FAQ, which is how LLM answer engines and Google
 * surface "People also ask" rich results.
 *
 * Expected format in the markdown:
 *   ## Frequently asked questions
 *
 *   ### Question one?
 *   First paragraph.
 *
 *   Second paragraph (optional).
 *
 *   ### Question two?
 *   ...
 */
export interface FaqPair {
  question: string;
  answer: string;
}

export function extractFaq(body: string): FaqPair[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  // Find the FAQ H2 (case-insensitive, allows variants like "FAQ" or "FAQs")
  const h2Index = lines.findIndex((l) => /^##\s+(frequently asked questions|faqs?)\b/i.test(l.trim()));
  if (h2Index === -1) return [];

  // Collect until next H2 or end.
  const section: string[] = [];
  for (let i = h2Index + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]!)) break;
    section.push(lines[i]!);
  }

  const pairs: FaqPair[] = [];
  let currentQ: string | null = null;
  let currentA: string[] = [];
  const flush = () => {
    if (currentQ && currentA.join(" ").trim()) {
      pairs.push({ question: currentQ, answer: currentA.join(" ").trim() });
    }
    currentQ = null;
    currentA = [];
  };
  for (const raw of section) {
    const line = raw.trim();
    const h3 = /^###\s+(.+?)\s*\??\s*$/.exec(line);
    if (h3) {
      flush();
      const q = h3[1]!.replace(/\s+$/, "");
      currentQ = q.endsWith("?") ? q : `${q}?`;
      continue;
    }
    if (currentQ && line) {
      // Collapse markdown emphasis in answers — JSON-LD wants plain text.
      currentA.push(line.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1"));
    }
  }
  flush();
  return pairs;
}
