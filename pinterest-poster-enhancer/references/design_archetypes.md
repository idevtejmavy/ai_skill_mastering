# 📐 Pinterest Design Archetypes — Décodage des Styles Tendance

Lorsque Pinterest affiche une création virale à fort taux d'enregistrement, elle appartient généralement à l'un de ces 5 archétypes majeurs :

---

### 🏛️ Archétype 1 : La Typographie Monumentale en Filigrane (*Big Bold Watermark*)

* **Effet :** Le nom de la marque ou du produit est répété en arrière-plan en lettres capitales colossales (`font-size: 160px à 240px; font-weight: 900; line-height: 0.85`), avec une opacité très faible (`opacity: 0.04 à 0.08`).
* **Pourquoi ça marche :** Crée un ancrage architectural immédiat et donne l'impression que le produit sort physiquement de l'écran en 3D.
* **Mise en œuvre CSS :**
  ```css
  .watermark {
    font-family: 'Anton', 'Space Grotesk', sans-serif;
    font-size: 210px;
    opacity: 0.055;
    color: #FFFFFF;
    line-height: 0.85;
    letter-spacing: -2px;
  }
  ```

---

### 🔬 Archétype 2 : Le Studio Minimaliste & Callouts Techniques (*Industrial Clean*)

* **Effet :** Fond neutre raffiné (gris titane, béton ciré ou noir ardoise). Les caractéristiques techniques ne sont pas de simples listes de texte mais des vignettes avec de fines lignes de pointage directes vers les composants du produit.
* **Pourquoi ça marche :** Donne une impression de précision chirurgicale, d'authenticité et de haute ingénierie (style Apple M3, Nothing, Sony).
* **Mise en œuvre CSS :**
  ```css
  .spec-capsule {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 8px 14px;
  }
  ```

---

### ⚡ Archétype 3 : Le Contraste Bicolore & Accents Néon (*Dual-Tone Accent*)

* **Effet :** Pour les affiches multi-produits (ex: DUO), chaque produit se voit attribuer un accent couleur exclusif (ex: Cyan néon `#38BDF8` pour le premier, Rouge Crimson `#E11D48` ou Or `#F59E0B` pour le second).
* **Pourquoi ça marche :** L'œil compare immédiatement les deux offres sans confusion. Chaque produit a sa propre identité visuelle tout en restant dans la même famille graphique.

---

### 🪞 Archétype 4 : La Physique d'Ombre et Reflet Miroir (*Photoreal Grounding*)

* **Effet :** Deux couches physiques indispensables sous chaque produit détouré :
  1. **L'ombre d'occlusion au sol (*contact shadow*) :** Un disque noir très aplati et flouté au point de contact exact.
  2. **Le reflet miroir inversé (*mirror reflection*) :** L'image du produit retournée à 180° verticalement, avec une opacité de 15% à 20% et un dégradé de masque `mask-image: linear-gradient(to top, black, transparent)`.
* **Pourquoi ça marche :** C'est ce qui transforme un simple collage PNG amateur en un véritable rendu de photographe studio publicitaire.

---

### 📲 Archétype 5 : La Bannière d'Action Flottante (*Floating Action Dock*)

* **Effet :** Le bouton WhatsApp ou le CTA n'est pas un simple lien texte perdu en bas. C'est une véritable "capsule" ou "dock" tactile avec logo SVG officiel, numéro en grand format `Space Grotesk`, et flèche d'incitation.
* **Pourquoi ça marche :** Augmente le taux de conversion sur mobile de 35% à 60% car le pouce du mobinaute est attiré magnétiquement vers l'élément de contact.
