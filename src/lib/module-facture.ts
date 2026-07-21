import type { EtapeDetail } from "./module-faire-un-site";

// Module « Automatise tes factures » — famille RÉSULTAT (Automatiser ton business).
// BROUILLON en review. Deuxième module de la famille, compagnon du module devis :
// le cas magique est le devis accepté qui devient facture sans ressaisie, mais le
// module marche aussi seul. Textes ancrés dans le LISEZMOI et les notes du skill
// generer-facture (skills-offerts/, éprouvés par banc d'essai et test débutant).

const F = {
  claudecode: {
    n: "Claude Code",
    d: "L'app où vit le skill. Tu lui parles en français, elle fait. C'est elle qui garde ta configuration d'une fois sur l'autre.",
  },
  skillfacture: {
    n: "Générer une facture (offert)",
    d: "Notre skill qui fait tes factures : classiques, d'acompte, de solde qui déduit tout seul, et l'avoir quand il faut corriger. Conformes, numérotées, prêtes à imprimer en PDF.",
  },
};

export const etapesDetailFacture: EtapeDetail[] = [
  {
    slug: "0",
    num: "0",
    titre: "Ce qu'il te faut",
    tag: ["Setup", "t-build"],
    dur: "≈ 5 min (0 si tu as déjà l'app)",
    obj: "Un seul outil : l'app Claude Code avec un abonnement payant (Pro, autour de 20 € par mois, suffit). Si tu utilises déjà le skill devis, tu as déjà tout, et le setup d'après sera encore plus court.",
    detailPret: true,
    sous: [
      {
        titre: "Claude Code prêt (et un mot honnête sur la facture électronique).",
        duree: "≈ 5 min (0 si tu l'as déjà)",
        cestquoi:
          "Le skill vit dans l'app Claude Code, avec un abonnement payant (Pro suffit). Rien d'autre : aucun logiciel de facturation, aucun abonnement en plus. Un point d'honnêteté avant de commencer : une réforme française impose progressivement (2026-2027) la facture électronique entre entreprises via des plateformes agréées. Ce skill produit des factures classiques (PDF), qui restent valables pour tes clients particuliers et, selon le calendrier, pour ta taille d'entreprise. Pose-lui la question, il t'expliquera où tu en es sans te vendre du rêve.",
        attendu: "L'app Claude Code installée et connectée.",
        lien: { label: "Ouvrir claude.com/claude-code", href: "https://claude.com/claude-code" },
        outils: [F.claudecode],
        pasAPas: [
          "Tu as déjà l'app (module devis, ou un module de l'autre famille) ? Tu as tout, passe à l'étape 1.",
          "Sinon : crée ton compte sur claude.ai, prends l'abonnement Pro, télécharge l'app sur claude.com/claude-code (bouton juste au-dessus) et connecte-toi. L'étape 0 du module « Fais ton premier site » détaille chaque clic.",
        ],
        ceQueTuDoisVoir: "L'app ouverte, avec la zone où tu écris tes messages.",
        siCaBloque:
          "L'installation coince ? L'étape 0 du module « Fais ton premier site » est entièrement guidée, avec les captures et les cas qui bloquent. Fais-la, et reviens.",
        conseil:
          "Le réflexe du parcours vaut ici aussi : quand quelque chose cloche, décris ton problème à Claude Code et discute avec lui.",
      },
    ],
    livrable: "L'app Claude Code prête.",
    reussite: "Tu peux écrire à Claude Code, et il te répond.",
  },
  {
    slug: "1",
    num: "1",
    titre: "Installe le skill",
    tag: ["Install", "t-build"],
    dur: "≈ 2 min",
    obj: "Un copier-coller, une confirmation, et le skill est chez toi. Exactement le même geste que pour le skill devis.",
    detailPret: true,
    sous: [
      {
        titre: "Copie le skill, colle-le, c'est installé.",
        duree: "≈ 2 min",
        cestquoi:
          "Le bouton ci-dessous copie le skill en entier. Tu le colles dans Claude Code, il recrée les fichiers chez toi et te confirme. Une seule fois.",
        attendu: "Claude Code te confirme que le skill generer-facture est installé et prêt.",
        telechargements: [{ n: "Générer une facture", href: "/skills/generer-facture.zip" }],
        outils: [F.skillfacture],
        pasAPas: [
          "Clique sur « Copier le skill » juste au-dessus.",
          "Ouvre Claude Code, colle dans la zone d'écriture, envoie. S'il demande l'autorisation de créer des fichiers, accepte.",
          "Attends sa confirmation : le skill est en place.",
        ],
        ceQueTuDoisVoir:
          "Claude Code te confirme que generer-facture est installé. Pour vérifier : tape / dans la zone d'écriture, generer-facture doit apparaître dans la liste.",
        siCaBloque:
          "Le skill n'apparaît pas juste après l'installation ? Ferme et rouvre l'app, c'est le réflexe classique. Le collage ne marche pas ? Recopie depuis cette page et renvoie.",
        conseil: "Si tu as déjà installé le skill devis, tu reconnais le geste. C'est voulu : un seul réflexe pour toute la série.",
      },
    ],
    livrable: "Le skill generer-facture installé chez toi.",
    reussite: "Le skill apparaît quand tu tapes / dans Claude Code.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Le setup : deux minutes si tu as le skill devis",
    tag: ["Setup", "t-product"],
    dur: "≈ 2 à 10 min · une seule fois",
    obj: "Deux cas : tu utilises déjà le skill devis, il retrouve tout (entreprise, TVA, clients) et ne demande que le propre aux factures. Tu pars de zéro, il fait connaissance une fois pour toutes.",
    detailPret: true,
    sous: [
      {
        titre: "Dis « fais-moi une facture », il s'occupe du reste.",
        duree: "≈ 2 min avec le skill devis, 5 à 10 min sinon",
        cestquoi:
          "Si tu utilises déjà le skill devis : il récupère tout ce que tu lui as dit (ton entreprise, ta TVA, ton carnet de clients) et ne pose que les questions propres aux factures : ta numérotation de factures, ton délai de paiement, ton IBAN. Si tu pars de zéro : une quinzaine de questions, une seule fois, avec ton SIRET, ton numéro de TVA et ton IBAN sous la main.",
        attendu: "Ta configuration de facturation enregistrée une fois pour toutes.",
        prompt: "Fais-moi une facture.",
        ceQueTuDoisVoir:
          "Ses questions, une par une, puis la confirmation que tout est enregistré. Point important si tu as déjà émis des factures avant : retrouve ton dernier numéro tel que tu l'écris. Ta numérotation doit se suivre sans trou, c'est la loi, et il la reprendra à l'identique.",
        siCaBloque:
          "Tu n'as pas ton IBAN ou ton dernier numéro de facture sous la main ? Réponds à ce que tu peux et reviens compléter : il reprend où vous en étiez. Tu as le skill devis mais il ne semble pas retrouver ta configuration ? Dis-lui « j'utilise déjà le skill generer-devis, récupère ma configuration », il saura.",
        monExemple:
          "C'est le lien entre les deux skills qui a structuré toute la conception : le devis comme source (zéro ressaisie), la configuration partagée (celui qui a fait le setup devis ne le refait jamais), et l'autonomie (chaque skill marche aussi seul).",
        conseil: "Comme pour le devis : toute la lourdeur d'un coup, une seule fois. Après, une facture, c'est une phrase.",
      },
    ],
    livrable: "Le skill te connaît : numérotation, délai de paiement, IBAN.",
    reussite: "Le setup est terminé et il ne te repose plus ces questions.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Ta première facture",
    tag: ["Résultat", "t-ship"],
    dur: "≈ 5 min",
    obj: "Le cas magique : ton devis accepté devient facture en une phrase, sans rien ressaisir. Et sans devis, une facture de zéro tient en une phrase aussi.",
    detailPret: true,
    sous: [
      {
        titre: "Une phrase, un récapitulatif, une facture.",
        duree: "≈ 5 min (≈ 2 min par facture ensuite)",
        cestquoi:
          "Depuis un devis accepté : tu donnes son numéro et ce que tu factures (acompte, solde, tout). Il retrouve le devis, reprend les lignes, calcule, et la facture sort. De zéro : le client, la prestation, le prix, la date de la prestation. Les montants s'écrivent aussi en toutes lettres, l'échéance et les pénalités se posent toutes seules.",
        attendu: "Ta première facture conforme, numérotée, en PDF.",
        prompt: "Le devis [son numéro] est accepté : fais la facture d'acompte de [30] %.",
        exemples: [
          "« Le devis DEV-2026-012 est accepté, facture d'acompte de 30 %. »",
          "« Facture pour Madame Martin : retouches rideaux, 240 euros, prestation du 12 août. »",
        ],
        ceQueTuDoisVoir:
          "Un récapitulatif avant de produire, puis le fichier dans un dossier Factures. Le PDF, c'est le même geste que les devis : ouvre le fichier, imprime (cmd + P), « Enregistrer au format PDF ».",
        siCaBloque:
          "Il ne retrouve pas ton devis ? Donne-lui le numéro exact tel qu'il apparaît sur le document (du genre DEV-2026-012), ou dis « liste mes devis » pour le retrouver ensemble. Un détail à corriger ? Dis-le avant de valider le récapitulatif : rien n'est figé tant que la facture n'est pas partie chez le client.",
        monExemple:
          "Le moment le plus satisfaisant des tests : la facture de solde qui retrouve toute seule le devis et la facture d'acompte liés, et qui déduit juste. Zéro calculette.",
        conseil: "Prends l'habitude de facturer l'acompte dès que le devis est signé : c'est une phrase, et c'est ta trésorerie.",
      },
    ],
    livrable: "Ta première facture conforme, en PDF, liée à ton devis si tu en avais un.",
    reussite: "La facture est sortie, avec le bon numéro et la bonne échéance.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Le quotidien (acomptes, soldes, avoirs)",
    tag: ["Résultat", "t-ship"],
    dur: "≈ 5 min · à lire",
    obj: "Les quatre documents de la vraie vie : la facture classique, l'acompte, le solde qui déduit tout seul, et l'avoir quand une facture envoyée doit être corrigée. Plus l'export pour ton comptable.",
    detailPret: true,
    sous: [
      {
        titre: "Solde, avoir, export comptable : la suite de la vie.",
        duree: "≈ 5 min",
        cestquoi:
          "Le solde : « fais la facture de solde du devis X », il déduit tout seul les acomptes déjà facturés. L'avoir : règle d'or, une facture déjà envoyée ne se corrige pas, elle s'annule par un avoir (avec sa numérotation et la référence à la facture d'origine, comme la loi le demande) ; le skill t'expliquera la marche à suivre le moment venu. Et pour ton comptable : « sors-moi le journal de mes factures », il exporte tout en un fichier Excel.",
        attendu: "Tu sais gérer un chantier complet : acompte, solde, correction, export.",
        exemples: [
          "« Fais la facture de solde du devis DEV-2026-012. »",
          "« La facture FAC-2026-008 était fausse, il faut la corriger. » (il te guidera vers l'avoir)",
          "« Sors-moi le journal de mes factures pour mon comptable. »",
        ],
        ceQueTuDoisVoir:
          "Sur une facture de solde : les acomptes déjà facturés apparaissent en déduction, et le montant restant est juste. Sur un avoir : sa propre numérotation et la référence à la facture d'origine.",
        siCaBloque:
          "Ce qu'il ne fait pas, honnêtement : les devis (c'est son compagnon), les relances d'impayés, la comptabilité au-delà de l'export du journal, et la télétransmission électronique (Chorus Pro, plateformes agréées). Et il ne donne pas de conseil juridique : il applique les règles officielles, sourcées dans son dossier references.",
        conseil:
          "Si tu n'as pas encore le skill devis, le module « Automatise tes devis » est son compagnon naturel : à deux, le devis signé devient facture sans une seule ressaisie.",
      },
    ],
    livrable: "Tes factures du quotidien qui se font en une phrase, export comptable compris.",
    reussite: "Tu as produit une facture liée à un devis (ou une deuxième facture) sans rien ressaisir.",
  },
];
