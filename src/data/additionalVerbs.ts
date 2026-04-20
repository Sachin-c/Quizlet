import type { TenseModule, VerbTenseEntry } from "../types";

export const presentVerbs: VerbTenseEntry[] = [
  {
    id: "pres-1",
    infinitive: "être",
    english: "to be",
    tense: "présent",
    cefr: "A1",
    conjugations: [
      { pronoun: "je", form: "suis", phonetics: "swee" },
      { pronoun: "tu", form: "es", phonetics: "eh" },
      { pronoun: "il/elle", form: "est", phonetics: "eh" },
      { pronoun: "nous", form: "sommes", phonetics: "som" },
      { pronoun: "vous", form: "êtes", phonetics: "et" },
      { pronoun: "ils/elles", form: "sont", phonetics: "son" },
    ],
    examples: [
      { french: "Je suis heureux.", english: "I am happy." },
      { french: "Vous êtes en retard.", english: "You are late." },
      { french: "Ils sont très grands.", english: "They are very tall." }
    ],
    rule: "Irregular verb. Essential for describing states and identities."
  },
  {
    id: "pres-2",
    infinitive: "avoir",
    english: "to have",
    tense: "présent",
    cefr: "A1",
    conjugations: [
      { pronoun: "j'", form: "ai", phonetics: "ay" },
      { pronoun: "tu", form: "as", phonetics: "ah" },
      { pronoun: "il/elle", form: "a", phonetics: "ah" },
      { pronoun: "nous", form: "avons", phonetics: "ah-von" },
      { pronoun: "vous", form: "avez", phonetics: "ah-vay" },
      { pronoun: "ils/elles", form: "ont", phonetics: "on" },
    ],
    examples: [
      { french: "J'ai un chien.", english: "I have a dog." },
      { french: "Quel âge as-tu ?", english: "How old are you?" },
      { french: "Nous avons faim.", english: "We are hungry." }
    ],
    rule: "Irregular verb. Used for possession and age."
  },
  {
    id: "pres-3",
    infinitive: "aller",
    english: "to go",
    tense: "présent",
    cefr: "A1",
    conjugations: [
      { pronoun: "je", form: "vais", phonetics: "veh" },
      { pronoun: "tu", form: "vas", phonetics: "vah" },
      { pronoun: "il/elle", form: "va", phonetics: "vah" },
      { pronoun: "nous", form: "allons", phonetics: "ah-lon" },
      { pronoun: "vous", form: "allez", phonetics: "ah-lay" },
      { pronoun: "ils/elles", form: "vont", phonetics: "von" },
    ],
    examples: [
      { french: "Je vais au supermarché.", english: "I am going to the supermarket." },
      { french: "Comment vous allez ?", english: "How are you doing?" }
    ],
    rule: "Irregular verb. Used for movement and futur proche."
  },
  {
    id: "pres-4",
    infinitive: "faire",
    english: "to do/make",
    tense: "présent",
    cefr: "A1",
    conjugations: [
      { pronoun: "je", form: "fais", phonetics: "feh" },
      { pronoun: "tu", form: "fais", phonetics: "feh" },
      { pronoun: "il/elle", form: "fait", phonetics: "feh" },
      { pronoun: "nous", form: "faisons", phonetics: "fuh-zon" },
      { pronoun: "vous", form: "faites", phonetics: "fet" },
      { pronoun: "ils/elles", form: "font", phonetics: "fon" },
    ],
    examples: [
      { french: "Je fais mes devoirs.", english: "I am doing my homework." },
      { french: "Il fait beau aujourd'hui.", english: "The weather is nice today." }
    ],
    rule: "Irregular verb. Used in many expressions (weather, sports, tasks)."
  },
  {
    id: "pres-5",
    infinitive: "parler",
    english: "to speak",
    tense: "présent",
    cefr: "A1",
    conjugations: [
      { pronoun: "je", form: "parle", phonetics: "parl" },
      { pronoun: "tu", form: "parles", phonetics: "parl" },
      { pronoun: "il/elle", form: "parle", phonetics: "parl" },
      { pronoun: "nous", form: "parlons", phonetics: "par-lon" },
      { pronoun: "vous", form: "parlez", phonetics: "par-lay" },
      { pronoun: "ils/elles", form: "parlent", phonetics: "parl" },
    ],
    examples: [
      { french: "Je parle français.", english: "I speak French." },
      { french: "Elles parlent beaucoup.", english: "They speak a lot." }
    ],
    rule: "Regular -er verb. Endings: -e, -es, -e, -ons, -ez, -ent."
  },
  {
    id: "pres-6",
    infinitive: "finir",
    english: "to finish",
    tense: "présent",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "finis", phonetics: "fee-nee" },
      { pronoun: "tu", form: "finis", phonetics: "fee-nee" },
      { pronoun: "il/elle", form: "finit", phonetics: "fee-nee" },
      { pronoun: "nous", form: "finissons", phonetics: "fee-nee-son" },
      { pronoun: "vous", form: "finissez", phonetics: "fee-nee-say" },
      { pronoun: "ils/elles", form: "finissent", phonetics: "fee-nees" },
    ],
    examples: [
      { french: "Je finis le travail à 18h.", english: "I finish work at 6 PM." }
    ],
    rule: "Regular -ir verb. Endings: -is, -is, -it, -issons, -issez, -issent."
  },
  {
    id: "pres-7",
    infinitive: "vendre",
    english: "to sell",
    tense: "présent",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "vends", phonetics: "van" },
      { pronoun: "tu", form: "vends", phonetics: "van" },
      { pronoun: "il/elle", form: "vend", phonetics: "van" },
      { pronoun: "nous", form: "vendons", phonetics: "van-don" },
      { pronoun: "vous", form: "vendez", phonetics: "van-day" },
      { pronoun: "ils/elles", form: "vendent", phonetics: "vand" },
    ],
    examples: [
      { french: "Ils vendent leur maison.", english: "They are selling their house." }
    ],
    rule: "Regular -re verb. Endings: -s, -s, -, -ons, -ez, -ent."
  }
];

