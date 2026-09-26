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
└── ai-video-ads-mastery\                      # Skill principal de production vidéo
    ├── SKILL.md                               # Guide maître d'entraînement et règles d'or
    ├── references\
    │   ├── storytelling_frameworks.md         # Psychologie de rétention (PAS, Hook, 15s vs 30s)
    │   ├── voiceover_engineering.md           # Audio Profiles, Director's Notes & Synthèse Vocale
    │   ├── subtitles_and_typography.md        # Formule du badge blanc TikTok (ASS BorderStyle 3)
    │   ├── video_factory_api.md               # Spécification d'assemblage du moteur Video-Factory
    │   └── n8n_pipeline_architecture.md       # Architecture du workflow n8n (10 étapes)
    ├── scripts\
    │   ├── tts_generate.py                    # Génération de voix-off IA avec profil directorial
    │   ├── subtitle_sync.py                   # Alignement temporel des sous-titres au centième
    │   └── render_video.py                    # Déclencheur API de rendu MP4
    └── examples\
        ├── jaysuing_15s_ugc.json              # Exemple de rendu JSON pour 15s Flash UGC
        ├── jaysuing_30s_storytelling.json     # Exemple de rendu JSON pour 30s Storytelling PAS
        └── prompts_library.md                 # Bibliothèque de prompts pour Claude, GPT-4o, Gemini
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
