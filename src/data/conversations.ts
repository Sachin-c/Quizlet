import type { ConversationScenario } from "../types";

// ================================================================
// CONVERSATION PRACTICE SCENARIOS
// Progressive difficulty within each scenario
// ================================================================

export const conversationScenarios: ConversationScenario[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. AT THE GYM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-gym-1",
    title: "At the Gym",
    titleFr: "À la salle de sport",
    description: "Talk to a gym buddy about your workout routine.",
    cefr: "A2",
    category: "Gym",
    vocabularyHints: ["s'entraîner", "les poids", "la musculation", "une série", "fatigué"],
    dialogue: [
      {
        speaker: "system",
        french: "Salut ! Tu viens souvent à la salle ?",
        english: "Hi! Do you come to the gym often?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Oui, je viens trois fois par semaine.",
        english: "Yes, I come three times a week.",
        alternatives: [
          "Oui, je m'entraîne trois fois par semaine.",
          "Oui, j'y vais trois fois par semaine.",
          "Oui, environ trois fois par semaine.",
        ],
        difficulty: "easy",
      },
      {
        speaker: "system",
        french: "C'est bien ! Qu'est-ce que tu fais comme exercice aujourd'hui ?",
        english: "That's good! What exercises are you doing today?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Aujourd'hui, je fais de la musculation. Les bras et les épaules.",
        english: "Today, I'm doing weight training. Arms and shoulders.",
        alternatives: [
          "Je fais les bras et les épaules.",
          "De la musculation, bras et épaules.",
          "Aujourd'hui c'est les bras.",
        ],
        correction: "Use 'je fais de la musculation' rather than 'je fais musculation' — need the partitive article.",
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Cool ! Tu soulèves combien de kilos au développé couché ?",
        english: "Cool! How much do you bench press?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Je soulève environ soixante kilos. Et toi ?",
        english: "I lift about sixty kilos. And you?",
        alternatives: [
          "Environ soixante kilos.",
          "Soixante kilos à peu près.",
          "Je fais soixante kilos au développé couché.",
        ],
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Moi, je préfère faire du cardio. Je cours vingt minutes sur le tapis roulant.",
        english: "Me, I prefer doing cardio. I run twenty minutes on the treadmill.",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Le cardio, c'est important aussi. Moi, je devrais en faire plus.",
        english: "Cardio is important too. I should do more of it.",
        alternatives: [
          "C'est vrai, le cardio c'est bien aussi.",
          "Oui, je devrais courir plus souvent.",
          "Le cardio c'est important, je sais.",
        ],
        correction: "Note: 'en faire plus' uses the pronoun 'en' to refer back to 'cardio' — very natural in French.",
        difficulty: "hard",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. WORKDAY DISCUSSION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-work-1",
    title: "Talking About Work",
    titleFr: "Parler du travail",
    description: "Discuss your workday with a friend over coffee.",
    cefr: "B1",
    category: "Work",
    vocabularyHints: ["la réunion", "le projet", "le patron", "fatigué", "le télétravail"],
    dialogue: [
      {
        speaker: "system",
        french: "Alors, comment ça s'est passé au travail aujourd'hui ?",
        english: "So, how was work today?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "C'était une journée chargée. J'ai eu trois réunions.",
        english: "It was a busy day. I had three meetings.",
        alternatives: [
          "Très chargé. J'avais trois réunions aujourd'hui.",
          "Pas mal, mais j'ai eu beaucoup de réunions.",
          "Fatigant. Trois réunions, c'est trop.",
        ],
        correction: "'C'était' (imparfait) for describing how the day was; 'j'ai eu' (passé composé) for the specific event.",
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Trois réunions ? C'est beaucoup ! Elles étaient productives au moins ?",
        english: "Three meetings? That's a lot! Were they productive at least?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Pas vraiment. La première était utile, mais les deux autres étaient inutiles.",
        english: "Not really. The first one was useful, but the other two were useless.",
        alternatives: [
          "La première oui, mais les autres non.",
          "Bof, pas toutes. Seulement la première.",
          "Honnêtement, la plupart étaient une perte de temps.",
        ],
        correction: "'Bof' is a very French interjection meaning 'meh' — great for casual conversation.",
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Je comprends. Et ton nouveau projet, ça avance ?",
        english: "I understand. And your new project, is it progressing?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Oui, ça avance bien. On a une deadline vendredi, donc je travaille beaucoup cette semaine.",
        english: "Yes, it's progressing well. We have a deadline on Friday, so I'm working a lot this week.",
        alternatives: [
          "Ça avance, mais on a une deadline vendredi.",
          "Oui, mais la deadline est vendredi et il reste beaucoup à faire.",
          "Petit à petit. La deadline est pour vendredi.",
        ],
        difficulty: "hard",
      },
      {
        speaker: "system",
        french: "Courage ! Tu fais du télétravail demain ou tu vas au bureau ?",
        english: "Hang in there! Are you working from home tomorrow or going to the office?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Demain, je fais du télétravail. C'est plus pratique pour me concentrer.",
        english: "Tomorrow, I'm working from home. It's more practical for concentrating.",
        alternatives: [
          "Télétravail demain, c'est mieux pour se concentrer.",
          "Je reste à la maison demain pour mieux travailler.",
          "Du télétravail, j'ai besoin de calme pour finir le projet.",
        ],
        correction: "In French, 'faire du télétravail' is the standard phrase — not 'travailler de la maison' (though understood).",
        difficulty: "hard",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. MAKING PLANS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-plans-1",
    title: "Making Plans for the Weekend",
    titleFr: "Faire des plans pour le week-end",
    description: "Plan a weekend outing with a friend.",
    cefr: "A2",
    category: "Conversations",
    vocabularyHints: ["le week-end", "le cinéma", "le restaurant", "d'accord", "on pourrait"],
    dialogue: [
      {
        speaker: "system",
        french: "Tu fais quoi ce week-end ?",
        english: "What are you doing this weekend?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Je n'ai pas encore de plans. Tu as une idée ?",
        english: "I don't have plans yet. Do you have an idea?",
        alternatives: [
          "Rien de prévu. On fait quelque chose ?",
          "Pas grand-chose. Pourquoi ?",
          "Je suis libre. Tu veux faire quelque chose ?",
        ],
        difficulty: "easy",
      },
      {
        speaker: "system",
        french: "On pourrait aller au cinéma samedi soir. Il y a un nouveau film français.",
        english: "We could go to the cinema Saturday night. There's a new French film.",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Bonne idée ! À quelle heure est la séance ?",
        english: "Good idea! What time is the showing?",
        alternatives: [
          "D'accord ! C'est à quelle heure ?",
          "Super ! Il commence à quelle heure ?",
          "Ok, on y va à quelle heure ?",
        ],
        difficulty: "easy",
      },
      {
        speaker: "system",
        french: "Il y a une séance à vingt heures. Et après, on pourrait manger quelque part ?",
        english: "There's a showing at 8 PM. And after, we could eat somewhere?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Oui, je connais un bon restaurant japonais pas loin du cinéma.",
        english: "Yes, I know a good Japanese restaurant not far from the cinema.",
        alternatives: [
          "Bonne idée ! Je connais un endroit sympa à côté.",
          "On pourrait aller dans le nouveau restaurant japonais.",
          "Oui, il y a un bon restaurant dans le quartier.",
        ],
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Parfait ! On se retrouve devant le cinéma à dix-neuf heures quarante-cinq ?",
        english: "Perfect! Shall we meet in front of the cinema at 7:45?",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "D'accord, ça marche ! À samedi alors !",
        english: "OK, that works! See you Saturday then!",
        alternatives: [
          "Super, à samedi !",
          "Parfait, on se voit samedi !",
          "Ça me va. À samedi soir !",
        ],
        correction: "'Ça marche' is a very common casual way to say 'that works / deal'.",
        difficulty: "easy",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. EXPRESSING OPINIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-opinions-1",
    title: "Discussing Opinions",
    titleFr: "Exprimer ses opinions",
    description: "Share and discuss your opinions on daily topics.",
    cefr: "B1",
    category: "Opinions",
    vocabularyHints: ["je pense que", "à mon avis", "cependant", "je suis d'accord", "en revanche"],
    dialogue: [
      {
        speaker: "system",
        french: "Tu as vu les nouvelles ? Les gens travaillent de plus en plus de la maison.",
        english: "Did you see the news? People are working from home more and more.",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Oui, je pense que le télétravail a beaucoup d'avantages.",
        english: "Yes, I think remote work has many advantages.",
        alternatives: [
          "À mon avis, le télétravail est une bonne chose.",
          "Oui, je trouve que c'est positif.",
          "Je crois que c'est l'avenir du travail.",
        ],
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Quels avantages par exemple ?",
        english: "What advantages for example?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "D'abord, on gagne du temps parce qu'on n'a pas de trajet. Ensuite, on peut mieux se concentrer.",
        english: "First, you save time because there's no commute. Then, you can concentrate better.",
        alternatives: [
          "On ne perd pas de temps dans les transports, et on travaille plus tranquillement.",
          "Le trajet en moins et plus de concentration, par exemple.",
          "Par exemple, pas de transport et plus de liberté.",
        ],
        correction: "Using connectors like 'd'abord… ensuite…' makes your argument flow naturally.",
        difficulty: "hard",
      },
      {
        speaker: "system",
        french: "C'est vrai. Cependant, je pense que le contact humain manque parfois.",
        english: "That's true. However, I think human contact is sometimes missing.",
        difficulty: "hard",
      },
      {
        speaker: "user",
        french: "Je suis d'accord. En revanche, on peut organiser des rencontres régulières avec l'équipe.",
        english: "I agree. On the other hand, we can organize regular meetups with the team.",
        alternatives: [
          "C'est vrai, mais on peut quand même voir ses collègues de temps en temps.",
          "Oui, pourtant on peut trouver un équilibre entre les deux.",
          "Bien sûr. Malgré tout, il y a des solutions.",
        ],
        correction: "'En revanche' is a more elegant connector than 'mais' for presenting counterpoints.",
        difficulty: "hard",
      },
      {
        speaker: "system",
        french: "Tu as raison. Il faut trouver un bon équilibre entre les deux.",
        english: "You're right. We need to find a good balance between the two.",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Exactement. À mon avis, deux ou trois jours au bureau et le reste en télétravail, c'est l'idéal.",
        english: "Exactly. In my opinion, two or three days at the office and the rest remote is ideal.",
        alternatives: [
          "Oui, un mélange des deux serait parfait.",
          "Je pense que la formule hybride est la meilleure.",
          "L'équilibre parfait, c'est le mode hybride.",
        ],
        difficulty: "hard",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. AT A RESTAURANT (B1)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-restaurant-1",
    title: "Ordering at a Restaurant",
    titleFr: "Commander au restaurant",
    description: "Navigate a full restaurant interaction in French.",
    cefr: "B1",
    category: "Food",
    vocabularyHints: ["commander", "l'entrée", "le plat principal", "l'addition", "le pourboire"],
    dialogue: [
      {
        speaker: "system",
        french: "Bonsoir ! Vous avez réservé ?",
        english: "Good evening! Do you have a reservation?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Oui, j'ai réservé une table pour deux au nom de Sachin.",
        english: "Yes, I reserved a table for two under the name Sachin.",
        alternatives: [
          "Oui, une réservation pour deux. Au nom de Sachin.",
          "Oui, j'ai une réservation. Sachin, pour deux personnes.",
        ],
        difficulty: "easy",
      },
      {
        speaker: "system",
        french: "Très bien, suivez-moi. Voici le menu. Je vous laisse choisir.",
        english: "Very well, follow me. Here's the menu. I'll let you choose.",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Merci. Qu'est-ce que vous recommandez comme plat ?",
        english: "Thank you. What do you recommend?",
        alternatives: [
          "Merci. Quel est le plat du jour ?",
          "Qu'est-ce qui est bon ici ?",
          "Vous avez un plat que vous recommandez ?",
        ],
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Notre spécialité est le canard confit. C'est délicieux avec une sauce aux cerises.",
        english: "Our specialty is duck confit. It's delicious with a cherry sauce.",
        difficulty: "medium",
      },
      {
        speaker: "user",
        french: "Ça a l'air délicieux. Comme entrée, je voudrais la soupe à l'oignon. Et comme plat principal, le canard confit.",
        english: "That sounds delicious. For a starter, I'd like the onion soup. And for the main course, the duck confit.",
        alternatives: [
          "Je prends la soupe à l'oignon en entrée et le canard confit.",
          "Pour moi, la soupe à l'oignon et ensuite le canard.",
        ],
        correction: "Structure: 'Comme entrée, je voudrais…' then 'Et comme plat principal,…' — very polished ordering.",
        difficulty: "hard",
      },
      {
        speaker: "system",
        french: "Excellent choix ! Et comme boisson ?",
        english: "Excellent choice! And to drink?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Un verre de vin rouge, s'il vous plaît. Et une carafe d'eau.",
        english: "A glass of red wine, please. And a carafe of water.",
        alternatives: [
          "Un rouge et de l'eau, s'il vous plaît.",
          "Je voudrais du vin rouge et de l'eau.",
        ],
        correction: "In France, 'une carafe d'eau' gets you free tap water — no need to buy bottled!",
        difficulty: "medium",
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. MORNING ROUTINE CHAT (A2)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "conv-routine-1",
    title: "Describing Your Morning",
    titleFr: "Raconter sa matinée",
    description: "Describe your morning routine to a friend.",
    cefr: "A2",
    category: "Daily Routines",
    vocabularyHints: ["se réveiller", "se doucher", "petit-déjeuner", "se préparer", "partir"],
    dialogue: [
      {
        speaker: "system",
        french: "Tu es matinal ? Tu te lèves à quelle heure ?",
        english: "Are you a morning person? What time do you get up?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Je me réveille à six heures et demie. Je ne suis pas très matinal.",
        english: "I wake up at 6:30. I'm not much of a morning person.",
        alternatives: [
          "À six heures trente. Pas vraiment matinal.",
          "Je me lève vers six heures et demie.",
        ],
        difficulty: "easy",
      },
      {
        speaker: "system",
        french: "Et qu'est-ce que tu fais en premier ?",
        english: "And what do you do first?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "D'abord, je me douche. Ensuite, je prends mon petit-déjeuner.",
        english: "First, I shower. Then, I have my breakfast.",
        alternatives: [
          "Je commence par une douche, puis le petit-déjeuner.",
          "D'abord la douche, et ensuite je mange.",
        ],
        correction: "Reflexive verbs in daily routine: 'je me douche' (I shower myself), 'je m'habille' (I dress myself).",
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Qu'est-ce que tu manges au petit-déjeuner ?",
        english: "What do you eat for breakfast?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "D'habitude, je prends un café et des tartines avec du beurre. Parfois des œufs.",
        english: "Usually, I have a coffee and toast with butter. Sometimes eggs.",
        alternatives: [
          "Un café et du pain avec du beurre.",
          "Café noir et tartines, normalement.",
          "Des œufs et un café la plupart du temps.",
        ],
        difficulty: "medium",
      },
      {
        speaker: "system",
        french: "Et tu pars au travail à quelle heure ?",
        english: "And what time do you leave for work?",
        difficulty: "easy",
      },
      {
        speaker: "user",
        french: "Je pars vers huit heures. Le trajet dure environ trente minutes.",
        english: "I leave around eight. The commute takes about thirty minutes.",
        alternatives: [
          "Vers huit heures. Il me faut trente minutes pour arriver.",
          "À huit heures. Je mets une demi-heure.",
        ],
        difficulty: "medium",
      },
    ],
  },
];

// Helper to get scenarios by CEFR level
export function getScenariosByCEFR(level: string): ConversationScenario[] {
  return conversationScenarios.filter((s) => s.cefr === level);
}

// Helper to get scenarios by category
export function getScenariosByCategory(category: string): ConversationScenario[] {
  return conversationScenarios.filter((s) => s.category === category);
}
