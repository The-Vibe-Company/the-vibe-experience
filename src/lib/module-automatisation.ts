import type { EtapeDetail } from "./module-faire-un-site";

// Module 3 — « Automatise ton travail » (famille savoir-faire).
// BROUILLON en review sur /automatiser-ton-travail (pages câblées, listé dans le
// parcours avec le statut « En écriture »). Vécus Victor intégrés le 2026-07-20.
// Captures en place : le hook installé (1.2), le garde-fou qui bloque (2.2), les
// Routines de la barre latérale (3.2), la routine qui tourne seule (3.3).
// Reste : les cadeaux (décision Victor :
// rien de confidentiel, offrir les hooks maison réplicables à forte valeur ;
// candidats : le garde-fou prod « pas de mise en ligne sans OK explicite » et le
// hook de documentation ; à packager depuis les vrais configs, comme au module 2).
// Fil directeur : jusqu'ici, il se passe quelque chose parce que tu demandes.
// Une automatisation, c'est quelque chose qui se passe parce que c'est déclenché.
// Les concepts (déclencheur, action, garde-fou) sont universels ; Claude Code est
// l'outil de pratique, comme dans les modules 1 et 2.

const F = {
  claudecode: {
    n: "Claude Code",
    d: "Toujours lui. Tes automatisations vivent dedans : il les installe, les liste et les retire quand tu le demandes.",
  },
  hook: {
    n: "Un hook",
    d: "Le mot des pros pour « réflexe automatique » : une consigne qui se déclenche toute seule quand un événement précis arrive.",
  },
  routine: {
    n: "Une tâche programmée",
    d: "Une consigne qui se déclenche à une heure choisie, comme un rendez-vous d'agenda. Ton Mac doit être allumé à ce moment-là.",
  },
};

