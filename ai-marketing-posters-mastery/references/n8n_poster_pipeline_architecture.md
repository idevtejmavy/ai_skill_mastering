# ⚡ Architecture du Pipeline n8n : Générateur d'Affiches Publicitaires E-Commerce

Ce document détaille l'architecture et le fonctionnement du workflow n8n dédié à la création automatisée d'affiches publicitaires haute conversion pour **Vendez-Vous eShop (VVS)** et toute marque e-commerce.

---

## 1. Schéma Global du Flux de Données

```
[1. Formulaire n8n (FormTrigger)]
  │  Champs : Nom produit, Catégorie, Prix (FCFA), Modèle (Homme/Femme/Studio),
  │           WhatsApp, Rassurance (24h, COD), Photo produit
  ▼
[2. Nœud LLM : Google Gemini Copywriting & Prompting]
  │  - Rédige l'accroche choc en français (ex: "POUSSE RAPIDE & ANTI-CHUTE")
  │  - Génère le texte de vente Facebook Ads complet (Hook + Pain + Solution + CTA)
  │  - Rédige le prompt Imagen 3 ultra-détaillé en anglais
  ▼
[3. Nœud HTTP : Génération d'Image IA (Imagen 3 / Gemini)]
  │  Appel API Google AI (modèle imagen-3.0-generate-002)
  │  Réception du fond photoréaliste en Base64
  ▼
[4. Nœud Code : Formatage & Préparation des Paramètres]
  │  Harmonisation des chemins (Image fond, Logo VVS, Dimensions)
  ▼
[5. Nœud Execute Command : Moteur Playwright Vectoriel]
  │  Appel du script composite_poster.js
  │  Incrustation du logo VVS, des titres, du macaron prix et de la barre WhatsApp
  ▼
[6. Nœud Read Binary File : Chargement de l'Affiche Finale]
  │  Lecture du fichier PNG 1080x1440 ou 1080x1080
  ▼
[7. Nœud Respond to Webhook : Rendu & Copie]
  │  Affichage d'un tableau de bord de résultat avec :
  │  - Image haute résolution téléchargeable
  │  - Texte publicitaire Facebook à copier-coller en 1 clic
```

---

## 2. Détail des Nœuds du Workflow

### Nœud 1 : Formulaire Déclencheur (`n8n-nodes-base.formTrigger`)
Fournit une interface web intuitive avec les champs suivants :
* **`product_name`** (Texte, requis) : Nom commercial du produit.
* **`product_price`** (Texte, requis) : Ex: `8 500 FCFA`.
* **`audience_type`** (Choix multiple) :
  - `Homme Africain Barbe Soignée`
  - `Femme Africaine Volume Afro`
  - `Packshot Studio Épuré (Sans modèle)`
* **`ratio_format`** (Choix multiple) :
  - `Portrait Facebook Mobile 3:4 (1080x1440)`
  - `Carré Feed 1:1 (1080x1080)`
  - `Vertical Story/Reels 9:16 (1080x1920)`
* **`whatsapp_number`** (Texte) : Ex: `+225 05 04 59 45 20`.
* **`reassurance_delivery`** (Texte) : Ex: `🚚 Livraison 24h Abidjan`.
* **`reassurance_payment`** (Texte) : Ex: `💵 Paiement à la livraison`.
* **`product_image`** (Upload de fichier binaire) : Photo de la bouteille ou boîte.

### Nœud 2 : Prompt & Copywriting (`Google Gemini / LLM Chain`)
Utilise `gemini-1.5-flash` ou `gemini-2.5-flash` avec une instruction de type directeur artistique :
* **Mission 1** : Rédiger un titre d'affiche de 3 à 5 mots percutants en français.
* **Mission 2** : Rédiger une Ad Copy Facebook complète prête à l'emploi.
* **Mission 3** : Rédiger le prompt pour Imagen 3 en anglais pour un rendu maximal.

### Nœud 3 : Appel Imagen 3 (`n8n-nodes-base.httpRequest`)
* **Endpoint** : `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={{$env.GEMINI_API_KEY}}`
* **Méthode** : POST
* **Payload JSON** :
  ```json
  {
    "instances": [{ "prompt": "{{ $json.imagenPrompt }}" }],
    "parameters": {
      "sampleCount": 1,
      "aspectRatio": "{{ $json.aspectRatio }}"
    }
  }
  ```

### Nœud 5 : Assemblage Playwright (`n8n-nodes-base.executeCommand`)
Exécute le script Node.js qui assemble le fond avec la typographie vectorielle :
```bash
node E:/Antigrativty/antigravity_skill/ai-marketing-posters-mastery/scripts/composite_poster.js --bg "{{ $json.tempBgPath }}" --logo "E:/Documents/PRJ_VENDEZVOUSESHOP/LOGO/vesion_carree v2.jpg" --brand "VENDEZ-VOUS eSHOP" --title "{{ $json.headline }}" --subtitle "{{ $json.subtitle }}" --price "{{ $json.price }}" --whatsapp "{{ $json.whatsapp }}" --output "{{ $json.finalOutputPath }}" --width {{ $json.width }} --height {{ $json.height }}
```

---

## 3. Comment Importer ce Workflow dans n8n

1. Dans votre interface n8n, cliquez sur le menu **Workflows** puis **Import from File**.
2. Sélectionnez le fichier `workflow_n8n_affiche_ecommerce.json`.
3. Configurez votre variable d'environnement ou credential pour la clé API Gemini (`GEMINI_API_KEY`).
4. Activez le workflow (`Active = ON`).
5. Ouvrez le lien du formulaire généré par le **Form Trigger** pour créer votre première affiche en 60 secondes !
