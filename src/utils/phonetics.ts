/**
 * French to romanized phonetics converter
 * Converts French words to simple phonetic pronunciation (e.g., "livre" -> "lee-vruh")
 */

// Mapping of French phonetic patterns to romanized forms
const frenchPhoneticRules: [RegExp, string][] = [
  // Vowels and common patterns (more specific first)
  [/qu/gi, "k"],
  [/ç/gi, "s"],
  [/c(?=[ei])/gi, "s"],
  [/c(?=[aou])/gi, "k"],
  [/ch/gi, "sh"],
  [/j/gi, "zh"],
  [/g(?=[ei])/gi, "zh"],
  [/g(?=[aou])/gi, "g"],
  [/ph/gi, "f"],
  [/th/gi, "t"],
  [/gn/gi, "ny"],
  [/ll/gi, "l"],

  // Silent letters at end
  [/t$/gi, ""],
  [/d$/gi, ""],
  [/p$/gi, ""],
  [/s$/gi, ""],
  [/x$/gi, ""],
  [/z$/gi, "z"],

  // Final 'e' is usually silent
  [/e$/gi, "uh"],

  // Nasal vowels
  [/ain/gi, "an"],
  [/ain$/gi, "an"],
  [/ein/gi, "an"],
  [/in/gi, "an"],
  [/on/gi, "on"],
  [/un/gi, "un"],
  [/an/gi, "an"],
  [/en/gi, "on"],

  // Common vowel sounds
  [/au/gi, "o"],
  [/eau/gi, "o"],
  [/eu/gi, "uh"],
  [/oi/gi, "wa"],
  [/oo/gi, "oo"],
  [/ou/gi, "oo"],
];

/**
 * Convert a French word to romanized phonetics
 * @param word - French word
 * @returns Romanized phonetic representation
 */
export function generateFrenchPhonetics(word: string): string {
  if (!word || word.length === 0) return "";

  let phonetic = word.toLowerCase();

  // Apply phonetic rules
  for (const [pattern, replacement] of frenchPhoneticRules) {
    phonetic = phonetic.replace(pattern, replacement);
  }

  // Clean up
  phonetic = phonetic
    .replace(/[^a-z-]/g, "") // Remove non-alphabetic chars except hyphen
    .replace(/-{2,}/g, "-") // Remove double hyphens
    .replace(/^[-]+|[-]+$/g, ""); // Remove leading/trailing hyphens

  // Add hyphens for syllable breaks (very basic approximation)
  // Words with 5+ letters get a hyphen before final syllable
  if (phonetic.length > 4) {
    const lastVowelIndex = Math.max(
      phonetic.lastIndexOf("a"),
      phonetic.lastIndexOf("e"),
      phonetic.lastIndexOf("i"),
      phonetic.lastIndexOf("o"),
      phonetic.lastIndexOf("u")
    );

    if (lastVowelIndex > 2 && lastVowelIndex < phonetic.length - 2) {
      phonetic =
        phonetic.substring(0, lastVowelIndex) +
        "-" +
        phonetic.substring(lastVowelIndex);
    }
  }

  // Fallback to word if phonetic is empty
  return phonetic || word.toLowerCase();
}

/**
 * Map of common French words to their correct phonetics
 * Override auto-generated phonetics for irregular cases
 */
