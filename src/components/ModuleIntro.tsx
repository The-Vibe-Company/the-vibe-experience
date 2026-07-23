import type { ReactNode } from "react";
import type { EtapeDetail } from "@/lib/module-faire-un-site";

export function ModuleOverviewIntro({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  meta: string;
  children: ReactNode;
}) {
  return (
    <header className="module-intro">
      <div className="label">{eyebrow}</div>
      <h1 className="mov-h1">{title}</h1>
      <p className="mov-meta">{meta}</p>
      <p className="etape-obj">{children}</p>
    </header>
  );
}

export function ModuleStepIntro({ etape }: { etape: EtapeDetail }) {
  return (
    <header className="step-intro">
      <div className="etape-head">
        <span className="etape-num">{etape.num}</span>
        <h1>{etape.titre}</h1>
      </div>
      <div className="step-intro-meta">
        <span className={`tag ${etape.tag[1]}`}>{etape.tag[0]}</span>
        <span className="etape-dur">{etape.dur}</span>
      </div>
      <p className="etape-obj">{etape.obj}</p>
    </header>
  );
}
