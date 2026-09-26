# 🎙️ Ingénierie Vocale & Voix-Off Hyper-Humaines

Ce document détaille les secrets de conception pour générer des voix-off IA indiscernables de véritables acteurs de doublage, avec des intonations naturelles, du relief émotionnel et des accents culturels authentiques.

---

## 1. Le Modèle Gemini Native Audio TTS

Contrairement aux moteurs TTS conventionnels qui synthétisent syllabe par syllabe, le modèle **Gemini Native Audio TTS** (`gemini-3.1-flash-tts-preview`) est un grand modèle de langage multimodal qui comprend à la fois **ce qu'il dit et comment il doit le dire**.

### Points Clés Techniques :
- **Endpoint API :** `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent?key=VOTRE_CLE`
- **Modalité :** `"responseModalities": ["AUDIO"]`
- **Configuration Vocale :** `speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Sadachbia" } } }`
- **Format Sortie :** Le flux renvoyé est en PCM brut 16-bit signé little-endian, échantillonné à 24 000 Hz en mono.
- **Conversion Obligatoire :** Pour être lisible par FFmpeg, VLC et les navigateurs, un en-tête RIFF/WAV de 44 octets doit être ajouté au début du buffer binaire.

---

## 2. La Formule Directoriale (Audio Profile + Director's Notes)

Pour obtenir un accent authentique et une interprétation vivante, le prompt textuel envoyé au modèle doit être structuré comme un script de studio d'enregistrement :

### Structure Canonique :
```text
# AUDIO PROFILE: [Nom du personnage]
## [Sous-titre / Archétype]
Role: [Description du personnage, profession, énergie, personnalité]

### DIRECTOR'S NOTES
Style: [Émotions, intentions, vocal smile, chaleur, complicité]
Pacing: [Vitesse de diction : soutenu, rapide, mesuré, sans temps mort]
Accent: [Accent géographique précis, ex: Accent ivoirien d'Abidjan, accent parisien soigné, etc.]

TRANSCRIPT:
[Le texte exact à prononcer]
```

---

## 3. Profils Vocaux Prêts à l'Emploi

### Profil 1 : Vendeuse Chaleureuse d'Afrique de l'Ouest (Abidjan)
- **Voix Gemini :** `Sadachbia` (timbre vif et chaleureux)
- **Prompt Directeur :**
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

### Profil 2 : Entrepreneur Vendeur Masculin (Abidjan)
- **Voix Gemini :** `Fenrir` ou `Puck`
- **Prompt Directeur :**
```text
# AUDIO PROFILE: Kouamé
## "L'Entrepreneur Star d'Abidjan"
Role: Homme ivoirien dynamique, moderne, chaleureux et percutant.

### DIRECTOR'S NOTES
Style: Complice, direct, rassurant et énergique.
Pacing: Soutenu, percutant.
Accent: Accent ouest-africain francophone naturel et chaleureux.

TRANSCRIPT:
[Votre script]
```

### Profil 3 : Spécialiste Beauté & Soin Émotionnel (Intime)
- **Voix Gemini :** `Aoede` (breezy/doux)
- **Prompt Directeur :**
```text
# AUDIO PROFILE: Clara
## "La Spécialiste Soin de la Peau"
Role: Femme bienveillante, empathique et douce.

### DIRECTOR'S NOTES
Style: Voix douce, intime, chaleureuse, empathique.
Pacing: Posé, articulé, apaisant.
Accent: Français standard international épuré.

TRANSCRIPT:
[Votre script]
```

---

## 4. Tableau des Voix Disponibles sur Gemini TTS

| Nom Voix | Genre | Timbre & Style | Cas d'Usage Recommandé |
| :--- | :--- | :--- | :--- |
| **Sadachbia** | Féminin | *Lively* (très vivante, souriante) | UGC percutant, vente directe, Afrique de l'Ouest |
| **Aoede** | Féminin | *Breezy* (douce, aérienne) | Cosmétique intimiste, soins de la peau, luxe |
| **Laomedeia** | Féminin | *Upbeat* (enthousiaste, dynamique) | Témoignages clients, vlogs |
| **Kore** | Féminin | *Firm* (affirmée, professionnelle) | Annonces corporate, santé médicale |
| **Leda** | Féminin | *Youthful* (jeune, pétillante) | Mode, Gen Z, lifestyle |
| **Puck** | Masculin | *Upbeat* (dynamique, jovial) | Vente agressive, e-commerce, promotions |
| **Fenrir** | Masculin | *Excitable* (puissant, énergique) | Direct response masculin, fitness, urgence |
| **Charon** | Masculin | *Informative* (posé, explicatif) | Vidéos pédagogiques, explications d'actifs |

---

## 5. Construction de l'En-tête RIFF/WAV en Python

```python
import struct

def pcm_to_wav(pcm_bytes, sample_rate=24000, num_channels=1, bits_per_sample=16):
    byte_rate = sample_rate * num_channels * bits_per_sample // 8
    block_align = num_channels * bits_per_sample // 8
    data_size = len(pcm_bytes)
    
    header = struct.pack(
        '<4sI4s4sIHHIIHH4sI',
        b'RIFF',
        36 + data_size,
        b'WAVE',
        b'fmt ',
        16,
        1,  # Format PCM
        num_channels,
        sample_rate,
        byte_rate,
        block_align,
        bits_per_sample,
        b'data',
        data_size
    )
    return header + pcm_bytes
```
