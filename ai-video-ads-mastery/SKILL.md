---
name: ai-video-ads-mastery
description: >-
  Guide expert et framework complet pour entraîner et guider les IA (Claude, ChatGPT, Gemini)
  dans la création automatisée de vidéos publicitaires percutantes (Direct Response, UGC TikTok/Reels/Shorts,
  voix-off ultra-humaines régionales, sous-titres séquentiels synchronisés, storytelling émotionnel
  et pipelines de rendu vidéo automatisés n8n / Video-Factory).
---

# 🚀 AI Video Ads Mastery : Le Guide Ultime de la Création Publicitaire Vidéo par IA

Ce Skill constitue la base de connaissances et le guide méthodologique complet pour transformer n'importe quel LLM (**Claude, ChatGPT, Gemini**) en un **Directeur Créatif Publicitaire & Ingénieur de Rendu Vidéo**.

Il synthétise l'ensemble des règles de copywriting émotionnel, d'ingénierie vocale ultra-humaine, de sound design, de typographie séquentielle TikTok/Reels et d'orchestration technique (API n8n, FFmpeg et Video-Factory).

---

## 📋 Table des Matières

1. [Philosophie & Les 5 Lois d'Or de la Publicité Vidéo](#1-philosophie--les-5-lois-dor-de-la-publicit-vido)
2. [Storytelling & Formats Publicitaires (15s vs 30s)](#2-storytelling--formats-publicitaires-15s-vs-30s)
3. [Ingénierie Vocale & Voix-Off Hyper-Humaines](#3-ingnierie-vocale--voix-off-hyper-humaines)
4. [Sous-titres Séquentiels & Typographie Badge TikTok](#4-sous-titres-squentiels--typographie-badge-tiktok)
5. [Règles de Montage & Moteur Video-Factory (FFmpeg)](#5-rgles-de-montage--moteur-video-factory-ffmpeg)
6. [Architecture du Pipeline Automatisé (n8n + Form + Docker)](#6-architecture-du-pipeline-automatis)
7. [Fichiers et Ressources Inclus](#7-fichiers-et-ressources-inclus)

---

## 1. Philosophie & Les 5 Lois d'Or de la Publicité Vidéo

Toute vidéo publicitaire générée par une IA doit respecter ces **5 principes non-négociables** :

1. **La Règle des 3 Premières Secondes (The Pattern Interrupt) :**
   - Le spectateur décide de scroller ou de rester en moins de 2,5 secondes.
   - Ne commencez JAMAIS par un logo ou une présentation corporate ("Bonjour, aujourd'hui je vous présente...").
   - Commencez directement par l'émotion brute, un problème physique visible ou une interpellation chaleureuse (*"Regarde-moi cette pépite !"*, *"Une cicatrice ne devrait pas vous définir..."*).

2. **La Règle de l'Avant-Dernière Scène pour le Produit :**
   - L'image du produit ne doit être révélée qu'après l'établissement de la douleur et la promesse de transformation.
   - **Position optimale :** En **avant-dernière scène**, exactement au moment où la voix annonce le prix et la contenance (ex: *Le tube de 50ml est à seulement 8 500 FCFA*).
   - La scène finale montre le résultat désiré (personne souriante, peau éclatante, etc.) juste avant l'EndCard d'appel à l'action.

3. **L'Urgence et la Clarté de l'Offre :**
   - Toujours annoncer un prix clair, la monnaie locale (ex: FCFA, EUR, USD) et les facilités de réassurance (ex: *Paiement à la livraison, livraison rapide en 24h*).

4. **Le Sous-titrage Badge Séquentiel (TikTok/Reels Style) :**
   - 80% des utilisateurs de réseaux sociaux regardent les vidéos sans son ou dans un environnement bruyant.
   - Les sous-titres doivent être découpés en blocs courts (3 à 6 mots), affichés dans un badge contrasté (fond blanc, texte noir gras) et parfaitement synchronisés sur la voix.

5. **L'Authenticité Culturelle de la Voix :**
   - Une voix générique / robotique tue le taux de conversion.
   - La voix doit correspondre à la cible géographique et culturelle (ex: accent ivoirien chaleureux d'Abidjan pour l'Afrique de l'Ouest, intonation intime pour les cosmétiques de luxe).

---

## 2. Storytelling & Formats Publicitaires

### A. Le Format Flash UGC 15 Secondes (Rythmé & Punchy)
Idéal pour le retargeting, TikTok Ads, Instagram Reels et Facebook Shorts.

- **0.0s – 2.5s (Hook) :** Accroche choc / Arrêt du scroll (*"Regarde-moi cette pépite !"*).
- **2.5s – 5.0s (Problème / Agitation) :** Visualisation de la douleur (*"Finies les cicatrices et les vergetures qui gâchent ta peau"*).
- **5.0s – 9.0s (Révélation & Actifs) :** Révélation de la formule active (*"Le gel Jaysuing au rétinol et allantoïne"*).
- **9.0s – 12.5s (Flacon Produit - Avant-dernière scène) :** Visuel du produit avec le prix (*"Seulement 8 500 FCFA le tube de 50ml !"*).
- **12.5s – 15.0s (EndCard & CTA) :** Bouton WhatsApp ou URL du site web + Livraison rapide.

### B. Le Format Storytelling Émotionnel 30 Secondes (Direct Response PAS)
Idéal pour les campagnes d'acquisition froide sur Facebook / TikTok.

- **Theme 1 : Le Choc Empathique (0 - 5s) :** Gros plan intime sur la cicatrice / marque corporelle. Neutralise la honte par l'empathie.
- **Theme 2 : L'Agitation du Quotidien (5 - 10s) :** Femme songeuse cachant son corps. Rappelle la frustration quotidienne de se dissimuler.
- **Theme 3 : La Démonstration Active (10 - 15s) :** Application de la texture gel sur la peau. Explication vulgarisée des principes actifs.
- **Theme 4 : Le Flacon Produit (15 - 22s - Avant-dernière scène) :** Mise en avant premium du packaging, prix et offre promotionnelle.
- **Theme 5 : La Renaissance & Confiance (22 - 27s) :** Résultat final : peau lisse, sourire éclatant, liberté vestimentaire.
- **EndCard : L'Offre Irrésistible (27 - 30s) :** Prix barré, stock limité, livraison en 24h avec paiement à la réception.

👉 *Consulter le guide complet dans [`references/storytelling_frameworks.md`](./references/storytelling_frameworks.md).*

---

## 3. Ingénierie Vocale & Voix-Off Hyper-Humaines

Pour obtenir une performance vocale réaliste, humaine et persuasive avec les LLM (notamment Gemini Native Audio TTS `gemini-3.1-flash-tts-preview` ou `gemini-2.5-flash-preview-tts`), il ne faut **JAMAIS** se contenter d'envoyer le texte brut.

### La Structure en 3 Piliers du Prompt Audio :
1. **AUDIO PROFILE :** Définir le persona (Nom, rôle, archetype, énergie).
2. **DIRECTOR'S NOTES :** Instructions précises d'acteur de doublage (Style, Pacing, Vocal Smile, Accent, Respiration).
3. **TRANSCRIPT :** Le texte exact à prononcer, sans balises markdown ni annotations.

### Exemple Testé & Validé pour l'Afrique de l'Ouest (Voix Féminine Vendeuse d'Abidjan) :
```text
# AUDIO PROFILE: Awa
## "La Vendeuse Chaleureuse d'Abidjan"
Role: Jeune femme ivoirienne ultra dynamique, chaleureuse, souriante, persuasive et pleine d'énergie positive.

### DIRECTOR'S NOTES
Style: Très vivante, complice, enjouée et convaincante, avec le sourire dans la voix ("vocal smile"). Rythme UGC percutant, enthousiaste et naturel.
Pacing: Rapide, soutenu et très bien rythmé, sans hésitation ni temps mort.
Accent: Accent ivoirien d'Abidjan authentique, musicalité chaleureuse d'Afrique de l'Ouest francophone.

TRANSCRIPT:
Regarde-moi cette pépite ! Le gel anti-cicatrices et vergetures est enfin là ! Avec sa composition, il fait des miracles sur ta peau. Finies les vieilles marques, retrouve un corps lisse, doux et éclatant en un rien de temps. Le tube de 50ml est à seulement 8 500 FCFA, ça change la vie ! Ne rate pas ça, commande sur boutique-vendezvouse.com ou sur le numéro WhatsApp pour une livraison rapide assurée !
```

- **Voix Recommandée (Gemini TTS) :** `Sadachbia` (timbre féminin expressif et vivant) ou `Aoede` (timbre doux et chaleureux).
- **Format Technique :** Les modèles renvoient du PCM 16-bit 24kHz mono en base64. Il **DOIT** être préfixé d'un en-tête RIFF WAV standard de 44 octets pour être lu par FFmpeg et les navigateurs.

👉 *Consulter le guide technique et les scripts dans [`references/voiceover_engineering.md`](./references/voiceover_engineering.md) et [`scripts/tts_generate.py`](./scripts/tts_generate.py).*

---

## 4. Sous-titres Séquentiels & Typographie Badge TikTok

Pour reproduire fidèlement l'effet des vidéos virales (comme la vidéo de référence `2297942127627421.mp4`) :

### Le Style ASS Badge Rectangulaire (Opaque Box) :
- **Norme ASS :** Utilisation de `BorderStyle: 3` (boîte de délimitation opaque derrière chaque ligne).
- **Fond de boîte (BackColour) :** Blanc pur `&H00FFFFFF&` ou `#FFFFFF`.
- **Texte (PrimaryColour) :** Noir profond `&H00000000&` ou `#000000`.
- **Rembourrage (Outline) :** `20` pixels de marge interne (padding).
- **Position (MarginV) :** `playResY * 0.28` (positionné élégamment dans le tiers inférieur, sans masquer les visages ni le produit).
- **Typographie :** Polices sans-serif grasses et épurées (`Arial`, `Noto Sans`, `Montserrat`, `DejaVu Sans`).

### Découpage Séquentiel Synchronisé :
Chaque phrase doit durer entre **1,2s et 2,5s** (3 à 6 mots par badge) :
```json
[
  {"text": "Regarde-moi cette pépite !", "start": 0.0, "end": 1.95},
  {"text": "Le gel anti-cicatrices et vergetures", "start": 1.95, "end": 4.25},
  {"text": "est enfin là !", "start": 4.25, "end": 5.50},
  {"text": "Avec sa composition,", "start": 5.50, "end": 6.85},
  {"text": "il fait des miracles sur ta peau !", "start": 6.85, "end": 9.10}
]
```

👉 *Consulter les spécifications complètes dans [`references/subtitles_and_typography.md`](./references/subtitles_and_typography.md).*

---

## 5. Règles de Montage & Moteur Video-Factory

Le moteur de rendu local `video-factory` tourne sur `http://127.0.0.1:8790` (ou `http://host.docker.internal:8790` depuis Docker).

### Spécification JSON Complète pour `/render` :
```json
{
  "format": { "width": 1080, "height": 1920, "fps": 30 },
  "brand": {
    "primaryColor": "#0A66C2",
    "accentColor": "#FFD166",
    "textColor": "#000000",
    "fontName": "Arial",
    "logoId": "d370b38979f5",
    "watermark": "NOM_BOUTIQUE"
  },
  "voiceoverId": "ID_AUDIO_UPLOAD",
  "fitToVoiceover": true,
  "scenes": [
    { "mediaId": "ID_IMAGE_HOOK", "durationSec": 4.0, "effect": "kenburns" },
    { "mediaId": "ID_IMAGE_AGITATION", "durationSec": 4.0, "effect": "kenburns" },
    { "mediaId": "ID_IMAGE_TEXTURE", "durationSec": 4.0, "effect": "kenburns" },
    { "mediaId": "ID_IMAGE_PRODUIT", "durationSec": 7.0, "effect": "kenburns" },
    { "mediaId": "ID_IMAGE_RESULTAT", "durationSec": 4.0, "effect": "kenburns" }
  ],
  "captions": {
    "mode": "lines",
    "style": "box",
    "boxColor": "#FFFFFF",
    "textColor": "#000000",
    "fontName": "Arial",
    "lines": [
      { "text": "Regarde-moi cette pépite !", "start": 0.0, "end": 2.0 }
    ]
  },
  "endCard": {
    "title": "8 500 FCFA SEULEMENT",
    "subtitle": "Livraison Rapide en 24h",
    "cta": "COMMANDEZ SUR BOUTIQUE.COM",
    "durationSec": 3.0
  },
  "outputName": "pub-video-ugc-9-16"
}
```

👉 *Consulter le détail des endpoints et des options dans [`references/video_factory_api.md`](./references/video_factory_api.md).*

---

## 6. Architecture du Pipeline Automatisé (n8n + Form + Docker)

Le workflow complet tourne en local et comprend 10 étapes connectées :

```
[1. FormTrigger] ➡️ Collecte du brief, choix durée (15s/30s), voix, couleurs, police, photos
       ⬇️
[2. Gemini Copywriting] ➡️ Rédaction du script émotionnel calibré en secondes
       ⬇️
[2b & 2c. Extraction & Upload Médias] ➡️ Upload des images/vidéos sur Video-Factory
       ⬇️
[3. Formatage & Profil Vocal] ➡️ Injection de l'Audio Profile et Director's Notes
       ⬇️
[4. Gemini Flash TTS Preview] ➡️ Synthèse vocale ultra-humaine PCM
       ⬇️
[5. En-tête Audio WAV] ➡️ Préfixage 44 octets RIFF/WAV
       ⬇️
[6. Upload Audio Video-Factory] ➡️ Upload de la piste audio
       ⬇️
[7. Montage & Assemblage UGC] ➡️ Découpage sous-titres, placement produit avant-dernière scène
       ⬇️
[8. Video Factory Render] ➡️ Rendu MP4 1080x1920 (libx264 + libass)
```

👉 *Consulter la documentation complète de l'architecture n8n dans [`references/n8n_pipeline_architecture.md`](./references/n8n_pipeline_architecture.md).*

---

## 7. Fichiers et Ressources Inclus

| Dossier | Fichier | Rôle |
| :--- | :--- | :--- |
| `references/` | [`storytelling_frameworks.md`](./references/storytelling_frameworks.md) | Frameworks PAS, Hook-Hold-Offer, rythmes 15s/30s |
| `references/` | [`voiceover_engineering.md`](./references/voiceover_engineering.md) | Guide complet Audio Profile, Director's Notes & TTS |
| `references/` | [`subtitles_and_typography.md`](./references/subtitles_and_typography.md) | Recette des badges TikTok/Reels et sous-titres séquentiels |
| `references/` | [`video_factory_api.md`](./references/video_factory_api.md) | Référence API Video-Factory et paramètres `/render` |
| `references/` | [`n8n_pipeline_architecture.md`](./references/n8n_pipeline_architecture.md) | Schéma et configuration des nœuds n8n |
| `scripts/` | [`tts_generate.py`](./scripts/tts_generate.py) | Script autonome de génération de voix avec WAV header |
| `scripts/` | [`subtitle_sync.py`](./scripts/subtitle_sync.py) | Script de transcription et alignement temporel des sous-titres |
| `scripts/` | [`render_video.py`](./scripts/render_video.py) | Script Python d'appel à l'API de rendu |
| `examples/` | [`jaysuing_15s_ugc.json`](./examples/jaysuing_15s_ugc.json) | Spécification de rendu 15s prête à l'emploi |
| `examples/` | [`jaysuing_30s_storytelling.json`](./examples/jaysuing_30s_storytelling.json) | Spécification de rendu 30s storytelling prête à l'emploi |
| `examples/` | [`prompts_library.md`](./examples/prompts_library.md) | Bibliothèque de prompts pour Claude, ChatGPT et Gemini |