export const passeComposeAvoirExtra: VerbTenseEntry[] = [
  {
    id: "pc-avoir-7",
    infinitive: "pouvoir",
    english: "to be able to",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai pu", phonetics: "ay poo" },
      { pronoun: "tu", form: "as pu", phonetics: "ah poo" },
      { pronoun: "il/elle", form: "a pu", phonetics: "ah poo" },
      { pronoun: "nous", form: "avons pu", phonetics: "ah-von poo" },
      { pronoun: "vous", form: "avez pu", phonetics: "ah-vay poo" },
      { pronoun: "ils/elles", form: "ont pu", phonetics: "on poo" },
    ],
    examples: [
      { french: "J'ai pu venir à la fête.", english: "I was able to come to the party." }
    ],
    rule: "Irregular past participle: pu."
  },
  {
    id: "pc-avoir-8",
    infinitive: "vouloir",
    english: "to want",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai voulu", phonetics: "ay voo-loo" },
      { pronoun: "tu", form: "as voulu", phonetics: "ah voo-loo" },
      { pronoun: "il/elle", form: "a voulu", phonetics: "ah voo-loo" },
      { pronoun: "nous", form: "avons voulu", phonetics: "ah-von voo-loo" },
      { pronoun: "vous", form: "avez voulu", phonetics: "ah-vay voo-loo" },
      { pronoun: "ils/elles", form: "ont voulu", phonetics: "on voo-loo" },
    ],
    examples: [
      { french: "Elle a voulu rester.", english: "She wanted to stay." }
    ],
    rule: "Irregular past participle: voulu."
  },
  {
    id: "pc-avoir-9",
    infinitive: "savoir",
    english: "to know (fact)",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai su", phonetics: "ay soo" },
      { pronoun: "tu", form: "as su", phonetics: "ah soo" },
      { pronoun: "il/elle", form: "a su", phonetics: "ah soo" },
      { pronoun: "nous", form: "avons su", phonetics: "ah-von soo" },
      { pronoun: "vous", form: "avez su", phonetics: "ah-vay soo" },
      { pronoun: "ils/elles", form: "ont su", phonetics: "on soo" },
    ],
    examples: [
      { french: "J'ai su la vérité.", english: "I learned the truth." }
    ],
    rule: "Irregular past participle: su. Means 'found out / learned' in the past."
  },
  {
    id: "pc-avoir-10",
    infinitive: "devoir",
    english: "to have to / must",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai dû", phonetics: "ay doo" },
      { pronoun: "tu", form: "as dû", phonetics: "ah doo" },
      { pronoun: "il/elle", form: "a dû", phonetics: "ah doo" },
      { pronoun: "nous", form: "avons dû", phonetics: "ah-von doo" },
      { pronoun: "vous", form: "avez dû", phonetics: "ah-vay doo" },
      { pronoun: "ils/elles", form: "ont dû", phonetics: "on doo" },
    ],
    examples: [
      { french: "Nous avons dû partir.", english: "We had to leave." }
    ],
    rule: "Irregular past participle: dû."
  },
  {
    id: "pc-avoir-11",
    infinitive: "lire",
    english: "to read",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai lu", phonetics: "ay loo" },
      { pronoun: "tu", form: "as lu", phonetics: "ah loo" },
      { pronoun: "il/elle", form: "a lu", phonetics: "ah loo" },
      { pronoun: "nous", form: "avons lu", phonetics: "ah-von loo" },
      { pronoun: "vous", form: "avez lu", phonetics: "ah-vay loo" },
      { pronoun: "ils/elles", form: "ont lu", phonetics: "on loo" },
    ],
    examples: [
      { french: "Tu as lu ce livre ?", english: "Did you read this book?" }
    ],
    rule: "Irregular past participle: lu."
  },
  {
    id: "pc-avoir-12",
    infinitive: "écrire",
    english: "to write",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai écrit", phonetics: "ay eh-kree" },
      { pronoun: "tu", form: "as écrit", phonetics: "ah eh-kree" },
      { pronoun: "il/elle", form: "a écrit", phonetics: "ah eh-kree" },
      { pronoun: "nous", form: "avons écrit", phonetics: "ah-von eh-kree" },
      { pronoun: "vous", form: "avez écrit", phonetics: "ah-vay eh-kree" },
      { pronoun: "ils/elles", form: "ont écrit", phonetics: "on eh-kree" },
    ],
    examples: [
      { french: "J'ai écrit un message.", english: "I wrote a message." }
    ],
    rule: "Irregular past participle: écrit."
  },
  {
    id: "pc-avoir-13",
    infinitive: "boire",
    english: "to drink",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai bu", phonetics: "ay boo" },
      { pronoun: "tu", form: "as bu", phonetics: "ah boo" },
      { pronoun: "il/elle", form: "a bu", phonetics: "ah boo" },
      { pronoun: "nous", form: "avons bu", phonetics: "ah-von boo" },
      { pronoun: "vous", form: "avez bu", phonetics: "ah-vay boo" },
      { pronoun: "ils/elles", form: "ont bu", phonetics: "on boo" },
    ],
    examples: [
      { french: "J'ai bu de l'eau.", english: "I drank water." }
    ],
    rule: "Irregular: bu."
  },
  {
    id: "pc-avoir-14",
    infinitive: "dire",
    english: "to say",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai dit", phonetics: "ay dee" },
      { pronoun: "tu", form: "as dit", phonetics: "ah dee" },
      { pronoun: "il/elle", form: "a dit", phonetics: "ah dee" },
      { pronoun: "nous", form: "avons dit", phonetics: "ah-von dee" },
      { pronoun: "vous", form: "avez dit", phonetics: "ah-vay dee" },
      { pronoun: "ils/elles", form: "ont dit", phonetics: "on dee" },
    ],
    examples: [
      { french: "Elle a dit oui.", english: "She said yes." }
    ],
    rule: "Irregular: dit."
  }
];

