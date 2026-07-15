"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
};

export default function SkipQuizLink({ href = "/parcours", onClick, ...props }: Props) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        try {
          const raw = localStorage.getItem("tve_quiz_reco");
          if (raw) {
            const reco = JSON.parse(raw);
            delete reco.branche;
            localStorage.setItem("tve_quiz_reco", JSON.stringify(reco));
          }
        } catch {}
        onClick?.(event);
      }}
      {...props}
    />
  );
}
