// ============================================================
// FRENCH NOUN GENDER DATA
// ============================================================
// In French, every noun has a grammatical gender: masculine (m) or feminine (f).
// This is critical for learners since it affects articles (le/la, un/une),
// adjective agreements, and pronoun usage.
//
// Rules of thumb (but many exceptions):
// - Most nouns ending in -e are feminine
// - Most nouns ending in consonants are masculine
// - Exceptions abound! This data provides accurate genders.
// ============================================================

export type Gender = "m" | "f" | "m/f" | "pl";

// Comprehensive gender mapping for all vocabulary words
// Key: French word (lowercase), Value: gender
const genderMap: Record<string, Gender> = {
  // ========================
  // Things (A1-A2)
  // ========================
  "livre": "m",
  "stylo": "m",
  "cahier": "m",
  "table": "f",
  "chaise": "f",
  "porte": "f",
  "fenêtre": "f",
  "clé": "f",
  "sac": "m",
  "portefeuille": "m",
  "téléphone": "m",
  "ordinateur": "m",
  "écran": "m",
  "clavier": "m",
  "souris": "f",
  "chargeur": "m",
  "prise": "f",
  "lampe": "f",
  "ampoule": "f",
  "horloge": "f",
  "montre": "f",
  "lunettes": "pl", // always plural, feminine
  "vêtement": "m",
  "chaussures": "pl", // always plural, feminine
  "manteau": "m",
  "chemise": "f",
  "pantalon": "m",
  "pull": "m",
  "ceinture": "f",
  "chapeau": "m",
  "lit": "m",
  "oreiller": "m",
  "couverture": "f",
  "serviette": "f",
  "savon": "m",
  "miroir": "m",
  "brosse": "f",
  "peigne": "m",
  "dentifrice": "m",
  "brosse à dents": "f",
  "cuisine": "f",
  "réfrigérateur": "m",
  "four": "m",
  "micro-ondes": "m",
  "casserole": "f",
  "poêle": "f",
  "assiette": "f",
  "verre": "m",
  "tasse": "f",
  "couteau": "m",
  "fourchette": "f",
  "cuillère": "f",
  "bouteille": "f",
  "boîte": "f",
  "sac poubelle": "m",
  "poubelle": "f",
  "balai": "m",
  "aspirateur": "m",
  "clé usb": "f",
  "télécommande": "f",
  "papier": "m",
  "facture": "f",
  "stylo-bille": "m",
  "crayon": "m",
  "gomme": "f",
  "règle": "f",
  "sac à dos": "m",
  "parapluie": "m",
  "clé de voiture": "f",
  "voiture": "f",
  "vélo": "m",
  "casque": "m",
  "chargeur portable": "m",
  "écouteurs": "pl", // always plural, masculine
  "casque audio": "m",
  "appareil photo": "m",
  "photo": "f",
  "cadre": "m",
  "outil": "m",
  "marteau": "m",
  "tournevis": "m",
  "clé à molette": "f",
  "ampoule électrique": "f",
  "pile": "f",
  "papier toilette": "m",

  // ========================
  // Conversations / Phrases
  // ========================
  // (These are phrases, not nouns — gender N/A, but included for completeness)

  // ========================
  // Colours
  // ========================
  // Colors are adjectives, not nouns, so gender doesn't apply in the same way
  // But when used as nouns (e.g., "le rouge"), they're masculine

  // ========================
  // Food & Drinks
  // ========================
  "pain": "m",
  "beurre": "m",
  "fromage": "m",
  "lait": "m",
  "eau": "f",
  "café": "m",
  "thé": "m",
  "jus": "m",
  "vin": "m",
  "bière": "f",
  "pomme": "f",
  "banane": "f",
  "orange": "f",
  "fraise": "f",
  "raisin": "m",
  "tomate": "f",
  "salade": "f",
  "carotte": "f",
  "pomme de terre": "f",
  "oignon": "m",
  "ail": "m",
  "sel": "m",
  "poivre": "m",
  "sucre": "m",
  "huile": "f",
  "vinaigre": "m",
  "riz": "m",
  "pâtes": "pl", // always plural, feminine
  "soupe": "f",
  "poulet": "m",
  "boeuf": "m",
  "porc": "m",
  "poisson": "m",
  "oeuf": "m",
  "gâteau": "m",
  "chocolat": "m",
  "crème": "f",
  "confiture": "f",
  "miel": "m",
  "farine": "f",
  "petit-déjeuner": "m",
  "déjeuner": "m",
  "dîner": "m",
  "repas": "m",
  "restaurant": "m",
  "menu": "m",
  "addition": "f",
  "serveur": "m",
  "serveuse": "f",
  // "cuisine" already defined above in Things
  "recette": "f",
  "ingrédient": "m",
  "plat": "m",
  "entrée": "f",
  "dessert": "m",
  "boisson": "f",
  "glace": "f",
  "crêpe": "f",
  "croissant": "m",
  "baguette": "f",
  "sandwich": "m",
  "pizza": "f",
  "hamburger": "m",
  "frites": "pl", // always plural, feminine
  "légume": "m",
  "fruit": "m",
  "viande": "f",
  "nourriture": "f",

  // ========================
  // Animals
  // ========================
  "chien": "m",
  "chienne": "f",
  "chat": "m",
  "chatte": "f",
  "oiseau": "m",
  // "poisson" already defined in Food
  "cheval": "m",
  "vache": "f",
  "cochon": "m",
  "mouton": "m",
  "lapin": "m",
  // "souris" already defined above in Things
  "serpent": "m",
  "tortue": "f",
  "grenouille": "f",
  "papillon": "m",
  "abeille": "f",
  "araignée": "f",
  "fourmi": "f",
  "moustique": "m",
  "lion": "m",
  "tigre": "m",
  "éléphant": "m",
  "girafe": "f",
  "singe": "m",
  "ours": "m",
  "loup": "m",
  "renard": "m",
  "cerf": "m",
  "aigle": "m",
  "canard": "m",
  "coq": "m",
  "poule": "f",
  "poussin": "m",
  "âne": "m",
  "chèvre": "f",
  "taureau": "m",
  "agneau": "m",
  "hibou": "m",
  "perroquet": "m",

  // ========================
  // Travel
  // ========================
  "aéroport": "m",
  "avion": "m",
  "train": "m",
  "gare": "f",
  "bus": "m",
  "arrêt": "m",
  "taxi": "m",
  "métro": "m",
  "billet": "m",
  "passeport": "m",
  "valise": "f",
  "hôtel": "m",
  "chambre": "f",
  "réservation": "f",
  "voyage": "m",
  "vacances": "pl", // always plural, feminine
  "plage": "f",
  "montagne": "f",
  "mer": "f",
  "île": "f",
  "pays": "m",
  "ville": "f",
  "village": "m",
  "rue": "f",
  "pont": "m",
  "place": "f",
  "musée": "m",
  "église": "f",
  "château": "m",
  "jardin": "m",
  "parc": "m",
  "forêt": "f",
  "rivière": "f",
  "lac": "m",
  "carte": "f",
  "plan": "m",
  "direction": "f",
  "chemin": "m",
  "route": "f",
  "autoroute": "f",
  "parking": "m",
  "station": "f",
  "essence": "f",
  "frontière": "f",
  "douane": "f",
  "ambassade": "f",
  "consulat": "m",
  "office de tourisme": "m",
  "guide": "m",
  "excursion": "f",

  // ========================
  // Family
  // ========================
  "père": "m",
  "mère": "f",
  "fils": "m",
  "fille": "f",
  "frère": "m",
  "soeur": "f",
  "sœur": "f",
  "grand-père": "m",
  "grand-mère": "f",
  "oncle": "m",
  "tante": "f",
  "cousin": "m",
  "cousine": "f",
  "neveu": "m",
  "nièce": "f",
  "mari": "m",
  "femme": "f",
  "époux": "m",
  "épouse": "f",
  "enfant": "m/f",
  "bébé": "m",
  "famille": "f",
  "parent": "m",
  "parents": "pl",
  "grand-parents": "pl",
  "petit-fils": "m",
  "petite-fille": "f",
  "beau-père": "m",
  "belle-mère": "f",
  "beau-frère": "m",
  "belle-soeur": "f",
  "belle-sœur": "f",
  "ami": "m",
  "amie": "f",
  "copain": "m",
  "copine": "f",
  "voisin": "m",
  "voisine": "f",
  "collègue": "m/f",

  // ========================
  // Clothing
  // ========================
  "robe": "f",
  "jupe": "f",
  // "pantalon" already defined above in Things
  "jean": "m",
  "short": "m",
  "t-shirt": "m",
  "polo": "m",
  "veste": "f",
  "blouson": "m",
  "imperméable": "m",
  "écharpe": "f",
  "gants": "pl", // plural, masculine
  "bonnet": "m",
  "chaussette": "f",
  "chaussettes": "pl", // plural, feminine
  "slip": "m",
  "caleçon": "m",
  "soutien-gorge": "m",
  "pyjama": "m",
  "costume": "m",
  "cravate": "f",
  "noeud papillon": "m",
  "uniforme": "m",
  "maillot de bain": "m",
  "sandale": "f",
  "botte": "f",
  "basket": "f",
  "talon": "m",

  // ========================
  // Body parts
  // ========================
  "tête": "f",
  "visage": "m",
  "oeil": "m",
  "yeux": "pl",
  "nez": "m",
  "bouche": "f",
  "oreille": "f",
  "dent": "f",
  "cheveux": "pl",
  "bras": "m",
  "main": "f",
  "doigt": "m",
  "jambe": "f",
  "pied": "m",
  "genou": "m",
  "dos": "m",
  "ventre": "m",
  "coeur": "m",
  "cœur": "m",
  "corps": "m",

  // ========================
  // Numbers & Time
  // ========================
  "jour": "m",
  "nuit": "f",
  "matin": "m",
  "après-midi": "m",
  "soir": "m",
  "semaine": "f",
  "mois": "m",
  "année": "f",
  "an": "m",
  "heure": "f",
  "minute": "f",
  "seconde": "f",
  "temps": "m",
  "moment": "m",
  "date": "f",

  // ========================
  // Common nouns
  // ========================
  "maison": "f",
  "appartement": "m",
  "immeuble": "m",
  "bureau": "m",
  "école": "f",
  "université": "f",
  "hôpital": "m",
  "pharmacie": "f",
  "banque": "f",
  "poste": "f",
  "magasin": "m",
  "supermarché": "m",
  "marché": "m",
  "boulangerie": "f",
  "bibliothèque": "f",
  "cinéma": "m",
  "théâtre": "m",
  "stade": "m",
  "piscine": "f",
  "problème": "m",
  "question": "f",
  "réponse": "f",
  "idée": "f",
  "chose": "f",
  "travail": "m",
  "emploi": "m",
  "métier": "m",
  "nom": "m",
  "prénom": "m",
  "adresse": "f",
  "numéro": "m",
  "lettre": "f",
  "mot": "m",
  "phrase": "f",
  "histoire": "f",
  "film": "m",
  "musique": "f",
  "chanson": "f",
  "jeu": "m",
  "sport": "m",
  "couleur": "f",
  "forme": "f",
  "taille": "f",
  "prix": "m",
  "argent": "m",
  "monnaie": "f",
};