export const passeComposeEtreExtra: VerbTenseEntry[] = [
  {
    id: "pc-etre-5",
    infinitive: "devenir",
    english: "to become",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis devenu(e)", phonetics: "swee duh-vuh-noo" },
      { pronoun: "tu", form: "es devenu(e)", phonetics: "eh duh-vuh-noo" },
      { pronoun: "il", form: "est devenu", phonetics: "eh duh-vuh-noo" },
      { pronoun: "elle", form: "est devenue", phonetics: "eh duh-vuh-noo" },
      { pronoun: "nous", form: "sommes devenu(e)s", phonetics: "som duh-vuh-noo" },
      { pronoun: "vous", form: "êtes devenu(e)(s)", phonetics: "et duh-vuh-noo" },
      { pronoun: "ils", form: "sont devenus", phonetics: "son duh-vuh-noo" },
      { pronoun: "elles", form: "sont devenues", phonetics: "son duh-vuh-noo" }
    ],
    examples: [
      { french: "C'est devenu un problème.", english: "It became a problem." }
    ],
    rule: "DR MRS VANDERTRAMP verb. Irregular participle: devenu. Agrees with subject."
  },
  {
    id: "pc-etre-6",
    infinitive: "naître",
    english: "to be born",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis né(e)", phonetics: "swee nay" },
      { pronoun: "tu", form: "es né(e)", phonetics: "eh nay" },
      { pronoun: "il", form: "est né", phonetics: "eh nay" },
      { pronoun: "elle", form: "est née", phonetics: "eh nay" },
      { pronoun: "nous", form: "sommes né(e)s", phonetics: "som nay" },
      { pronoun: "vous", form: "êtes né(e)(s)", phonetics: "et nay" },
      { pronoun: "ils", form: "sont nés", phonetics: "son nay" },
      { pronoun: "elles", form: "sont nées", phonetics: "son nay" },
    ],
    examples: [
      { french: "Je suis né en 1995.", english: "I was born in 1995." }
    ],
    rule: "Irregular participle: né(e). Always uses être."
  },
  {
    id: "pc-etre-7",
    infinitive: "mourir",
    english: "to die",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis mort(e)", phonetics: "swee mor" },
      { pronoun: "tu", form: "es mort(e)", phonetics: "eh mor" },
      { pronoun: "il", form: "est mort", phonetics: "eh mor" },
      { pronoun: "elle", form: "est morte", phonetics: "eh mort" },
      { pronoun: "nous", form: "sommes mort(e)s", phonetics: "som mor" },
      { pronoun: "vous", form: "êtes mort(e)(s)", phonetics: "et mor" },
      { pronoun: "ils", form: "sont morts", phonetics: "son mor" },
      { pronoun: "elles", form: "sont mortes", phonetics: "son mort" },
    ],
    examples: [
      { french: "L'écrivain est mort.", english: "The writer died." }
    ],
    rule: "Irregular participle: mort(e). DR MRS VANDERTRAMP verb."
  },
  {
    id: "pc-etre-8",
    infinitive: "descendre",
    english: "to go down",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis descendu(e)", phonetics: "swee deh-son-doo" },
      { pronoun: "tu", form: "es descendu(e)", phonetics: "eh deh-son-doo" },
      { pronoun: "il", form: "est descendu", phonetics: "eh deh-son-doo" },
      { pronoun: "elle", form: "est descendue", phonetics: "eh deh-son-doo" },
      { pronoun: "nous", form: "sommes descendu(e)s", phonetics: "som deh-son-doo" },
      { pronoun: "vous", form: "êtes descendu(e)(s)", phonetics: "et deh-son-doo" },
      { pronoun: "ils", form: "sont descendus", phonetics: "son deh-son-doo" },
    ],
    examples: [
      { french: "Elle est descendue au salon.", english: "She went down to the living room." }
    ],
    rule: "Regular conjugation descendedu. Uses être when representing physical motion down."
  },
  {
    id: "pc-etre-9",
    infinitive: "monter",
    english: "to go up",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis monté(e)", phonetics: "swee mon-tay" },
      { pronoun: "tu", form: "es monté(e)", phonetics: "eh mon-tay" },
      { pronoun: "il", form: "est monté", phonetics: "eh mon-tay" },
      { pronoun: "elle", form: "est montée", phonetics: "eh mon-tay" },
      { pronoun: "nous", form: "sommes monté(e)s", phonetics: "som mon-tay" },
      { pronoun: "vous", form: "êtes monté(e)(s)", phonetics: "et mon-tay" },
      { pronoun: "ils", form: "sont montés", phonetics: "son mon-tay" },
    ],
    examples: [
      { french: "Il est monté dans l'avion.", english: "He boarded the plane." }
    ],
    rule: "Regular -er verb. DR MRS VANDERTRAMP."
  },
  {
    id: "pc-etre-10",
    infinitive: "tomber",
    english: "to fall",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis tombé(e)", phonetics: "swee tom-bay" },
      { pronoun: "tu", form: "es tombé(e)", phonetics: "eh tom-bay" },
      { pronoun: "il", form: "est tombé", phonetics: "eh tom-bay" },
      { pronoun: "elle", form: "est tombée", phonetics: "eh tom-bay" },
      { pronoun: "nous", form: "sommes tombé(e)s", phonetics: "som tom-bay" },
      { pronoun: "vous", form: "êtes tombé(e)(s)", phonetics: "et tom-bay" },
      { pronoun: "ils", form: "sont tombés", phonetics: "son tom-bay" },
    ],
    examples: [
      { french: "Je suis tombé dans la rue.", english: "I fell in the street." }
    ],
    rule: "Regular -er verb. DR MRS VANDERTRAMP."
  }
];

