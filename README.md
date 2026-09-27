# 🚀 AI Skill Mastering : L'Ingénierie des Vidéos Publicitaires par IA (Direct Response & UGC)

Bienvenue dans le dépôt **AI Skill Mastering** (`ai_skill_mastering`). Ce projet rassemble un ensemble de **Skills**, de guides méthodologiques, de spécifications techniques et de scripts d'automatisation pour former et guider les modèles de langage avancés (**Claude, ChatGPT, Gemini**) dans la création automatisée de **vidéos publicitaires e-commerce et UGC haute performance** (TikTok, Instagram Reels, Facebook Ads, YouTube Shorts).

---

## 🎯 Vision du Projet

Produire une vidéo publicitaire qui convertit ne s'improvise pas : cela nécessite une synergie parfaite entre **la psychologie du spectateur**, **la narration émotionnelle**, **l'authenticité vocale**, **la typographie dynamique** et **la précision du montage vidéo**.

Ce dépôt codifie cette expertise en un système reproductible, modulaire et automatisable de bout en bout (via n8n, FFmpeg, et l'API Video-Factory).

---

## 📂 Structure du Répertoire

```
E:\Antigrativty\antigravity_skill\
├── README.md                                  # Présentation globale du projet
├── ai-video-ads-mastery\                      # Skill de production de vidéos publicitaires UGC & Direct Response
│   ├── SKILL.md                               # Guide maître d'entraînement et règles d'or vidéo
│   ├── references\                            # Psychologie de rétention, voix-off, sous-titres ASS
│   ├── scripts\                               # Scripts tts_generate, subtitle_sync, render_video
│   └── examples\                              # Configurations JSON et bibliothèque de prompts
├── ai-marketing-posters-mastery\              # Skill de création d'affiches publicitaires & bannières e-commerce
│   ├── SKILL.md                               # Guide maître d'affiches haute conversion & lois visuelles
│   ├── references\
│   │   ├── poster_copywriting_frameworks.md   # Formule H.O.O.K. et accroches publicitaires
│   │   └── conversion_badges_and_cta.md       # Badges réassurance locale (COD, 24h, WhatsApp, Prix)
│   ├── scripts\
│   │   ├── composite_poster.js                # Moteur Playwright/HTML5 d'assemblage d'affiches HD
│   │   └── composite_multi_poster.js          # Assemblage de posters multi-variations
│   ├── workflow_n8n_affiche_ecommerce.json    # Workflow n8n prêt à importer
│   └── examples\
│       ├── poster_config_example.json         # Modèle de configuration produit & marque
│       └── prompts_library_posters.md         # Bibliothèque de prompts par niche (Cosmétique, Food, Tech, Voyage)
└── pinterest-poster-enhancer\                 # Skill d'analyse et d'extraction de tendances Pinterest
    ├── SKILL.md                               # Guide d'enrichissement créatif et adaptation de styles
    ├── references\
    │   ├── design_archetypes.md               # Archétypes graphiques et moodboards e-commerce
    │   └── query_recipes.md                   # Requêtes de recherche haute performance
    └── scripts\
        └── search_pinterest.js                # Automatisation de recherche et scraping visuel
```

---

## 🌟 Les 5 Piliers Clés du Skill

### 1. ⏱️ La Règle des 3 Premières Secondes (Pattern Interrupt)
- Zéro temps mort, aucun logo ni présentation corporative au démarrage.
- Arrêt immédiat du scroll par un hook émotionnel ou visuel percutant (plan serré sur un problème, interpellation complice).

### 2. 📦 La Règle de l'Avant-Dernière Scène pour le Produit
- Le produit n'apparaît qu'après l'établissement de la douleur et l'explication de la formule.
- **Positionnement strict :** En **avant-dernière scène**, exactement au moment où la voix annonce le prix et le packaging.
- La scène finale montre la transformation positive (peau lisse, sourire) avant la carte d'appel à l'action (`EndCard`).

### 3. 🎙️ L'Ingénierie Vocale Ultra-Humaine (Afrique & International)
- Utilisation de la structure directoriale en 3 piliers :
  - **`AUDIO PROFILE`** : Identité, rôle et énergie de l'orateur.
  - **`DIRECTOR'S NOTES`** : Instructions de studio (*vocal smile*, musicalité, intonation, respiration, accent régional comme l'accent ivoirien d'Abidjan).
  - **`TRANSCRIPT`** : Texte brut prononcé sans fioritures.
- Génération native avec les modèles Gemini TTS (`gemini-3.1-flash-tts-preview`) et conversion binaire PCM vers WAV avec en-tête RIFF de 44 octets.

### 4. 💬 Les Sous-titres Séquentiels Badge TikTok (ASS Style)
- Reproduction du format sticker viral (fond blanc opaque `#FFFFFF` et typographie noire grasse `#000000`).
- Implémenté via la norme ASS avec `BorderStyle: 3`, padding interne (`Outline: 20`) et centrage dans le tiers inférieur (`MarginV: 28%`).
- Découpage en blocs courts (3 à 6 mots) durant 1,2s à 2,2s.

### 5. ⚡ L'Automatisation Complète (Pipeline n8n + Video-Factory)
- Un formulaire n8n intuitif permet de soumettre un brief, de choisir la durée (15s ou 30s), la voix, les couleurs de badge et de texte, la police (`Arial`, `Noto Sans`, `DejaVu Sans`), et d'uploader les médias.
- Le pipeline orchestre la génération du script, la synthèse vocale, l'extraction des timestamps, et le rendu final en MP4 1080x1920 (9:16).

---

## 🚀 Démarrage Rapide

### 1. Génération d'une Voix-Off IA :
```bash
python ai-video-ads-mastery/scripts/tts_generate.py africaine_femme ma_voix.wav
```

### 2. Alignement des Sous-Titres Séquentiels :
```bash
python ai-video-ads-mastery/scripts/subtitle_sync.py ma_voix.wav sous_titres.json
```

### 3. Déclenchement du Rendu Vidéo :
```bash
python ai-video-ads-mastery/scripts/render_video.py ai-video-ads-mastery/examples/jaysuing_15s_ugc.json
```

---

## 🤝 Contribution & Évolution

Ce dépôt est ouvert aux ajouts de nouveaux skills d'automatisation créative (génération de bannières publicitaires, copywriting par avatar, audio design réactif).

Créé et maintenu par **[@idevtejmavy](https://github.com/idevtejmavy)**.
