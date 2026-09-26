#!/usr/bin/env python3
"""
Générateur de voix-off IA hyper-humaine avec profil directorial et conversion RIFF/WAV.
Supporte Gemini TTS (gemini-3.1-flash-tts-preview / gemini-2.5-flash-preview-tts).
"""

import sys
import os
import json
import base64
import struct
import urllib.request
import urllib.error

API_KEY = os.environ.get("GEMINI_API_KEY", "")

PROFILES = {
    "africaine_femme": {
        "voice": "Sadachbia",
        "header": """# AUDIO PROFILE: Awa
## "La Vendeuse Chaleureuse d'Abidjan"
Role: Jeune femme ivoirienne ultra dynamique, chaleureuse, souriante, persuasive et pleine d'énergie positive.

### DIRECTOR'S NOTES
Style: Très vivante, complice, enjouée et convaincante, avec le sourire dans la voix ("vocal smile"). Rythme UGC percutant, enthousiaste et naturel.
Pacing: Rapide, soutenu et très bien rythmé, sans hésitation ni temps mort.
Accent: Accent ivoirien d'Abidjan authentique, musicalité chaleureuse d'Afrique de l'Ouest francophone.

TRANSCRIPT:
"""
    },
    "africain_homme": {
        "voice": "Fenrir",
        "header": """# AUDIO PROFILE: Kouamé
## "L'Entrepreneur Star d'Abidjan"
Role: Homme ivoirien dynamique, moderne, chaleureux et percutant.

### DIRECTOR'S NOTES
Style: Complice, direct, rassurant et énergique.
Pacing: Soutenu, percutant.
Accent: Accent ouest-africain francophone naturel et chaleureux.

TRANSCRIPT:
"""
    },
    "europeenne_femme": {
        "voice": "Aoede",
        "header": """# AUDIO PROFILE: Sophie
## "L'Experte Beauté & Cosmétique"
Role: Femme douce, intime, empathique et rassurante.

### DIRECTOR'S NOTES
Style: Voix douce, intime, chaleureuse, empathique.
Pacing: Posé, soigné, élégant.
Accent: Français international standard épuré.

TRANSCRIPT:
"""
    }
}

def pcm_to_wav(pcm_data, sample_rate=24000, num_channels=1, bits_per_sample=16):
    byte_rate = sample_rate * num_channels * bits_per_sample // 8
    block_align = num_channels * bits_per_sample // 8
    data_size = len(pcm_data)
    
    header = struct.pack(
        '<4sI4s4sIHHIIHH4sI',
        b'RIFF',
        36 + data_size,
        b'WAVE',
        b'fmt ',
        16,
        1,
        num_channels,
        sample_rate,
        byte_rate,
        block_align,
        bits_per_sample,
        b'data',
        data_size
    )
    return header + pcm_data

def generate_voice(text, profile_key="africaine_femme", output_path="voice.wav"):
    profile = PROFILES.get(profile_key, PROFILES["africaine_femme"])
    full_prompt = profile["header"] + text.strip()
    voice_name = profile["voice"]
    
    models = ["gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts"]
    
    for model in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={API_KEY}"
        payload = {
            "contents": [{"parts": [{"text": full_prompt}]}],
            "generationConfig": {
                "responseModalities": ["AUDIO"],
                "speechConfig": {
                    "voiceConfig": {
                        "prebuiltVoiceConfig": {
                            "voiceName": voice_name
                        }
                    }
                }
            }
        }
        
        req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=40) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                raw = base64.b64decode(data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
                wav = pcm_to_wav(raw)
                with open(output_path, "wb") as f:
                    f.write(wav)
                print(f"[OK] Voix générée avec succès ({len(wav)} octets) via {model} -> {output_path}")
                return output_path
        except Exception as e:
            print(f"[WARN] Modèle {model} échoué: {e}, tentative suivante...")
            
    print("[ERROR] Échec de la génération sur tous les modèles.")
    return None

if __name__ == "__main__":
    sample_text = (
        "Regarde-moi cette pépite ! Le gel anti-cicatrices et vergetures est enfin là ! "
        "Avec sa composition, il fait des miracles sur ta peau. Finies les vieilles marques, "
        "retrouve un corps lisse, doux et éclatant en un rien de temps. Le tube de 50ml est à seulement "
        "8 500 FCFA, ça change la vie ! Ne rate pas ça, commande sur boutique-vendezvouse.com !"
    )
    profile = sys.argv[1] if len(sys.argv) > 1 else "africaine_femme"
    out = sys.argv[2] if len(sys.argv) > 2 else "output_voice.wav"
    generate_voice(sample_text, profile, out)
