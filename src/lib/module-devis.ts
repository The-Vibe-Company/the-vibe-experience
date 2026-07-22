import type { EtapeDetail } from "./module-faire-un-site";

// Module « Automatise tes devis » — famille RÉSULTAT (Automatiser ton business).
// BROUILLON en review. Premier module de la famille : on n'apprend pas à
// construire, on met en place un skill prêt à l'emploi (generer-devis, offert)
// et on repart avec ses devis qui se font tout seuls. Textes ancrés dans le
// LISEZMOI et le topo du skill (skills-offerts/, éprouvés par banc d'essai
// et test débutante totale le 21/07/2026).
// Le lecteur type n'a jamais utilisé d'IA : chaque sous-étape reste courte,
// mais aucune ne le laisse deviner quoi taper ni ce qu'il doit voir à l'écran.

const F = {
  claudecode: {
    n: "Claude Code",
    d: "L'app où vit le skill. Tu lui parles en français, elle fait. C'est elle qui garde ta configuration d'une fois sur l'autre.",
  },
  skilldevis: {
    n: "Générer un devis (offert)",
    d: "Notre skill qui fait tes devis : conformes au droit français, numérotés, prêts à imprimer en PDF. Tu réponds aux questions une fois, ensuite chaque devis tient en une phrase.",
  },
};

