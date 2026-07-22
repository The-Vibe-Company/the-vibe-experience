import type { EtapeDetail } from "./module-faire-un-site";

// Module « Automatise tes devis » — famille RÉSULTAT (Automatiser ton business).
// BROUILLON en review. Premier module de la famille : on n'apprend pas à
// construire, on met en place un skill prêt à l'emploi (generer-devis, offert)
// et on repart avec ses devis qui se font tout seuls. Textes ancrés dans le
// LISEZMOI et le topo du skill (skills-offerts/, éprouvés par banc d'essai
// et test débutante totale le 21/07/2026).

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
          "L'app ouverte, avec la zone où tu écris tes messages. Si elle te demande de choisir un dossier à l'ouverture, choisis ton Bureau (ou n'importe quel dossier) : tes devis se rangeront dans un dossier Devis que le skill te montrera.",
        siCaBloque:
          "L'installation coince quelque part ? Le module « Fais ton premier site » a une étape 0 entièrement guidée pour ça, avec les captures et les cas qui bloquent. Fais-la, et reviens ici.",
        conseil:
          "Garde ce réflexe pour tout le module : quand quelque chose cloche ou te surprend, décris ton problème à Claude Code (ce que tu as fait, ce que tu attendais, ce que tu vois) et discute avec lui.",
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
          "Le bouton ci-dessous copie le skill en entier. Tu le colles dans Claude Code, il recrée les fichiers au bon endroit chez toi et te confirme que le skill est prêt. Une seule fois : ensuite, il te suit sur toutes tes conversations.",
        attendu: "Claude Code te confirme que le skill generer-devis est installé et prêt.",
        telechargements: [{ n: "Générer un devis", href: "/skills/generer-devis.zip" }],
        outils: [F.skilldevis],
        pasAPas: [
          "Clique sur « Copier le skill » juste au-dessus : ça copie le skill en entier.",
          "Ouvre Claude Code, colle dans la zone où tu écris tes messages, et envoie. S'il te demande l'autorisation de créer des fichiers, accepte : c'est lui qui range le skill.",
          "Attends sa confirmation : le skill est en place.",
        ],
        ceQueTuDoisVoir:
          "Claude Code recrée les fichiers du skill et te confirme que generer-devis est installé. Pour vérifier : tape / dans la zone d'écriture, generer-devis doit apparaître dans la liste.",
        siCaBloque:
          "Claude Code ne connaît pas le skill juste après l'installation ? Ferme et rouvre l'app : un skill tout juste installé n'est parfois pris en compte qu'au redémarrage. Le collage ne marche pas ? Recopie depuis cette page et renvoie.",
        conseil: "Tu viens d'installer un outil de travail complet sans ouvrir un seul dossier. C'est comme ça qu'on s'équipe ici.",
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
        titre: "Dis « fais-moi un devis », et réponds à ses questions.",
        duree: "≈ 10 min (garde ton SIRET sous la main)",
        cestquoi:
          "Le skill voit qu'il ne te connaît pas encore et fait connaissance : ton entreprise (nom, forme, adresse, SIRET), ta TVA (tu la factures ou pas : s'il y a franchise, la mention légale se pose toute seule), ton assurance décennale si tu es artisan du bâtiment, et tes habitudes (durée de validité, acompte, conditions de règlement, ta numérotation s'il faut la reprendre). Tout est enregistré : il ne te redemandera plus jamais rien de cette liste.",
        attendu: "Ta configuration complète, enregistrée une fois pour toutes.",
        prompt: "Fais-moi un devis.",
        ceQueTuDoisVoir:
          "Une dizaine de questions, une par une, en français simple. Réponds avec tes mots. À la fin, il te confirme que tout est enregistré et enchaîne sur ton premier devis. Si tu es artisan, il te demandera ton assurance décennale : c'est une mention obligatoire sur chaque devis du bâtiment, il la posera pour toi.",
        siCaBloque:
          "Tu n'as pas ton SIRET ou ton attestation d'assurance sous la main ? Réponds à ce que tu peux, dis-lui « je te donnerai le reste plus tard » et reprends quand tu l'as : il continue où vous en étiez. Tu t'es trompé dans une réponse ? Dis-le simplement (« en fait mon adresse c'est... »), il corrige.",
        monExemple:
          "On a testé ce setup de bout en bout avec une fausse débutante totale, une couturière de 52 ans qui n'avait jamais utilisé d'IA : setup réussi, deux devis, zéro information redemandée au deuxième. Les frictions qu'elle a rencontrées ont été corrigées avant de te le donner.",
        conseil: "Prends les 10 minutes d'un coup, avec ton SIRET (et ton attestation d'assurance si tu es artisan). C'est le pari du skill : toute la lourdeur le premier jour, plus jamais ensuite.",
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
    dur: "≈ 5 min",
    obj: "À partir de maintenant, un devis c'est une phrase : le client, la prestation, le prix. Il te montre un récapitulatif, tu valides, le fichier est prêt.",
    detailPret: true,
    sous: [
      {
        titre: "Une phrase, un récapitulatif, un devis.",
        duree: "≈ 5 min (2 à 3 min par devis ensuite)",
        cestquoi:
          "Tu donnes le client, la prestation et le prix. Pour un nouveau client, il demande sa fiche une fois (nom et adresse au minimum) et la garde au carnet : la prochaine fois, son nom suffira. Les totaux et la TVA sont calculés par un script, jamais de tête, et le numéro avance tout seul.",
        attendu: "Ton premier vrai devis, conforme et numéroté, en PDF.",
        prompt: "Devis pour [ton client] : [la prestation], [le prix].",
        exemples: [
          "« Devis pour Madame Martin : remplacement du chauffe-eau, 980 euros. »",
          "« Devis pour l'agence Dupont : refonte de leur plaquette, 1 500 euros, acompte de 40 %. »",
        ],
        ceQueTuDoisVoir:
          "Un récapitulatif clair avant de produire : le client, les lignes, les montants. Tu dis oui, et le fichier arrive dans un dossier Devis. Pour le PDF : ouvre le fichier, imprime (cmd + P), et choisis « Enregistrer au format PDF ». C'est le geste, il te l'explique aussi.",
        visuel: {
          src: "/module/devis-3-1-apercu.png",
          w: 835,
          h: 1120,
          alt: "Un devis produit par le skill : en-tête DEVIS numéroté, émetteur et client, lignes chiffrées, total, conditions et mentions légales, cadres de signature.",
          legende: "Le résultat, tel quel : un devis sorti par le skill avec ses données d'exemple. Numéro, mentions légales, acompte, assurance, bon pour accord : tout y est.",
        },
        siCaBloque:
          "Le devis ne ressemble pas à ce que tu veux (une ligne à détailler, une remise à poser, des dates de chantier) ? Dis-le avant de valider le récapitulatif, ou même après : « ajoute une ligne de détail », « mets une remise de 10 % ». Rien n'est figé tant que tu n'as pas envoyé le devis au client.",
        monExemple:
          "Le premier bug attrapé pendant les tests : le devis s'affichait noir sur noir chez les gens en mode sombre. Corrigé avant la sortie, mais ça donne une idée du niveau de détail qu'on est allés chercher pour toi.",
        conseil: "Compare avec ta méthode d'avant : 2 à 3 minutes contre 20 à 40 à bricoler un vieux fichier Word. C'est ça que tu viens d'installer.",
      },
    ],
    livrable: "Ton premier devis conforme, numéroté, en PDF, et ton client au carnet.",
    reussite: "Le devis est sorti, et tu sais refaire le geste en une phrase.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Le quotidien (et la suite)",
    tag: ["Résultat", "t-ship"],
    dur: "≈ 5 min · à lire",
    obj: "Le skill est un système, pas un one-shot : carnet de clients, mode rafale, mises à jour en une phrase. Et quand un devis est accepté, son compagnon facture prend le relais.",
    detailPret: true,
    sous: [
      {
        titre: "Clients connus, mode rafale, et ce qui change.",
        duree: "≈ 5 min",
        cestquoi:
          "Un client déjà venu ? Son nom suffit, sa fiche est au carnet. Cinq devis à faire ? Donne tout d'un coup (« j'ai 5 devis à faire, voici tout ») : un seul récapitulatif, une validation, les fichiers sortent en série pendant que tu fais autre chose. Quelque chose change dans ta vie d'entreprise ? Dis-le comme à un collègue : « j'ai changé d'adresse », « nouveau logo », « je facture la TVA maintenant ». Il met à jour juste ça.",
        attendu: "Tu sais te servir du skill comme d'un outil de tous les jours.",
        exemples: [
          "« Même client que la dernière fois : entretien annuel, 180 euros. »",
          "« J'ai 5 devis à faire, voici tout : [les 5 en vrac]. »",
          "« Ajoute ma certification RGE sur tous mes devis. »",
        ],
        ceQueTuDoisVoir:
          "Au deuxième devis pour un même client, plus aucune question sur lui. En rafale, la numérotation se suit toute seule et chaque nouveau client entre au carnet.",
        siCaBloque:
          "Ce qu'il ne fait pas, pour être honnête : les relances, la signature électronique, le conseil juridique, et les métiers à devis réglementaire imposé (optique, audioprothèse, funéraire). Pour ces cas-là, ton formulaire habituel reste la règle.",
        conseil:
          "Quand un devis est accepté, la suite logique existe : le module « Automatise tes factures », avec le skill compagnon qui transforme le devis signé en facture sans rien ressaisir. Ta configuration d'ici lui servira telle quelle.",
      },
    ],
    livrable: "Tes devis qui se font en une phrase, tous les jours.",
    reussite: "Tu as fait un deuxième devis sans redonner une seule information.",
  },
];
