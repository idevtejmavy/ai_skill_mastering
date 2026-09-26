# 🎬 Spécification Technique & API de Video-Factory

Video-Factory est un moteur de rendu vidéo local conteneurisé sous Docker, optimisé pour l'assemblage ultra-rapide de vidéos publicitaires aux formats 9:16 (TikTok/Reels), 1:1 (Instagram) et 16:9 (YouTube).

---

## 1. Informations de Connexion & Santé

- **URL Locale :** `http://127.0.0.1:8790` (ou `http://host.docker.internal:8790` depuis n8n dans Docker)
- **Vérification de Santé :**
  ```bash
  GET http://127.0.0.1:8790/health
  ```
  *Réponse :*
  ```json
  { "ok": true, "ffmpeg": "8.1.2" }
  ```

---

## 2. Téléversement de Médias (`POST /upload`)

Chaque ressource (image, vidéo, logo, voix-off) doit d'abord être téléversée pour obtenir un identifiant unique `id` (12 caractères hexadécimaux).

```bash
POST http://127.0.0.1:8790/upload
Content-Type: multipart/form-data
Body: file=@image_ou_audio.jpg
```

*Réponse pour une image :*
```json
{
  "id": "4512483e9d01",
  "filename": "4512483e9d01.jpg",
  "kind": "image",
  "width": 1080,
  "height": 1920
}
```

*Réponse pour un audio :*
```json
{
  "id": "879ce8266a7a",
  "filename": "879ce8266a7a.wav",
  "kind": "audio",
  "durationSec": 26.24
}
```

---

## 3. Spécification Complète de Rendu (`POST /render`)

### Corps JSON de la Requête :
```json
{
  "format": {
    "width": 1080,
    "height": 1920,
    "fps": 30
  },
  "brand": {
    "primaryColor": "#0A66C2",
    "accentColor": "#FFD166",
    "textColor": "#000000",
    "fontName": "Arial",
    "logoId": "d370b38979f5",
    "watermark": "NOM_BOUTIQUE"
  },
  "voiceoverId": "879ce8266a7a",
  "fitToVoiceover": true,
  "music": {
    "name": "corporate-upbeat.mp3"
  },
  "musicVolume": 0.12,
  "scenes": [
    {
      "mediaId": "b75b01eba9d6",
      "durationSec": 5.0,
      "effect": "kenburns"
    },
    {
      "mediaId": "6462cc94144a",
      "durationSec": 5.0,
      "effect": "kenburns"
    },
    {
      "mediaId": "50123a0d12f3",
      "durationSec": 5.0,
      "effect": "kenburns"
    },
    {
      "mediaId": "4512483e9d01",
      "durationSec": 7.0,
      "effect": "kenburns"
    },
    {
      "mediaId": "cbe174fb9b2f",
      "durationSec": 4.5,
      "effect": "kenburns"
    }
  ],
  "captions": {
    "mode": "lines",
    "style": "box",
    "boxColor": "#FFFFFF",
    "textColor": "#000000",
    "fontName": "Arial",
    "lines": [
      { "text": "Regarde-moi cette pépite !", "start": 0.0, "end": 1.95 },
      { "text": "Le gel anti-cicatrices et vergetures", "start": 1.95, "end": 4.25 }
    ]
  },
  "endCard": {
    "title": "8 500 FCFA SEULEMENT",
    "subtitle": "Livraison Rapide à Abidjan",
    "cta": "COMMANDEZ SUR BOUTIQUE-VENDEZVOUSE.COM",
    "durationSec": 3.0
  },
  "outputName": "pub-ugc-jaysuing-9-16"
}
```

---

## 4. Règles & Paramètres Critiques

### A. Règle du Produit en Avant-Dernière Scène :
Dans le tableau `scenes`, l'image ou la vidéo montrant directement le packaging du produit (`IMG_5623.jpg`) doit être placée à l'index `scenes.length - 2`.
- La scène qui la précède montre le problème ou l'application.
- La scène qui lui succède (dernière scène) montre le résultat transformé (sourire, peau lisse).
- Ensuite vient la carte finale (`endCard`) avec le CTA.

### B. Gestion de `fitToVoiceover` :
- `fitToVoiceover: true` : Ajuste automatiquement la durée de chaque scène au prorata pour correspondre exactement à la durée de la voix-off (+ 0.5s).
- `fitToVoiceover: false` : Conserve strictement les durées indiquées dans chaque scène (idéal pour forcer un montage à exactement 14.8s).

### C. Gestion des Sous-titres (`captions`) :
- `mode: "lines"` : Mode séquentiel par phrase.
- `style: "box"` : Active le badge opaque façon sticker TikTok/Reels.
- `boxColor` : Couleur du badge (ex: `#FFFFFF` blanc, `#000000` noir, `#FFD166` or).
- `textColor` : Couleur de la typographie (ex: `#000000`, `#FFFFFF`).
- `fontName` : Police appliquée (ex: `Arial`, `Noto Sans`, `DejaVu Sans`).
