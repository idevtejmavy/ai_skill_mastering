---
name: pinterest-poster-enhancer
description: >-
  Framework expert et pipeline d'automatisation pour rechercher, analyser et extraire les meilleures
  tendances visuelles de Pinterest (posters publicitaires, typographies monumentales, mises en scène produit,
  layouts e-commerce), puis les adapter et les appliquer à une affiche existante ou un nouveau thème
  pour sublimer son rendu professionnel et son taux de conversion.
---

# 📌 Pinterest Poster Enhancer : Recherche de Modèles & Sublimation d'Affiches Publicitaires

Ce Skill permet d'associer **la puissance d'exploration visuelle de Pinterest** à vos créations d'affiches publicitaires e-commerce. Il recherche automatiquement des références et tendances de design mondialement reconnues, en extrait les codes graphiques majeurs, et les applique à vos produits réels pour produire des visuels au rendu ultra-professionnel.

---

## 🚀 Le Workflow en 5 Étapes

```text
[1. Définition du Thème & Produit]
              │
              ▼
[2. Exploration Automatisée Pinterest] ──▶ Exécution de scripts/search_pinterest.js
              │                            (Capture de moodboards sans popup)
              ▼
[3. Décodage des Tendances Clés] ───────▶ Analyse : typographie, staging, éclairage,
              │                            palettes, ombres et reflets miroir
              ▼
[4. Fusion avec les Contraintes Locales] ─▶ Intégration : Prix en FCFA, Badges de confiance,
              │                            Bouton d'action WhatsApp, Vrai logo
              ▼
[5. Rendu Vectoriel Impeccable (Playwright)] ──▶ Affiche HD 2160x2880 px prête pour Facebook Ads
```

---

## 🛠️ 1. Exploration Automatisée de Pinterest

Le script intégré `scripts/search_pinterest.js` utilise Playwright pour rechercher les meilleures créations sur Pinterest, éliminer les fenêtres contextuelles de connexion, et sauvegarder des planches d'inspiration nettes :

```bash
# Exemple de recherche pour des ordinateurs portables :
node "E:/Antigrativty/.agents/skills/pinterest-poster-enhancer/scripts/search_pinterest.js" --query "laptop sale poster design bold typography"

# Exemple pour des cosmétiques / sérums :
node "E:/Antigrativty/.agents/skills/pinterest-poster-enhancer/scripts/search_pinterest.js" --query "cosmetic product advertising poster luxury podium"

# Exemple pour des chaussures / sneakers :
node "E:/Antigrativty/.agents/skills/pinterest-poster-enhancer/scripts/search_pinterest.js" --query "sneaker poster design floating gravity"
```

Consultez [`references/query_recipes.md`](references/query_recipes.md) pour la liste exhaustive des requêtes à fort rendement par secteur.

---

## 🎨 2. Les 5 Signatures Visuelles Pinterest à Répliquer

Consultez [`references/design_archetypes.md`](references/design_archetypes.md) pour les détails techniques.

1. **Typographie Monumentale en Filigrane (*Big Bold Watermark*) :**
   - Répétition du nom de marque ou du modèle en arrière-plan en lettres massives (210px) avec une transparence subtile (4% à 8%).
   - Donne un ancrage architectural et une profondeur 3D spectaculaire.

2. **Physique Photoréaliste au Sol (*Contact Shadow + Mirror Reflection*) :**
   - Élimination des halos néon simplistes au profit d'une **ombre d'occlusion au sol** sombre et d'un **reflet miroir inversé** dégradé à 20% d'opacité.

3. **Code Couleur Bicolore Contrasté :**
   - Attribution d'un liseré ou d'un accent couleur propre à chaque produit sur les affiches comparatives (ex: Cyan néon `#38BDF8` vs Rouge Crimson `#E11D48` ou Or `#F59E0B`).

4. **Spécifications avec Icônes Vectorielles Dédiées :**
   - Remplacement des coches basiques par de véritables pictogrammes techniques (processeur, RAM, disque SSD, écran).

5. **Dock d'Action Flottant WhatsApp :**
   - Bloc de contact arrondi ergonomique avec logo vectoriel, numéro contrasté en typographie moderne (`Space Grotesk`) et bouton d'action tactile.

---

## 📱 3. Règles d'Adaptation E-Commerce Locale (Afrique & International)

Même en adoptant les designs les plus avant-gardistes de Pinterest, l'affiche doit obligatoirement respecter les impératifs de rentabilité e-commerce locale :

- **Prix explicites en FCFA :** Jamais de devises étrangères ni de prix cachés.
- **Réassurance visible :** `Livraison 24h Abidjan & CI`, `Paiement à la livraison après contrôle`, `Garantie avec facture`.
- **Contact WhatsApp direct :** Format international visible (ex: `+225 05 04 59 45 20`).
- **Lisibilité mobile immédiate :** Les informations clés doivent être scannables en moins de 3 secondes sur l'écran d'un smartphone.

---

## 📂 Structure du Skill

- `SKILL.md` : Manuel de référence et guide opératoire.
- `scripts/search_pinterest.js` : Moteur de scraping et de capture de moodboards Pinterest.
- `references/query_recipes.md` : Guide des meilleures requêtes par industrie.
- `references/design_archetypes.md` : Spécifications CSS et règles de rendu des archétypes Pinterest.
