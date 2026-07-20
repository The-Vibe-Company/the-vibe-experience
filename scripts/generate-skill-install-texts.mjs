#!/usr/bin/env node
// Génère public/skills/<slug>-install.txt à partir des archives de public/skills/.
// Chaque skill devient un seul texte collable dans Claude Code ou Codex :
// l'instruction d'installation, puis le contenu intégral de chaque fichier.
// L'agent recrée les fichiers en local, l'utilisateur ne télécharge rien.
// À relancer quand une archive change : node scripts/generate-skill-install-texts.mjs

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

const SKILLS_DIR = "public/skills";

// L'eval-viewer du Skill Creator (61 Ko de HTML et Python d'expert, optionnel)
// rendrait le texte trop lourd à coller ; le skill fonctionne sans.
const EXCLUDE = [/\/eval-viewer\//];

const header = (slug) =>
  `Installe ce skill dans mes skills personnels (par exemple ~/.claude/skills/ pour Claude Code, ou l'équivalent de mon outil) : recrée chaque fichier listé ci-dessous, chemin et contenu identiques, sans rien reformuler. Quand c'est fait, vérifie que ${slug}/SKILL.md est en place et confirme-moi que le skill est prêt.\n\n`;

for (const zip of readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".zip")).sort()) {
  const zipPath = join(SKILLS_DIR, zip);
  const slug = basename(zip, ".zip");
  const list = execFileSync("zipinfo", ["-1", zipPath], { encoding: "utf8" })
    .split("\n")
    .filter((p) => p && !p.endsWith("/"))
    .filter((p) => !EXCLUDE.some((re) => re.test(p)))
    .sort();

  const blocks = list.map((path) => {
    const content = execFileSync("unzip", ["-p", zipPath, path], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    });
    return `===== FICHIER : ${path} =====\n${content.trimEnd()}\n===== FIN DU FICHIER =====`;
  });

  const out = join(SKILLS_DIR, `${slug}-install.txt`);
  const text = header(slug) + blocks.join("\n\n") + "\n";
  writeFileSync(out, text);
  console.log(`${out}: ${list.length} fichiers, ${Math.round(text.length / 1024)} Ko`);
}