export const futurSimpleVerbs: VerbTenseEntry[] = [
  {
    id: "fs-1",
    infinitive: "être",
    english: "to be",
    tense: "futur_simple",
    cefr: "B1",
    conjugations: [
      { pronoun: "je", form: "serai", phonetics: "suh-reh" },
      { pronoun: "tu", form: "seras", phonetics: "suh-rah" },
      { pronoun: "il/elle", form: "sera", phonetics: "suh-rah" },
      { pronoun: "nous", form: "serons", phonetics: "suh-ron" },
      { pronoun: "vous", form: "serez", phonetics: "suh-ray" },
      { pronoun: "ils/elles", form: "seront", phonetics: "suh-ron" },
    ],
    examples: [
      { french: "Je serai là demain.", english: "I will be there tomorrow." }
    ],
    rule: "Irregular stem: ser- + endings (ai, as, a, ons, ez, ont)"
  },
  {
    id: "fs-2",
    infinitive: "avoir",
    english: "to have",
    tense: "futur_simple",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "aurai", phonetics: "oh-reh" },
      { pronoun: "tu", form: "auras", phonetics: "oh-rah" },
      { pronoun: "il/elle", form: "aura", phonetics: "oh-rah" },
      { pronoun: "nous", form: "aurons", phonetics: "oh-ron" },
      { pronoun: "vous", form: "aurez", phonetics: "oh-ray" },
      { pronoun: "ils/elles", form: "auront", phonetics: "oh-ron" },
    ],
    examples: [
      { french: "Tu auras le temps.", english: "You will have the time." }
    ],
    rule: "Irregular stem: aur- + endings"
  },
  {
    id: "fs-3",
    infinitive: "aller",
    english: "to go",
    tense: "futur_simple",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "irai", phonetics: "ee-reh" },
      { pronoun: "tu", form: "iras", phonetics: "ee-rah" },
      { pronoun: "il/elle", form: "ira", phonetics: "ee-rah" },
      { pronoun: "nous", form: "irons", phonetics: "ee-ron" },
      { pronoun: "vous", form: "irez", phonetics: "ee-ray" },
      { pronoun: "ils/elles", form: "iront", phonetics: "ee-ron" },
    ],
    examples: [
      { french: "Nous irons en France cet été.", english: "We will go to France this summer." }
    ],
    rule: "Irregular stem: ir- + endings"
  },
  {
    id: "fs-4",
    infinitive: "faire",
    english: "to do/make",
    tense: "futur_simple",
    cefr: "B1",
    conjugations: [
      { pronoun: "je", form: "ferai", phonetics: "fuh-reh" },
      { pronoun: "tu", form: "feras", phonetics: "fuh-rah" },
      { pronoun: "il/elle", form: "fera", phonetics: "fuh-rah" },
      { pronoun: "nous", form: "ferons", phonetics: "fuh-ron" },
      { pronoun: "vous", form: "ferez", phonetics: "fuh-ray" },
      { pronoun: "ils/elles", form: "feront", phonetics: "fuh-ron" },
    ],
    examples: [
      { french: "Je ferai de mon mieux.", english: "I will do my best." }
    ],
    rule: "Irregular stem: fer- + endings"
  },
  {
    id: "fs-5",
    infinitive: "parler",
    english: "to speak",
    tense: "futur_simple",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "parlerai", phonetics: "par-luh-reh" },
      { pronoun: "tu", form: "parleras", phonetics: "par-luh-rah" },
      { pronoun: "il/elle", form: "parlera", phonetics: "par-luh-rah" },
      { pronoun: "nous", form: "parlerons", phonetics: "par-luh-ron" },
      { pronoun: "vous", form: "parlerez", phonetics: "par-luh-ray" },
      { pronoun: "ils/elles", form: "parleront", phonetics: "par-luh-ron" },
    ],
    examples: [
      { french: "Je te parlerai demain.", english: "I will speak to you tomorrow." }
    ],
    rule: "Regular verbs keep their infinitive and add endings: ai, as, a, ons, ez, ont"
  }
];

export const presentModule: TenseModule = {
  tense: "présent",
  displayName: "Présent",
  cefr: "A1",
  description: "Present tense for current actions and states",
  ruleExplanation: `The présent is used for actions happening right now, general truths, and habits.

Formation:
• -ER verbs: -e, -es, -e, -ons, -ez, -ent
• -IR verbs: -is, -is, -it, -issons, -issez, -issent
• -RE verbs: -s, -s, -, -ons, -ez, -ent

Irregular verbs like être, avoir, aller, and faire must be memorized completely.`,
  verbs: presentVerbs
};

export const futurSimpleModule: TenseModule = {
  tense: "futur_simple",
  displayName: "Futur Simple",
  cefr: "B1",
  description: "Future tense for predictions and distant future plans",
  ruleExplanation: `The futur simple describes things that WILL happen in the future, especially beyond the near future.

Formation: INFINITIVE + endings (-ai, -as, -a, -ons, -ez, -ont)
For -re verbs, drop the final 'e' (vendre → vendrai).

Important irregular stems:
• être → ser-
• avoir → aur-
• aller → ir-
• faire → fer-
• pouvoir → pourr-
• venir → viendr-
• voir → verr-
• vouloir → voudr-`,
  verbs: futurSimpleVerbs
};