export const etapesDetailAutomatisation: EtapeDetail[] = [
  {
    slug: "0",
    num: "0",
    titre: "C'est quoi une automatisation",
    tag: ["Comprendre", "t-build"],
    dur: "≈ 15 min · rien à installer",
    obj: "Avant d'automatiser quoi que ce soit, comprendre LE déplacement de ce module : jusqu'ici, il se passait des choses parce que tu demandais. Maintenant, il va se passer des choses parce que c'est déclenché. Tu as déjà tous les outils.",
    detailPret: true,
    sous: [
      {
        titre: "Tu as déjà tout : ton site, tes skills, Claude Code.",
        duree: "≈ 5 min",
        cestquoi:
          "Ce module n'ajoute aucun outil. Une automatisation, ce n'est pas un logiciel en plus : c'est une façon de brancher ce que tu as déjà (ton site du module 1, tes skills du module 2, Claude Code) pour que ça travaille sans toi. Rien à payer, rien à installer.",
        attendu: "Claude Code rouvert sur ton dossier de site, comme aux modules précédents.",
        outils: [F.claudecode],
        ceQueTuDoisVoir:
          "Claude Code ouvert sur ton dossier de site, comme tu l'as laissé au module précédent. Rien d'autre : tout ce que ce module installe passera par cette fenêtre.",
        siCaBloque:
          "Tu ne sais plus comment rouvrir Claude Code ou retrouver ton dossier ? Même geste qu'avant : ouvre l'app, et demande-lui « dans quel dossier travailles-tu ? ». Au besoin, redemande-lui d'ouvrir ton dossier de site.",
        monExemple:
          "Ma veille sur l'actu de l'IA, je n'y touche presque plus depuis un mois : elle me sort sa petite newsletter chaque semaine, et une alerte quand un sujet est important. Me tenir au courant, c'est littéralement sorti de mon cerveau. C'est ça que l'automatisation change : de la charge mentale en moins.",
        conseil:
          "Garde le réflexe des modules précédents : quand quelque chose cloche ou te surprend, décris ton problème à Claude Code (ce que tu as fait, ce que tu attendais, ce que tu vois) et discute avec lui.",
      },
      {
        titre: "Comprends le mécanisme : déclencheur, action, garde-fou.",
        duree: "≈ 10 min · rien à faire, juste à retenir",
        cestquoi:
          "Toute automatisation, du plus petit réflexe aux grosses usines des pros, tient en trois morceaux. Un DÉCLENCHEUR : ce qui la réveille (un événement qui arrive, ou une heure qui sonne). Une ACTION : ce qu'elle fait. Un GARDE-FOU : ce qui l'empêche de faire n'importe quoi. Dans ce module tu vas monter les quatre rangs : le réflexe (dès qu'un événement arrive, une action part), le garde-fou (une automatisation qui te protège), le rendez-vous (à telle heure, chaque semaine), et l'usine (plusieurs briques qui travaillent ensemble et te livrent un résultat fini).",
        attendu:
          "Tu sais dire avec tes mots : une automatisation = un déclencheur + une action + un garde-fou. Et tu connais les deux familles de déclencheurs : un événement, ou l'heure.",
        exemples: [
          "Réflexe : « à chaque changement validé, envoie mon code sur GitHub ».",
          "Garde-fou : « avant chaque mise en ligne, vérifie que le site marche, sinon bloque ».",
          "Rendez-vous : « chaque vendredi à 17h, prépare-moi le bilan de mon site ».",
          "Usine : « chaque lundi, regarde ce qui se dit sur mon sujet et propose-moi du contenu prêt à ajouter ».",
        ],
        ceQueTuDoisVoir:
          "Rien à l'écran pour l'instant : le test, c'est toi. Dis à voix haute : « une automatisation, c'est un déclencheur, une action et un garde-fou ». Si tu sais aussi citer les deux familles de déclencheurs (un événement, ou l'heure), tu as tout ce qu'il faut pour la suite.",
        siCaBloque:
          "Le vocabulaire te semble abstrait ? C'est normal, il devient concret dès la prochaine étape : tu vas installer ton premier réflexe et le voir partir tout seul. Retiens juste les trois mots.",
        monExemple:
          "Mes automatisations à moi (la veille qui sort ma newsletter, mes hooks de documentation, mon garde-fou de mise en ligne) tiennent toutes dans ces trois morceaux. C'est le même squelette partout, du petit réflexe à la grosse usine.",
        conseil:
          "Ces trois morceaux valent partout, pas seulement dans Claude Code : le jour où tu utiliseras un autre outil d'automatisation, tu chercheras les mêmes trois choses.",
      },
    ],
    livrable: "Le mécanisme en tête : déclencheur, action, garde-fou. Et Claude Code ouvert sur ton site.",
    reussite: "Tu sais expliquer les trois morceaux avec tes mots.",
  },
  {
    slug: "1",
    num: "1",
    titre: "Ton premier réflexe automatique",
    tag: ["Hook", "t-build"],
    dur: "≈ 30 à 40 min",
    obj: "Installer ton premier hook : une consigne qui se déclenche toute seule quand un événement arrive. Tu vas automatiser la sauvegarde de ton site, la voir partir sans toi, et apprendre à garder le contrôle (lister, retirer).",
    detailPret: true,
    sous: [
      {
        titre: "Repère ce que tu relances à la main.",
        duree: "≈ 5 à 10 min",
        cestquoi:
          "Comme au module 2 pour les skills : une bonne automatisation part d'une répétition. Ici, cherche ce que tu REDEMANDES ou relances toujours pareil, au même moment. C'est le signe qu'un déclencheur existe.",
        attendu:
          "Une phrase du type « à chaque fois que [événement], je demande [action] ». C'est ton futur hook.",
        exemples: [
          "« À chaque fois que je valide un changement, je demande d'envoyer mon code sur GitHub. » (le grand classique, on le fait ensemble juste après)",
          "« À chaque grosse modification, je repasse Impeccable pour nettoyer. »",
          "« À la fin de chaque session, je demande un résumé de ce qu'on a fait. »",
        ],
        prompt:
          "Regarde les fichiers de mon projet et nos habitudes de travail : qu'est-ce que je te redemande ou relance toujours pareil, au même moment ? Propose-moi deux ou trois candidats au format « à chaque fois que [événement], fais [action] », et dis-moi lequel te semble le plus utile.",
        ceQueTuDoisVoir:
          "Ta phrase est bonne si tu peux pointer le déclencheur du doigt : « à chaque fois que... quoi, exactement ? ». Si la réponse est nette (un changement validé, une fin de session), c'est un hook. Si c'est « de temps en temps », ce n'en est pas un.",
        siCaBloque:
          "Tu ne vois pas de répétition ? Prends celle de tout le monde : la sauvegarde. Depuis le module 1, tu redemandes (ou tu comptes sur une consigne écrite) pour envoyer ton code sur GitHub. C'est exactement ce qu'on automatise à la sous-étape suivante.",
        monExemple:
          "Chez moi, la documentation de mon travail est devenue plein de hooks : à chaque faille que je repérais (un truc qui n'était pas capturé), j'en rajoutais un. C'est le chemin classique : tu repères ce qui devrait se faire tout seul, et tu le branches.",
        conseil: "Un bon candidat au hook a un déclencheur NET : « à chaque X ». Si tu n'arrives pas à nommer le X, ce n'est pas encore un hook, c'est peut-être un rendez-vous (étape 3).",
      },
      {
        titre: "Installe ton hook de sauvegarde automatique.",
        duree: "≈ 10 à 15 min",
        cestquoi:
          "Tu demandes à Claude Code d'installer le hook. Concrètement, il écrit la consigne dans ses réglages, et ensuite elle se déclenche toute seule, dans tous tes prochains échanges. Tu n'écris rien toi-même : tu décris le déclencheur et l'action, il fait.",
        attendu: "Un hook installé : à chaque changement validé, ton code part sur GitHub sans que tu le demandes.",
        outils: [F.hook],
        prompt:
          "Installe-moi un hook : à chaque fois qu'on termine une modification de mon site, enregistre et envoie automatiquement mon code sur GitHub, et confirme-le moi en une ligne. Explique-moi ce que tu as installé et où.",
        ceQueTuDoisVoir:
          "Trois moments. D'abord, il peut te poser une ou deux questions de précision, parfois sous forme de liste où tu coches ta réponse (sur quel projet ? à quel moment exactement ?) : réponds, c'est bon signe, il calibre ton déclencheur. Ensuite, il te demande la permission d'écrire dans son fichier de réglages : dis oui, c'est justement lui qui pose ton hook. Enfin, il te confirme ce qu'il a installé et où (capture ci-dessous). À partir de là, le déclencheur est armé.",
        siCaBloque:
          "Il te propose plusieurs façons de faire et tu ne sais pas choisir ? Réponds « choisis la plus simple et la plus fiable pour un débutant, et explique-moi ton choix en deux phrases ». Il te parle d'un fichier de réglages avec un nom technique ? Pas besoin de l'ouvrir : c'est son rangement à lui, comme pour les skills.",
        visuel: {
          src: "/module/3-1-hook-installe.png",
          alt: "La confirmation d'installation d'un hook dans Claude Code : les questions de précision et leurs réponses, le script créé, puis ce qui a été installé, où, et ce que ça fait à chaque déclenchement.",
          legende: "Un vrai hook qui vient d'être installé chez moi : il dit ce qu'il a créé, où il l'a branché, et ce que ça fera à chaque fois. C'est cette réponse-là que tu attends.",
        },
        monExemple:
          "Chez moi, un hook enregistre chaque fichier modifié, sur tous mes projets, pour que ma documentation n'oublie rien. Je l'ai décrit une fois, il tourne depuis des semaines sans que j'y pense.",
        conseil:
          "Décris toujours un hook dans cet ordre : le déclencheur (« à chaque fois que... »), puis l'action (« fais... »). C'est le format qui marche à tous les coups. Et lis sa réponse en entier : c'est là que tu vois ce qu'il a vraiment installé, et donc ce qui va partir tout seul à partir de maintenant.",
      },
      {
        titre: "Vois-le vivre, et garde le contrôle.",
        duree: "≈ 10 à 15 min",
        cestquoi:
          "Un réflexe automatique, ça se teste et ça se maîtrise. Tu vas faire une vraie modification, voir la sauvegarde partir SANS la demander, puis apprendre les trois gestes de contrôle : lister tes hooks, en retirer un, le remettre.",
        attendu:
          "Tu as vu ton hook se déclencher tout seul, et tu sais l'afficher et le retirer. Une automatisation dont tu ne sais pas reprendre le contrôle n'est pas une bonne automatisation.",
        pasAPas: [
          "Demande une petite modification à ton site (change un titre, une couleur), valide-la, et NE demande PAS la sauvegarde : regarde la ligne de confirmation arriver toute seule.",
          "Va sur github.com : la date de dernière mise à jour de ton repo vient de changer. C'est la preuve extérieure.",
          "Puis apprends les gestes de contrôle : demande « montre-moi mes hooks installés », puis « désactive mon hook de sauvegarde », vérifie qu'il ne part plus, et remets-le.",
        ],
        ceQueTuDoisVoir:
          "Après ta modification, la confirmation de sauvegarde apparaît sans que tu aies rien demandé. C'est ton premier « ça s'est fait tout seul ». Et quand tu listes tes hooks, celui de la sauvegarde apparaît avec son déclencheur et son action.",
        siCaBloque:
          "La sauvegarde ne part pas ? Ferme et rouvre Claude Code (comme pour un skill tout juste installé), refais une petite modification, et si ça ne part toujours pas, dis-lui « mon hook de sauvegarde ne se déclenche pas, diagnostique et répare ». Et souviens-toi : tu peux toujours tout retirer d'une phrase.",
        monExemple:
          "Mes hooks, je les testais exactement comme ça : je déclenchais l'événement exprès, dans une nouvelle conversation, pour voir si ça capturait vraiment. Le jour où j'ai demandé « montre-moi ce que tu as enregistré » et que tout est ressorti, c'était hyper satisfaisant. Quand un hook marche vraiment, c'est cette sensation-là.",
        conseil: "Prends l'habitude de tester chaque automatisation juste après l'avoir posée, en déclenchant l'événement exprès. Une automatisation non testée est une automatisation supposée.",
      },
    ],
    livrable: "Ton premier hook, installé, vu en marche, et sous ton contrôle.",
    reussite: "La sauvegarde part sans que tu la demandes, et tu sais lister et retirer tes hooks.",
  },
  {
    slug: "2",
    num: "2",
    titre: "Ton garde-fou",
    tag: ["Sécurité", "t-build"],
    dur: "≈ 20 à 30 min",
    obj: "Le deuxième visage de l'automatisation : celle qui ne fait rien à ta place, mais qui t'empêche de casser. Tu vas poser un garde-fou qui bloque la mise en ligne d'un site cassé, et le déclencher exprès pour le voir te protéger.",
    detailPret: true,
    sous: [
      {
        titre: "L'automatisation qui protège (au lieu de faire).",
        duree: "≈ 5 min · rien à faire, juste à retenir",
        cestquoi:
          "Depuis le module 1, chaque envoi sur GitHub peut mettre ton site en ligne. C'est puissant, et c'est exactement pour ça qu'il faut une barrière : un garde-fou, c'est un hook dont l'action est de VÉRIFIER et, si besoin, de BLOQUER. Les pros en mettent partout, pas parce qu'ils sont maladroits, mais parce que tout le monde finit par pousser une bêtise un jour.",
        attendu: "Tu as compris qu'un garde-fou est un hook comme un autre, avec une action de blocage.",
        exemples: [
          "« Avant chaque mise en ligne, vérifie que le site se construit. Sinon, bloque et explique. »",
          "« Ne mets jamais mon site public à jour sans que je le demande explicitement. » (le mien)",
          "« Ne supprime jamais un fichier sans me montrer lequel et me demander. »",
        ],
        monExemple:
          "Je l'ai appris en me faisant avoir : un simple « merge » lancé trop vite a publié sur notre site des choses qui n'étaient pas validées. Ma réaction, ça a été la bonne question : qu'est-ce que je mets en place pour que ça n'arrive jamais deux fois ? Depuis, si je dis juste « merge », mon garde-fou me bloque et exige que je précise que je veux vraiment la mise en ligne. Honnêtement, quand je suis pressé, c'est parfois pénible. Mais plus rien n'est parti en ligne sans contrôle depuis.",
        siCaBloque:
          "« Bloquer », ça t'inquiète ? Un garde-fou ne casse jamais rien : au pire, il t'arrête et t'explique pourquoi. Tu peux toujours passer outre en le retirant, mais il t'aura forcé à le décider en conscience.",
        conseil: "La bonne question pour trouver tes garde-fous : « qu'est-ce que je ne veux JAMAIS voir arriver tout seul ? »",
      },
      {
        titre: "Installe le garde-fou anti-site-cassé, et déclenche-le exprès.",
        duree: "≈ 15 à 25 min",
        cestquoi:
          "Tu poses le garde-fou, puis tu fais la chose la plus formatrice du module : tu casses ton site EXPRÈS pour le voir bloquer. C'est le meilleur moyen de lui faire confiance ensuite.",
        attendu: "Un garde-fou actif : impossible d'envoyer en ligne un site qui ne se construit plus. Et tu l'as vu bloquer de tes yeux.",
        pasAPas: [
          "Envoie le prompt ci-dessous tel quel : il installe le garde-fou, puis le teste devant toi avec une erreur volontaire.",
          "Regarde les trois actes se dérouler (détaillés dans « Ce que tu dois voir » juste en dessous), et vérifie à la fin que ton site s'affiche toujours en local.",
        ],
        prompt:
          "Installe-moi un garde-fou : avant chaque envoi de mon code sur GitHub, vérifie que mon site se construit sans erreur. Si ça casse, bloque l'envoi et explique-moi le problème en français simple. Ensuite, pour tester, introduis une petite erreur volontaire dans mon site, essaie d'envoyer, et montre-moi le blocage. Puis répare l'erreur et confirme que l'envoi repasse.",
        ceQueTuDoisVoir:
          "Trois actes. Un : le garde-fou s'installe (même mécanique qu'à l'étape 1). Deux : avec l'erreur volontaire, l'envoi est BLOQUÉ, avec l'explication. C'est le moment important : ton filet marche. Trois : l'erreur réparée, l'envoi repasse tout seul. Ton site en ligne n'a jamais été touché pendant tout ce temps.",
        visuel: {
          src: "/module/3-2-garde-fou-bloque.png",
          alt: "Une conversation où l'utilisateur écrit « merge » et où le garde-fou refuse, rappelle ce qui partirait en ligne, et exige une confirmation explicite.",
          legende: "Mon vrai garde-fou, pris sur le fait : je tape « merge », il refuse, me rappelle ce qui partirait en ligne, et exige que je le dise en toutes lettres. C'est ça, une automatisation qui protège.",
        },
        siCaBloque:
          "Le test t'angoisse ? C'est prévu pour être sans risque : l'erreur volontaire reste sur ta machine, le garde-fou empêche justement qu'elle parte en ligne, et Claude Code la répare dans la foulée. Si quelque chose semble coincé après le test, demande « confirme-moi que mon site est propre et que tout est réparé ».",
        conseil:
          "Retiens la combinaison des étapes 1 et 2 : un réflexe qui fait + un garde-fou qui vérifie. C'est le duo de base de toute automatisation sérieuse, tu le retrouveras partout.",
      },
    ],
    livrable: "Un garde-fou actif sur ton site, testé en le déclenchant exprès.",
    reussite: "Tu as vu le blocage de tes yeux, puis l'envoi repasser une fois l'erreur réparée.",
  },
  {
    slug: "3",
    num: "3",
    titre: "Ton rendez-vous programmé",
    tag: ["Routine", "t-product"],
    dur: "≈ 25 à 35 min",
    obj: "Le deuxième déclencheur : l'heure. Tu programmes une tâche récurrente qui travaille pour toi à heure fixe, chaque semaine, que tu y penses ou non.",
    detailPret: true,
    sous: [
      {
        titre: "Choisis ton rendez-vous (quoi, et quand).",
        duree: "≈ 5 à 10 min",
        cestquoi:
          "Une tâche programmée, c'est une consigne avec l'heure comme déclencheur. Le bon candidat : quelque chose d'utile régulièrement, que tu oublierais de faire toi-même. Tu choisis l'action et le rendez-vous.",
        attendu: "Une phrase du type « chaque [jour] à [heure], fais [action] et range le résultat [où] ».",
        outils: [F.routine],
        exemples: [
          "« Chaque vendredi à 17h, fais le bilan de mon site : ce qui a changé cette semaine, mes nouveaux inscrits, et une idée d'amélioration. Range-le dans un fichier bilan.md. »",
          "« Chaque lundi à 9h, vérifie que mon site en ligne répond bien et dis-moi si quelque chose cloche. »",
        ],
        ceQueTuDoisVoir:
          "Ta phrase complète tient les quatre morceaux : le jour, l'heure, l'action, et où se range le résultat. S'il en manque un, la routine sera floue : précise-le avant de programmer.",
        siCaBloque:
          "Rien ne te vient ? Prends le bilan hebdo, c'est le plus parlant : tu verras chaque semaine ton site résumé sans avoir rien demandé. Tu pourras en changer plus tard, une routine se modifie ou se supprime d'une phrase, comme un hook.",
        monExemple:
          "Deux vécus, pour être honnête. Ma veille tourne toute seule et la charge mentale a vraiment disparu : je n'y pense plus, ça sort chaque semaine. Mon menu de sujets du vendredi tourne aussi tout seul, mais les propositions, on les retravaille beaucoup ensuite : ça prépare mon travail, ça ne me l'enlève pas. Les deux genres existent, autant le savoir en choisissant.",
        conseil:
          "Une seule règle d'honnêteté à connaître : la tâche tourne sur TON Mac, donc il doit être allumé à l'heure du rendez-vous. Choisis une heure où il l'est vraiment (pas 3h du matin).",
      },
      {
        titre: "Programme ta routine (et teste-la dans 2 minutes, pas vendredi).",
        duree: "≈ 15 à 20 min",
        cestquoi:
          "Tu demandes la programmation à Claude Code, comme tout le reste. Et pour ne pas attendre vendredi pour savoir si ça marche, l'astuce des pros : tu programmes D'ABORD un passage d'essai dans deux minutes, tu le vois tourner, et ENSUITE tu passes au vrai rythme hebdomadaire.",
        attendu: "Ta routine testée en vrai dans les deux minutes, puis programmée à son vrai rendez-vous hebdo.",
        pasAPas: [
          "Envoie le prompt ci-dessous : il programme un passage d'essai dans 2 minutes. Laisse Claude Code ouvert et regarde-le se déclencher tout seul.",
          "Vérifie le résultat (le fichier bilan.md est apparu dans ton projet, avec le contenu attendu).",
          "Puis dis : « parfait, maintenant programme cette même tâche chaque vendredi à 17h, et supprime l'essai ».",
        ],
        prompt:
          "Programme une tâche d'essai qui se lance dans 2 minutes : fais le bilan de mon site (ce qui a changé récemment, et une idée d'amélioration) et range-le dans un fichier bilan.md à la racine de mon projet. Dis-moi quand c'est programmé, puis quand c'est passé.",
        ceQueTuDoisVoir:
          "Claude Code confirme la programmation. Deux minutes plus tard, sans que tu touches à rien, la tâche se lance : tu vois le travail se faire, puis le fichier bilan.md apparaître dans ton projet. C'est ton premier rendez-vous honoré. Quand tu passes au rythme hebdo, demande « montre-moi mes tâches programmées » : elle doit y figurer avec son horaire. Tu peux aussi la voir dans la barre latérale de l'app, section « Routines ».",
        visuel: {
          src: "/module/3-2-routines.png",
          alt: "La barre latérale de Claude Code : l'entrée Routines du menu, puis la section Routines listant deux tâches programmées.",
          legende: "Chez moi : la section « Routines » de ma barre latérale, avec mes deux vrais rendez-vous : le menu de sujets du vendredi et le bilan du soir.",
        },
        siCaBloque:
          "Les deux minutes passent et rien ne se lance ? Demande « où en est ma tâche programmée ? » : selon la configuration, il peut y avoir un léger décalage, c'est prévu. Toujours rien ? « Ma tâche d'essai ne s'est pas lancée, diagnostique et reprogramme-la. » Et pour tout arrêter un jour : « supprime ma tâche programmée du vendredi », c'est tout.",
        // [À VÉRIFIER avant publication : le comportement si le Mac est éteint à l'heure dite
        // (rattrapage au réveil ou passage sauté ?). Le libellé de la barre latérale
        // (« Routines ») est confirmé par la capture de Victor du 21/07.]
        // [CAPTURE optionnelle] Le passage d'essai qui se déclenche + bilan.md apparu.
        // Le principe (une routine qui tourne seule) est déjà illustré en 3.3.
        monExemple:
          "Dans ma barre latérale (capture ci-dessus), il y a aujourd'hui deux rendez-vous : la proposition de sujets de contenu de la semaine, et le bilan du soir. C'est devenu le rythme normal de mes semaines : ces trucs-là arrivent, que j'y pense ou non.",
        conseil:
          "L'astuce du passage d'essai vaut pour TOUTES tes futures routines : d'abord dans 2 minutes pour voir, ensuite au vrai rythme. Ne programme jamais à l'aveugle.",
      },
      {
        titre: "Le rendez-vous d'après : laisse-la vivre.",
        duree: "≈ 5 min (et rendez-vous vendredi)",
        cestquoi:
          "Une routine se juge sur la durée. Celle-ci va tourner vendredi, puis tous les vendredis. Ton seul travail : lire le bilan, et ajuster la consigne si le résultat ne te plaît pas.",
        attendu: "Ta routine vit sa vie. Toi, tu lis le résultat et tu affines la consigne de temps en temps.",
        ceQueTuDoisVoir:
          "Vendredi soir, un bilan.md mis à jour t'attend dans ton projet, sans que tu aies rien demandé. Dans l'app, la routine a laissé sa trace : elle a travaillé toute seule et s'est terminée par une ligne de conclusion (capture ci-dessous). Si le contenu ne te convient pas, ne supprime pas la routine : dis simplement « à partir de maintenant, ajoute aussi [ce qui manque] dans le bilan ».",
        visuel: {
          src: "/module/3-3-routine-tourne.png",
          alt: "Une routine programmée en train de travailler dans Claude Code : elle lance un skill, enchaîne plusieurs commandes, puis conclut par « Bilan du soir du 21 juillet, fait ».",
          legende: "Mon bilan du soir, un vrai rendez-vous programmé : il part sans moi, enchaîne son travail et se termine tout seul. Mon app est en anglais, la tienne parlera français.",
        },
        siCaBloque:
          "Vendredi est passé et pas de bilan ? Premier réflexe : ton Mac était-il allumé à 17h ? Si non, c'est la limite honnête de la routine locale (déplace l'horaire). Si oui, demande « pourquoi ma tâche du vendredi n'a pas tourné ? ».",
        monExemple:
          "Mon menu de sujets tombe le vendredi. Honnêtement, je le lis souvent le lundi, et c'est très bien comme ça : une routine ne t'impose pas d'être au rendez-vous, le travail t'attend.",
        conseil:
          "C'est le rang au-dessus qui règle la limite du « Mac allumé » : des routines qui tournent dans le cloud, sans ta machine. On en reparle à la fin du module.",
      },
    ],
    livrable: "Une routine hebdomadaire programmée, testée par un passage d'essai, qui produit un bilan chaque vendredi.",
    reussite: "Le passage d'essai a tourné sous tes yeux, et le rendez-vous hebdo est en place.",
  },
  {
    slug: "4",
    num: "4",
    titre: "Ta petite usine",
    tag: ["Assemble", "t-ship"],
    dur: "≈ 30 à 45 min",
    obj: "Le dernier rang : assembler. Une automatisation qui combine ta routine, TON skill du module 2 et ton garde-fou, et qui te livre un résultat fini. C'est le même principe que les grosses automatisations des pros, en version à toi.",
    detailPret: true,
    sous: [
      {
        titre: "Assemble : une veille qui te propose du contenu prêt à ajouter.",
        duree: "≈ 20 à 30 min",
        cestquoi:
          "Jusqu'ici, chaque brique travaillait seule. Une usine, c'est des briques branchées ensemble : une routine (le déclencheur), ton skill mon-style du module 2 (le savoir-faire), et ton garde-fou (la sécurité). Résultat : chaque semaine, des propositions de contenu pour ton site, écrites dans TON style, prêtes à valider.",
        attendu:
          "Une automatisation complète : chaque lundi, des idées de contenu dans ton style t'attendent, et rien ne part en ligne sans toi.",
        pasAPas: [
          "Adapte le prompt ci-dessous à ton sujet et au nom de ton skill, puis envoie-le.",
          "Fais d'abord un passage d'essai dans 2 minutes (l'astuce de l'étape 3) pour voir propositions.md apparaître, puis passe au vrai rythme du lundi.",
        ],
        prompt:
          "Programme une tâche chaque lundi à 9h : cherche ce qui est nouveau ou intéressant autour de [le sujet de ton site], choisis les 2 meilleures idées de contenu pour mon site, et rédige un brouillon pour chacune en utilisant mon skill [nom de ton skill du module 2]. Range tout dans un fichier propositions.md. Ne modifie pas mon site directement : je choisis moi-même ce que j'ajoute.",
        ceQueTuDoisVoir:
          "Même astuce qu'à l'étape 3 : fais d'abord un passage d'essai dans 2 minutes. Tu dois voir la ligne de ton skill s'afficher pendant le travail (la preuve qu'il utilise TON style ; déplie la ligne-résumé des actions si tu ne la vois pas), puis propositions.md apparaître avec les brouillons. Note la dernière phrase du prompt : « je choisis moi-même ». C'est ton garde-fou d'usine, l'humain reste à la fin de la chaîne.",
        siCaBloque:
          "Les propositions ne sont pas dans ton style ? Vérifie que ton skill se déclenche (la ligne à son nom) ; sinon, ajoute son nom exact dans la consigne de la tâche. Les idées sont à côté de la plaque ? Précise le sujet dans la consigne : plus il est net, meilleures sont les propositions.",
        monExemple:
          "Ma plus grosse usine, c'est ma veille sur l'actu de l'IA : elle surveille, trie selon mes règles (qu'est-ce qui mérite une alerte tout de suite, qu'est-ce qui attend la newsletter) et me livre le tout chaque semaine. Ça fait un mois que je n'y touche presque plus. Chaque brique est simple. C'est l'assemblage qui travaille.",
        conseil:
          "Une bonne usine te PROPOSE, elle ne décide pas à ta place. Garde toujours un humain au bout de la chaîne pour ce qui se voit publiquement.",
      },
      {
        titre: "Fais valider ton automatisation par le juge.",
        duree: "≈ 5 à 10 min",
        cestquoi:
          "Comme aux modules 1 et 2 : le juge vérifie que ton automatisation est bien formée. Tu lui décris ton usine (ou tu colles la consigne de ta tâche), et il vérifie les trois morceaux de l'étape 0 : un déclencheur clair, une action claire, un garde-fou.",
        attendu: "Un verdict : ton automatisation a ses trois morceaux, ou il te dit lequel manque et où le reprendre.",
        lien: { label: "Ouvrir le juge des automatisations", href: "/juge-automatisation" },
        pasAPas: [
          "Ouvre le juge avec le bouton juste au-dessus.",
          "Colle la consigne de ton automatisation (le texte que tu as donné à Claude Code : celle de ton usine, ou n'importe laquelle) et lance l'évaluation.",
        ],
        ceQueTuDoisVoir:
          "Trois lignes cochées : le déclencheur (avec sa famille, un événement ou l'heure), l'action, le garde-fou. Si l'une est rouge, le juge te dit ce qui manque et te renvoie à l'étape à reprendre : tu corriges ta consigne, et tu repasses.",
        siCaBloque:
          "Le juge dit qu'il manque le garde-fou ? C'est le plus souvent la phrase de contrôle qui manque dans ta consigne (« ne modifie pas mon site directement », « bloque si ça casse »). Ajoute-la et repasse.",
        conseil: "Le juge ne juge pas l'utilité de ton automatisation, seulement sa solidité. L'utilité, c'est toi qui la mesures en la laissant vivre une semaine ou deux.",
      },
      {
        titre: "Garde le réflexe (et regarde un cran plus loin).",
        duree: "≈ 5 min",
        cestquoi:
          "Tu as monté les quatre rangs : le réflexe, le garde-fou, le rendez-vous, l'usine. Le réflexe à garder, c'est la question : « qu'est-ce que je fais à la main qui a un déclencheur évident ? ». À chaque oui, tu sais maintenant quoi faire. Et un cran plus loin, il existe des routines qui tournent dans le cloud, sans ton Mac : c'est le monde des automatisations d'équipe, celui de la famille « Automatiser ton business » qui arrive.",
        attendu: "Le réflexe d'automatiser installé pour de bon, et la suite en vue.",
        ceQueTuDoisVoir:
          "La preuve, c'est ton quotidien de la semaine prochaine : la sauvegarde qui part seule, le garde-fou qui veille, le bilan du vendredi, les propositions du lundi. Quatre choses qui travaillent pendant que tu fais autre chose.",
        siCaBloque:
          "Une de tes automatisations t'agace ? Ne la subis pas : ajuste sa consigne d'une phrase, ou retire-la. C'est toi le chef, toujours.",
        monExemple:
          "Mon bilan honnête : certaines automatisations m'ont vraiment enlevé la charge (la veille), d'autres préparent le travail mais la décision reste chez moi (mon menu de sujets : on retravaille presque tout avant de publier, et c'est normal). C'est exactement la limite à garder : une automatisation qui déciderait à ma place de ce qui se publie, je n'en veux pas. C'est moi le chef.",
        conseil:
          "Relis ta semaine dans deux vendredis : compte ce qui s'est fait sans toi. C'est la vraie mesure de ce module.",
      },
    ],
    livrable: "Une usine complète (routine + ton skill + garde-fou) qui te livre des propositions chaque semaine.",
    reussite: "Le juge valide les trois morceaux, et ton usine a produit son premier résultat sous tes yeux.",
  },
];