export const etapesDetailDevis: EtapeDetail[] = [
  {
    slug: "0",
    num: "0",
    titre: "Ce qu'il te faut",
    tag: ["Setup", "t-build"],
    dur: "≈ 5 min (0 si tu as déjà l'app)",
    obj: "Un seul outil : l'app Claude Code, avec un abonnement payant (l'offre Pro, autour de 20 € par mois, suffit). Rien d'autre : aucun logiciel de devis, aucun abonnement en plus. Si tu as déjà fait un module de l'autre famille, tu as tout, passe direct à l'étape 1.",
    detailPret: true,
    sous: [
      {
        titre: "Claude Code prêt, et c'est tout.",
        duree: "≈ 5 min (0 si tu l'as déjà)",
        cestquoi:
          "Le skill vit dans l'app Claude Code : c'est elle qui pose les questions, retient tes réponses et fabrique les fichiers. Il te faut un compte Claude avec un abonnement payant : l'offre Pro, autour de 20 € par mois, suffit pour faire tourner tes devis. Et si un jour tu en fais tellement que tu touches ses limites, le plan au-dessus existe, à toi de voir selon le temps gagné.",
        attendu: "L'app Claude Code installée, connectée, prête à recevoir un message.",
        lien: { label: "Ouvrir claude.com/claude-code", href: "https://claude.com/claude-code" },
        outils: [F.claudecode],
        pasAPas: [
          "Tu as déjà l'app (tu as fait un module de la famille « Apprendre à construire ») ? Tu as tout, passe à l'étape 1.",
          "Sinon : crée ton compte sur claude.ai, prends l'abonnement Pro, puis télécharge l'app sur claude.com/claude-code (bouton juste au-dessus) et connecte-toi. L'étape 0 du module « Fais ton premier site » détaille chaque clic si tu veux être pris par la main.",
        ],
        ceQueTuDoisVoir:
          "L'app ouverte, avec une zone en bas où écrire tes messages, comme une conversation. Si elle te demande de choisir un dossier à l'ouverture, choisis ton Bureau : tes devis se rangeront dans un dossier que le skill créera là.",
        siCaBloque:
          "L'installation coince quelque part ? Le module « Fais ton premier site » a une étape 0 entièrement guidée pour ça, avec les captures et les cas qui bloquent. Fais-la, et reviens ici.",
        conseil:
          "Garde ce réflexe pour tout le module : quand quelque chose cloche ou te surprend, décris ton problème à Claude Code (ce que tu as fait, ce que tu attendais, ce que tu vois) et discute avec lui, en français, comme à un collègue.",
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
    obj: "Le skill s'installe en un copier-coller : tu copies, tu colles dans Claude Code, il range tout et te confirme. Tu ne touches à aucun fichier.",
    detailPret: true,
    sous: [
      {
        titre: "Copie le skill, colle-le, c'est installé.",
        duree: "≈ 2 min",
        cestquoi:
          "Un skill, c'est un mode d'emploi qu'on donne une fois à l'IA et qu'elle réutilise ensuite toute seule. Le bouton ci-dessous copie celui des devis en entier. Tu le colles dans Claude Code, il recrée les fichiers au bon endroit chez toi et te confirme. Une seule fois : ensuite, il te suit sur toutes tes conversations.",
        attendu: "Claude Code te confirme que le skill generer-devis est installé et prêt.",
        telechargements: [{ n: "Générer un devis", href: "/skills/generer-devis.zip" }],
        outils: [F.skilldevis],
        pasAPas: [
          "Clique sur « Copier le skill » juste au-dessus : ça copie le skill en entier.",
          "Ouvre Claude Code, colle dans la zone où tu écris tes messages (cmd + V), et envoie.",
          "S'il te demande l'autorisation de créer des fichiers, clique « Autoriser une fois » : c'est lui qui range le skill chez toi.",
          "Attends sa confirmation avant de fermer la fenêtre.",
        ],
        ceQueTuDoisVoir:
          "Claude Code recrée les fichiers du skill et te confirme que generer-devis est installé. Pour en être sûr : tape une barre oblique / dans la zone d'écriture, une petite liste s'ouvre, et generer-devis doit y figurer. S'il est dans la liste, il est installé.",
        siCaBloque:
          "Claude Code ne connaît pas le skill juste après l'installation ? Ferme et rouvre l'app : un skill tout juste installé n'est parfois pris en compte qu'au redémarrage. Le collage ne marche pas, ou le texte arrive coupé ? Reviens sur cette page, recopie avec le bouton, et renvoie.",
        monExemple:
          "C'est le même geste pour tous les skills qu'on donne. Une fois que tu l'as fait une fois, tu sais installer n'importe lequel.",
        conseil:
          "Tu viens d'installer un outil de travail complet sans ouvrir un seul dossier ni toucher à un fichier. C'est comme ça qu'on s'équipe ici.",
      },
    ],
    livrable: "Le skill generer-devis installé chez toi.",
    reussite: "Le skill apparaît quand tu tapes / dans Claude Code.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Le setup : il fait connaissance",
    tag: ["Setup", "t-product"],
    dur: "≈ 10 min · une seule fois",
    obj: "La première fois, le skill te pose une dizaine de questions sur ton entreprise, une par une, et enregistre tout. C'est le seul moment un peu long du module : il absorbe toute la lourdeur le premier jour pour qu'il n'en reste plus jamais.",
    detailPret: true,
    sous: [
      {
        titre: "Sors ce qu'il va te demander.",
        duree: "≈ 2 min",
        cestquoi:
          "Rien de compliqué, mais autant l'avoir sous la main : il va te demander l'identité de ton entreprise et tes habitudes. Si tu dois partir chercher ton SIRET au milieu, tu perds le fil.",
        attendu: "Tes informations à portée de main, avant de commencer.",
        exemples: [
          "Ton SIRET (sur ton extrait d'immatriculation, ou en cherchant le nom de ton entreprise sur annuaire-entreprises.data.gouv.fr).",
          "Ta situation TVA : tu la factures, ou tu es en franchise (le cas de beaucoup d'auto-entrepreneurs).",
          "Si tu es artisan du bâtiment : ton attestation d'assurance décennale (assureur, coordonnées, zone couverte).",
          "Si tu as déjà fait des devis : le numéro du dernier, écrit exactement comme tu l'écris (par exemple 2026-014).",
        ],
        ceQueTuDoisVoir:
          "Rien à l'écran pour l'instant : cette sous-étape se passe sur ton bureau, pas dans l'app. Tu es prêt quand tu peux répondre sans te lever.",
        siCaBloque:
          "Tu es en société et on te parle de capital social ou de ville du RCS ? Tout est sur ton Kbis. Tu ne trouves pas ton SIRET ? Cherche le nom de ton entreprise sur annuaire-entreprises.data.gouv.fr, il y est. Et si une information te manque vraiment, commence quand même : tu pourras la donner plus tard.",
        conseil:
          "Si tu es artisan du bâtiment, ne saute pas l'assurance décennale : c'est une mention obligatoire sur chaque devis, et le skill la posera automatiquement une fois que tu la lui auras donnée.",
      },
      {
        titre: "Dis « fais-moi un devis », et réponds à ses questions.",
        duree: "≈ 8 min",
        cestquoi:
          "Tu ne remplis aucun formulaire : tu écris une phrase, et le skill voit qu'il ne te connaît pas encore. Il fait alors connaissance, une question à la fois, en français simple. Tout est enregistré : il ne te redemandera plus jamais rien de cette liste.",
        attendu: "Ta configuration complète, enregistrée une fois pour toutes.",
        prompt: "Fais-moi un devis.",
        exemples: [
          "Il demande ta forme juridique ? Réponds avec tes mots : « auto-entrepreneur », « SARL », « je suis en micro ».",
          "Il demande ta TVA ? « Je ne facture pas la TVA » suffit si tu es en franchise.",
          "Il demande ton acompte habituel ? « 30 % à la commande », ou « je n'en demande pas ».",
        ],
        ceQueTuDoisVoir:
          "Une dizaine de questions, une par une, chacune attendant ta réponse. À la fin, il te confirme que tout est enregistré et enchaîne sur ton premier devis. Si tu es artisan, il aura demandé ton assurance décennale au passage : c'est normal, c'est obligatoire sur tes devis.",
        siCaBloque:
          "Tu n'as pas une information sous la main ? Dis-lui « je te donnerai ça plus tard » et continue : il reprendra où vous en étiez. Tu t'es trompé dans une réponse ? Dis-le simplement (« en fait mon adresse c'est... »), il corrige, tu ne recommences rien. Une question ne te parle pas du tout ? Réponds « je ne comprends pas, explique-moi » : il reformule.",
        monExemple:
          "On a testé ce setup de bout en bout avec une fausse débutante totale, une couturière de 52 ans qui n'avait jamais utilisé d'IA : setup réussi, deux devis, zéro information redemandée au deuxième. Les frictions qu'elle a rencontrées ont été corrigées avant de te le donner.",
        conseil:
          "Prends les 10 minutes d'un coup, tranquillement. C'est le pari du skill : toute la lourdeur le premier jour, plus jamais ensuite.",
      },
    ],
    livrable: "Le skill te connaît : entreprise, TVA, habitudes, numérotation.",
    reussite: "Le setup est terminé et le skill ne te repose plus ces questions.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Ton premier devis",
    tag: ["Résultat", "t-ship"],
    dur: "≈ 8 min",
    obj: "À partir de maintenant, un devis c'est une phrase : le client, la prestation, le prix. Il te montre un récapitulatif, tu valides, et tu repars avec un PDF à envoyer.",
    detailPret: true,
    sous: [
      {
        titre: "Une phrase, un récapitulatif, un devis.",
        duree: "≈ 5 min (2 à 3 min par devis ensuite)",
        cestquoi:
          "Tu donnes le client, la prestation et le prix, dans une phrase normale. Pour un nouveau client, il demande sa fiche une fois (son nom et son adresse au minimum) et la garde au carnet : la prochaine fois, son nom suffira. Les totaux et la TVA sont calculés par le skill, jamais de tête, et le numéro avance tout seul.",
        attendu: "Ton premier vrai devis, conforme et numéroté.",
        prompt: "Devis pour [ton client] : [la prestation], [le prix].",
        exemples: [
          "« Devis pour Madame Martin : remplacement du chauffe-eau, 980 euros. »",
          "« Devis pour l'agence Dupont : refonte de leur plaquette, 1 500 euros, acompte de 40 %. »",
          "« Devis pour Monsieur Bernard : pose de parquet, 45 m² à 38 euros le mètre carré. »",
        ],
        ceQueTuDoisVoir:
          "Un récapitulatif clair AVANT qu'il produise quoi que ce soit : le client, les lignes, les montants. C'est ton moment de contrôle. Tu dis oui, et il te confirme que le fichier est prêt, avec son numéro.",
        visuel: {
          src: "/module/devis-3-1-apercu.png",
          w: 835,
          h: 1120,
          alt: "Un devis produit par le skill : en-tête DEVIS numéroté, émetteur et client, lignes chiffrées, total, conditions et mentions légales, cadres de signature.",
          legende: "Le résultat, tel quel : un devis sorti par le skill avec ses données d'exemple. Numéro, mentions légales, acompte, assurance, bon pour accord : tout y est.",
        },
        siCaBloque:
          "Le récapitulatif ne correspond pas à ce que tu veux ? Ne valide pas, dis simplement ce qui cloche : « le prix c'est 980 hors taxes », « ajoute une ligne de détail », « mets une remise de 10 % ». Il refait le récapitulatif. Tu peux aussi corriger après coup, tant que le devis n'est pas parti chez le client. Il te demande si un prix est hors taxes ou toutes taxes comprises ? Réponds franchement : sur l'argent, il ne devine jamais à ta place.",
        monExemple:
          "Le premier bug attrapé pendant les tests : le devis s'affichait noir sur noir chez les gens en mode sombre. Corrigé avant la sortie, mais ça donne une idée du niveau de détail qu'on est allés chercher pour toi.",
        conseil:
          "Compare avec ta méthode d'avant : 2 à 3 minutes contre 20 à 40 à bricoler un vieux fichier Word. C'est ça que tu viens d'installer.",
      },
      {
        titre: "Récupère ton PDF et envoie-le.",
        duree: "≈ 3 min",
        cestquoi:
          "Le devis sort en fichier qui s'ouvre dans ton navigateur. Pour en faire un PDF, tu ne télécharges rien : tu l'imprimes, et au lieu de choisir une imprimante, tu choisis « Enregistrer au format PDF ». C'est le geste à connaître, il resservira pour chaque devis.",
        attendu: "Un PDF propre, prêt à envoyer à ton client.",
        pasAPas: [
          "Demande à Claude Code « ouvre-moi le devis », ou double-clique le fichier dans le dossier Devis qu'il a créé.",
          "Une fois la page ouverte dans ton navigateur, fais cmd + P (l'impression).",
          "Dans la fenêtre qui s'ouvre, là où on choisit l'imprimante, choisis « Enregistrer au format PDF », puis enregistre.",
        ],
        ceQueTuDoisVoir:
          "Ton devis à l'écran, avec un petit bandeau gris en haut qui t'explique justement ce geste. Ce bandeau n'apparaît PAS sur le PDF : ton client ne le verra jamais. Le PDF, lui, commence directement par ton nom et le mot DEVIS.",
        siCaBloque:
          "Le fichier s'ouvre dans un éditeur de texte au lieu du navigateur ? Clic droit dessus, « Ouvrir avec », et choisis Chrome ou Safari. Tu ne retrouves pas le fichier ? Demande « où est le devis que tu viens de faire ? », il te donne l'emplacement. Le PDF sort sur deux pages alors que le devis est court ? Dans la fenêtre d'impression, règle l'échelle sur « Ajuster à la page ».",
        conseil:
          "Envoie-le comme n'importe quelle pièce jointe. Et laisse le dossier Devis où il est : c'est lui qui permet au skill de retrouver tes anciens devis plus tard.",
      },
    ],
    livrable: "Ton premier devis conforme, en PDF, et ton client au carnet.",
    reussite: "Le devis est sorti, tu as ton PDF, et tu sais refaire le geste en une phrase.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Le quotidien (et la suite)",
    tag: ["Résultat", "t-ship"],
    dur: "≈ 8 min · à lire",
    obj: "Le skill est un système, pas un coup unique : carnet de clients, plusieurs devis d'un coup, mises à jour en une phrase. Et quand un devis est accepté, son compagnon facture prend le relais.",
    detailPret: true,
    sous: [
      {
        titre: "Client connu, et plusieurs devis d'un coup.",
        duree: "≈ 4 min",
        cestquoi:
          "Un client déjà venu ? Son nom suffit, sa fiche est au carnet. Cinq devis à faire ? Donne-les tous d'un coup : un seul récapitulatif, une validation, et les fichiers sortent en série pendant que tu fais autre chose. La numérotation se suit toute seule.",
        attendu: "Un deuxième devis fait sans redonner une seule information sur le client.",
        exemples: [
          "« Même client que la dernière fois : entretien annuel, 180 euros. »",
          "« Devis pour Madame Martin » (il retrouve son adresse tout seul).",
          "« J'ai 5 devis à faire, je te donne tout d'un coup : [les 5 à la suite]. »",
        ],
        ceQueTuDoisVoir:
          "Au deuxième devis pour un même client, plus aucune question sur lui : il enchaîne directement sur la prestation. En série, un seul récapitulatif groupé s'affiche avant que les fichiers sortent.",
        siCaBloque:
          "Il ne retrouve pas un client ? Donne son nom exactement comme au premier devis, ou dis « montre-moi mon carnet de clients ». Un client a déménagé ? « Madame Martin a changé d'adresse, c'est maintenant... », il met à jour sa fiche pour tous les prochains devis.",
        monExemple:
          "C'est là que le skill se distingue d'une IA à qui on demanderait un devis au coup par coup : elle ferait un bon devis isolé, mais ne laisserait rien derrière elle. Pas de carnet, pas de numérotation qui se suit, tout à redire à chaque fois.",
        conseil:
          "Le mode plusieurs devis d'un coup, c'est dix minutes de réponses pour une matinée de paperasse. Garde-le pour tes journées chargées.",
      },
      {
        titre: "Ce qui change, et ce qu'il ne fait pas.",
        duree: "≈ 4 min · à lire",
        cestquoi:
          "Ta vie d'entreprise bouge : adresse, logo, TVA, une mention à ajouter. Tu le dis comme à un collègue, il met à jour juste ça, sans refaire le setup. Et autant savoir tout de suite ce qu'il ne fait pas, pour ne pas le chercher.",
        attendu: "Tu sais faire évoluer ta configuration, et tu connais les limites du skill.",
        exemples: [
          "« J'ai changé d'adresse, c'est maintenant... »",
          "« Je facture la TVA maintenant, à 20 %. »",
          "« Ajoute ma certification RGE sur tous mes devis. »",
          "« Voici mon logo » (glisse le fichier dans la fenêtre de Claude Code).",
        ],
        ceQueTuDoisVoir:
          "Une confirmation courte de ce qu'il a changé, et rien d'autre : il ne te repose pas les autres questions. Le devis suivant sort avec la nouvelle information.",
        siCaBloque:
          "Ce qu'il ne fait pas, pour être honnête : les factures (c'est son compagnon, module suivant), les relances, la signature électronique, le conseil juridique, et les métiers à devis réglementaire imposé (optique, audioprothèse, funéraire). Pour ces cas-là, ton formulaire habituel reste la règle.",
        monExemple:
          "Les mentions légales du skill ont été vérifiées sur les sources officielles, pas de mémoire. Trois choses qu'on croyait vraies étaient périmées, dont l'attestation de TVA réduite, remplacée depuis mars 2025 par une mention sur le devis lui-même.",
        conseil:
          "Quand un devis est accepté, la suite existe : le module « Automatise tes factures » installe le skill compagnon, qui transforme le devis signé en facture sans rien ressaisir. Ta configuration d'ici lui servira telle quelle.",
      },
    ],
    livrable: "Tes devis qui se font en une phrase, tous les jours.",
    reussite: "Tu as fait un deuxième devis sans redonner une seule information.",
  },
];
