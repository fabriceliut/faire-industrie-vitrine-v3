/* ============================================
   FAIRE L'INDUSTRIE — Main JS
   Vanilla, progressive, reduced-motion aware
   ============================================ */

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

  // Sticky
  function handleScroll() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu
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

  // Close mobile menu on Escape
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

      // Close all others
      accordionItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('is-open');
          var otherTrigger = other.querySelector('.accordion__trigger');
          var otherPanel = other.querySelector('.accordion__panel');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherPanel) otherPanel.setAttribute('aria-hidden', 'true');
        }
      });

      // Toggle current
      item.classList.toggle('is-open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.setAttribute('aria-hidden', String(isOpen));
    });

    // Keyboard accessibility
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
    // Make everything visible immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ======================
     CARD TILT (Cartes tangibles signature)
     ====================== */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateY = ((x - centerX) / centerX) * 3;
        var rotateX = ((centerY - y) / centerY) * 3;
        card.style.transform =
          'translateY(-4px) perspective(600px) rotateX(' +
          rotateX +
          'deg) rotateY(' +
          rotateY +
          'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
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
     JOB CARDS — render into #jobs-grid
     ====================== */
  var JOBS_DATA = [
    { id: '1', type: 'attractif', title: "Chaudronnier", company: "Groupe Phea", status: 'Validé', softSkills: ["Esprit d'équipe", "Rigueur", "Sens sécurité"], mission: "Lecture de plans, façonnage et assemblage de pièces métalliques complexes.", environment: "Atelier spacieux, travail en équipe, autonomie sur les pièces.", impact: "Tu donnes forme au métal pour des équipements clés, durables et sûrs." },
    { id: '2', type: 'attractif', title: "Fondeur", company: "Corexco-marine", status: 'Validé', softSkills: ["Esprit d'équipe", "Rigueur", "Sens sécurité"], mission: "Réaliser des pièces métalliques par fusion et moulage.", environment: "Travail physique mais technique, rythme d'équipe soutenu.", impact: "Tu transformes le métal brut en pièces essentielles pour la marine." },
    { id: '3', type: 'moderne', title: "Ingénieur Prot. Cathodique", company: "Corexco-marine", status: 'Validé', softSkills: ["Analyse", "Autonomie", "Relation client"], mission: "Études et suivi de systèmes anti-corrosion pour structures.", environment: "Mix terrain/bureau, déplacements, haute technicité.", impact: "Tu protèges les infrastructures contre la corrosion et la pollution." },
    { id: '4', type: 'moderne', title: "Ingénieur R&D", company: "Mecamagnetic", status: 'Validé', softSkills: ["Analyse", "Créativité", "Esprit d'équipe"], mission: "Qualification techno, prototypage, pilotage de l'industrialisation.", environment: "Bureau d'études collaboratif, outils de simulation, lien direct atelier.", impact: "Tu fais passer une idée abstraite à un produit industriel réel." },
    { id: '5', type: 'moderne', title: "Laseriste", company: "Groupe Phea", status: 'Validé', softSkills: ["Analyse", "Précision", "Rigueur"], mission: "Programmation et pilotage de machines de découpe laser.", environment: "Atelier propre, machines numériques récentes, écran de contrôle.", impact: "Tu découpes avec précision pour zéro défaut et moins de déchets." },
    { id: '6', type: 'attractif', title: "Monteur-soudeur", company: "JM-Concept", status: 'Validé', softSkills: ["Esprit d'équipe", "Rigueur", "Sens sécurité"], mission: "Assemblage d'ensembles mécano-soudés et finitions.", environment: "Poste ergonomique, travail minutieux, fierté de l'ouvrage fini.", impact: "Tu assembles des pièces qui doivent tenir des décennies." },
    { id: '7', type: 'moderne', title: "Monteur Tiny House", company: "Hekipia", status: 'Validé', softSkills: ["Autonomie", "Polyvalence", "Créativité"], mission: "Construction structure bois, isolation et aménagements intérieurs.", environment: "Construction bois, matériaux écologiques, ambiance 'start-up' indus.", impact: "Tu construis des habitats durables qui changent les modes de vie." },
    { id: '8', type: 'moderne', title: "Opérateur sur CN", company: "Eriks", status: 'Validé', softSkills: ["Logique", "Rigueur", "Contrôle"], mission: "Pilotage de centres d'usinage numériques et contrôle qualité.", environment: "Environnement climatisé, pilotage sur écran, maintenance 1er niveau.", impact: "Tu produis des pièces mécaniques d'une précision chirurgicale." },
    { id: '9', type: 'attractif', title: "Plieur", company: "Steelé", status: 'Validé', softSkills: ["Vision 3D", "Rigueur", "Autonomie"], mission: "Formage de tôles sur presses plieuses numériques.", environment: "Atelier organisé, interaction constante avec les plans 3D.", impact: "Tu donnes le volume et la forme aux objets de notre quotidien." },
    { id: '10', type: 'attractif', title: "Poseur d'armature", company: "Pro Armature", status: 'Validé', softSkills: ["Endurance", "Esprit d'équipe", "Sécurité"], mission: "Assemblage des squelettes métalliques pour le béton armé.", environment: "Travail en extérieur ou atelier, fort esprit de cohésion.", impact: "Tu es la colonne vertébrale cachée des grands ouvrages." },
    { id: '11', type: 'attractif', title: "Repousseur", company: "Steelé", status: 'Validé', softSkills: ["Dextérité", "Patience", "Artisanat"], mission: "Déformation du métal sur tour pour créer des formes rondes.", environment: "Métier rare, mix artisanat d'art et industrie.", impact: "Tu perpétues un savoir-faire unique pour des pièces sur-mesure." },
    { id: '12', type: 'moderne', title: "Responsable Qualité", company: "Mecamagnetic", status: 'Validé', softSkills: ["Diplomatie", "Communication", "Rigueur"], mission: "Pilotage de l'amélioration continue et des certifications.", environment: "Transverse, relation avec tous les services, bureau et terrain.", impact: "Tu garantis la satisfaction du client et la fiabilité de l'usine." },
    { id: '13', type: 'moderne', title: "Ingénieur Traitement Eau", company: "INOVAYA", status: 'Potentiel', softSkills: ["Innovation", "Écologie", "Technique"], mission: "Conception de systèmes de potabilisation décentralisés.", environment: "Start-up à impact, haute technologie, enjeux humanitaires.", impact: "Tu apportes l'eau potable là où elle manque." },
    { id: '14', type: 'moderne', title: "Ingénieur Industrie 4.0", company: "INGELI SARL", status: 'Potentiel', softSkills: ["Curiosité", "Digital", "Pédagogie"], mission: "Digitalisation des ateliers, IoT et analyse de données.", environment: "Au cœur de la transformation numérique, écrans, capteurs.", impact: "Tu connectes l'atelier pour le rendre plus intelligent et économe." },
    { id: '15', type: 'moderne', title: "Technicien Robotique", company: "MEANWHILE", status: 'Potentiel', softSkills: ["Logique", "Curiosité", "Rigueur"], mission: "Installation et maintenance de robots mobiles autonomes.", environment: "Haute technologie, robotique mobile, environnement propre.", impact: "Tu fais cohabiter robots et humains pour réduire la pénibilité." }
  ];

  var jobsGrid = document.getElementById('jobs-grid');

  if (jobsGrid) {
    var fragment = document.createDocumentFragment();

    JOBS_DATA.forEach(function (job, index) {
      var isModern = job.type === 'moderne';
      var gradientFrom = isModern ? '#F59E33' : '#009F67';
      var gradientTo = isModern ? '#C7CD2F' : '#00A895';
      var accentColor = isModern ? 'var(--color-accent)' : 'var(--color-primary)';
      var tagIcon = isModern ? '⚡' : '☀';
      var tagText = isModern ? "Métier d'Avenir & Tech" : 'Savoir-faire & Humain';
      var bgSoft = isModern ? 'rgba(245,158,51,0.06)' : 'rgba(0,159,103,0.06)';
      var serial = 'FI-J' + String(index + 1).padStart(2, '0');

      // Delay classes: stagger by column (mod 3)
      var delayClass = index % 3 === 0 ? '' : index % 3 === 1 ? ' reveal--delay-1' : ' reveal--delay-2';

      var html = '<div class="card card--job reveal' + delayClass + '">' +
        '<div class="card--job__header" style="background:linear-gradient(135deg,' + gradientFrom + ',' + gradientTo + ');padding:var(--space-3);color:white;position:relative;overflow:hidden">' +
          '<div class="card--job__header-top" style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-1)">' +
            '<span class="card__tag">' + tagIcon + ' ' + tagText + '</span>' +
            (job.status === 'Validé' ? '<span class="card__status">✓ Validé</span>' : '') +
          '</div>' +
          '<h3 class="card__job-title" style="font-size:1.375rem;font-weight:700;margin-bottom:4px">' + job.title + '</h3>' +
          '<span class="card__company" style="opacity:0.9;font-size:var(--text-small)">' + job.company + '</span>' +
        '</div>' +
        '<div class="card__body" style="display:flex;flex-direction:column;gap:var(--space-2)">' +
          '<div>' +
            '<p class="card__field-label" style="color:' + accentColor + '">🎯 La Mission</p>' +
            '<p class="card__field-text" style="color:var(--color-text)">' + job.mission + '</p>' +
          '</div>' +
          '<div>' +
            '<p class="card__field-label" style="color:' + accentColor + '">😊 Le cadre de travail</p>' +
            '<p class="card__field-text" style="color:var(--color-muted);font-style:italic">"' + job.environment + '"</p>' +
          '</div>' +
          '<div class="card__impact-box" style="margin-top:auto;padding:var(--space-2);border-radius:var(--radius-md);background:' + bgSoft + '">' +
            '<p class="card__field-label" style="color:' + accentColor + ';margin-bottom:4px">⚡ L\'Impact</p>' +
            '<p style="font-size:var(--text-small);font-weight:700;color:' + accentColor + '">' + job.impact + '</p>' +
          '</div>' +
          '<div class="card__skills">' +
            job.softSkills.slice(0, 3).map(function (skill) {
              return '<span class="card__skill">' + skill + '</span>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<span class="card__serial">' + serial + '</span>' +
      '</div>';

      var wrapper = document.createElement('div');
      wrapper.innerHTML = html;
      fragment.appendChild(wrapper.firstChild);
    });

    jobsGrid.appendChild(fragment);

    // Observe newly added cards for reveal
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      var jobCards = jobsGrid.querySelectorAll('.reveal');
      var jobObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              jobObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      jobCards.forEach(function (el) { jobObserver.observe(el); });

      // Also add tilt to job cards
      jobCards.forEach(function (card) {
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
    } else {
      jobsGrid.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

})();
