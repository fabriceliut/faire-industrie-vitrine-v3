(function () {
  'use strict';

  /* ---------- Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reduced motion preference ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================
     NAVBAR — sticky + mobile
     ====================== */
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar__toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.navbar__link') : [];

  function handleScroll() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  function toggleMenu() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  }

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      toggleMenu();
      toggle.focus();
    }
  });

  /* ======================
     ACCORDION (FAQ)
     ====================== */
  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion__trigger');
    var panel = item.querySelector('.accordion__panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      accordionItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var otherTrigger = other.querySelector('.accordion__trigger');
          var otherPanel = other.querySelector('.accordion__panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
        }
      });

      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.setAttribute('aria-hidden', String(isOpen));
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

  /* ======================
     SCROLL REVEAL (IntersectionObserver)
     ====================== */
  if (!prefersReducedMotion) {
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ======================
     CARD TILT (Cartes tangibles signature)
     ====================== */
  function addTilt(cards) {
    if (prefersReducedMotion) return;
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateY = ((x - centerX) / centerX) * 3;
        var rotateX = ((centerY - y) / centerY) * 3;
        card.style.transform =
          'translateY(-4px) perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  if (!prefersReducedMotion) {
    addTilt(Array.prototype.slice.call(document.querySelectorAll('.card:not(.card--job)')));
  }

  /* ======================
     SMOOTH SCROLL for anchor links
     ====================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight + 16 : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ======================
     JOB CARDS — données Notion (Statut = Validé)
     Familles visuelles (code couleur du jeu) :
       technique 🔧 · pilotage 💻 · impact 🌱 · relation 🤝
     ====================== */
  var JOBS_DATA = [
    { title: "Accompagnant·e en écoconception (recyclabilité)", company: "MTB RECYCLING", family: "impact",
      mission: "Tu accompagnes industriels et filières pour caractériser des produits en fin de vie et concevoir des solutions de recyclage et d'écoconception.",
      conditions: ["Bureau + laboratoire / zone d'essais, déplacements chez clients et partenaires", "Équipe pluridisciplinaire (ingénierie, technicien·nes, opérateurs)", "Projets variés, cycles parfois longs (R&D, consortiums)", "Présentation des résultats et recommandations aux clients"],
      impact: "Tu aides à rendre des produits recyclables, en amont, avant qu'ils ne deviennent des déchets.",
      skills: ["Curiosité", "Analyse", "Pédagogie"] },

    { title: "Automaticien", company: "ANDRICE GROUP", family: "pilotage",
      mission: "Chez ANDRICE, tu programmes et mets en service des automates qui cadencent et contrôlent les flux de production dans des usines du monde entier. Tu suis le cycle en V complet, de l'architecture du système jusqu'à l'installation sur site. Ton travail permet d'automatiser les usines européennes pour rester compétitif.",
      conditions: ["Métier « bouge-bouge » : 3-6 mois en bureau puis déplacements sur sites", "Missions longues (18-24 mois) en CDI, détaché chez les clients", "Déplacements internationaux fréquents (Europe, Amérique du Sud)", "Travail d'équipe avec mécaniciens, électriciens, génie civil", "Industrie 4.0 : contrôle qualité, IoT, automatisation avancée"],
      impact: "Tu programmes les automates qui font tourner des usines entières, de l'architecture système à l'installation, en France comme en Argentine.",
      skills: ["Analyse", "Autonomie", "Curiosité"] },

    { title: "Concepteur·rice en électronique", company: "ANDRICE GROUP", family: "pilotage",
      mission: "Chez ANDRICE, tu conçois des cartes et circuits électroniques au sein du bureau d'études interne. C'est un métier en forte tension : historiquement externalisé, le savoir-faire se perd en France. Chaque carte coûte cher à produire, il n'y a pas de droit à l'erreur. Ton travail maintient une compétence stratégique sur le sol européen.",
      conditions: ["Bureau d'études équipé (CAO, bancs de test, laboratoire)", "Projets de conception de A à Z : du schéma à la carte produite", "Erreur coûteuse : chaque production de carte engage un budget important", "Transmission par compagnonnage aux côtés de seniors", "Enjeu stratégique : maintien du savoir-faire en France"],
      impact: "Tu conçois les cartes électroniques qui sont le cerveau des machines industrielles — un savoir-faire rare qui risque de disparaître.",
      skills: ["Rigueur", "Analyse", "Attention au détail"] },

    { title: "Monteur·euse électricien·ne", company: "BOBST", family: "technique",
      mission: "En parallèle des monteurs mécaniciens, tu réalises le câblage et l'intégration électrique des machines d'emballage Bobst, à partir de plans électriques. Tu participes aussi aux essais sur les bancs de test (Factory Acceptance Tests) pour chaque module.",
      conditions: ["Atelier moderne, chauffé, lumineux, aux standards 5S", "Travail en parallèle des monteurs mécaniciens sur la même machine", "Essais sur bancs de tests module par module", "Missions possibles d'installation chez les clients à l'étranger", "Amélioration continue : jury mensuel des meilleures idées"],
      impact: "Tu donnes le courant aux machines : câblage et intégration électrique, plans en main, pour que 20 000 pièces s'animent.",
      skills: ["Rigueur", "Sens sécurité", "Analyse"] },

    { title: "Agent·e logistique", company: "BOBST", family: "relation",
      mission: "Premier maillon de la chaîne de production Bobst, tu réceptionnes, stockes et sers à la production les pièces venues des fournisseurs. Tu pilotes à la fois le flux physique (chariots, ponts roulants) et le flux informatique sous SAP. Tu gères aussi les inventaires et la mise à disposition au plus juste pour les lignes de montage.",
      conditions: ["Poste debout et mobile toute la journée", "Conduite de chariots CACES 1 à 5, ponts roulants et potences", "Magasins variés : automatiques, racks jusqu'à 15 m de haut", "Polyvalence encouragée (rotation entre les postes)", "Équipe mixte avec une féminisation en croissance"],
      impact: "Sans toi, aucune machine ne se monte : tu fais entrer et circuler les dizaines de milliers de pièces d'une ligne d'emballage.",
      skills: ["Organisation", "Réactivité", "Autonomie"] },

    { title: "Usineur·euse", company: "BOBST", family: "technique",
      mission: "Tu usines les cylindres stratégiques des machines Bobst sur des centres d'usinage à très haute valeur (2 à 3 M€ la machine). Le métier exige une précision de l'ordre du centième et un vrai sens de la responsabilité : chaque pièce vaut plusieurs milliers d'euros. L'atelier tourne en deux équipes pour amortir ces investissements.",
      conditions: ["Atelier moderne, chauffé, lumineux, aux standards 5S", "Deux équipes : 5h45-13h30 et 13h30-19h30", "Centres d'usinage à forte valeur (2 à 3 M€ par machine)", "Pièces stratégiques, précision au demi-millimètre", "Intégration longue : 2 à 3 ans pour l'autonomie complète"],
      impact: "Au centième près, tu usines des cylindres stratégiques qui valent des milliers d'euros — la pièce part juste, ou pas du tout.",
      skills: ["Attention au détail", "Rigueur", "Autonomie"] },

    { title: "Ajusteur·euse-monteur·se", company: "BOBST", family: "technique",
      mission: "Tu assembles, règles et contrôles les sous-ensembles mécaniques des machines d'emballage Bobst, à partir de plans mécaniques. Le métier compte 4 niveaux de complexité, du prémontage jusqu'aux essais et à l'installation des machines chez les clients à l'étranger. C'est le métier le plus en tension de l'usine.",
      conditions: ["Atelier moderne, chauffé, lumineux, aux standards 5S", "Montage long et minutieux (~2 000 heures par machine)", "4 niveaux de progression, du prémontage aux essais sous tension", "Missions possibles d'installation chez les clients à l'étranger", "Amélioration continue : jury mensuel des meilleures idées"],
      impact: "Tu assembles et règles au plus juste les sous-ensembles d'une machine de 20 000 pièces — sans toi, rien ne tourne rond.",
      skills: ["Attention au détail", "Patience", "Dextérité"] },

    { title: "Carrossier·ère-peintre VI", company: "GM TRUCK", family: "technique",
      mission: "Tu répares la structure et l'apparence de véhicules industriels endommagés. Tu remets en forme les éléments, remplaces certains vitrages, prépares les surfaces et recherches la teinte exacte avant peinture. Cette spécialité très recherchée évite l'immobilisation prolongée d'outils de travail coûteux.",
      conditions: ["Travail manuel spécialisé en atelier", "Interventions sur des carrosseries de grande taille", "Port d'équipements de protection pour préparation et peinture", "Forte autonomie, avec transmission en binôme", "Métier en pénurie de spécialistes"],
      impact: "Tu redonnes forme, sécurité et couleur à des véhicules industriels, jusqu'à retrouver exactement la bonne teinte.",
      skills: ["Attention au détail", "Dextérité", "Sens qualité"] },

    { title: "Technicien·ne véhicules industriels", company: "GM TRUCK", family: "technique",
      mission: "Tu réalises la maintenance préventive et corrective des véhicules industriels : entretien, diagnostic, dépose, pose, contrôle et réglage d'ensembles mécaniques. Tu interviens des diagnostics de premier niveau sur moteurs thermiques jusqu'à la réparation des transmissions, et tu assures ponctuellement des dépannages.",
      conditions: ["Travail en atelier sur des véhicules industriels de grande taille", "Entretien préventif et réparations pouvant durer plusieurs jours", "Dépannages ponctuels hors atelier", "Respect strict des consignes de sécurité", "Véhicule contrôlé, réglé et rendu propre après réparation"],
      impact: "Tu remets sur la route des véhicules valant jusqu'à 200 000 €, entre mécanique, électronique et diagnostic informatique.",
      skills: ["Analyse", "Curiosité", "Sens sécurité"] },

    { title: "Technicien·ne S.A.V", company: "TECOFI SAS", family: "relation",
      mission: "Chez TECOFI, tu fais partie d'une équipe ressource de 4 personnes qui installe les vannes sur site, règle les moteurs, met en service les ensembles et forme les clients à la maintenance. Tu travailles aux côtés du directeur technique. Ton expertise garantit que les vannes vendues dans 110+ pays fonctionnent dès la mise en eau.",
      conditions: ["Base Corbas, déplacements France et international réguliers", "Équipe ressource de 4 personnes intégrée au service client", "Travail seul·e ou en binôme chez le client", "Déplacements aériens et hôtels fréquents", "Dialogue régulier avec direction technique et bureau d'études"],
      impact: "Tu pars à l'étranger installer, mettre en service et former les clients qui exploitent les vannes industrielles TECOFI.",
      skills: ["Autonomie", "Relation client", "Pédagogie"] },

    { title: "Dessinateur·rice-projeteur·euse", company: "TECOFI SAS", family: "pilotage",
      mission: "Au bureau d'études TECOFI, tu conçois et dessines les vannes papillon, à guillotine et d'autres types de vannes. Tu envoies tes plans aux fonderies partenaires, puis tu adaptes l'équipement (moteurs, capteurs de fin de course) pour piloter l'ouverture et la fermeture. Tes plans nourrissent une production exportée dans 110+ pays.",
      conditions: ["Bureau à Genas, 2 demi-journées par semaine à Corbas", "Équipe bureau d'études de 5 personnes en France", "Échanges réguliers avec achats, atelier et SAV"],
      impact: "Tu conçois les vannes industrielles et les accessoires adaptés que des usines du monde entier installent.",
      skills: ["Rigueur", "Analyse", "Esprit de synthèse"] },

    { title: "Agent·e technique d'atelier", company: "TECOFI SAS", family: "technique",
      mission: "Chez TECOFI, tu assembles dans ton espace de montage des vannes papillon, à guillotine et d'autres robinetteries industrielles à partir des ordres de fabrication. Tu installes les capteurs, le moteur, la programmation, réalises les tests hydrauliques et fais graver les plaques d'identification. Peu de montages standard : tu enchaînes des solutions sur-mesure.",
      conditions: ["Atelier de Corbas (Rhône), 40 personnes sur site", "8 espaces de montage individuels équipés (table, outils, palans)", "Horaires 7h-16h, pauses prises en équipe", "Écrans internes diffusant les photos des chantiers clients", "Équipe à taille humaine, CE actif"],
      impact: "Tu assembles de A à Z des vannes et robinetteries industrielles sur-mesure dans ton propre espace de montage.",
      skills: ["Dextérité", "Autonomie", "Sens qualité"] },

    { title: "Chargé·e d'affaires en tuyauterie", company: "ANDRICE GROUP", family: "relation",
      mission: "Chez ANDRICE, tu gères des projets de tuyauterie pour des clients industriels (énergie, chimie, process). Tu évalues les risques, chiffres les budgets, planifies les interventions et assures la relation client. Ton travail garantit que les réseaux de fluides fonctionnent en toute sécurité.",
      conditions: ["Alternance bureau (planification, chiffrage) et terrain (suivi de chantier)", "Déplacements fréquents chez les clients industriels", "Interface entre équipes techniques et clients", "Projets variés (énergie, chimie, process)"],
      impact: "Tu pilotes des projets de tuyauterie industrielle de A à Z, du chiffrage à la livraison, pour que tout circule.",
      skills: ["Organisation", "Rigueur", "Leadership"] },

    { title: "Démarreur", company: "ANDRICE GROUP", family: "technique",
      mission: "Chez ANDRICE, tu es le spécialiste de la phase d'installation réelle sur site. Quand les plans quittent le bureau d'études, c'est toi qui fais tourner la machine dans le monde réel. Tu ajustes, adaptes et résous les imprévus du terrain, avec des missions courtes aux quatre coins du monde.",
      conditions: ["Profil « baroudeur » : missions courtes (~6 mois) dans des secteurs variés", "Déplacements internationaux permanents (plateformes, chantiers navals, sites)", "Congés sabbatiques possibles entre les missions", "Travail avec câbleurs, mécaniciens et électriciens de terrain", "Chaque mission est une nouvelle aventure dans un nouveau pays"],
      impact: "Tu fais démarrer des usines partout dans le monde — de la plateforme pétrolière au pas de tir spatial, tu transformes les plans en réalité.",
      skills: ["Autonomie", "Réactivité", "Prise d'initiative"] },

    { title: "Responsable R&D", company: "Ouvry", family: "pilotage",
      mission: "Chez Ouvry, tu développes de nouvelles solutions de protection NRBC : hydratation en zone contaminée, tenues auto-décontaminantes, lingettes de décontamination. Tu pilotes des programmes d'innovation avec le CNRS, le CEA et des consortiums européens. Chaque équipement peut sauver une vie, avec une forte exigence de normes, de certification et d'essais en laboratoire.",
      conditions: ["Poste basé au siège de Lyon, en lien avec les 3 sociétés du groupe", "Travail en laboratoire et pilotage de programmes sur cycles longs", "Collaborations externes régulières (CNRS, CEA, projets européens)", "Forte exigence de traçabilité, de normes et de certifications"],
      impact: "Tu inventes les protections de demain contre les menaces NRBC : tenues auto-décontaminantes, hydratation en zone contaminée.",
      skills: ["Curiosité", "Analyse", "Rigueur"] },

    { title: "Responsable de production", company: "Ouvry", family: "technique",
      mission: "Chez Ouvry, tu pilotes la production du groupe : planning, fournisseurs, contrôle qualité et appui au développement produit. Sur des équipements NRBC, certaines matières ont jusqu'à 9 mois de délai, ce qui impose d'anticiper et de prévoir des plans B. Tu encadres une équipe de 2 à 7 personnes, avec une forte autonomie de décision.",
      conditions: ["Poste basé au siège de Lyon, au cœur de la production du groupe", "Rythme soutenu et forte anticipation (délais matières jusqu'à 9 mois)", "PME agile : décisions parfois validées en 15 minutes", "Coordination quotidienne avec les fournisseurs et les 3 sites du groupe"],
      impact: "Tu orchestres la production d'équipements qui protègent des vies, du fournisseur à la pièce finie prête à partir.",
      skills: ["Organisation", "Réactivité", "Leadership"] },

    { title: "Électricien·ne nucléaire", company: "SNEF Power Services", family: "technique",
      mission: "Tu interviens toujours en binôme sur les sites nucléaires : tirage de câbles, raccordement de tableaux industriels, systèmes d'automatisme et contrôle-commande. Le travail varie selon les contrats, de la vidéosurveillance aux kilomètres de chemins de câbles. Le métier mise sur la précision, l'échelonnage des tâches et des exigences de sécurité propres au nucléaire.",
      conditions: ["Toujours en binôme sur site, jamais seul", "Présence sur l'ensemble des centrales du territoire français", "Travail en intérieur (climatisé) ou en extérieur selon le contrat", "Brief sécurité hebdomadaire, passage en agence pour le matériel", "Accréditations et formations obligatoires (ex. SDEA)"],
      impact: "Tu installes et raccordes l'électricité au cœur des sites nucléaires — toujours en binôme, avec une sécurité maximale.",
      skills: ["Esprit d'équipe", "Sens sécurité", "Autonomie"] },

    { title: "Agent de maintenance et conditionnement", company: "Les Nouvelles Pailles", family: "technique",
      mission: "Chez Les Nouvelles Pailles, tu contrôles la conformité des pailles et couverts biosourcés (aspect, comptage, lots), tu assures le conditionnement manuel et sur machine Flowpack, et tu renseignes la traçabilité. Tu réalises aussi la maintenance de premier niveau des équipements de conditionnement.",
      conditions: ["Atelier de conditionnement propre et organisé", "Port d'EPI (chaussures sécurité, gants, charlotte selon zones)", "Travail régulier et répétitif avec montée en compétences progressive", "Horaires adaptables, environnement inclusif", "Forte dimension d'intégration sociale et d'épanouissement professionnel"],
      impact: "Tu assures que chaque paille et chaque couvert sort propre, conforme et prêt à être utilisé dans les plus grands restaurants et hôtels.",
      skills: ["Rigueur", "Régularité", "Attention au détail"] },

    { title: "Agent·e d'assemblage", company: "BOA CONCEPT", family: "technique",
      mission: "Chez BOA CONCEPT, tu assembles les modules de convoyage intelligents Plug-and-Carry à partir de composants livrés en cartons — rouleaux, moteurs, capteurs, cartes électroniques. Le montage ressemble à un grand assemblage LEGO ; tu soignes particulièrement les connectiques et contrôles chaque module avant expédition.",
      conditions: ["Atelier d'assemblage à Saint-Étienne (42)", "Travail en équipe (4 agents actuellement)", "Pas de déplacement", "Horaires de journée"],
      impact: "Tu assembles de tes mains les modules de convoyage intelligents qui automatisent les entrepôts du e-commerce.",
      skills: ["Rigueur", "Dextérité", "Attention au détail"] },

    { title: "Ajusteur·euse moules (mise au point et finitions)", company: "SOFAMI (MORAGROUP)", family: "technique",
      mission: "Chez SOFAMI, tu réalises l'ajustage et la mise au point des moules d'injection. Après l'usinage, tu prends en charge les finitions manuelles — ébavurage, ajustement, polissage, montage —, tu identifies les points durs, tu corriges et tu testes le moule sur la presse pour garantir des pièces conformes dès les essais.",
      conditions: ["Atelier outillage, travail fin et précis à la main", "Postures variées, manipulation de pièces de moules", "Allers-retours avec essais presse et contrôle", "Horaires de journée le plus souvent"],
      impact: "Tu fais la différence au « dernier millimètre » : tu ajustes le moule à la main pour qu'il fonctionne parfaitement.",
      skills: ["Dextérité", "Rigueur", "Patience"] },

    { title: "Architecte de solutions IoT industrielles", company: "INGELI SARL", family: "pilotage",
      mission: "Chez INGELI, tu pars du terrain pour comprendre l'existant (machines, capteurs, automatismes, SI), puis tu conçois l'architecture complète, du capteur jusqu'aux applications et au cloud. Tu orchestres concrètement 8 pôles de compétences et accompagnes le projet du POC au maintien en condition opérationnelle.",
      conditions: ["Mix terrain + bureau : audits sur site, ateliers utilisateurs, suivi de déploiement", "Interactions multi-métiers : direction, production, maintenance, opérateurs", "Contraintes industrielles fortes : sécurité, maintenabilité, disponibilité", "Travail en équipe avec spécialistes (matériel, logiciel, déploiement) et partenaires"],
      impact: "De l'électronique embarquée au cloud, tu orchestres 8 pôles de compétences pour rendre la donnée industrielle utile, maintenable et évolutive.",
      skills: ["Rigueur", "Curiosité", "Pédagogie"] },

    { title: "Câbleur·euse électricien·ne industriel·le", company: "THIMONNIER", family: "technique",
      mission: "Chez THIMONNIER, tu lis les schémas électriques et câbles les armoires de commande volumineuses des machines d'emballage sur-mesure. Tu raccordes automates, variateurs et capteurs selon les normes industrielles, puis tu participes aux essais — l'armoire est d'abord testée à l'eau avant la validation client.",
      conditions: ["Atelier propre, lumineux, peu bruyant", "Travail méticuleux sur armoires volumineuses", "Pas de port de charges lourdes", "Horaires de jour, pas de cadence imposée", "Semaine 4 jours en option, horaires flexibles"],
      impact: "Tu donnes vie aux machines en câblant des armoires électriques complexes : précision et patience sont tes alliées.",
      skills: ["Rigueur", "Patience", "Autonomie"] },

    { title: "Chargé·e d'affaires / chef·fe de projet stand", company: "Capsule Concept", family: "relation",
      mission: "Chez Capsule Concept, tu pilotes un projet de stand de bout en bout : cadrage du besoin client, budget, planning, coordination du design, de l'atelier et du chantier. Souvent issu·e d'un parcours technique, tu comprends les contraintes terrain, gères les prestataires et les imprévus, et tu es présent·e sur le chantier jusqu'à l'ouverture du salon.",
      conditions: ["Travail de bureau + terrain ponctuel", "Pics d'activité avant salons", "Coordination serrée des délais", "Forte interaction client"],
      impact: "Tu coordonnes tout — client, design, atelier, chantier — pour livrer un stand impeccable, à temps, sur le salon.",
      skills: ["Leadership", "Organisation", "Communication"] },

    { title: "Chaudronnier Soudeur", company: "COMBES SAS", family: "technique",
      mission: "Chez COMBES SAS, tu soudes des ensembles mécano-soudés (pièces unitaires et petites séries) pour des clients exigeants. Tu réalises des cordons sur acier, inox et aluminium en suivant le cahier de soudage, tu prépares (meulage, chanfreins), tu contrôles et tu passes régulièrement tes qualifications soudage.",
      conditions: ["Atelier chaudronnerie/assemblage : bruit, fumées ⇒ EPI (cagoule, gants, protections)", "Pièces de quelques kilos à plusieurs tonnes : manutention et moyens de levage", "Travail debout, gestes précis, vigilance sécurité", "Collaboration étroite avec méthodes/qualité (plans, exigences, traçabilité)"],
      impact: "Tu soudes des pièces uniques, parfois énormes, qui doivent être impeccables pour des environnements normés — tout ce que le robot ne sait pas faire.",
      skills: ["Rigueur", "Sens sécurité", "Dextérité"] },

    { title: "Chaudronnier·ère", company: "Groupe PHEA", family: "technique",
      mission: "Au sein du Groupe PHEA, tu traces, découpes, plies et assembles tôles et tubes à partir de plans, sur des matériaux parfois exotiques (titane, inox armement, aluminium blindage). Tu brides les pièces pour anticiper la déformation à la chaleur, tu soudes, puis tu contrôles — du prototype à la petite série.",
      conditions: ["Atelier chaudronnerie, postes de traçage/découpe/pliage/soudage", "EPI complets (masque, gants, chaussures), extraction fumées, bruit", "Horaires d'équipe, station debout, manipulation de pièces lourdes", "Outils : plieuses CN, postes soudure, laser, instruments de contrôle"],
      impact: "Tu donnes forme au métal pour des équipements clés, durables et sûrs.",
      skills: ["Rigueur", "Sens sécurité", "Esprit d'équipe"] },

    { title: "Chef·fe de projet Biosourcing / Biobanking", company: "CTIBIOTECH", family: "relation",
      mission: "Chez CTIBIOTECH, tu recherches et collectes des échantillons de tissus humains auprès de chirurgiens et d'hôpitaux, parfois en salle d'accouchement pour les placentas et cordons. Tu gères toute la chaîne : logistique, transport, consentement des donneurs, procédures réglementaires et accréditations, pour alimenter la biobanque de recherche.",
      conditions: ["Mix terrain (hôpitaux, cliniques, maternités) et bureau", "Déplacements réguliers sur sites hospitaliers", "Gestion rigoureuse de données et de documents réglementaires", "Contact direct avec chirurgiens et équipes médicales", "Horaires de jour, adaptation aux plannings hospitaliers"],
      impact: "Tu collectes des échantillons humains rares auprès de chirurgiens et hôpitaux pour alimenter la recherche biomédicale de demain.",
      skills: ["Communication", "Organisation", "Rigueur"] },

    { title: "Dessinateur-projeteur", company: "MTB RECYCLING", family: "pilotage",
      mission: "Chez MTB RECYCLING, tu conçois des machines de recyclage sur mesure et tu les « rends assemblables » : plans détaillés, nomenclatures, ajustements et documentation d'assemblage. Tu intègres les retours de l'atelier et des essais pour fiabiliser la fabrication, la sécurité et la qualité.",
      conditions: ["Bureau d'études, allers-retours fréquents avec l'atelier", "Échanges quotidiens avec monteurs, opérateurs, ingénieur·es", "Travail sur logiciels de CAO, gestion documentaire", "Horaires plutôt bureau, pics selon projets/urgences production"],
      impact: "Tu dessines les machines de recyclage « à la Jules Verne » qui deviennent réelles à l'atelier.",
      skills: ["Rigueur", "Attention au détail", "Communication"] },

    { title: "Ajusteur·euse-monteur·se / technicien·ne d'atelier", company: "Ateliers Agiles", family: "technique",
      mission: "Chez Ateliers Agiles, tu montes, ajustes et contrôles des sous-ensembles mécaniques sur-mesure à partir de plans et de pièces usinées. Tu lis le plan, tu assembles, tu ajustes à la main jusqu'à l'emboîtement parfait, puis tu contrôles que l'ensemble fonctionne — pour des secteurs allant du médical au nucléaire.",
      conditions: ["Atelier moderne et propre, machines récentes, chauffé", "Montage et ajustage d'ensembles mécaniques sur-mesure (pièce unitaire)", "Flexibilité horaire : semaine en 4 ou 5 jours (approche H2H)", "Collaboration avec usinage, méthodes et parfois le client", "Exigence qualité ISO 9001, respect strict des consignes sécurité"],
      impact: "Tu transformes des pièces en un ensemble qui marche, fiable et prêt à être installé chez le client.",
      skills: ["Rigueur", "Patience", "Sens qualité"] },

    { title: "Data analyst industriel·le", company: "INGELI SARL", family: "pilotage",
      mission: "Chez INGELI, tu exploites les données des capteurs et systèmes industriels pour créer des indicateurs utiles à chaque profil — opérateur, maintenance, qualité, direction. Tu qualifies la donnée au fil de l'eau plutôt qu'en masse, et tu conçois des dashboards adaptés en lien étroit avec les équipes terrain.",
      conditions: ["Bureau + terrain pour comprendre les usages réels", "Travail avec données temps réel et historiques", "Collaboration étroite avec production, maintenance, qualité", "Outils : plateformes IoT, bases de données, dashboards"],
      impact: "Tu transformes les données brutes des machines en indicateurs clairs qui aident chaque équipe à mieux produire.",
      skills: ["Analyse", "Curiosité", "Esprit de synthèse"] },

    { title: "Chef·fe de projet industriel", company: "INGELI SARL", family: "relation",
      mission: "Chez INGELI, tu pilotes des projets de transformation numérique sur mesure de A à Z — de la spécification au maintien en condition opérationnelle. Tu traduis les enjeux métier du client en specs techniques, tu coordonnes équipes internes et partenaires spécialisés, et tu gères budget, planning et relation client.",
      conditions: ["Bureau + déplacements fréquents chez les clients industriels", "Multi-interlocuteurs : direction, production, maintenance, opérateurs, finances", "Cycles projet de plusieurs mois à plusieurs années", "Environnement PME agile (12 personnes)"],
      impact: "De la spec au MCO, tu pilotes des projets sur mesure de bout en bout — de l'électronique au cloud — dans une PME où tu touches à tout.",
      skills: ["Communication", "Organisation", "Leadership"] },

    { title: "Chercheur·euse / ingénieur·e chimiste R&D", company: "Les Nouvelles Pailles", family: "pilotage",
      mission: "Dans le laboratoire R&D des Nouvelles Pailles, tu développes des formulations de bioplastiques à partir de matières biosourcées, tu mesures leurs propriétés (résistance, compostabilité, innocuité alimentaire) et tu optimises les recettes. Tu co-pilotes aussi des projets de pointe, comme la paille capable de détecter des drogues, en partenariat avec le CNRS.",
      conditions: ["Laboratoire R&D moderne avec équipements de pointe", "Environnement collaboratif avec partenariats CNRS et écoles d'ingénieurs", "Horaires de journée, flexibilité pour travaux de recherche", "Déplacements occasionnels vers centres de recherche (Strasbourg, Bordeaux)"],
      impact: "Tu développes des matériaux biosourcés qui remplacent les plastiques polluants — des pailles compostables, et même capables de détecter les drogues dans les boissons.",
      skills: ["Curiosité", "Analyse", "Rigueur"] },

    { title: "Conducteur·rice de ligne (feuilletés surgelés)", company: "GoLocal (Soprauvergne)", family: "technique",
      mission: "Sur la ligne surgelée de Soprauvergne (GoLocal), tu conduis une ligne de feuilletés crus surgelés à environ 1 tonne/heure. Tu règles la machine, lances les séries, surveilles les cadences et la qualité, gères les aléas, assures la traçabilité et réalises la maintenance de premier niveau.",
      conditions: ["Travail en atelier sur ligne surgelée, environnement froid selon zones", "Horaires postés possibles (ex. 3x8) selon organisation", "Suivi de machines et de cadences, vigilance sécurité", "Procédures strictes (hygiène, traçabilité, qualité)"],
      impact: "Tu pilotes une ligne qui fabrique des feuilletés surgelés à grande vitesse, en gardant la qualité et la sécurité alimentaire.",
      skills: ["Rigueur", "Réactivité", "Sens sécurité"] },

    { title: "Cuisinier·ère en production agroalimentaire (plats frais)", company: "GoLocal (Soprauvergne)", family: "technique",
      mission: "Sur le site Soprauvergne (GoLocal), tu cuisines en équipe des entrées, plats et desserts frais en petites séries pour le réseau Patifrais — ce qui est produit aujourd'hui est vendu dès le lendemain. Tu ajustes les recettes, tu respectes hygiène et traçabilité et tu participes au contrôle qualité.",
      conditions: ["Horaires plutôt stables : environ 6h–14h, lundi–vendredi (selon atelier)", "Atelier de production alimentaire, EPI et règles d'hygiène strictes", "« Artisanal avec des moyens » : équipements qui réduisent la pénibilité", "Travail manuel + cadence, recettes qui évoluent régulièrement"],
      impact: "Tu cuisines chaque jour des plats frais pour nourrir des milliers de personnes, parfois isolées, partout en zone rurale.",
      skills: ["Rigueur", "Organisation", "Esprit d'équipe"] },

    { title: "Conducteur·rice offset / numérique", company: "IMPRIMERIE CHIRAT", family: "technique",
      mission: "Au cœur du site Chirat, tu pilotes des presses offset et numériques dernière génération pour imprimer livres, beaux-livres, magazines et packaging. Tu cales les couleurs au spectrophotomètre, lances les tirages, surveilles la qualité en continu et ajustes les réglages pour que chacun des 20 millions d'ouvrages annuels sorte conforme.",
      conditions: ["Atelier d'impression moderne, presses Heidelberg dernière génération", "Environnement sonore, protections auditives fournies", "Horaires en équipe (2×8 ou 3×8), site 24h/24 6j/7", "Outils de contrôle : spectrophotomètres, densitomètres", "Site unique à Saint-Just-la-Pendue, pas de déplacements"],
      impact: "Tu pilotes des presses qui donnent vie à des millions de livres : chaque couleur calée, c'est une promesse tenue.",
      skills: ["Rigueur", "Autonomie", "Réactivité"] },

    { title: "Designer / concepteur·rice de stand", company: "Capsule Concept", family: "pilotage",
      mission: "Chez Capsule Concept, tu conçois des stands en 3D (3DS Max) qui « vendent du rêve » tout en respectant une triple contrainte : budget client, faisabilité technique et réemploi des éléments en stock. Tu traduis le projet en plans techniques (AutoCAD) et travailles en échange constant avec la menuiserie et le chargé d'affaires.",
      conditions: ["Travail de bureau (bureau d'études)", "Aller-retours fréquents avec l'atelier pour la faisabilité", "Arbitrages budget / technique / esthétique", "Travail en équipe projet"],
      impact: "Tu imagines des stands qui attirent, en jonglant entre rêve du client, budget et faisabilité technique.",
      skills: ["Créativité", "Communication", "Esprit de synthèse"] },

    { title: "Développeur·euse informatique industriel·le", company: "BOA CONCEPT", family: "pilotage",
      mission: "Chez BOA CONCEPT, tu développes en C#, .NET et C++ les logiciels qui pilotent les solutions d'intralogistique : le WCS Boa Suite, les interfaces de supervision, les modules de captation de données et d'optimisation des flux. Tes lignes de code font tourner des lignes de convoyage de plusieurs kilomètres.",
      conditions: ["Bureau au siège de Saint-Étienne (42)", "Équipe de 20 ingénieurs", "Pas de déplacement", "Technologies : C#, .NET, C++"],
      impact: "Tu codes les logiciels qui pilotent les convoyeurs et robots des entrepôts automatisés — du C# au cœur de l'intralogistique.",
      skills: ["Analyse", "Rigueur", "Curiosité"] }
  ];

  var FAMILIES = {
    technique: { grad1: '#C9741A', grad2: '#F59E33', border: '#F59E33', accent: '#B4640F', soft: 'rgba(245,158,51,0.08)', tag: '🔧 Technique & production' },
    pilotage: { grad1: '#227E88', grad2: '#3FB0BC', border: '#74D2D9', accent: '#1E7079', soft: 'rgba(116,210,217,0.12)', tag: '💻 Pilotage & numérique' },
    impact: { grad1: '#008A59', grad2: '#00A895', border: '#00A895', accent: '#00794E', soft: 'rgba(0,159,103,0.08)', tag: '🌱 Impact & environnement' },
    relation: { grad1: '#7E8419', grad2: '#AAB12A', border: '#C7CD2F', accent: '#6E7415', soft: 'rgba(199,205,47,0.14)', tag: '🤝 Relation & coordination' }
  };

  var jobsGrid = document.getElementById('jobs-grid');

  if (jobsGrid) {
    var style = document.createElement('style');
    style.textContent =
      '.card--job{border-top:4px solid var(--fi-border,#009F67);overflow:hidden}.card--job__conditions{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}.card--job__conditions li{position:relative;padding-left:15px;font-size:var(--text-small,0.875rem);color:var(--color-muted,#5b6b66);line-height:1.45}.card--job__conditions li::before{content:"";position:absolute;left:2px;top:0.55em;width:6px;height:6px;border-radius:50%;background:var(--fi-accent,#009F67);opacity:.7}.jobs-more{display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:var(--space-5,40px)}.jobs-more__count{font-size:var(--text-small,0.875rem);color:var(--color-muted,#5b6b66)}.jobs-more__btn{display:inline-flex;align-items:center;gap:10px;border:none;cursor:pointer;font:inherit;font-weight:700;color:#fff;padding:14px 28px;border-radius:999px;background:linear-gradient(135deg,#009F67,#00A895);box-shadow:0 6px 18px rgba(0,159,103,.28);transition:transform .18s ease,box-shadow .18s ease,opacity .18s ease}.jobs-more__btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,159,103,.34)}.jobs-more__btn:focus-visible{outline:3px solid #74D2D9;outline-offset:3px}.jobs-more__btn[disabled]{cursor:default;opacity:.85}.jobs-more__btn.is-loading .jobs-more__label{opacity:.7}.jobs-more__spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;display:none;animation:fi-spin .7s linear infinite}.jobs-more__btn.is-loading .jobs-more__spinner{display:inline-block}@keyframes fi-spin{to{transform:rotate(360deg)}}.card--job.card--enter{opacity:0;transform:translateY(18px)}.card--job.card--enter-active{opacity:1;transform:none;transition:opacity .5s ease,transform .5s ease}.card--skeleton{border-top:4px solid #e4e8e6;min-height:360px;border-radius:var(--radius-lg,18px);background:#fff;box-shadow:0 8px 24px rgba(15,40,30,.06);padding:0;overflow:hidden}.card--skeleton .sk{background:linear-gradient(90deg,#eef1f0 25%,#e2e7e5 37%,#eef1f0 63%);background-size:400% 100%;animation:fi-shimmer 1.3s ease infinite;border-radius:8px}.card--skeleton .sk-head{height:96px;border-radius:0;background-size:400% 100%}.card--skeleton .sk-body{padding:20px;display:flex;flex-direction:column;gap:12px}.card--skeleton .sk-line{height:12px}.card--skeleton .sk-line.short{width:55%}@keyframes fi-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}@media (prefers-reduced-motion: reduce){.card--job.card--enter{opacity:1;transform:none}.jobs-more__spinner,.card--skeleton .sk{animation:none}}';
    document.head.appendChild(style);

    var PAGE_SIZE = 12;
    var shown = 0;
    var loading = false;
    var total = JOBS_DATA.length;

    function esc(str) {
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function buildCard(job, index) {
      var fam = FAMILIES[job.family] || FAMILIES.technique;
      var serial = 'FI-' + String(index + 1).padStart(3, '0');
      var skills = (job.skills || []).slice(0, 4).map(function (s) {
        return '<span class="card__skill">' + esc(s) + '</span>';
      }).join('');
      var conditions = (job.conditions || []).map(function (c) {
        return '<li>' + esc(c) + '</li>';
      }).join('');

      var html =
        '<div class="card card--job reveal is-visible" style="--fi-border:' + fam.border + ';--fi-accent:' + fam.accent + '">' +
          '<div class="card--job__header" style="background:linear-gradient(135deg,' + fam.grad1 + ',' + fam.grad2 + ');padding:var(--space-3,20px);color:#fff;position:relative;overflow:hidden">' +
            '<div class="card--job__header-top" style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:var(--space-1,8px)">' +
              '<span class="card__tag">' + fam.tag + '</span>' +
              '<span class="card__status">✓ Validé</span>' +
            '</div>' +
            '<h3 class="card__job-title" style="font-size:1.3rem;font-weight:700;margin-bottom:4px;line-height:1.2">' + esc(job.title) + '</h3>' +
            '<span class="card__company" style="opacity:.92;font-size:var(--text-small,0.875rem)">' + esc(job.company) + '</span>' +
          '</div>' +
          '<div class="card__body" style="display:flex;flex-direction:column;gap:var(--space-2,14px);padding:var(--space-3,20px)">' +
            '<div>' +
              '<p class="card__field-label" style="color:' + fam.accent + '">🎯 La mission</p>' +
              '<p class="card__field-text" style="color:var(--color-text,#1a2420)">' + esc(job.mission) + '</p>' +
            '</div>' +
            '<div>' +
              '<p class="card__field-label" style="color:' + fam.accent + '">😊 Le cadre de travail</p>' +
              '<ul class="card--job__conditions">' + conditions + '</ul>' +
            '</div>' +
            '<div class="card__impact-box" style="margin-top:auto;padding:var(--space-2,14px);border-radius:var(--radius-md,12px);background:' + fam.soft + '">' +
              '<p class="card__field-label" style="color:' + fam.accent + ';margin-bottom:4px">⚡ Engagement</p>' +
              '<p style="font-size:var(--text-small,0.875rem);font-weight:700;color:' + fam.accent + '">' + esc(job.impact) + '</p>' +
            '</div>' +
            '<div class="card__skills">' + skills + '</div>' +
          '</div>' +
          '<span class="card__serial">' + serial + '</span>' +
        '</div>';

      var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      return wrapper.firstChild;
    }

    function appendJobs(list, startIndex) {
      var frag = document.createDocumentFragment();
      var created = [];
      list.forEach(function (job, i) {
        var el = buildCard(job, startIndex + i);
        if (!prefersReducedMotion) el.classList.add('card--enter');
        frag.appendChild(el);
        created.push(el);
      });
      jobsGrid.appendChild(frag);

      if (!prefersReducedMotion) {
        requestAnimationFrame(function () {
          created.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('card--enter-active'); }, i * 70);
          });
        });
      }
      addTilt(created);
      return created;
    }

    function makeSkeleton() {
      var el = document.createElement('div');
      el.className = 'card--skeleton';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML =
        '<div class="sk sk-head"></div>' +
        '<div class="sk-body">' +
          '<div class="sk sk-line" style="width:40%"></div>' +
          '<div class="sk sk-line"></div><div class="sk sk-line"></div><div class="sk sk-line short"></div>' +
          '<div class="sk sk-line" style="height:56px;margin-top:8px"></div>' +
        '</div>';
      return el;
    }

    /* --- « Voir plus » --- */
    var moreWrap = document.createElement('div');
    moreWrap.className = 'jobs-more';
    var count = document.createElement('p');
    count.className = 'jobs-more__count';
    count.setAttribute('aria-live', 'polite');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jobs-more__btn';
    btn.innerHTML = '<span class="jobs-more__spinner" aria-hidden="true"></span><span class="jobs-more__label"></span>';
    moreWrap.appendChild(btn);
    moreWrap.appendChild(count);
    jobsGrid.parentNode.insertBefore(moreWrap, jobsGrid.nextSibling);

    var label = btn.querySelector('.jobs-more__label');

    function refreshControls() {
      var remaining = total - shown;
      count.textContent = shown + ' métiers sur ' + total;
      if (remaining <= 0) {
        moreWrap.removeChild(btn);
        count.textContent = 'Tu as parcouru les ' + total + ' métiers validés du catalogue.';
      } else {
        label.textContent = 'Voir ' + Math.min(PAGE_SIZE, remaining) + ' métiers de plus';
      }
    }

    function loadMore() {
      if (loading || shown >= total) return;
      loading = true;
      btn.classList.add('is-loading');
      btn.disabled = true;
      label.textContent = 'Chargement…';

      var batchSize = Math.min(PAGE_SIZE, total - shown);
      var skeletons = [];
      for (var i = 0; i < batchSize; i++) {
        var sk = makeSkeleton();
        skeletons.push(sk);
        jobsGrid.appendChild(sk);
      }

      var delay = prefersReducedMotion ? 150 : 600;
      setTimeout(function () {
        skeletons.forEach(function (sk) { jobsGrid.removeChild(sk); });
        var next = JOBS_DATA.slice(shown, shown + batchSize);
        appendJobs(next, shown);
        shown += next.length;
        loading = false;
        btn.disabled = false;
        btn.classList.remove('is-loading');
        refreshControls();
      }, delay);
    }

    btn.addEventListener('click', loadMore);

    /* Premier lot : 12 cartes */
    appendJobs(JOBS_DATA.slice(0, PAGE_SIZE), 0);
    shown = Math.min(PAGE_SIZE, total);
    refreshControls();
  }

})();
