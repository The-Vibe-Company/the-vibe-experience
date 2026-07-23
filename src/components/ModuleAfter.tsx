import Link from "next/link";
import type { ModuleAfter as ModuleAfterContent } from "@/lib/module-shell-config";

export default function ModuleAfter({ content }: { content: ModuleAfterContent }) {
  return (
    <div className="mov-after">
      <span className="label">Et après ?</span>
      <Link href={content.href} className="mov-after-title">
        {content.title} →
      </Link>
      <p>{content.description}</p>
    </div>
  );
}