/**
 * Get the grammatical gender of a French word.
 * Returns null if the word is not a noun or gender is unknown.
 */
export function getGender(frenchWord: string): Gender | null {
  const key = frenchWord.toLowerCase().trim();
  return genderMap[key] || null;
}

/**
 * Get the appropriate article for a French noun.
 */
export function getArticle(frenchWord: string, type: "definite" | "indefinite" = "definite"): string {
  const gender = getGender(frenchWord);
  if (!gender) return "";

  // Check if word starts with a vowel or silent h (for elision)
  const startsWithVowel = /^[aeiouhâäàéèêëïîôùûüœæ]/i.test(frenchWord);

  if (type === "definite") {
    switch (gender) {
      case "m": return startsWithVowel ? "l'" : "le";
      case "f": return startsWithVowel ? "l'" : "la";
      case "m/f": return startsWithVowel ? "l'" : "le/la";
      case "pl": return "les";
    }
  } else {
    switch (gender) {
      case "m": return "un";
      case "f": return "une";
      case "m/f": return "un/une";
      case "pl": return "des";
    }
  }
}

/**
 * Get a display-friendly gender label.
 */
export function getGenderLabel(frenchWord: string): string | null {
  const gender = getGender(frenchWord);
  if (!gender) return null;

  switch (gender) {
    case "m": return "masc.";
    case "f": return "fém.";
    case "m/f": return "m./f.";
    case "pl": return "pl.";
  }
}

/**
 * Get gender color class for styling.
 */
export function getGenderColor(frenchWord: string): { bg: string; text: string; border: string } {
  const gender = getGender(frenchWord);

  switch (gender) {
    case "m":
      return {
        bg: "bg-blue-100 dark:bg-blue-900/40",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
      };
    case "f":
      return {
        bg: "bg-pink-100 dark:bg-pink-900/40",
        text: "text-pink-700 dark:text-pink-300",
        border: "border-pink-200 dark:border-pink-800",
      };
    case "m/f":
      return {
        bg: "bg-purple-100 dark:bg-purple-900/40",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200 dark:border-purple-800",
      };
    case "pl":
      return {
        bg: "bg-amber-100 dark:bg-amber-900/40",
        text: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
      };
    default:
      return {
        bg: "bg-slate-100 dark:bg-slate-800",
        text: "text-slate-500 dark:text-slate-400",
        border: "border-slate-200 dark:border-slate-700",
      };
  }
}

/**
 * Add gender to a word object if applicable.
 * Used to enrich vocabulary data.
 */
export function enrichWithGender(word: { french: string; isVerb?: boolean }) {
  if (word.isVerb) return null; // Verbs don't have gender
  return getGender(word.french);
}
