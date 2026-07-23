import type { Prerequis } from "@/lib/module-faire-un-site";

export default function ModulePrerequisites({ items }: { items?: Prerequis[] }) {
  if (!items?.length) return null;

  return (
    <section className="module-prerequisites" id="ce-quil-te-faut">
      <span className="label">Ce qu&apos;il te faut sous la main</span>
      <div className="tfilets">
        {items.map((item) => (
          <div className="tfilet" key={item.quoi}>
            <span className="tfilet-name">
              {item.quoi}
              <span
                className={
                  item.niveau === "obligatoire" ? "cost cost-payant" : "cost cost-gratuit"
                }
              >
                {item.niveau === "obligatoire" ? "Obligatoire" : "Conseillé"}
              </span>
            </span>
            <span className="tfilet-desc">{item.ou}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
