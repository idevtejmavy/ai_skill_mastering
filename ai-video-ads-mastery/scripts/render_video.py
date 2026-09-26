#!/usr/bin/env python3
"""
Script d'appel direct à l'API Video-Factory locale pour rendre une vidéo publicitaire complète.
Prend en charge le format, la marque, les scènes, la voix-off, les sous-titres badge et l'EndCard.
"""

import sys
import os
import json
import urllib.request

FACTORY_URL = os.environ.get("VIDEO_FACTORY_URL", "http://127.0.0.1:8790")

def render(spec_file_or_dict):
    if isinstance(spec_file_or_dict, str):
        with open(spec_file_or_dict, "r", encoding="utf-8") as f:
            spec = json.load(f)
    else:
        spec = spec_file_or_dict
        
    url = f"{FACTORY_URL}/render"
    req = urllib.request.Request(
        url,
        data=json.dumps(spec).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    print(f"[*] Envoi de la commande de rendu à {url}...")
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print("[OK] Rendu terminé avec succès !")
            print(json.dumps(data, indent=2))
            return data
    except urllib.error.HTTPError as e:
        print(f"[ERROR] HTTP {e.code}: {e.read().decode('utf-8', errors='ignore')}")
    except Exception as e:
        print(f"[ERROR] {e}")
    return None

if __name__ == "__main__":
    if len(sys.argv) > 1:
        render(sys.argv[1])
    else:
        print("Usage: python render_video.py <spec.json>")
