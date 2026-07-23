import type { ModuleOverviewConfig } from "@/lib/module-overview-config";

const costLabel = {
  gratuit: "Gratuit",
  "gratuit-debut": "Gratuit pour commencer",
  payant: "Payant",
};

export default function ModuleToolbox({
  intro,
  tools,
}: Pick<ModuleOverviewConfig, "intro" | "tools">) {
  return (
    <section className="module-toolbox">
      <div className="label mov-sec">Ta boîte à outils</div>
      <p className="mov-toolintro">{intro}</p>
      <div className="tfilets">
        {tools.map((tool) => (
          <div className="tfilet" key={tool.name}>
            <span className="tfilet-name">
              {tool.href ? (
                <a href={tool.href} target="_blank" rel="noreferrer" className="tfilet-link">
                  {tool.name} ↗
                </a>
              ) : (
                tool.name
              )}
              <span className={`cost cost-${tool.cost}`}>{costLabel[tool.cost]}</span>
            </span>
            <span className="tfilet-desc">{tool.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