export const phoneticOverrides: Record<string, string> = {
  beau: "bo",
  beaux: "bo",
  deux: "duh",
  dieu: "dyuh",
  fille: "fee-yuh",
  fils: "fees",
  fleur: "flur",
  fleurs: "flurs",
  fois: "fwa",
  gâteau: "gah-to",
  homme: "om",
  hommes: "om",
  femme: "fahm",
  femmes: "fahm",
  enfant: "on-fon",
  enfants: "on-fon",
  oeuf: "oof",
  oeufs: "oof",
  genou: "zhuh-noo",
  genoux: "zhuh-noo",
  choix: "shwa",
  croix: "krwa",
  croyez: "krwa-yay",
  monsieur: "muh-syuh",
  messieurs: "mes-yuh",
  madame: "mah-dam",
  mademoiselle: "mad-mwah-zel",
  "aujourd'hui": "o-zhoor-dwee",
  hier: "ee-yay",
  avant: "ah-von",
  après: "ah-pray",
  pendant: "pon-don",
  vraiment: "vray-mon",
  doucement: "doos-mon",
  seulement: "sul-mon",
  presque: "presk",
  encore: "on-kor",
  déjà: "day-zhah",
  jamais: "zhah-may",
  quelquefois: "kel-kuh-fwa",
  toujours: "too-zhoor",
  souvent: "soo-von",
  quelque: "kel-kuh",
  quelques: "kel-kuh",
  plusieurs: "ploo-zyur",
  tous: "too",
  tout: "too",
  toutefois: "toot-fwa",
  nuit: "nwee",
  jour: "zhoor",
  ans: "on",
  an: "on",
  année: "ah-nay",
  semaine: "suh-men",
  mois: "mwa",
  heures: "ur",
  heure: "ur",
  minute: "mee-noot",
  minutes: "mee-noot",
  seconde: "suh-gond",
  secondes: "suh-gond",
  environ: "on-vee-ron",
  vers: "vair",
  autour: "o-toor",
  près: "pray",
  loin: "lwan",
  ici: "ee-see",
  là: "lah",
  face: "fahs",
  derrière: "duh-ree-yair",
  dessus: "duh-soo",
  dessous: "duh-soo",
  dehors: "duh-or",
  dedans: "duh-don",
  nord: "nor",
  sud: "sood",
  est: "est",
  ouest: "west",
  droit: "drwa",
  gauche: "gosh",
  coin: "kwan",
  côté: "ko-tay",
  milieu: "mee-lyuh",
  sommet: "so-may",
  base: "bahz",
  centre: "son-truh",
  fond: "fon",
  ciel: "see-yel",
  terre: "tair",
  eau: "o",
  air: "air",
  feu: "fuh",
  vapeur: "vah-pur",
  pierre: "pee-yair",
  sable: "sah-bluh",
  rocher: "ro-shay",
  montagne: "mon-tah-nyuh",
  vallée: "vah-lay",
  rivière: "ree-vee-yair",
  source: "soors",
  route: "root",
  chemin: "shuh-man",
  sentier: "son-tee-ay",
  passage: "pah-sahzh",
  porte: "port",
  fenêtre: "fuh-net-ruh",
  mur: "mur",
  plafond: "plah-fon",
  plancher: "plon-shay",
  escalier: "es-kah-lyay",
  marche: "marsh",
  main: "man",
  mains: "man",
  doigt: "dwa",
  pouce: "poos",
  pied: "pee-ay",
  pieds: "pee-ay",
  jambe: "zhom-buh",
  jambes: "zhom-buh",
  talon: "tah-lon",
  épaule: "ay-pohl",
  bras: "brah",
  coude: "kood",
  poignet: "pwa-nyay",
  tête: "tet",
  cheveu: "shuh-vuh",
  cheveux: "shuh-vuh",
  oreille: "o-ray",
  oeil: "oy",
  yeux: "yuh",
  nez: "nay",
  bouche: "boosh",
  dent: "don",
  dents: "don",
  langue: "long",
  gorge: "gorzh",
  poitrine: "pwa-tree-nuh",
  ventre: "von-truh",
  dos: "doh",
  côte: "kot",
  côtes: "kot",
  rein: "ran",
  reins: "ran",
  cœur: "kur",
  poumon: "poo-mon",
  estomac: "es-to-mahk",
  foie: "fwah",
  peau: "po",
  os: "os",
  sang: "son",
  nerf: "nair",
  muscle: "mus-kul",
  vein: "van",
};

/**
 * Get phonetics for a French word, using overrides when available
 */
export function getFrenchPhonetics(word: string): string {
  const lowerWord = word.toLowerCase();
  return phoneticOverrides[lowerWord] || generateFrenchPhonetics(word);
}
