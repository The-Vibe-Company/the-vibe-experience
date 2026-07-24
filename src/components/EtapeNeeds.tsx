import type { Fiche } from "@/lib/module-faire-un-site";

export default function EtapeNeeds({ items }: { items?: Fiche[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="etape-needs" aria-labelledby="etape-needs-title">
      <h2 className="label etape-needs-title" id="etape-needs-title">
        Ce qu&apos;il te faut
      </h2>
      <ul className="etape-needs-list">
        {items.map((item) => (
          <li className="etape-needs-row" key={item.n}>
            <strong>{item.n}</strong>
            <p>{item.d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
