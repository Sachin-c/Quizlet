import type { TenseModule, VerbTenseEntry } from "../types";

// ================================================================
// VERB TENSE SYSTEM — A2 → B2 PROGRESSION
// ================================================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A2: PASSÉ COMPOSÉ (avoir)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const passeComposeAvoir: VerbTenseEntry[] = [
  {
    id: "pc-avoir-1",
    infinitive: "manger",
    english: "to eat",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai mangé", phonetics: "ay mon-jay" },
      { pronoun: "tu", form: "as mangé", phonetics: "ah mon-jay" },
      { pronoun: "il/elle", form: "a mangé", phonetics: "ah mon-jay" },
      { pronoun: "nous", form: "avons mangé", phonetics: "ah-von mon-jay" },
      { pronoun: "vous", form: "avez mangé", phonetics: "ah-vay mon-jay" },
      { pronoun: "ils/elles", form: "ont mangé", phonetics: "on mon-jay" },
    ],
    examples: [
      { french: "J'ai mangé une pizza hier soir.", english: "I ate a pizza last night." },
      { french: "Elle a mangé au restaurant.", english: "She ate at the restaurant." },
      { french: "Nous avons mangé ensemble ce midi.", english: "We ate together this noon." },
    ],
    commonMistakes: [
      "Don't say 'j'ai mangé' for ongoing past actions — use imparfait instead.",
      "The past participle 'mangé' doesn't change with avoir (unless preceded by direct object).",
    ],
    rule: "avoir (conjugated) + past participle. Used for completed actions in the past.",
  },
  {
    id: "pc-avoir-2",
    infinitive: "parler",
    english: "to speak",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai parlé", phonetics: "ay par-lay" },
      { pronoun: "tu", form: "as parlé", phonetics: "ah par-lay" },
      { pronoun: "il/elle", form: "a parlé", phonetics: "ah par-lay" },
      { pronoun: "nous", form: "avons parlé", phonetics: "ah-von par-lay" },
      { pronoun: "vous", form: "avez parlé", phonetics: "ah-vay par-lay" },
      { pronoun: "ils/elles", form: "ont parlé", phonetics: "on par-lay" },
    ],
    examples: [
      { french: "J'ai parlé avec mon patron ce matin.", english: "I spoke with my boss this morning." },
      { french: "Tu as parlé trop vite.", english: "You spoke too fast." },
      { french: "Ils ont parlé de leurs vacances.", english: "They talked about their holidays." },
    ],
    rule: "avoir (conjugated) + past participle (-é for -er verbs).",
  },
  {
    id: "pc-avoir-3",
    infinitive: "finir",
    english: "to finish",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai fini", phonetics: "ay fee-nee" },
      { pronoun: "tu", form: "as fini", phonetics: "ah fee-nee" },
      { pronoun: "il/elle", form: "a fini", phonetics: "ah fee-nee" },
      { pronoun: "nous", form: "avons fini", phonetics: "ah-von fee-nee" },
      { pronoun: "vous", form: "avez fini", phonetics: "ah-vay fee-nee" },
      { pronoun: "ils/elles", form: "ont fini", phonetics: "on fee-nee" },
    ],
    examples: [
      { french: "J'ai fini mes devoirs.", english: "I finished my homework." },
      { french: "Elle a fini le livre en deux jours.", english: "She finished the book in two days." },
      { french: "Vous avez fini de manger ?", english: "Have you finished eating?" },
    ],
    rule: "For -ir verbs: past participle ends in -i (finir → fini).",
  },
  {
    id: "pc-avoir-4",
    infinitive: "prendre",
    english: "to take",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai pris", phonetics: "ay pree" },
      { pronoun: "tu", form: "as pris", phonetics: "ah pree" },
      { pronoun: "il/elle", form: "a pris", phonetics: "ah pree" },
      { pronoun: "nous", form: "avons pris", phonetics: "ah-von pree" },
      { pronoun: "vous", form: "avez pris", phonetics: "ah-vay pree" },
      { pronoun: "ils/elles", form: "ont pris", phonetics: "on pree" },
    ],
    examples: [
      { french: "J'ai pris le métro ce matin.", english: "I took the subway this morning." },
      { french: "Elle a pris une décision importante.", english: "She made an important decision." },
      { french: "Nous avons pris un café ensemble.", english: "We had a coffee together." },
    ],
    commonMistakes: ["Irregular: prendre → pris (not 'prendu')."],
    rule: "Irregular past participle: prendre → pris.",
  },
  {
    id: "pc-avoir-5",
    infinitive: "faire",
    english: "to do/make",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai fait", phonetics: "ay feh" },
      { pronoun: "tu", form: "as fait", phonetics: "ah feh" },
      { pronoun: "il/elle", form: "a fait", phonetics: "ah feh" },
      { pronoun: "nous", form: "avons fait", phonetics: "ah-von feh" },
      { pronoun: "vous", form: "avez fait", phonetics: "ah-vay feh" },
      { pronoun: "ils/elles", form: "ont fait", phonetics: "on feh" },
    ],
    examples: [
      { french: "J'ai fait du sport ce matin.", english: "I worked out this morning." },
      { french: "Qu'est-ce que tu as fait hier ?", english: "What did you do yesterday?" },
      { french: "Ils ont fait un gâteau pour l'anniversaire.", english: "They made a cake for the birthday." },
    ],
    rule: "Irregular past participle: faire → fait.",
  },
  {
    id: "pc-avoir-6",
    infinitive: "voir",
    english: "to see",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "ai vu", phonetics: "ay voo" },
      { pronoun: "tu", form: "as vu", phonetics: "ah voo" },
      { pronoun: "il/elle", form: "a vu", phonetics: "ah voo" },
      { pronoun: "nous", form: "avons vu", phonetics: "ah-von voo" },
      { pronoun: "vous", form: "avez vu", phonetics: "ah-vay voo" },
      { pronoun: "ils/elles", form: "ont vu", phonetics: "on voo" },
    ],
    examples: [
      { french: "J'ai vu un bon film hier.", english: "I saw a good movie yesterday." },
      { french: "Tu as vu Marie récemment ?", english: "Have you seen Marie recently?" },
      { french: "Nous avons vu le coucher de soleil.", english: "We saw the sunset." },
    ],
    rule: "Irregular past participle: voir → vu.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A2: PASSÉ COMPOSÉ (être — DR MRS VANDERTRAMP)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const passeComposeEtre: VerbTenseEntry[] = [
  {
    id: "pc-etre-1",
    infinitive: "aller",
    english: "to go",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis allé(e)", phonetics: "swee ah-lay" },
      { pronoun: "tu", form: "es allé(e)", phonetics: "eh ah-lay" },
      { pronoun: "il", form: "est allé", phonetics: "eh ah-lay" },
      { pronoun: "elle", form: "est allée", phonetics: "eh ah-lay" },
      { pronoun: "nous", form: "sommes allé(e)s", phonetics: "som ah-lay" },
      { pronoun: "vous", form: "êtes allé(e)(s)", phonetics: "et ah-lay" },
      { pronoun: "ils", form: "sont allés", phonetics: "son ah-lay" },
      { pronoun: "elles", form: "sont allées", phonetics: "son ah-lay" },
    ],
    examples: [
      { french: "Je suis allé au gym ce matin.", english: "I went to the gym this morning." },
      { french: "Elle est allée à Paris le week-end dernier.", english: "She went to Paris last weekend." },
      { french: "Nous sommes allés au cinéma.", english: "We went to the cinema." },
    ],
    commonMistakes: [
      "With être, the past participle AGREES with the subject (masculine/feminine, singular/plural).",
      "Don't say 'j'ai allé' — aller always uses être.",
    ],
    rule: "être (conjugated) + past participle. Past participle agrees with subject gender/number.",
  },
  {
    id: "pc-etre-2",
    infinitive: "venir",
    english: "to come",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis venu(e)", phonetics: "swee vuh-noo" },
      { pronoun: "tu", form: "es venu(e)", phonetics: "eh vuh-noo" },
      { pronoun: "il", form: "est venu", phonetics: "eh vuh-noo" },
      { pronoun: "elle", form: "est venue", phonetics: "eh vuh-noo" },
      { pronoun: "nous", form: "sommes venu(e)s", phonetics: "som vuh-noo" },
      { pronoun: "vous", form: "êtes venu(e)(s)", phonetics: "et vuh-noo" },
      { pronoun: "ils", form: "sont venus", phonetics: "son vuh-noo" },
    ],
    examples: [
      { french: "Il est venu me voir hier.", english: "He came to see me yesterday." },
      { french: "Elles sont venues à la fête.", english: "They (f) came to the party." },
      { french: "D'où est-ce que tu es venu ?", english: "Where did you come from?" },
    ],
    rule: "être verb (DR MRS VANDERTRAMP). Irregular: venir → venu.",
  },
  {
    id: "pc-etre-3",
    infinitive: "partir",
    english: "to leave",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis parti(e)", phonetics: "swee par-tee" },
      { pronoun: "tu", form: "es parti(e)", phonetics: "eh par-tee" },
      { pronoun: "il", form: "est parti", phonetics: "eh par-tee" },
      { pronoun: "elle", form: "est partie", phonetics: "eh par-tee" },
      { pronoun: "nous", form: "sommes parti(e)s", phonetics: "som par-tee" },
      { pronoun: "vous", form: "êtes parti(e)(s)", phonetics: "et par-tee" },
      { pronoun: "ils", form: "sont partis", phonetics: "son par-tee" },
    ],
    examples: [
      { french: "Je suis parti à huit heures.", english: "I left at eight o'clock." },
      { french: "Elle est partie sans dire au revoir.", english: "She left without saying goodbye." },
      { french: "Ils sont partis en vacances.", english: "They went on vacation." },
    ],
    rule: "être verb. Partir → parti.",
  },
  {
    id: "pc-etre-4",
    infinitive: "arriver",
    english: "to arrive",
    tense: "passé_composé",
    cefr: "A2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "je", form: "suis arrivé(e)", phonetics: "swee ah-ree-vay" },
      { pronoun: "tu", form: "es arrivé(e)", phonetics: "eh ah-ree-vay" },
      { pronoun: "il", form: "est arrivé", phonetics: "eh ah-ree-vay" },
      { pronoun: "elle", form: "est arrivée", phonetics: "eh ah-ree-vay" },
      { pronoun: "nous", form: "sommes arrivé(e)s", phonetics: "som ah-ree-vay" },
      { pronoun: "vous", form: "êtes arrivé(e)(s)", phonetics: "et ah-ree-vay" },
      { pronoun: "ils", form: "sont arrivés", phonetics: "son ah-ree-vay" },
    ],
    examples: [
      { french: "Le train est arrivé en retard.", english: "The train arrived late." },
      { french: "Nous sommes arrivés à l'heure.", english: "We arrived on time." },
      { french: "Elle est arrivée la première.", english: "She arrived first." },
    ],
    rule: "être verb. Regular -er: arriver → arrivé.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A2: FUTUR PROCHE (aller + infinitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const futurProche: VerbTenseEntry[] = [
  {
    id: "fp-1",
    infinitive: "manger",
    english: "to eat",
    tense: "futur_proche",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "vais manger", phonetics: "veh mon-jay" },
      { pronoun: "tu", form: "vas manger", phonetics: "vah mon-jay" },
      { pronoun: "il/elle", form: "va manger", phonetics: "vah mon-jay" },
      { pronoun: "nous", form: "allons manger", phonetics: "ah-lon mon-jay" },
      { pronoun: "vous", form: "allez manger", phonetics: "ah-lay mon-jay" },
      { pronoun: "ils/elles", form: "vont manger", phonetics: "von mon-jay" },
    ],
    examples: [
      { french: "Je vais manger au restaurant ce soir.", english: "I'm going to eat at the restaurant tonight." },
      { french: "On va manger des crêpes !", english: "We're going to eat crêpes!" },
      { french: "Tu vas manger avec nous ?", english: "Are you going to eat with us?" },
    ],
    rule: "aller (conjugated in present) + infinitive. Expresses near future / intention.",
  },
  {
    id: "fp-2",
    infinitive: "travailler",
    english: "to work",
    tense: "futur_proche",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "vais travailler", phonetics: "veh trah-vah-yay" },
      { pronoun: "tu", form: "vas travailler", phonetics: "vah trah-vah-yay" },
      { pronoun: "il/elle", form: "va travailler", phonetics: "vah trah-vah-yay" },
      { pronoun: "nous", form: "allons travailler", phonetics: "ah-lon trah-vah-yay" },
      { pronoun: "vous", form: "allez travailler", phonetics: "ah-lay trah-vah-yay" },
      { pronoun: "ils/elles", form: "vont travailler", phonetics: "von trah-vah-yay" },
    ],
    examples: [
      { french: "Je vais travailler de la maison demain.", english: "I'm going to work from home tomorrow." },
      { french: "Elle va travailler tard ce soir.", english: "She's going to work late tonight." },
      { french: "Nous allons travailler ensemble sur ce projet.", english: "We're going to work together on this project." },
    ],
    rule: "aller (present) + infinitive. Very natural in spoken French for planned events.",
  },
  {
    id: "fp-3",
    infinitive: "partir",
    english: "to leave",
    tense: "futur_proche",
    cefr: "A2",
    conjugations: [
      { pronoun: "je", form: "vais partir", phonetics: "veh par-teer" },
      { pronoun: "tu", form: "vas partir", phonetics: "vah par-teer" },
      { pronoun: "il/elle", form: "va partir", phonetics: "vah par-teer" },
      { pronoun: "nous", form: "allons partir", phonetics: "ah-lon par-teer" },
      { pronoun: "vous", form: "allez partir", phonetics: "ah-lay par-teer" },
      { pronoun: "ils/elles", form: "vont partir", phonetics: "von par-teer" },
    ],
    examples: [
      { french: "Je vais partir dans cinq minutes.", english: "I'm going to leave in five minutes." },
      { french: "Le train va partir bientôt.", english: "The train is going to leave soon." },
      { french: "Ils vont partir en vacances la semaine prochaine.", english: "They're going to go on vacation next week." },
    ],
    rule: "aller + infinitive. Works with any verb.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// B1: IMPARFAIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const imparfait: VerbTenseEntry[] = [
  {
    id: "imp-1",
    infinitive: "être",
    english: "to be",
    tense: "imparfait",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "étais", phonetics: "ay-teh" },
      { pronoun: "tu", form: "étais", phonetics: "ay-teh" },
      { pronoun: "il/elle", form: "était", phonetics: "ay-teh" },
      { pronoun: "nous", form: "étions", phonetics: "ay-tee-on" },
      { pronoun: "vous", form: "étiez", phonetics: "ay-tee-ay" },
      { pronoun: "ils/elles", form: "étaient", phonetics: "ay-teh" },
    ],
    examples: [
      { french: "Quand j'étais petit, j'habitais à Lyon.", english: "When I was little, I lived in Lyon." },
      { french: "Il était fatigué après le travail.", english: "He was tired after work." },
      { french: "Nous étions heureux ensemble.", english: "We were happy together." },
      { french: "Le temps était magnifique hier.", english: "The weather was beautiful yesterday." },
    ],
    commonMistakes: [
      "Être is the ONLY irregular stem in imparfait (ét-). All others use nous form of present.",
      "Don't use imparfait for completed actions — use passé composé instead.",
    ],
    rule: "Describes ongoing/habitual past states. Stem: nous form of present minus -ons, + endings: -ais, -ais, -ait, -ions, -iez, -aient. Exception: être → ét-.",
  },
  {
    id: "imp-2",
    infinitive: "avoir",
    english: "to have",
    tense: "imparfait",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "avais", phonetics: "ah-veh" },
      { pronoun: "tu", form: "avais", phonetics: "ah-veh" },
      { pronoun: "il/elle", form: "avait", phonetics: "ah-veh" },
      { pronoun: "nous", form: "avions", phonetics: "ah-vee-on" },
      { pronoun: "vous", form: "aviez", phonetics: "ah-vee-ay" },
      { pronoun: "ils/elles", form: "avaient", phonetics: "ah-veh" },
    ],
    examples: [
      { french: "J'avais faim après le sport.", english: "I was hungry after working out." },
      { french: "Elle avait les cheveux longs quand elle était jeune.", english: "She had long hair when she was young." },
      { french: "Nous avions un chien quand j'étais enfant.", english: "We had a dog when I was a child." },
    ],
    rule: "Regular imparfait: nous avons → stem av- + imparfait endings.",
  },
  {
    id: "imp-3",
    infinitive: "faire",
    english: "to do/make",
    tense: "imparfait",
    cefr: "B1",
    conjugations: [
      { pronoun: "je", form: "faisais", phonetics: "fuh-zeh" },
      { pronoun: "tu", form: "faisais", phonetics: "fuh-zeh" },
      { pronoun: "il/elle", form: "faisait", phonetics: "fuh-zeh" },
      { pronoun: "nous", form: "faisions", phonetics: "fuh-zee-on" },
      { pronoun: "vous", form: "faisiez", phonetics: "fuh-zee-ay" },
      { pronoun: "ils/elles", form: "faisaient", phonetics: "fuh-zeh" },
    ],
    examples: [
      { french: "Il faisait beau tous les jours en été.", english: "The weather was nice every day in summer." },
      { french: "Je faisais du sport trois fois par semaine.", english: "I used to work out three times a week." },
      { french: "Qu'est-ce que tu faisais quand je t'ai appelé ?", english: "What were you doing when I called you?" },
    ],
    commonMistakes: ["Note the pronunciation: 'faisais' sounds like 'fuh-zeh', not 'fay-zay'."],
    rule: "nous faisons → stem fais- + endings. Classic imparfait vs passé composé contrast.",
  },
  {
    id: "imp-4",
    infinitive: "aller",
    english: "to go",
    tense: "imparfait",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "allais", phonetics: "ah-leh" },
      { pronoun: "tu", form: "allais", phonetics: "ah-leh" },
      { pronoun: "il/elle", form: "allait", phonetics: "ah-leh" },
      { pronoun: "nous", form: "allions", phonetics: "ah-lee-on" },
      { pronoun: "vous", form: "alliez", phonetics: "ah-lee-ay" },
      { pronoun: "ils/elles", form: "allaient", phonetics: "ah-leh" },
    ],
    examples: [
      { french: "J'allais au gym tous les matins.", english: "I used to go to the gym every morning." },
      { french: "Quand elle était étudiante, elle allait souvent au café.", english: "When she was a student, she often went to the café." },
      { french: "Nous allions à la plage chaque été.", english: "We used to go to the beach every summer." },
    ],
    rule: "nous allons → stem all- + imparfait endings.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// B1: REFLEXIVE VERBS IN PAST
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const reflexivePast: VerbTenseEntry[] = [
  {
    id: "refl-1",
    infinitive: "se réveiller",
    english: "to wake up",
    tense: "passé_composé",
    cefr: "B1",
    auxiliary: "être",
    isReflexive: true,
    conjugations: [
      { pronoun: "je", form: "me suis réveillé(e)", phonetics: "muh swee ray-vay-yay" },
      { pronoun: "tu", form: "t'es réveillé(e)", phonetics: "teh ray-vay-yay" },
      { pronoun: "il", form: "s'est réveillé", phonetics: "seh ray-vay-yay" },
      { pronoun: "elle", form: "s'est réveillée", phonetics: "seh ray-vay-yay" },
      { pronoun: "nous", form: "nous sommes réveillé(e)s", phonetics: "noo som ray-vay-yay" },
      { pronoun: "vous", form: "vous êtes réveillé(e)(s)", phonetics: "vooz et ray-vay-yay" },
      { pronoun: "ils", form: "se sont réveillés", phonetics: "suh son ray-vay-yay" },
    ],
    examples: [
      { french: "Je me suis réveillé à six heures.", english: "I woke up at six o'clock." },
      { french: "Elle s'est réveillée en retard.", english: "She woke up late." },
      { french: "Nous nous sommes réveillés tôt pour le vol.", english: "We woke up early for the flight." },
    ],
    commonMistakes: [
      "Reflexive verbs ALWAYS use être in passé composé.",
      "The reflexive pronoun goes BEFORE être: 'je me suis', not 'je suis me'.",
      "Past participle agrees with subject: elle s'est réveillée (extra -e).",
    ],
    rule: "Reflexive pronoun + être (conjugated) + past participle (agrees with subject).",
  },
  {
    id: "refl-2",
    infinitive: "se coucher",
    english: "to go to bed",
    tense: "passé_composé",
    cefr: "B1",
    auxiliary: "être",
    isReflexive: true,
    conjugations: [
      { pronoun: "je", form: "me suis couché(e)", phonetics: "muh swee koo-shay" },
      { pronoun: "tu", form: "t'es couché(e)", phonetics: "teh koo-shay" },
      { pronoun: "il", form: "s'est couché", phonetics: "seh koo-shay" },
      { pronoun: "elle", form: "s'est couchée", phonetics: "seh koo-shay" },
      { pronoun: "nous", form: "nous sommes couché(e)s", phonetics: "noo som koo-shay" },
      { pronoun: "vous", form: "vous êtes couché(e)(s)", phonetics: "vooz et koo-shay" },
      { pronoun: "ils", form: "se sont couchés", phonetics: "suh son koo-shay" },
    ],
    examples: [
      { french: "Je me suis couché tard hier soir.", english: "I went to bed late last night." },
      { french: "Les enfants se sont couchés à neuf heures.", english: "The children went to bed at nine o'clock." },
      { french: "Elle s'est couchée tôt parce qu'elle était fatiguée.", english: "She went to bed early because she was tired." },
    ],
    rule: "Reflexive + être. Regular -er past participle: couché.",
  },
  {
    id: "refl-3",
    infinitive: "s'habiller",
    english: "to get dressed",
    tense: "passé_composé",
    cefr: "B1",
    auxiliary: "être",
    isReflexive: true,
    conjugations: [
      { pronoun: "je", form: "me suis habillé(e)", phonetics: "muh swee ah-bee-yay" },
      { pronoun: "tu", form: "t'es habillé(e)", phonetics: "teh ah-bee-yay" },
      { pronoun: "il", form: "s'est habillé", phonetics: "seh ah-bee-yay" },
      { pronoun: "elle", form: "s'est habillée", phonetics: "seh ah-bee-yay" },
      { pronoun: "nous", form: "nous sommes habillé(e)s", phonetics: "noo som ah-bee-yay" },
      { pronoun: "vous", form: "vous êtes habillé(e)(s)", phonetics: "vooz et ah-bee-yay" },
      { pronoun: "ils", form: "se sont habillés", phonetics: "suh son ah-bee-yay" },
    ],
    examples: [
      { french: "Je me suis habillé rapidement.", english: "I got dressed quickly." },
      { french: "Elle s'est habillée en noir pour la soirée.", english: "She dressed in black for the evening." },
      { french: "Ils se sont habillés élégamment.", english: "They dressed up elegantly." },
    ],
    rule: "Reflexive + être. Note: h is silent, so 'habillé' sounds like 'ah-bee-yay'.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// B1: BASIC CONDITIONAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const conditionalBasic: VerbTenseEntry[] = [
  {
    id: "cond-1",
    infinitive: "vouloir",
    english: "to want",
    tense: "conditionnel",
    cefr: "B1",
    conjugations: [
      { pronoun: "je", form: "voudrais", phonetics: "voo-dreh" },
      { pronoun: "tu", form: "voudrais", phonetics: "voo-dreh" },
      { pronoun: "il/elle", form: "voudrait", phonetics: "voo-dreh" },
      { pronoun: "nous", form: "voudrions", phonetics: "voo-dree-on" },
      { pronoun: "vous", form: "voudriez", phonetics: "voo-dree-ay" },
      { pronoun: "ils/elles", form: "voudraient", phonetics: "voo-dreh" },
    ],
    examples: [
      { french: "Je voudrais un café, s'il vous plaît.", english: "I would like a coffee, please." },
      { french: "Tu voudrais venir avec nous ?", english: "Would you like to come with us?" },
      { french: "Nous voudrions réserver une table.", english: "We would like to book a table." },
      { french: "Ils voudraient voyager en France.", english: "They would like to travel to France." },
    ],
    commonMistakes: [
      "'Je voudrais' is polite; 'je veux' is more direct/demanding.",
      "Don't say 'je veux' in restaurants — always use 'je voudrais'.",
    ],
    rule: "Conditional = future stem + imparfait endings. Essential for polite requests.",
  },
  {
    id: "cond-2",
    infinitive: "pouvoir",
    english: "to be able to",
    tense: "conditionnel",
    cefr: "B1",
    conjugations: [
      { pronoun: "je", form: "pourrais", phonetics: "poo-reh" },
      { pronoun: "tu", form: "pourrais", phonetics: "poo-reh" },
      { pronoun: "il/elle", form: "pourrait", phonetics: "poo-reh" },
      { pronoun: "nous", form: "pourrions", phonetics: "poo-ree-on" },
      { pronoun: "vous", form: "pourriez", phonetics: "poo-ree-ay" },
      { pronoun: "ils/elles", form: "pourraient", phonetics: "poo-reh" },
    ],
    examples: [
      { french: "Est-ce que tu pourrais m'aider ?", english: "Could you help me?" },
      { french: "On pourrait aller au cinéma.", english: "We could go to the cinema." },
      { french: "Vous pourriez parler plus lentement ?", english: "Could you speak more slowly?" },
    ],
    rule: "Irregular stem: pourr- + imparfait endings. Very common for polite requests.",
  },
  {
    id: "cond-3",
    infinitive: "aimer",
    english: "to like/love",
    tense: "conditionnel",
    cefr: "B1",
    conjugations: [
      { pronoun: "j'", form: "aimerais", phonetics: "em-reh" },
      { pronoun: "tu", form: "aimerais", phonetics: "em-reh" },
      { pronoun: "il/elle", form: "aimerait", phonetics: "em-reh" },
      { pronoun: "nous", form: "aimerions", phonetics: "em-ree-on" },
      { pronoun: "vous", form: "aimeriez", phonetics: "em-ree-ay" },
      { pronoun: "ils/elles", form: "aimeraient", phonetics: "em-reh" },
    ],
    examples: [
      { french: "J'aimerais apprendre le français couramment.", english: "I would like to learn French fluently." },
      { french: "Elle aimerait vivre à Paris.", english: "She would like to live in Paris." },
      { french: "Nous aimerions vous inviter à dîner.", english: "We would like to invite you to dinner." },
    ],
    rule: "Regular -er conditional: infinitive + imparfait endings. 'J'aimerais' = 'I would like' (slightly less formal than voudrais).",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// B2: SUBJONCTIF (basic triggers)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const subjonctif: VerbTenseEntry[] = [
  {
    id: "subj-1",
    infinitive: "être",
    english: "to be",
    tense: "subjonctif",
    cefr: "B2",
    conjugations: [
      { pronoun: "que je", form: "sois", phonetics: "swah" },
      { pronoun: "que tu", form: "sois", phonetics: "swah" },
      { pronoun: "qu'il/elle", form: "soit", phonetics: "swah" },
      { pronoun: "que nous", form: "soyons", phonetics: "swah-yon" },
      { pronoun: "que vous", form: "soyez", phonetics: "swah-yay" },
      { pronoun: "qu'ils/elles", form: "soient", phonetics: "swah" },
    ],
    examples: [
      { french: "Il faut que tu sois à l'heure.", english: "You need to be on time." },
      { french: "Je veux que tu sois heureux.", english: "I want you to be happy." },
      { french: "Bien qu'il soit fatigué, il continue.", english: "Although he is tired, he continues." },
    ],
    commonMistakes: [
      "Subjonctif ≠ indicatif. Don't say 'il faut que tu es' — it's 'il faut que tu sois'.",
      "Être is completely irregular in subjonctif.",
    ],
    rule: "Triggered by expressions of will (vouloir que), necessity (il faut que), emotion (content que), doubt (douter que). Être is fully irregular.",
  },
  {
    id: "subj-2",
    infinitive: "avoir",
    english: "to have",
    tense: "subjonctif",
    cefr: "B2",
    conjugations: [
      { pronoun: "que j'", form: "aie", phonetics: "ay" },
      { pronoun: "que tu", form: "aies", phonetics: "ay" },
      { pronoun: "qu'il/elle", form: "ait", phonetics: "ay" },
      { pronoun: "que nous", form: "ayons", phonetics: "ay-yon" },
      { pronoun: "que vous", form: "ayez", phonetics: "ay-yay" },
      { pronoun: "qu'ils/elles", form: "aient", phonetics: "ay" },
    ],
    examples: [
      { french: "Il faut que j'aie le courage de parler.", english: "I need to have the courage to speak." },
      { french: "Je doute qu'il ait raison.", english: "I doubt that he is right." },
      { french: "Avant que tu aies fini, appelle-moi.", english: "Before you finish, call me." },
    ],
    rule: "Avoir is fully irregular in subjonctif. Common trigger: 'il faut que'.",
  },
  {
    id: "subj-3",
    infinitive: "faire",
    english: "to do/make",
    tense: "subjonctif",
    cefr: "B2",
    conjugations: [
      { pronoun: "que je", form: "fasse", phonetics: "fass" },
      { pronoun: "que tu", form: "fasses", phonetics: "fass" },
      { pronoun: "qu'il/elle", form: "fasse", phonetics: "fass" },
      { pronoun: "que nous", form: "fassions", phonetics: "fass-ee-on" },
      { pronoun: "que vous", form: "fassiez", phonetics: "fass-ee-ay" },
      { pronoun: "qu'ils/elles", form: "fassent", phonetics: "fass" },
    ],
    examples: [
      { french: "Il faut que je fasse du sport.", english: "I need to exercise." },
      { french: "Je veux que tu fasses tes devoirs.", english: "I want you to do your homework." },
      { french: "Bien qu'il fasse froid, on sort quand même.", english: "Although it's cold, we're going out anyway." },
    ],
    rule: "Irregular: faire → fasse. Very commonly used with 'il faut que'.",
  },
  {
    id: "subj-4",
    infinitive: "aller",
    english: "to go",
    tense: "subjonctif",
    cefr: "B2",
    conjugations: [
      { pronoun: "que j'", form: "aille", phonetics: "eye" },
      { pronoun: "que tu", form: "ailles", phonetics: "eye" },
      { pronoun: "qu'il/elle", form: "aille", phonetics: "eye" },
      { pronoun: "que nous", form: "allions", phonetics: "ah-lee-on" },
      { pronoun: "que vous", form: "alliez", phonetics: "ah-lee-ay" },
      { pronoun: "qu'ils/elles", form: "aillent", phonetics: "eye" },
    ],
    examples: [
      { french: "Il faut que j'aille au travail.", english: "I need to go to work." },
      { french: "Je veux qu'on aille au restaurant.", english: "I want us to go to the restaurant." },
      { french: "Avant que tu ailles, dis-moi.", english: "Before you go, tell me." },
    ],
    rule: "Irregular dual-stem: aill- (singular/3rd pl) / all- (nous/vous).",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// B2: PLUS-QUE-PARFAIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const plusQueParfait: VerbTenseEntry[] = [
  {
    id: "pqp-1",
    infinitive: "manger",
    english: "to eat",
    tense: "plus_que_parfait",
    cefr: "B2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "avais mangé", phonetics: "ah-veh mon-jay" },
      { pronoun: "tu", form: "avais mangé", phonetics: "ah-veh mon-jay" },
      { pronoun: "il/elle", form: "avait mangé", phonetics: "ah-veh mon-jay" },
      { pronoun: "nous", form: "avions mangé", phonetics: "ah-vee-on mon-jay" },
      { pronoun: "vous", form: "aviez mangé", phonetics: "ah-vee-ay mon-jay" },
      { pronoun: "ils/elles", form: "avaient mangé", phonetics: "ah-veh mon-jay" },
    ],
    examples: [
      { french: "J'avais déjà mangé quand il est arrivé.", english: "I had already eaten when he arrived." },
      { french: "Elle avait mangé trop de chocolat.", english: "She had eaten too much chocolate." },
      { french: "Nous avions mangé avant de partir.", english: "We had eaten before leaving." },
    ],
    rule: "avoir/être in IMPARFAIT + past participle. Describes action completed BEFORE another past action.",
  },
  {
    id: "pqp-2",
    infinitive: "partir",
    english: "to leave",
    tense: "plus_que_parfait",
    cefr: "B2",
    auxiliary: "être",
    conjugations: [
      { pronoun: "j'", form: "étais parti(e)", phonetics: "ay-teh par-tee" },
      { pronoun: "tu", form: "étais parti(e)", phonetics: "ay-teh par-tee" },
      { pronoun: "il", form: "était parti", phonetics: "ay-teh par-tee" },
      { pronoun: "elle", form: "était partie", phonetics: "ay-teh par-tee" },
      { pronoun: "nous", form: "étions parti(e)s", phonetics: "ay-tee-on par-tee" },
      { pronoun: "vous", form: "étiez parti(e)(s)", phonetics: "ay-tee-ay par-tee" },
      { pronoun: "ils", form: "étaient partis", phonetics: "ay-teh par-tee" },
    ],
    examples: [
      { french: "Quand je suis arrivé, elle était déjà partie.", english: "When I arrived, she had already left." },
      { french: "Ils étaient partis avant la pluie.", english: "They had left before the rain." },
      { french: "Nous étions partis trop tôt.", english: "We had left too early." },
    ],
    rule: "être in imparfait + past participle (with agreement). For movement/state verbs.",
  },
  {
    id: "pqp-3",
    infinitive: "finir",
    english: "to finish",
    tense: "plus_que_parfait",
    cefr: "B2",
    auxiliary: "avoir",
    conjugations: [
      { pronoun: "j'", form: "avais fini", phonetics: "ah-veh fee-nee" },
      { pronoun: "tu", form: "avais fini", phonetics: "ah-veh fee-nee" },
      { pronoun: "il/elle", form: "avait fini", phonetics: "ah-veh fee-nee" },
      { pronoun: "nous", form: "avions fini", phonetics: "ah-vee-on fee-nee" },
      { pronoun: "vous", form: "aviez fini", phonetics: "ah-vee-ay fee-nee" },
      { pronoun: "ils/elles", form: "avaient fini", phonetics: "ah-veh fee-nee" },
    ],
    examples: [
      { french: "J'avais fini mon travail avant minuit.", english: "I had finished my work before midnight." },
      { french: "Quand le prof est arrivé, ils avaient déjà fini l'exercice.", english: "When the teacher arrived, they had already finished the exercise." },
      { french: "Tu avais fini de lire le livre ?", english: "Had you finished reading the book?" },
    ],
    rule: "avoir in imparfait + past participle. -ir verbs: past participle ends in -i.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULE ASSEMBLY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const tenseModules: TenseModule[] = [
  {
    tense: "passé_composé",
    displayName: "Passé Composé (avoir)",
    cefr: "A2",
    description: "Completed actions in the past using 'avoir'",
    ruleExplanation: `The passé composé expresses COMPLETED actions in the past. Think of it as "I did" or "I have done".

Formation: SUBJECT + avoir (conjugated) + PAST PARTICIPLE

Past participle formation:
• -er verbs → -é (manger → mangé)
• -ir verbs → -i (finir → fini)
• -re verbs → -u (vendre → vendu)

Many common verbs are irregular:
• faire → fait, voir → vu, prendre → pris, écrire → écrit

Key: Use passé composé for SPECIFIC, COMPLETED events:
"J'ai mangé une pomme" (I ate an apple — one specific event, done)`,
    verbs: passeComposeAvoir,
  },
  {
    tense: "passé_composé",
    displayName: "Passé Composé (être)",
    cefr: "A2",
    description: "Completed past actions using 'être' (movement/state verbs)",
    ruleExplanation: `Some verbs use ÊTRE instead of avoir in the passé composé.

Remember: DR MRS VANDERTRAMP
• Devenir, Revenir, Monter, Rester, Sortir
• Venir, Aller, Naître, Descendre, Entrer, Rentrer
• Tomber, Retourner, Arriver, Mourir, Partir

CRITICAL: With être, the past participle AGREES with the subject:
• Il est allé (masculine singular)
• Elle est allée (feminine singular — add -e)
• Ils sont allés (masculine plural — add -s)
• Elles sont allées (feminine plural — add -es)

All reflexive verbs also use être.`,
    verbs: passeComposeEtre,
  },
  {
    tense: "futur_proche",
    displayName: "Futur Proche (Near Future)",
    cefr: "A2",
    description: "Expressing plans and intentions using 'aller + infinitive'",
    ruleExplanation: `The easiest way to talk about the future in French!

Formation: ALLER (conjugated in present) + INFINITIVE

• Je vais manger = I'm going to eat
• Tu vas partir = You're going to leave
• Il va travailler = He's going to work

Use for:
✅ Plans: "Je vais aller au gym."
✅ Near future: "Il va pleuvoir."
✅ Intentions: "Nous allons voyager."

This is used MORE than the simple future (futur simple) in spoken French.`,
    verbs: futurProche,
  },
  {
    tense: "imparfait",
    displayName: "Imparfait",
    cefr: "B1",
    description: "Describing habitual/ongoing past states and actions",
    ruleExplanation: `The imparfait describes ONGOING, HABITUAL, or DESCRIPTIVE past events.

Formation: Take the NOUS form of present tense, remove -ONS, add:
-ais, -ais, -ait, -ions, -iez, -aient

• nous parlons → parl- → je parlais
• nous finissons → finiss- → je finissais

ONLY EXCEPTION: être → ét- (j'étais)

Use imparfait for:
✅ Habits: "Je mangeais du pain tous les matins." (I used to eat bread every morning)
✅ Descriptions: "Il faisait beau." (The weather was nice)
✅ Ongoing actions: "Je dormais quand…" (I was sleeping when…)

VS Passé Composé:
• PC = completed, specific: "J'ai mangé une pizza." (I ate a pizza)
• IMP = ongoing, habitual: "Je mangeais souvent des pizzas." (I often ate pizzas)`,
    verbs: imparfait,
  },
  {
    tense: "passé_composé",
    displayName: "Reflexive Verbs in Past",
    cefr: "B1",
    description: "Passé composé of reflexive verbs (always with être)",
    ruleExplanation: `Reflexive verbs ALWAYS use être in the passé composé.

Formation: SUBJECT + reflexive pronoun + être (conjugated) + past participle

• Je me suis réveillé(e) = I woke up
• Elle s'est habillée = She got dressed
• Nous nous sommes promenés = We went for a walk

Word order: reflexive pronoun → être → past participle
"Je ME SUIS réveillé" (not "je suis me réveillé")

Agreement: Past participle agrees with SUBJECT (like all être verbs)
• Il s'est couché (masc.)
• Elle s'est couchée (fem. → add -e)
• Ils se sont couchés (masc. pl. → add -s)`,
    verbs: reflexivePast,
  },
  {
    tense: "conditionnel",
    displayName: "Conditionnel (Basic)",
    cefr: "B1",
    description: "Polite requests and hypothetical situations",
    ruleExplanation: `The conditionnel is used for polite requests and "would" situations.

Formation: FUTURE STEM + IMPARFAIT ENDINGS
(-ais, -ais, -ait, -ions, -iez, -aient)

Regular: infinitive + endings
• aimer → j'aimerais (I would like)
• manger → je mangerais (I would eat)

Irregular stems (same as futur simple):
• être → ser- → je serais
• avoir → aur- → j'aurais
• faire → fer- → je ferais
• aller → ir- → j'irais
• pouvoir → pourr- → je pourrais
• vouloir → voudr- → je voudrais

Essential phrases:
• "Je voudrais..." = I would like... (polite)
• "Pourriez-vous..." = Could you... (formal)
• "J'aimerais..." = I would love to...`,
    verbs: conditionalBasic,
  },
  {
    tense: "subjonctif",
    displayName: "Subjonctif (Basic Triggers)",
    cefr: "B2",
    description: "Expressing obligation, wishes, doubt, and emotion",
    ruleExplanation: `The subjonctif is a MOOD (not a tense) used after certain triggers.

Formation: Take ILS form of present, remove -ent, add:
-e, -es, -e, -ions, -iez, -ent

Common triggers — learn these phrases:
• Il faut que... (It is necessary that...)
• Je veux que... (I want that...)
• Je suis content/triste que... (I am happy/sad that...)
• Bien que... (Although...)
• Pour que... (So that...)
• Avant que... (Before...)

Irregular verbs (must memorize):
• être → sois, soyons, soyez
• avoir → aie, ayons, ayez
• faire → fasse, fassions, fassiez
• aller → aille, allions, alliez
• pouvoir → puisse
• savoir → sache

Key: Subjonctif ≠ reality. It's about desire, doubt, necessity.`,
    verbs: subjonctif,
  },
  {
    tense: "plus_que_parfait",
    displayName: "Plus-que-parfait",
    cefr: "B2",
    description: "Actions completed before another past action",
    ruleExplanation: `The plus-que-parfait describes an action that happened BEFORE another past action.

Think of it as "had done" in English.

Formation: avoir/être in IMPARFAIT + past participle

• J'avais mangé = I had eaten
• Elle était partie = She had left

Timeline:
1. Plus-que-parfait (earlier action)
2. Passé composé (later action)

Example: "J'avais déjà mangé (1) quand il est arrivé (2)."
"I had already eaten when he arrived."

Same rules as passé composé for:
• Choosing avoir vs être
• Past participle agreement with être`,
    verbs: plusQueParfait,
  },
];

// Helper to get all verb entries across all modules
export function getAllVerbEntries(): VerbTenseEntry[] {
  return tenseModules.flatMap((m) => m.verbs);
}

// Helper to get modules by CEFR level
export function getModulesByCEFR(level: string): TenseModule[] {
  return tenseModules.filter((m) => m.cefr === level);
}

// Helper to get module by tense name
export function getModuleByTense(tense: string): TenseModule | undefined {
  return tenseModules.find((m) => m.tense === tense);
}
