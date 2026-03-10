# Faire l'Industrie — V3

Site vitrine premium pour le projet **Faire l'Industrie** (CPME du Rhône).  
100 % statique — HTML / CSS / JS vanilla — déployable sur **GitHub Pages**.

---

## Structure du projet

```
index.html              ← Page principale
assets/                 ← Images, logos
  fi-logo.webp
  image_de9aba.jpg
  logo 42.jpg
  logo 69.jpg
  logo Ilyse.jpg
styles/
  tokens.css            ← Design tokens (couleurs, typo, radii, shadows, spacing)
  base.css              ← Reset, typographie, grille, utilities, animations reveal
  components.css        ← Navbar, boutons, cartes, badges, accordion, stepper, CTA band
  sections.css          ← Styles spécifiques par section (hero, packs, footer…)
scripts/
  main.js               ← Navbar sticky, menu mobile, accordion, scroll reveal, card tilt, job cards
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
<!-- ===== PROBLÈME ===== -->
<!-- ===== FORMATS ===== -->
...
```

### Données métiers (Pépites)
Le catalogue des métiers est dans `scripts/main.js`, dans le tableau `JOBS_DATA`.  
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
| Police titres | Sora |
| Police corps | Inter |
| Grille | max 1200px, gutter 24-40px |
| Breakpoints | 320 / 768 / 1280 |

---

## Checklist QA

### Responsive
- [ ] Mobile 320px
- [ ] Mobile 375px
- [ ] Tablet 768px
- [ ] Desktop 1280px+
- [ ] Menu mobile ouvre/ferme
- [ ] Hero image ne déborde pas

### Accessibilité
- [ ] Un seul `<h1>`
- [ ] Structure sémantique (header, main, section, footer)
- [ ] Skip link présent
- [ ] Focus visible partout (`:focus-visible`)
- [ ] Navigation clavier (tab, enter, esc)
- [ ] Accordion accessible (aria-expanded, aria-hidden)
- [ ] Contrastes suffisants (4.5:1 min)
- [ ] Images avec `alt` descriptifs
- [ ] `lang="fr"` sur `<html>`

### Performance
- [ ] Pas de framework lourd (vanilla JS)
- [ ] Preconnect Google Fonts
- [ ] Preload images LCP
- [ ] Images avec dimensions (pas de layout shift)
- [ ] `loading="lazy"` sur images below-the-fold
- [ ] `prefers-reduced-motion` respecté

### SEO
- [ ] `<title>` et `<meta description>`
- [ ] Open Graph (og:title, og:description, og:image)
- [ ] `<link rel="canonical">`
- [ ] Un seul `<h1>`, hiérarchie logique h2 → h3

---

## Licence

Projet interne CPME du Rhône. Tous droits réservés.
