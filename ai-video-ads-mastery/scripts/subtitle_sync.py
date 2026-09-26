#!/usr/bin/env python3
"""
Générateur de sous-titres séquentiels synchronisés à partir d'un audio WAV.
Découpe en courtes phrases (style badge TikTok/Reels) et génère le JSON avec timestamps.
"""

import sys
import os
import json
import base64
import urllib.request

API_KEY = os.environ.get("GEMINI_API_KEY", "")

def sync_subtitles(wav_path, output_json="subtitles.json"):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key={API_KEY}"
    
    with open(wav_path, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")
        
    prompt = """Transcris très précisément cet enregistrement audio en sous-titres séquentiels pour une vidéo courte (TikTok / Reels).
RÈGLES IMPORTANTES :
1. Découpe chaque phrase en blocs courts et percutants de 3 à 6 mots maximum.
2. Attribue le timestamp de début ('start') et de fin ('end') en secondes (ex: 0.0, 1.95) pour chaque bloc.
3. Le résultat DOIT être un tableau JSON strict sans aucun texte introductif ni format markdown:
[
  {"text": "...", "start": 0.0, "end": 1.95},
  ...
]"""

    payload = {
        "contents": [{
            "parts": [
                {"inlineData": {"mimeType": "audio/wav", "data": audio_b64}},
                {"text": prompt}
            ]
        }]
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            if raw_text.startswith("```"):
                raw_text = raw_text.split("\n", 1)[1].rsplit("\n", 1)[0].strip()
            parsed = json.loads(raw_text)
            with open(output_json, "w", encoding="utf-8") as f:
                json.dump(parsed, f, ensure_ascii=False, indent=2)
            print(f"[OK] Sous-titres extraits avec succès ({len(parsed)} lignes) -> {output_json}")
            return parsed
    except Exception as e:
        print(f"[ERROR] Échec de l'alignement des sous-titres: {e}")
        return None

if __name__ == "__main__":
    wav = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\tchim\Downloads\voix_africaine_officielle_exacte.wav"
    out = sys.argv[2] if len(sys.argv) > 2 else "subtitles_timed.json"
    sync_subtitles(wav, out)
