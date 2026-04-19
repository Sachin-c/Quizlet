import type { VocabularyWord } from "../types";

// ================================================================
// VOCABULARY EXPANSION — A2, B1, B2
// Focused on: daily life, work, gym, opinions, connectors, abstract
// For a 20s professional learning French
// ================================================================

export const expandedVocabulary: VocabularyWord[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // WORK / PROFESSIONAL — A2
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-w1", french: "le bureau", english: "the office", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je travaille au bureau tous les jours.", exampleEnglish: "I work at the office every day.",
  },
  {
    id: "exp-w2", french: "la réunion", english: "the meeting", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "La réunion commence à dix heures.", exampleEnglish: "The meeting starts at ten o'clock.",
  },
  {
    id: "exp-w3", french: "le collègue", english: "the colleague", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Mon collègue est très sympa.", exampleEnglish: "My colleague is very nice.",
  },
  {
    id: "exp-w4", french: "le patron", english: "the boss", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Le patron veut nous voir.", exampleEnglish: "The boss wants to see us.",
  },
  {
    id: "exp-w5", french: "un projet", english: "a project", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je travaille sur un nouveau projet.", exampleEnglish: "I'm working on a new project.",
  },
  {
    id: "exp-w6", french: "un emploi", english: "a job", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Elle cherche un emploi à temps plein.", exampleEnglish: "She's looking for a full-time job.",
  },
  {
    id: "exp-w7", french: "le salaire", english: "the salary", category: "Work", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Le salaire est versé à la fin du mois.", exampleEnglish: "The salary is paid at the end of the month.",
  },
  {
    id: "exp-w8", french: "une deadline", english: "a deadline", category: "Work", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La deadline est vendredi prochain.", exampleEnglish: "The deadline is next Friday.",
  },
  {
    id: "exp-w9", french: "un entretien", english: "an interview", category: "Work", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "J'ai un entretien d'embauche demain.", exampleEnglish: "I have a job interview tomorrow.",
  },
  {
    id: "exp-w10", french: "démissionner", english: "to resign", category: "Work", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il a décidé de démissionner.", exampleEnglish: "He decided to resign.", isVerb: true,
  },
  {
    id: "exp-w11", french: "une augmentation", english: "a raise", category: "Work", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Elle a demandé une augmentation.", exampleEnglish: "She asked for a raise.",
  },
  {
    id: "exp-w12", french: "un stage", english: "an internship", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Il fait un stage dans une entreprise de tech.", exampleEnglish: "He's doing an internship at a tech company.",
  },
  {
    id: "exp-w13", french: "une entreprise", english: "a company", category: "Work", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Cette entreprise recrute des développeurs.", exampleEnglish: "This company is hiring developers.",
  },
  {
    id: "exp-w14", french: "le télétravail", english: "remote work", category: "Work", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je fais du télétravail deux jours par semaine.", exampleEnglish: "I work from home two days a week.",
  },
  {
    id: "exp-w15", french: "un CV", english: "a resume/CV", category: "Work", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "J'ai mis à jour mon CV.", exampleEnglish: "I updated my resume.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GYM / FITNESS — A2-B1
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-g1", french: "la salle de sport", english: "the gym", category: "Gym", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je vais à la salle de sport le matin.", exampleEnglish: "I go to the gym in the morning.",
  },
  {
    id: "exp-g2", french: "s'entraîner", english: "to work out / train", category: "Gym", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je m'entraîne quatre fois par semaine.", exampleEnglish: "I work out four times a week.", isVerb: true,
  },
  {
    id: "exp-g3", french: "les poids", english: "the weights", category: "Gym", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "J'ai soulevé des poids lourds aujourd'hui.", exampleEnglish: "I lifted heavy weights today.",
  },
  {
    id: "exp-g4", french: "un tapis roulant", english: "a treadmill", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je cours sur le tapis roulant.", exampleEnglish: "I run on the treadmill.",
  },
  {
    id: "exp-g5", french: "un échauffement", english: "a warm-up", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "L'échauffement est important avant l'exercice.", exampleEnglish: "A warm-up is important before exercise.",
  },
  {
    id: "exp-g6", french: "les abdominaux", english: "abs", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je fais des abdominaux tous les jours.", exampleEnglish: "I do abs every day.",
  },
  {
    id: "exp-g7", french: "une série", english: "a set (reps)", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je fais trois séries de dix répétitions.", exampleEnglish: "I do three sets of ten reps.",
  },
  {
    id: "exp-g8", french: "soulever", english: "to lift", category: "Gym", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Il soulève quatre-vingts kilos.", exampleEnglish: "He lifts eighty kilos.", isVerb: true,
  },
  {
    id: "exp-g9", french: "la musculation", english: "weight training", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La musculation aide à renforcer les muscles.", exampleEnglish: "Weight training helps strengthen muscles.",
  },
  {
    id: "exp-g10", french: "transpirer", english: "to sweat", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "J'ai beaucoup transpiré pendant le cours.", exampleEnglish: "I sweated a lot during the class.", isVerb: true,
  },
  {
    id: "exp-g11", french: "un banc de musculation", english: "a weight bench", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Le banc de musculation est libre.", exampleEnglish: "The weight bench is free.",
  },
  {
    id: "exp-g12", french: "une blessure", english: "an injury", category: "Gym", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Il a une blessure au genou.", exampleEnglish: "He has a knee injury.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DAILY ROUTINES — A2
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-dr1", french: "se réveiller", english: "to wake up", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je me réveille à six heures.", exampleEnglish: "I wake up at six o'clock.", isVerb: true,
  },
  {
    id: "exp-dr2", french: "se doucher", english: "to shower", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je me douche après le sport.", exampleEnglish: "I shower after working out.", isVerb: true,
  },
  {
    id: "exp-dr3", french: "s'habiller", english: "to get dressed", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Elle s'habille rapidement le matin.", exampleEnglish: "She gets dressed quickly in the morning.", isVerb: true,
  },
  {
    id: "exp-dr4", french: "faire la vaisselle", english: "to do the dishes", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "C'est ton tour de faire la vaisselle.", exampleEnglish: "It's your turn to do the dishes.",
  },
  {
    id: "exp-dr5", french: "faire les courses", english: "to go grocery shopping", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je fais les courses le samedi.", exampleEnglish: "I go grocery shopping on Saturdays.",
  },
  {
    id: "exp-dr6", french: "préparer le dîner", english: "to prepare dinner", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Ce soir, je prépare le dîner.", exampleEnglish: "Tonight, I'm preparing dinner.",
  },
  {
    id: "exp-dr7", french: "se coucher", english: "to go to bed", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je me couche vers onze heures.", exampleEnglish: "I go to bed around eleven o'clock.", isVerb: true,
  },
  {
    id: "exp-dr8", french: "faire le ménage", english: "to do housework", category: "Daily Routines", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Le dimanche, je fais le ménage.", exampleEnglish: "On Sundays, I do housework.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // OPINIONS & EMOTIONS — B1
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-o1", french: "je pense que", english: "I think that", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je pense que c'est une bonne idée.", exampleEnglish: "I think it's a good idea.",
  },
  {
    id: "exp-o2", french: "à mon avis", english: "in my opinion", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "À mon avis, ce film est excellent.", exampleEnglish: "In my opinion, this movie is excellent.",
  },
  {
    id: "exp-o3", french: "je suis d'accord", english: "I agree", category: "Opinions", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je suis tout à fait d'accord avec toi.", exampleEnglish: "I completely agree with you.",
  },
  {
    id: "exp-o4", french: "je ne suis pas d'accord", english: "I disagree", category: "Opinions", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je ne suis pas d'accord avec cette décision.", exampleEnglish: "I disagree with this decision.",
  },
  {
    id: "exp-o5", french: "il me semble que", english: "it seems to me that", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Il me semble que tu as raison.", exampleEnglish: "It seems to me that you're right.",
  },
  {
    id: "exp-o6", french: "je trouve que", english: "I find that", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je trouve que la vie à Paris est chère.", exampleEnglish: "I find that life in Paris is expensive.",
  },
  {
    id: "exp-o7", french: "je suis convaincu(e) que", english: "I am convinced that", category: "Opinions", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Je suis convaincu qu'on peut réussir.", exampleEnglish: "I'm convinced that we can succeed.",
  },
  {
    id: "exp-o8", french: "il est évident que", english: "it is obvious that", category: "Opinions", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il est évident que la situation va changer.", exampleEnglish: "It's obvious that the situation will change.",
  },
  {
    id: "exp-o9", french: "en revanche", english: "on the other hand", category: "Opinions", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Le prix est élevé. En revanche, la qualité est excellente.", exampleEnglish: "The price is high. On the other hand, the quality is excellent.",
  },
  {
    id: "exp-o10", french: "être déçu(e)", english: "to be disappointed", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je suis déçu par les résultats.", exampleEnglish: "I'm disappointed by the results.",
  },
  {
    id: "exp-o11", french: "être fier/fière", english: "to be proud", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je suis fier de mon travail.", exampleEnglish: "I'm proud of my work.",
  },
  {
    id: "exp-o12", french: "s'inquiéter", english: "to worry", category: "Opinions", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Ne t'inquiète pas, tout ira bien.", exampleEnglish: "Don't worry, everything will be fine.", isVerb: true,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CONNECTORS — B1-B2
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-c1", french: "cependant", english: "however", category: "Connectors", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Le projet est intéressant. Cependant, il est trop cher.", exampleEnglish: "The project is interesting. However, it is too expensive.",
  },
  {
    id: "exp-c2", french: "pourtant", english: "yet / nevertheless", category: "Connectors", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Il pleut, pourtant elle sort sans parapluie.", exampleEnglish: "It's raining, yet she goes out without an umbrella.",
  },
  {
    id: "exp-c3", french: "donc", english: "therefore / so", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Il est fatigué, donc il va se coucher.", exampleEnglish: "He's tired, so he's going to bed.",
  },
  {
    id: "exp-c4", french: "par conséquent", english: "consequently", category: "Connectors", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il n'a pas étudié, par conséquent il a échoué.", exampleEnglish: "He didn't study; consequently, he failed.",
  },
  {
    id: "exp-c5", french: "d'une part... d'autre part", english: "on one hand... on the other hand", category: "Connectors", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "D'une part, c'est pratique. D'autre part, c'est cher.", exampleEnglish: "On one hand, it's practical. On the other hand, it's expensive.",
  },
  {
    id: "exp-c6", french: "en fait", english: "actually / in fact", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "En fait, je préfère rester à la maison.", exampleEnglish: "Actually, I prefer to stay home.",
  },
  {
    id: "exp-c7", french: "d'abord", english: "first / firstly", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "D'abord, je prends un café.", exampleEnglish: "First, I have a coffee.",
  },
  {
    id: "exp-c8", french: "ensuite", english: "then / next", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Ensuite, je pars au travail.", exampleEnglish: "Then, I go to work.",
  },
  {
    id: "exp-c9", french: "enfin", english: "finally", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Enfin, je me couche.", exampleEnglish: "Finally, I go to bed.",
  },
  {
    id: "exp-c10", french: "malgré", english: "despite", category: "Connectors", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Malgré la pluie, nous sommes sortis.", exampleEnglish: "Despite the rain, we went out.",
  },
  {
    id: "exp-c11", french: "tandis que", english: "while / whereas", category: "Connectors", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il travaille tandis que je me repose.", exampleEnglish: "He works while I rest.",
  },
  {
    id: "exp-c12", french: "bien que", english: "although", category: "Connectors", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Bien qu'il soit fatigué, il continue de travailler.", exampleEnglish: "Although he is tired, he continues to work.",
  },
  {
    id: "exp-c13", french: "c'est-à-dire", english: "that is to say", category: "Connectors", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Il est bilingue, c'est-à-dire qu'il parle deux langues.", exampleEnglish: "He is bilingual, that is to say he speaks two languages.",
  },
  {
    id: "exp-c14", french: "par exemple", english: "for example", category: "Connectors", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "J'aime les fruits, par exemple les pommes.", exampleEnglish: "I like fruits, for example apples.",
  },
  {
    id: "exp-c15", french: "en plus", english: "moreover / besides", category: "Connectors", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "En plus, le restaurant est très bon.", exampleEnglish: "Moreover, the restaurant is very good.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ABSTRACT CONCEPTS — B1-B2
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-a1", french: "la liberté", english: "freedom", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La liberté d'expression est importante.", exampleEnglish: "Freedom of speech is important.",
  },
  {
    id: "exp-a2", french: "l'égalité", english: "equality", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "L'égalité entre les sexes est essentielle.", exampleEnglish: "Gender equality is essential.",
  },
  {
    id: "exp-a3", french: "la confiance", english: "confidence / trust", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "J'ai confiance en toi.", exampleEnglish: "I trust you.",
  },
  {
    id: "exp-a4", french: "l'ambition", english: "ambition", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Son ambition est de devenir médecin.", exampleEnglish: "His ambition is to become a doctor.",
  },
  {
    id: "exp-a5", french: "la responsabilité", english: "responsibility", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "C'est une grande responsabilité.", exampleEnglish: "It's a big responsibility.",
  },
  {
    id: "exp-a6", french: "un objectif", english: "a goal / objective", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Mon objectif est de parler couramment.", exampleEnglish: "My goal is to speak fluently.",
  },
  {
    id: "exp-a7", french: "la réussite", english: "success", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La réussite demande de la persévérance.", exampleEnglish: "Success requires perseverance.",
  },
  {
    id: "exp-a8", french: "un défi", english: "a challenge", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Apprendre une langue est un vrai défi.", exampleEnglish: "Learning a language is a real challenge.",
  },
  {
    id: "exp-a9", french: "la patience", english: "patience", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La patience est une vertu.", exampleEnglish: "Patience is a virtue.",
  },
  {
    id: "exp-a10", french: "l'expérience", english: "experience", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "L'expérience est le meilleur professeur.", exampleEnglish: "Experience is the best teacher.",
  },
  {
    id: "exp-a11", french: "une valeur", english: "a value", category: "Abstract", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Le respect est une valeur fondamentale.", exampleEnglish: "Respect is a fundamental value.",
  },
  {
    id: "exp-a12", french: "la conscience", english: "awareness / conscience", category: "Abstract", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il faut prendre conscience du problème.", exampleEnglish: "We must become aware of the problem.",
  },
  {
    id: "exp-a13", french: "la mentalité", english: "mentality / mindset", category: "Abstract", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il faut changer de mentalité.", exampleEnglish: "We need to change our mindset.",
  },
  {
    id: "exp-a14", french: "un compromis", english: "a compromise", category: "Abstract", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "Il faut trouver un compromis.", exampleEnglish: "We need to find a compromise.",
  },
  {
    id: "exp-a15", french: "l'engagement", english: "commitment", category: "Abstract", cefr: "B2", createdAt: Date.now(),
    exampleFrench: "L'engagement est la clé du succès.", exampleEnglish: "Commitment is the key to success.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MORE FOOD & COOKING — A2-B1
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-f1", french: "commander", english: "to order (food)", category: "Food", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Je voudrais commander, s'il vous plaît.", exampleEnglish: "I would like to order, please.", isVerb: true,
  },
  {
    id: "exp-f2", french: "une entrée", english: "a starter", category: "Food", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Comme entrée, je prends la soupe.", exampleEnglish: "For a starter, I'll have the soup.",
  },
  {
    id: "exp-f3", french: "le plat principal", english: "the main course", category: "Food", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Le plat principal est du saumon grillé.", exampleEnglish: "The main course is grilled salmon.",
  },
  {
    id: "exp-f4", french: "l'addition", english: "the bill/check", category: "Food", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "L'addition, s'il vous plaît.", exampleEnglish: "The bill, please.",
  },
  {
    id: "exp-f5", french: "un plat à emporter", english: "takeaway", category: "Food", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "On prend un plat à emporter ?", exampleEnglish: "Shall we get takeaway?",
  },
  {
    id: "exp-f6", french: "épicé(e)", english: "spicy", category: "Food", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Ce plat est trop épicé pour moi.", exampleEnglish: "This dish is too spicy for me.",
  },
  {
    id: "exp-f7", french: "végétarien(ne)", english: "vegetarian", category: "Food", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Avez-vous des plats végétariens ?", exampleEnglish: "Do you have vegetarian dishes?",
  },
  {
    id: "exp-f8", french: "un pourboire", english: "a tip", category: "Food", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "En France, le pourboire n'est pas obligatoire.", exampleEnglish: "In France, tipping is not mandatory.",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MORE TRAVEL — B1-B2
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-t1", french: "un itinéraire", english: "a route / itinerary", category: "Travel", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "J'ai préparé l'itinéraire du voyage.", exampleEnglish: "I prepared the itinerary for the trip.",
  },
  {
    id: "exp-t2", french: "une escale", english: "a layover / stopover", category: "Travel", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Il y a une escale à Amsterdam.", exampleEnglish: "There's a layover in Amsterdam.",
  },
  {
    id: "exp-t3", french: "annuler", english: "to cancel", category: "Travel", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "J'ai dû annuler ma réservation.", exampleEnglish: "I had to cancel my reservation.", isVerb: true,
  },
  {
    id: "exp-t4", french: "un hébergement", english: "accommodation", category: "Travel", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Nous cherchons un hébergement pas cher.", exampleEnglish: "We're looking for affordable accommodation.",
  },
  {
    id: "exp-t5", french: "un séjour", english: "a stay", category: "Travel", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Mon séjour à Paris était incroyable.", exampleEnglish: "My stay in Paris was incredible.",
  },
  {
    id: "exp-t6", french: "une destination", english: "a destination", category: "Travel", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Quelle est votre destination ?", exampleEnglish: "What is your destination?",
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HEALTH & WELLBEING — B1
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: "exp-h1", french: "la santé", english: "health", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "La santé est plus importante que l'argent.", exampleEnglish: "Health is more important than money.",
  },
  {
    id: "exp-h2", french: "un régime", english: "a diet", category: "Food", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Je suis un régime depuis un mois.", exampleEnglish: "I've been on a diet for a month.",
  },
  {
    id: "exp-h3", french: "le bien-être", english: "well-being", category: "Abstract", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Le sport contribue au bien-être.", exampleEnglish: "Exercise contributes to well-being.",
  },
  {
    id: "exp-h4", french: "le stress", english: "stress", category: "Abstract", cefr: "A2", createdAt: Date.now(),
    exampleFrench: "Le travail me cause beaucoup de stress.", exampleEnglish: "Work causes me a lot of stress.",
  },
  {
    id: "exp-h5", french: "se détendre", english: "to relax", category: "Daily Routines", cefr: "B1", createdAt: Date.now(),
    exampleFrench: "Le week-end, j'aime me détendre.", exampleEnglish: "On weekends, I like to relax.", isVerb: true,
  },
];
