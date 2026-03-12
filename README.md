# Faire l'Industrie — V3

Site vitrine pour le projet **Faire l'Industrie** (CPME Rhône et Loire).  
Jeu de cartes « Portrait d'avenir » pour sensibiliser aux métiers industriels du territoire AURA.  
100 % statique — HTML / CSS / JS vanilla — déployable sur **GitHub Pages**.

**Chiffres clés :** +30 entreprises, +50 métiers industriels et artisanaux, 15 min par session.

---

## Structure du projet

```
index.html              ← Page principale
assets/                 ← Images, logos
  fi-logo.webp          ← Logo (header + footer)
  image_de9aba.jpg      ← Hero image (fallback)
  image_de9aba.webp     ← Hero image desktop (WebP, 95 Ko)
  image_de9aba-sm.webp  ← Hero image mobile (WebP, 41 Ko)
  logo 42.jpg / .webp
  logo 69.jpg / .webp
  logo Ilyse.jpg / .webp
  fonts/
    Inter-variable.woff2
    GeistMono-variable.woff2
styles/
  tokens.css            ← Design tokens (couleurs, typo, radii, shadows, spacing)
  base.css              ← Reset, typographie, grille, utilities, animations reveal
  components.css        ← Navbar, boutons, cartes, badges, accordion, stepper, CTA band
  sections.css          ← Styles spécifiques par section (hero, chiffres clés, packs, footer…)
  fonts.css             ← @font-face declarations
  *.min.css             ← Versions minifiées (utilisées en production)
scripts/
  main.js               ← Navbar sticky, menu mobile, accordion, scroll reveal, card tilt, job cards
  main.min.js           ← Version minifiée (utilisée en production)
moodboard/              ← Images d'inspiration (non intégrées au site)
.github/workflows/
  deploy.yml            ← Workflow GitHub Actions pour GitHub Pages
```

---

## Utilisation locale

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur.

Pour un serveur local avec rechargement :

```bash
# Avec Python
python3 -m http.server 8000

# Avec Node.js (npx)
npx serve .
```

Puis ouvrir `http://localhost:8000`.

---

## Déployer sur GitHub Pages

### Méthode automatique (recommandée)

1. **Activer GitHub Pages** dans les paramètres du dépôt :  
   → Settings → Pages → Source → **GitHub Actions**

2. **Pusher sur `main`** :  
   Le workflow `.github/workflows/deploy.yml` déploie automatiquement.

3. Le site sera disponible à :  
   `https://<votre-username>.github.io/faire-industrie-vitrine-v3/`

### Méthode manuelle

1. Settings → Pages → Source → **Deploy from a branch** → `main` / `/ (root)`
2. Save. Le site sera en ligne en quelques minutes.

---

## Changer les contenus

### Textes et sections
Éditez directement `index.html`. Chaque section est commentée et identifiable :
```html
<!-- ===== HERO ===== -->
<!-- ===== CHIFFRES CLÉS ===== -->
<!-- ===== PROBLÈME ===== -->
<!-- ===== POUR QUI ===== -->
<!-- ===== COMPOSITION DU JEU ===== -->
<!-- ===== PROGRESSION ===== -->        (+ bloc "Ce qu'on obtient en sortie")
<!-- ===== DEPLOIEMENT ===== -->
<!-- ===== FORMATS ===== -->
<!-- ===== PACKS ===== -->
<!-- ===== EN SYNERGIE ===== -->
<!-- ===== PERSONNALISATION ===== -->
<!-- ===== TÉMOIGNAGES ===== -->
<!-- ===== FAQ ===== -->
<!-- ===== CATALOGUE (PÉPITES) ===== -->
<!-- ===== DYNAMIQUE DU PROJET ===== -->
```

### Données métiers (Pépites)
Le catalogue des métiers est dans `scripts/main.js`, dans le tableau `JOBS_DATA`.  
Les cartes affichées sur le site sont un **extrait** du catalogue complet (+30 entreprises, +50 métiers).  
Ajoutez ou modifiez un objet pour mettre à jour une fiche :
```js
{ id: '16', type: 'moderne', title: "Nouveau Métier", company: "Entreprise", status: 'Validé',
  softSkills: ["Skill1", "Skill2", "Skill3"],
  mission: "Description de la mission.",
  environment: "Description de l'environnement.",
  impact: "Description de l'impact." }
```

### Couleurs et design tokens
Modifiez `styles/tokens.css`. Toutes les couleurs, tailles, ombres et espacements sont centralisés.

