import type { EtapeDetail } from "./module-faire-un-site";
import type { Prerequis } from "./module-devis";

// Module « Automatise tes factures » — famille RÉSULTAT (Automatiser ton business).
// BROUILLON en review. Deuxième module de la famille, compagnon du module devis :
// le cas magique est le devis accepté qui devient facture sans ressaisie, mais le
// module marche aussi seul. Textes ancrés dans le LISEZMOI et les notes du skill
// generer-facture (skills-offerts/, éprouvés par banc d'essai et test débutant).
// Même exigence qu'au module devis : lecteur qui n'a jamais utilisé d'IA, donc
// des sous-étapes courtes mais qui disent quoi taper et ce qu'on doit voir.

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

// Ce qu'il faut avoir sous la main AVANT de commencer, listé sur la page du
// module. Deux cas très différents : avec le skill devis déjà configuré, il ne
// reste presque rien à sortir ; sans lui, c'est la liste complète.
export const prerequisFacture: Prerequis[] = [
  {
    quoi: "Ton IBAN",
    niveau: "obligatoire",
    ou: "Tes clients doivent savoir où payer. Il apparaîtra sur chaque facture.",
  },
  {
    quoi: "Ton délai de paiement habituel",
    niveau: "obligatoire",
    ou: "30 jours, 45 jours, paiement à réception… C'est lui qui fixe l'échéance affichée.",
  },
  {
    quoi: "Le numéro de ta dernière facture",
    niveau: "obligatoire",
    ou: "Si tu en as déjà émis, écrit exactement comme tu l'écris. Ta numérotation doit se suivre sans trou, c'est la loi : ne devine pas, regarde ta dernière facture.",
  },
  {
    quoi: "Ton SIRET, ton adresse, ta situation TVA",
    niveau: "obligatoire",
    ou: "Seulement si tu n'as pas déjà le skill devis. Avec lui, tout est récupéré automatiquement et tu ne redonnes rien.",
  },
  {
    quoi: "Ton attestation d'assurance décennale",
    niveau: "conseille",
    ou: "Uniquement si tu es artisan du bâtiment, et seulement si tu n'as pas déjà le skill devis : la mention est obligatoire sur tes factures aussi.",
  },
  {
    quoi: "Le numéro d'un devis accepté",
    niveau: "conseille",
    ou: "Pour essayer le cas le plus parlant dès la première facture : le devis signé qui devient facture sans rien ressaisir.",
  },
];

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
          "Le skill vit dans l'app Claude Code, avec un abonnement payant (Pro suffit). Rien d'autre : aucun logiciel de facturation, aucun abonnement en plus. Un point d'honnêteté avant de commencer : une réforme française impose progressivement (2026-2027) la facture électronique entre entreprises via des plateformes agréées. Ce skill produit des factures classiques en PDF, qui restent valables pour tes clients particuliers et, selon le calendrier, pour ta taille d'entreprise. Pose-lui la question, il t'expliquera où tu en es sans te vendre du rêve.",
        attendu: "L'app Claude Code installée et connectée.",
        lien: { label: "Ouvrir claude.com/claude-code", href: "https://claude.com/claude-code" },
        outils: [F.claudecode],
        pasAPas: [
          "Tu as déjà l'app (module devis, ou un module de l'autre famille) ? Tu as tout, passe à l'étape 1.",
          "Sinon : crée ton compte sur claude.ai, prends l'abonnement Pro, télécharge l'app sur claude.com/claude-code (bouton juste au-dessus) et connecte-toi. L'étape 0 du module « Fais ton premier site » détaille chaque clic.",
        ],
        ceQueTuDoisVoir:
          "L'app ouverte, avec une zone en bas où écrire tes messages. Si elle te demande de choisir un dossier, choisis ton Bureau : tes factures se rangeront dans un dossier créé là.",
        siCaBloque:
          "L'installation coince ? L'étape 0 du module « Fais ton premier site » est entièrement guidée, avec les captures et les cas qui bloquent. Fais-la, et reviens.",
        conseil:
          "Le réflexe du parcours vaut ici aussi : quand quelque chose cloche, décris ton problème à Claude Code en français et discute avec lui.",
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
          "Le bouton ci-dessous copie le skill en entier. Tu le colles dans Claude Code, il recrée les fichiers chez toi et te confirme. Une seule fois, et il te suit ensuite sur toutes tes conversations.",
        attendu: "Claude Code te confirme que le skill generer-facture est installé et prêt.",
        telechargements: [{ n: "Générer une facture", href: "/skills/generer-facture.zip" }],
        outils: [F.skillfacture],
        pasAPas: [
          "Clique sur « Copier le skill » juste au-dessus.",
          "Ouvre Claude Code, colle dans la zone d'écriture (cmd + V), envoie.",
          "S'il demande l'autorisation de créer des fichiers, clique « Autoriser une fois ».",
          "Attends sa confirmation avant de fermer la fenêtre.",
        ],
        ceQueTuDoisVoir:
          "Claude Code te confirme que generer-facture est installé. Pour vérifier : tape une barre oblique / dans la zone d'écriture, generer-facture doit apparaître dans la liste qui s'ouvre.",
        siCaBloque:
          "Le skill n'apparaît pas juste après l'installation ? Ferme et rouvre l'app, c'est le réflexe classique. Le collage ne marche pas ? Recopie depuis cette page et renvoie.",
        monExemple:
          "Si tu as déjà installé le skill devis, tu reconnais le geste. C'est voulu : un seul réflexe pour toute la série.",
        conseil:
          "Les deux skills se complètent mais restent indépendants : celui-ci marche même si tu n'as pas l'autre.",
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
    dur: "≈ 4 à 12 min · une seule fois",
    obj: "Deux cas : tu utilises déjà le skill devis, il retrouve tout (entreprise, TVA, clients) et ne demande que le propre aux factures. Tu pars de zéro, il fait connaissance une fois pour toutes.",
    detailPret: true,
    sous: [
      {
        titre: "Sors ce qu'il va te demander.",
        duree: "≈ 2 min",
        cestquoi:
          "La liste complète est en haut de la page du module, sous « Ce qu'il te faut sous la main ». Ce qu'il te faudra vraiment dépend de ton cas : si tu as déjà le skill devis, il récupère ton entreprise, ta TVA et ton carnet de clients, et ne pose que les questions propres aux factures.",
        attendu: "Tes informations à portée de main, avant de commencer.",
        lien: { label: "Revoir la liste sur la page du module", href: "/automatiser-tes-factures" },
        ceQueTuDoisVoir:
          "Rien à l'écran : cette sous-étape se passe sur ton bureau. Tu es prêt quand tu peux répondre sans aller chercher : ton IBAN, ton délai de paiement, et le numéro de ta dernière facture.",
        siCaBloque:
          "Tu ne retrouves pas ton dernier numéro de facture ? Regarde ta dernière facture envoyée, ou demande à ton comptable. Ne devine pas : la numérotation doit se suivre sans trou, c'est la loi, et il vaut mieux la reprendre juste dès le départ.",
        conseil:
          "Le numéro de ta dernière facture est le seul point où l'à-peu-près coûte cher. Les autres informations se corrigent en une phrase plus tard.",
      },
      {
        titre: "Dis « fais-moi une facture », il s'occupe du reste.",
        duree: "≈ 2 min avec le skill devis, 5 à 10 min sinon",
        cestquoi:
          "Comme pour les devis : tu écris une phrase, il voit qu'il ne te connaît pas encore et fait connaissance. Si le skill devis est déjà configuré chez toi, il importe tout et ne pose que les questions factures. Sinon, une quinzaine de questions, une seule fois.",
        attendu: "Ta configuration de facturation enregistrée une fois pour toutes.",
        prompt: "Fais-moi une facture.",
        exemples: [
          "Il demande ton délai de paiement ? « 30 jours », ou « paiement à réception ».",
          "Il demande ta numérotation ? Donne ton dernier numéro tel quel : « ma dernière c'était FA-2026-014 ».",
          "Tu as déjà le skill devis et il repose tout ? « J'utilise déjà le skill generer-devis, récupère ma configuration. »",
        ],
        ceQueTuDoisVoir:
          "Ses questions, une par une, puis la confirmation que tout est enregistré. Si tu avais déjà le skill devis, tu dois voir qu'il connaît déjà ton entreprise : il ne redemande que l'IBAN, le délai et la numérotation.",
        siCaBloque:
          "Tu n'as pas ton IBAN sous la main ? Réponds à ce que tu peux et reviens compléter, il reprend où vous en étiez. Il ne semble pas retrouver ta configuration devis ? Dis-lui explicitement « j'utilise déjà le skill generer-devis, récupère ma configuration ». Une question ne te parle pas ? « Je ne comprends pas, explique-moi » : il reformule.",
        monExemple:
          "C'est le lien entre les deux skills qui a structuré toute la conception : le devis comme source (zéro ressaisie), la configuration partagée (celui qui a fait le setup devis ne le refait jamais), et l'autonomie (chaque skill marche aussi seul).",
        conseil:
          "Comme pour le devis : toute la lourdeur d'un coup, une seule fois. Après, une facture, c'est une phrase.",
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
    dur: "≈ 8 min",
    obj: "Le cas magique : ton devis accepté devient facture en une phrase, sans rien ressaisir. Et sans devis, une facture de zéro tient en une phrase aussi.",
    detailPret: true,
    sous: [
      {
        titre: "Depuis un devis accepté, ou de zéro.",
        duree: "≈ 5 min (≈ 2 min par facture ensuite)",
        cestquoi:
          "Depuis un devis accepté : tu donnes son numéro et ce que tu factures (un acompte, le solde, la totalité). Il retrouve le devis, reprend les lignes, calcule, et la facture sort. De zéro : le client, la prestation, le prix, et la date de la prestation (c'est une mention obligatoire). L'échéance, les pénalités et le montant en toutes lettres se posent tout seuls.",
        attendu: "Ta première facture conforme et numérotée.",
        prompt: "Le devis [son numéro] est accepté : fais la facture d'acompte de [30] %.",
        exemples: [
          "« Le devis DEV-2026-012 est accepté, facture d'acompte de 30 %. »",
          "« Facture pour Madame Martin : retouches rideaux, 240 euros, prestation du 12 août. »",
          "« Facture le devis DEV-2026-012 en entier, la prestation a été faite hier. »",
        ],
        ceQueTuDoisVoir:
          "Un récapitulatif AVANT de produire : le client, les lignes, le montant, l'échéance. Si tu es parti d'un devis, tu dois voir son numéro apparaître en référence : c'est la preuve qu'il a bien retrouvé le bon. Puis le fichier, dans un dossier Factures.",
        visuel: {
          src: "/module/facture-3-1-apercu.png",
          w: 835,
          h: 1120,
          alt: "Une facture produite par le skill : en-tête FACTURE numérotée, référence au devis d'origine, remise déduite, net à payer, montant en toutes lettres, IBAN et mentions.",
          legende: "Le résultat, tel quel : une facture sortie par le skill (données d'exemple), avec la référence au devis, la remise déduite, le montant en toutes lettres et l'IBAN.",
        },
        siCaBloque:
          "Il ne retrouve pas ton devis ? Donne le numéro exact tel qu'il apparaît sur le document (du genre DEV-2026-012), ou dis « liste mes devis » pour le retrouver ensemble. Un détail à corriger ? Dis-le avant de valider le récapitulatif. Tu ne sais pas si ton prix est hors taxes ou toutes taxes ? Dis-le-lui franchement, il te posera la question plutôt que de deviner.",
        monExemple:
          "Le moment le plus satisfaisant des tests : la facture de solde qui retrouve toute seule le devis ET la facture d'acompte liés, et qui déduit juste. Zéro calculette.",
        conseil:
          "Prends l'habitude de facturer l'acompte dès que le devis est signé : c'est une phrase, et c'est ta trésorerie.",
      },
      {
        titre: "Récupère ton PDF et envoie-le.",
        duree: "≈ 3 min",
        cestquoi:
          "Même geste qu'au module devis : la facture s'ouvre dans ton navigateur, et tu en fais un PDF en l'imprimant vers « Enregistrer au format PDF ». Rien à télécharger.",
        attendu: "Un PDF propre, prêt à envoyer à ton client.",
        pasAPas: [
          "Demande « ouvre-moi la facture », ou double-clique le fichier dans le dossier Factures.",
          "Dans le navigateur, fais cmd + P.",
          "Là où on choisit l'imprimante, choisis « Enregistrer au format PDF », puis enregistre.",
        ],
        ceQueTuDoisVoir:
          "Ta facture avec, en haut, un bandeau gris qui explique ce geste. Il n'apparaît PAS sur le PDF. Vérifie une fois avant d'envoyer : ton IBAN est bien là, l'échéance est la bonne, et le montant en toutes lettres correspond au chiffre.",
        siCaBloque:
          "Le fichier s'ouvre dans un éditeur de texte ? Clic droit, « Ouvrir avec », choisis ton navigateur. Une mention te semble manquer ou être vide ? Signale-le : « la ligne des pénalités est vide, corrige ». C'est exactement le genre de détail que les tests ont attrapé avant toi.",
        monExemple:
          "Deux testeurs indépendants ont trouvé le même défaut : une ligne de pénalités qui s'affichait vide. Corrigé avant la sortie. C'est pour ça qu'on te dit de jeter un œil au PDF la première fois.",
        conseil:
          "Une fois que tu as vu une facture complète, tu sauras la relire d'un coup d'œil les fois suivantes.",
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
    dur: "≈ 8 min · à lire",
    obj: "Les quatre documents de la vraie vie : la facture classique, l'acompte, le solde qui déduit tout seul, et l'avoir quand une facture envoyée doit être corrigée. Plus l'export pour ton comptable.",
    detailPret: true,
    sous: [
      {
        titre: "Acompte, solde, et la règle d'or de l'avoir.",
        duree: "≈ 4 min",
        cestquoi:
          "Le solde : tu le demandes, il déduit tout seul les acomptes déjà facturés. L'avoir : c'est LA règle à connaître, une facture déjà envoyée ne se corrige jamais, elle s'annule par un avoir, avec sa propre numérotation et la référence à la facture d'origine. Le skill connaît la marche à suivre et te guidera le moment venu.",
        attendu: "Tu sais gérer un chantier complet : acompte, solde, et correction.",
        exemples: [
          "« Fais la facture de solde du devis DEV-2026-012. »",
          "« La facture FA-2026-008 était fausse, il faut la corriger. » (il te guidera vers l'avoir)",
          "« Facture le mois de septembre comme d'habitude. » (il retient tes prestations récurrentes)",
        ],
        ceQueTuDoisVoir:
          "Sur une facture de solde : les acomptes déjà facturés apparaissent en déduction, et le montant restant est juste. Sur un avoir : sa propre numérotation et la référence à la facture d'origine, comme la loi le demande.",
        siCaBloque:
          "Tu as fait une erreur sur une facture PAS encore envoyée ? Dis-le, il la régénère avec le même numéro, pas besoin d'avoir. Déjà envoyée ? C'est l'avoir, et il t'expliquera. Dans le doute, demande-lui simplement : « la facture est déjà partie chez le client, qu'est-ce que je dois faire ? »",
        conseil:
          "Retiens juste la frontière : tant que le client ne l'a pas reçue, ça se corrige ; une fois partie, ça s'annule proprement. Le skill fait le reste.",
      },
      {
        titre: "L'export pour ton comptable, et ce qu'il ne fait pas.",
        duree: "≈ 4 min · à lire",
        cestquoi:
          "Le skill tient le journal de tes factures et sait le sortir en fichier Excel, celui que ton comptable attend. Et comme pour le devis, autant savoir tout de suite ce qu'il ne fait pas.",
        attendu: "Tu sais sortir ton journal, et tu connais les limites du skill.",
        exemples: [
          "« Sors-moi le journal de mes factures pour mon comptable. »",
          "« Sors le journal du trimestre. »",
          "« Nouveau RIB, c'est maintenant... » (il met à jour juste ça)",
        ],
        ceQueTuDoisVoir:
          "Un fichier Excel avec une ligne par facture, les avoirs en négatif. Tu l'envoies tel quel à ton comptable.",
        siCaBloque:
          "Ce qu'il ne fait pas, honnêtement : les devis (c'est son compagnon), les relances d'impayés, la comptabilité au-delà de l'export du journal, et la télétransmission électronique (Chorus Pro, plateformes agréées). Il ne donne pas non plus de conseil juridique : il applique les règles officielles, sourcées dans son dossier de références.",
        monExemple:
          "La question qui a le plus changé les deux skills, c'est une question toute bête sur l'argent : un prix annoncé, c'est hors taxes ou toutes taxes comprises ? Depuis, aucun des deux ne déduit ça tout seul, il demande.",
        conseil:
          "Si tu n'as pas encore le skill devis, le module « Automatise tes devis » est son compagnon naturel : à deux, le devis signé devient facture sans une seule ressaisie.",
      },
    ],
    livrable: "Tes factures du quotidien qui se font en une phrase, export comptable compris.",
    reussite: "Tu as produit une facture liée à un devis (ou une deuxième facture) sans rien ressaisir.",
  },
];
