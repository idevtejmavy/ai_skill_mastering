# 💬 Sous-titres Séquentiels & Typographie Badge TikTok / Reels

Ce document explique les secrets visuels et techniques pour reproduire les sous-titres séquentiels haute rétention vus sur TikTok, Instagram Reels et Shorts (notamment dans la vidéo de référence `2297942127627421.mp4`).

---

## 1. Pourquoi le Badge Blanc avec Texte Noir ?

Sur les formats vidéo verticaux (9:16) :
1. **Contraste Absolu :** Quel que soit l'arrière-plan (peau claire, peau sombre, flacon blanc, fond coloré), le badge blanc avec texte noir offre une lisibilité à 100% sans jamais se confondre avec l'image.
2. **Effet Sticker / Vignette Native :** Ce style imite les outils d'édition intégrés de TikTok et Instagram, conférant à la vidéo une authenticité UGC (User-Generated Content) plutôt qu'un aspect publicitaire froid.
3. **Guidage Oculaire :** Placé dans le tiers inférieur (`MarginV` = 28% de la hauteur de l'écran), il capte le regard sans masquer le visage de l'intervenant ni le produit.

---

## 2. Spécification Technique ASS (Advanced SubStation Alpha)

Le format ASS permet un contrôle typographique vectoriel d'une précision chirurgicale via le filtre `subtitles` de FFmpeg (libass).

### Déclaration du Style Badge Rectangulaire :
```ini
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Arial,56,&H00000000&,&H00000000&,&H00FFFFFF&,&H80000000&,-1,0,0,0,100,100,0,0,3,20,0,2,60,60,538,1
```

### Explication des Paramètres Critiques :
- **`BorderStyle: 3` :** Active la boîte opaque de délimitation (Opaque Box) derrière le texte au lieu d'un contour traditionnel.
- **`PrimaryColour: &H00000000&` :** Couleur de la police = Noir profond `#000000` (format `&HAABBGGRR&`).
- **`OutlineColour: &H00FFFFFF&` :** Couleur du fond de la boîte = Blanc pur `#FFFFFF`.
- **`Outline: 20` :** Rembourrage interne (padding) en pixels autour du texte pour former le badge.
- **`Shadow: 0` :** Pas d'ombre portée pour garder un badge plat et moderne.
- **`Bold: -1` :** Texte en gras pour une lisibilité maximale sur mobile.
- **`Alignment: 2` :** Centré horizontalement, aligné par le bas.
- **`MarginV: 538` :** Positionnement vertical à 28% du bas pour une vidéo 1080x1920 (PlayResY * 0.28).

---

## 3. Découpage Séquentiel & Rythme Temporel

Pour maintenir une dynamique de lecture sans perte d'attention :
- **Longueur idéale d'un sous-titre :** 3 à 6 mots par ligne.
- **Durée d'affichage idéale :** 1,2 à 2,5 secondes par segment.
- **Passage à la ligne :** Si la phrase dépasse 26 caractères, insérer un saut de ligne (`\N`) pour conserver une forme de boîte compacte.

### Exemple de Chronologie Synchronisée (Audio 26s) :
```json
[
  { "text": "Regarde-moi cette pépite !", "start": 0.0, "end": 1.95 },
  { "text": "Le gel anti-cicatrices et vergetures", "start": 1.95, "end": 4.25 },
  { "text": "est enfin là !", "start": 4.25, "end": 5.50 },
  { "text": "Avec sa composition,", "start": 5.50, "end": 6.85 },
  { "text": "il fait des miracles sur ta peau !", "start": 6.85, "end": 9.10 },
  { "text": "Finies les vieilles marques,", "start": 9.10, "end": 10.75 },
  { "text": "retrouve un corps lisse,", "start": 10.75, "end": 12.30 },
  { "text": "doux et éclatant", "start": 12.30, "end": 13.35 },
  { "text": "en un rien de temps !", "start": 13.35, "end": 14.60 },
  { "text": "Le tube de 50 ml", "start": 14.60, "end": 16.35 },
  { "text": "est à seulement 8 500 francs CFA !", "start": 16.35, "end": 18.30 },
  { "text": "Ça change la vie !", "start": 18.30, "end": 19.50 },
  { "text": "Ne rate pas ça !", "start": 19.50, "end": 20.65 },
  { "text": "Commande sur boutique-vendezvouse.com", "start": 20.65, "end": 22.50 },
  { "text": "ou sur le numéro WhatsApp", "start": 22.50, "end": 24.15 },
  { "text": "pour une livraison rapide assurée !", "start": 24.15, "end": 26.24 }
]
```

---

## 4. Extraction Automatisée des Timestamps via Gemini

Pour synchroniser automatiquement le texte sur le fichier audio généré sans intervention manuelle :

```python
import base64
import json
import urllib.request

def extract_timed_subtitles(wav_path, api_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={api_key}"
    
    with open(wav_path, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    prompt = """Transcris cet audio en sous-titres séquentiels pour une vidéo TikTok/Reels.
Découpe en courtes phrases percutantes de 3 à 6 mots.
Fournis un tableau JSON strict avec start et end en secondes:
[{"text": "...", "start": 0.0, "end": 2.5}]
Ne renvoie que le JSON."""

    payload = {
        "contents": [{
            "parts": [
                {"inlineData": {"mimeType": "audio/wav", "data": audio_b64}},
                {"text": prompt}
            ]
        }]
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("\n", 1)[0].strip()
        return json.loads(text)
```
