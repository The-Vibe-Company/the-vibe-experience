import Link from "next/link";
import type { ModuleAfterContent } from "@/lib/module-after-config";

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
