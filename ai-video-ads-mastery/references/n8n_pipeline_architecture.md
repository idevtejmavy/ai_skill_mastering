# ⚡ Architecture du Pipeline Automatisé n8n

Ce document présente l'architecture logicielle complète du workflow n8n (`Pipeline Video Pub UGC - Storytelling & Voix Ultra-Humaine`, ID: `PDobYsb2pSBGoS5s`) permettant à n'importe quel e-commerçant ou créateur de générer des vidéos publicitaires en soumettant un simple formulaire.

---

## 1. Schéma Global du Flux de Données

```
[1. FormTrigger]
  │  Collecte : Brief produit, Mode (Focus/Varié), Durée (15s/30s), Voix, Couleurs & Polices
  ▼
[2. Gemini Copywriting Émotionnel]
  │  Modèle : gemini-flash-lite-latest
  │  Rôle : Rédaction d'un script Direct Response rythmé au mot près
  ▼
[2b. Extraction Médias] ──▶ [2c. Upload Médias VideoFactory]
  │  Envoi multipart des photos/vidéos au moteur de rendu local
  ▼
[3. Formatage & Guidage Vocal]
  │  Injection de l'Audio Profile et Director's Notes pour l'acteur virtuel
  ▼
[4. Synthèse Vocale Hyper-Humaine]
  │  Modèle : gemini-3.1-flash-tts-preview
  │  Génération native du flux PCM audio
  ▼
[5. En-tête Audio WAV]
  │  Préfixage binaire des 44 octets RIFF/WAV standard
  ▼
[6. Upload Audio VideoFactory]
  │  Obtention du voiceoverId
  ▼
[7. Montage & Assemblage UGC]
  │  - Découpage sous-titres séquentiels
  │  - Application des styles (Badge blanc, texte noir, police)
  │  - Positionnement du produit en avant-dernière scène
  │  - Assemblage de la spécification JSON
  ▼
[8. Video Factory (Rendu Final MP4)]
  │  Appel POST /render ➡️ MP4 prêt à diffuser
```

---

## 2. Configuration des Nœuds Clés

### Nœud 1 : Formulaire de Déclenchement (`n8n-nodes-base.formTrigger`)
Fournit une interface utilisateur claire avec les champs :
- **Mode de Génération :** `theme_varie` (Storytelling complet PAS) ou `focus_produit` (Plans sur le produit seul).
- **Durée Cible :** `15` secondes ou `30` secondes.
- **Style et Tonalité de la Voix :** `africaine_femme`, `africain_homme`, `europeenne_femme`, `europeen_homme`.
- **Options Typographiques :** Couleur de fond des sous-titres (`#FFFFFF`, `#000000`, etc.), Couleur du texte (`#000000`, `#FFFFFF`), Police (`Arial`, `Noto Sans`).
- **Offre & Prix :** Ex: `8 500 FCFA - Stock Limité`.
- **Fichiers Médias :** Upload multiple d'images ou vidéos.

### Nœud 3 & 4 : Profil Vocal & Synthèse
Injecte automatiquement les attributs de diction :
```javascript
if (voiceStyle.includes("femme") && voiceStyle.includes("africaine")) {
  voiceName = "Sadachbia";
  promptPrefix = `# AUDIO PROFILE: Aminata\n## Vendeuse Beauté Star d'Abidjan\nRole: Jeune femme ivoirienne très dynamique...\n### DIRECTOR'S NOTES\nStyle: Très vivante, complice, chaleureuse, vocal smile...\nTRANSCRIPT:\n`;
}
```

### Nœud 7 : Logique d'Assemblage & Avant-Dernière Scène
Garantit que le produit est mis en valeur au moment optimal :
```javascript
let orderedMedias = [...mediaUploads];
if (orderedMedias.length >= 3) {
  const penultimateIdx = orderedMedias.length - 2;
  const prod = orderedMedias.shift();
  orderedMedias.splice(penultimateIdx, 0, prod);
}
```
Et génère les sous-titres badge synchronisés :
```javascript
captions: {
  mode: "lines",
  style: subBg === "none" ? "classic" : "box",
  boxColor: subBg === "none" ? undefined : subBg,
  textColor: subText,
  fontName: subFont,
  lines: sentences
}
```