### Images
Remplacez les fichiers dans `assets/` en gardant les mêmes noms, ou mettez à jour les `src` dans `index.html`.

### URLs des CTAs
Recherchez/remplacez les URLs dans `index.html` :
- Formulaire de contact : `https://liutnotes.notion.site/7604c2d017634177879ed982bfdc693f`
- Réservation démo : `https://cal.com/fabrice-liut/15-min-meeting`

---

## Signature UI : "Cartes tangibles"

Le site reprend l'esthétique d'un **deck de cartes physiques** :
- Coins arrondis avec bordure colorée supérieure (code couleur par type)
- Ombres multi-couches simulant l'épaisseur
- Tilt subtil au hover (perspective 3D via JS)
- Numéros de série discrets sur chaque carte (FI-P01, FI-M, FI-J03…)
- Palette fidèle aux 5 types de cartes du jeu

---

## Design system

| Token | Valeur |
|-------|--------|
| `--color-primary` | `#009F67` (vert CPME) |
| `--color-accent` | `#F59E33` (orange) |
| `--color-sky` | `#74D2D9` |
| `--color-lime` | `#C7CD2F` |
| `--color-teal` | `#00A895` |
| Police titres | Inter (display) |
| Police corps | Inter |
| Grille | max 1200px, gutter 24-40px |
| Breakpoints | 320 / 768 / 1280 |

---

## Checklist QA

### Responsive
- [x] Mobile 320px
- [x] Mobile 375px
- [x] Tablet 768px
- [x] Desktop 1280px+
- [x] Menu mobile ouvre/ferme (z-index corrigé)
- [x] Hero image ne déborde pas
- [x] Boutons ne débordent pas sur mobile
- [x] Grille 5 colonnes → 1 col sur mobile, 2 col sur petit tablet

### Accessibilité
- [x] Un seul `<h1>`
- [x] Structure sémantique (header, main, section, footer)
- [x] Skip link présent
- [x] Focus visible partout (`:focus-visible`)
- [x] Navigation clavier (tab, enter, esc)
- [x] Accordion accessible (aria-expanded, aria-hidden)
- [x] Contrastes suffisants (4.5:1 min)
- [x] Images avec `alt` descriptifs
- [x] `lang="fr"` sur `<html>`

### Performance
- [x] Pas de framework lourd (vanilla JS)
- [x] Critical CSS inliné dans le `<head>`
- [x] CSS/JS non-critique différés (sections below-fold, Geist Mono)
- [x] Images WebP avec `<picture>` + fallback JPG
- [x] Image hero responsive (mobile 600px / desktop 1200px)
- [x] Preload images LCP + fonts clés
- [x] Images avec dimensions + `aspect-ratio` (pas de layout shift)
- [x] `loading="lazy"` sur images below-the-fold
- [x] `content-visibility: auto` sur sections below-fold
- [x] Fichiers CSS et JS minifiés en production
- [x] `prefers-reduced-motion` respecté

### SEO
- [x] `<title>` et `<meta description>`
- [x] Open Graph (og:title, og:description, og:image)
- [x] `<link rel="canonical">`
- [x] Un seul `<h1>`, hiérarchie logique h2 → h3

---

## Changelog récent

### Mars 2026 — v3.1 (UI/UX mobile + performance)

**Corrections mobile/tablette :**
- Menu mobile : bouton fermer accessible (z-index corrigé au-dessus de l'overlay)
- Grille 5 cartes : 1 colonne sur mobile, 2 sur petit tablet, 3/5 sur desktop
- Boutons CTA : `white-space: normal` + `max-width: 100%` sur petits écrans
- Bouton "Personnaliser le jeu" : ne déborde plus sur mobile
- Pack cards : meilleur espacement intérieur, texte mieux aéré
- Hero badge flottant : taille réduite sur mobile (90×90)
- Footer : texte "FAIRE L'INDUSTRIE" remplacé par le logo image
- Bouton Pack 2 : couleur lime alignée avec la carte

**Optimisations performance (PageSpeed) :**
- Images converties en WebP avec `<picture>` (hero : 324K → 95K desktop / 41K mobile)
- Critical CSS inliné dans le `<head>` (supprime le render-blocking)
- CSS sections et JS différés (`media="print"` + `onload`)
- Font Geist Mono chargée en lazy après le load
- Tous les CSS/JS minifiés (~25% plus légers)
- `aspect-ratio` sur images pour éliminer le CLS
- `content-visibility: auto` sur sections below-fold

---

## Licence

Projet interne CPME du Rhône. Tous droits réservés.
