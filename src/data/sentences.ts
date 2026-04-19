import type { CEFRLevel, Category } from "../types";

export interface Sentence {
  id: string;
  french: string;
  english: string;
  blankWord: string; // the word to blank out
  hint: string; // first 2-3 letters hint
  category: Category;
  cefr: CEFRLevel;
  difficulty: "easy" | "medium" | "hard";
}

// Comprehensive sentence bank — offline-first, no API needed
export const sentenceBank: Sentence[] = [
  // ============================
  //  THINGS — A1
  // ============================
  { id: "s1", french: "Je lis un livre intéressant.", english: "I'm reading an interesting book.", blankWord: "livre", hint: "liv", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s2", french: "Tu peux me prêter ton stylo ?", english: "Can you lend me your pen?", blankWord: "stylo", hint: "sty", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s3", french: "Mets le livre sur la table.", english: "Put the book on the table.", blankWord: "table", hint: "tab", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s4", french: "Asseyez-vous sur la chaise.", english: "Sit on the chair.", blankWord: "chaise", hint: "cha", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s5", french: "Ferme la porte, s'il te plaît.", english: "Close the door, please.", blankWord: "porte", hint: "por", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s6", french: "Ouvre la fenêtre, il fait chaud.", english: "Open the window, it's hot.", blankWord: "fenêtre", hint: "fen", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s7", french: "Où est ma clé de maison ?", english: "Where is my house key?", blankWord: "clé", hint: "cl", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s8", french: "Mon sac est très lourd.", english: "My bag is very heavy.", blankWord: "sac", hint: "sa", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s9", french: "J'ai perdu mon portefeuille.", english: "I lost my wallet.", blankWord: "portefeuille", hint: "por", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s10", french: "Je regarde mon téléphone.", english: "I am looking at my phone.", blankWord: "téléphone", hint: "tél", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s11", french: "L'ordinateur est sur le bureau.", english: "The computer is on the desk.", blankWord: "ordinateur", hint: "ord", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s12", french: "Je tape sur le clavier.", english: "I type on the keyboard.", blankWord: "clavier", hint: "cla", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s13", french: "La lampe éclaire la pièce.", english: "The lamp lights up the room.", blankWord: "lampe", hint: "lam", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s14", french: "Quelle heure est-il sur l'horloge ?", english: "What time is it on the clock?", blankWord: "horloge", hint: "hor", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s15", french: "Ma montre est cassée.", english: "My watch is broken.", blankWord: "montre", hint: "mon", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s16", french: "Il a besoin de ses lunettes pour lire.", english: "He needs his glasses to read.", blankWord: "lunettes", hint: "lun", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s17", french: "Je prends une photo avec mon appareil.", english: "I take a photo with my camera.", blankWord: "photo", hint: "pho", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s18", french: "Le miroir est dans la salle de bain.", english: "The mirror is in the bathroom.", blankWord: "miroir", hint: "mir", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s19", french: "Donne-moi le crayon, s'il te plaît.", english: "Give me the pencil, please.", blankWord: "crayon", hint: "cra", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s20", french: "Le parapluie est près de la porte.", english: "The umbrella is near the door.", blankWord: "parapluie", hint: "par", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s21", french: "J'ai acheté une nouvelle bouteille d'eau.", english: "I bought a new bottle of water.", blankWord: "bouteille", hint: "bou", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s22", french: "Le lit est très confortable.", english: "The bed is very comfortable.", blankWord: "lit", hint: "li", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s23", french: "Passe-moi la serviette, s'il te plaît.", english: "Pass me the towel, please.", blankWord: "serviette", hint: "ser", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s24", french: "J'ai oublié mon sac à dos à l'école.", english: "I forgot my backpack at school.", blankWord: "sac à dos", hint: "sac", category: "Things", cefr: "A1", difficulty: "medium" },

  // ============================
  //  THINGS — A2
  // ============================
  { id: "s25", french: "Le réfrigérateur est presque vide.", english: "The fridge is almost empty.", blankWord: "réfrigérateur", hint: "réf", category: "Things", cefr: "A2", difficulty: "hard" },
  { id: "s26", french: "Je fais chauffer le repas au micro-ondes.", english: "I heat up the meal in the microwave.", blankWord: "micro-ondes", hint: "mic", category: "Things", cefr: "A2", difficulty: "hard" },
  { id: "s27", french: "La casserole est sur le feu.", english: "The pot is on the stove.", blankWord: "casserole", hint: "cas", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s28", french: "Pose l'assiette sur la table.", english: "Put the plate on the table.", blankWord: "assiette", hint: "ass", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s29", french: "Passe-moi un verre d'eau, s'il te plaît.", english: "Pass me a glass of water, please.", blankWord: "verre", hint: "ver", category: "Things", cefr: "A2", difficulty: "easy" },
  { id: "s30", french: "Le couteau est très tranchant.", english: "The knife is very sharp.", blankWord: "couteau", hint: "cou", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s31", french: "Je mange avec une fourchette et un couteau.", english: "I eat with a fork and a knife.", blankWord: "fourchette", hint: "fou", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s32", french: "L'aspirateur fait beaucoup de bruit.", english: "The vacuum cleaner makes a lot of noise.", blankWord: "aspirateur", hint: "asp", category: "Things", cefr: "A2", difficulty: "hard" },

  // ============================
  //  FOOD — A1
  // ============================
  { id: "s33", french: "Je mange du pain tous les matins.", english: "I eat bread every morning.", blankWord: "pain", hint: "pa", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s34", french: "Elle boit du lait au petit-déjeuner.", english: "She drinks milk at breakfast.", blankWord: "lait", hint: "la", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s35", french: "Tu veux du fromage avec ton pain ?", english: "Do you want cheese with your bread?", blankWord: "fromage", hint: "fro", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s36", french: "J'adore manger des pommes.", english: "I love eating apples.", blankWord: "pommes", hint: "pom", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s37", french: "La soupe est très chaude.", english: "The soup is very hot.", blankWord: "soupe", hint: "sou", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s38", french: "J'ai acheté du poulet au marché.", english: "I bought chicken at the market.", blankWord: "poulet", hint: "pou", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s39", french: "Le riz est prêt pour le dîner.", english: "The rice is ready for dinner.", blankWord: "riz", hint: "ri", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s40", french: "Tu veux un peu de beurre ?", english: "Do you want some butter?", blankWord: "beurre", hint: "beu", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s41", french: "Je prends un café le matin.", english: "I have a coffee in the morning.", blankWord: "café", hint: "caf", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s42", french: "La salade est fraîche et délicieuse.", english: "The salad is fresh and delicious.", blankWord: "salade", hint: "sal", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s43", french: "Je veux de l'eau, s'il vous plaît.", english: "I want water, please.", blankWord: "eau", hint: "ea", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s44", french: "Le sucre est dans le placard.", english: "The sugar is in the cupboard.", blankWord: "sucre", hint: "suc", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s45", french: "Il y a du sel sur la table.", english: "There is salt on the table.", blankWord: "sel", hint: "se", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s46", french: "Je mange une orange pour le goûter.", english: "I eat an orange for a snack.", blankWord: "orange", hint: "ora", category: "Food", cefr: "A1", difficulty: "easy" },

  // ============================
  //  FOOD — A2
  // ============================
  { id: "s47", french: "Le poisson est grillé avec des herbes.", english: "The fish is grilled with herbs.", blankWord: "poisson", hint: "poi", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s48", french: "J'aime la confiture de fraises.", english: "I like strawberry jam.", blankWord: "confiture", hint: "con", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s49", french: "La pâtisserie fait de bons gâteaux.", english: "The pastry shop makes good cakes.", blankWord: "gâteaux", hint: "gât", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s50", french: "Je préfère le thé au café.", english: "I prefer tea over coffee.", blankWord: "thé", hint: "th", category: "Food", cefr: "A2", difficulty: "easy" },
  { id: "s51", french: "Les légumes sont bons pour la santé.", english: "Vegetables are good for health.", blankWord: "légumes", hint: "lég", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s52", french: "La viande est bien cuite.", english: "The meat is well done.", blankWord: "viande", hint: "via", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s53", french: "Il faut ajouter du poivre à la sauce.", english: "You need to add pepper to the sauce.", blankWord: "poivre", hint: "poi", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s54", french: "Je voudrais une glace à la vanille.", english: "I would like a vanilla ice cream.", blankWord: "glace", hint: "gla", category: "Food", cefr: "A2", difficulty: "easy" },

  // ============================
  //  CONVERSATIONS — A1
  // ============================
  { id: "s55", french: "Bonjour, comment allez-vous ?", english: "Hello, how are you?", blankWord: "Bonjour", hint: "Bon", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s56", french: "Je m'appelle Marie, et vous ?", english: "My name is Marie, and you?", blankWord: "appelle", hint: "app", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s57", french: "Merci beaucoup pour votre aide.", english: "Thank you very much for your help.", blankWord: "Merci", hint: "Mer", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s58", french: "Excusez-moi, où est la gare ?", english: "Excuse me, where is the train station?", blankWord: "gare", hint: "gar", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s59", french: "Je ne comprends pas, pouvez-vous répéter ?", english: "I don't understand, can you repeat?", blankWord: "comprends", hint: "com", category: "Conversations", cefr: "A1", difficulty: "medium" },
  { id: "s60", french: "S'il vous plaît, je voudrais l'addition.", english: "Please, I would like the bill.", blankWord: "addition", hint: "add", category: "Conversations", cefr: "A1", difficulty: "medium" },
  { id: "s61", french: "Parlez-vous anglais ?", english: "Do you speak English?", blankWord: "anglais", hint: "ang", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s62", french: "Oui, un peu, mais je préfère le français.", english: "Yes, a little, but I prefer French.", blankWord: "français", hint: "fra", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s63", french: "Au revoir, à bientôt !", english: "Goodbye, see you soon!", blankWord: "revoir", hint: "rev", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s64", french: "Bonne nuit, dormez bien.", english: "Good night, sleep well.", blankWord: "nuit", hint: "nu", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s65", french: "D'accord, je suis d'accord avec toi.", english: "OK, I agree with you.", blankWord: "accord", hint: "acc", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s66", french: "Quel âge avez-vous ?", english: "How old are you?", blankWord: "âge", hint: "âg", category: "Conversations", cefr: "A1", difficulty: "easy" },

  // ============================
  //  CONVERSATIONS — A2
  // ============================
  { id: "s67", french: "Pourriez-vous parler plus lentement ?", english: "Could you speak more slowly?", blankWord: "lentement", hint: "len", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s68", french: "Je suis en retard, je suis désolé.", english: "I'm late, I'm sorry.", blankWord: "retard", hint: "ret", category: "Conversations", cefr: "A2", difficulty: "easy" },
  { id: "s69", french: "Ça fait combien pour la chambre ?", english: "How much is it for the room?", blankWord: "chambre", hint: "cha", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s70", french: "J'aimerais réserver une table pour deux.", english: "I would like to book a table for two.", blankWord: "réserver", hint: "rés", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s71", french: "Pouvez-vous m'aider à trouver le chemin ?", english: "Can you help me find the way?", blankWord: "chemin", hint: "che", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s72", french: "J'ai un rendez-vous chez le médecin.", english: "I have an appointment at the doctor's.", blankWord: "rendez-vous", hint: "ren", category: "Conversations", cefr: "A2", difficulty: "hard" },
  { id: "s73", french: "Ce n'est pas grave, ne t'inquiète pas.", english: "It's not serious, don't worry.", blankWord: "grave", hint: "gra", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s74", french: "Félicitations pour votre nouveau travail !", english: "Congratulations on your new job!", blankWord: "travail", hint: "tra", category: "Conversations", cefr: "A2", difficulty: "easy" },

  // ============================
  //  COLOURS — A1
  // ============================
  { id: "s75", french: "Le ciel est bleu aujourd'hui.", english: "The sky is blue today.", blankWord: "bleu", hint: "bl", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s76", french: "Les roses sont rouges.", english: "Roses are red.", blankWord: "rouges", hint: "rou", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s77", french: "L'herbe est verte au printemps.", english: "Grass is green in spring.", blankWord: "verte", hint: "ver", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s78", french: "Le soleil est jaune et brillant.", english: "The sun is yellow and bright.", blankWord: "jaune", hint: "jau", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s79", french: "Elle porte une robe noire très élégante.", english: "She wears a very elegant black dress.", blankWord: "noire", hint: "noi", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s80", french: "La neige est blanche en hiver.", english: "Snow is white in winter.", blankWord: "blanche", hint: "bla", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s81", french: "Il conduit une voiture grise.", english: "He drives a grey car.", blankWord: "grise", hint: "gri", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s82", french: "Mon chat est orange et blanc.", english: "My cat is orange and white.", blankWord: "orange", hint: "ora", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s83", french: "J'aime beaucoup la couleur violet.", english: "I really like the color purple.", blankWord: "violet", hint: "vio", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s84", french: "Le drapeau français est bleu, blanc et rouge.", english: "The French flag is blue, white, and red.", blankWord: "blanc", hint: "bla", category: "Colours", cefr: "A1", difficulty: "easy" },

  // ============================
  //  COLOURS — A2
  // ============================
  { id: "s85", french: "Les murs de la chambre sont beige.", english: "The walls of the bedroom are beige.", blankWord: "beige", hint: "bei", category: "Colours", cefr: "A2", difficulty: "medium" },
  { id: "s86", french: "Il porte un costume bleu marine.", english: "He wears a navy blue suit.", blankWord: "marine", hint: "mar", category: "Colours", cefr: "A2", difficulty: "medium" },
  { id: "s87", french: "Cette fleur est rose pâle.", english: "This flower is pale pink.", blankWord: "rose", hint: "ros", category: "Colours", cefr: "A2", difficulty: "easy" },
  { id: "s88", french: "Le coucher de soleil est doré.", english: "The sunset is golden.", blankWord: "doré", hint: "dor", category: "Colours", cefr: "A2", difficulty: "medium" },

  // ============================
  //  ANIMALS — A1
  // ============================
  { id: "s89", french: "Le chat dort sur le canapé.", english: "The cat sleeps on the sofa.", blankWord: "chat", hint: "cha", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s90", french: "Mon chien aime courir dans le parc.", english: "My dog loves to run in the park.", blankWord: "chien", hint: "chi", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s91", french: "L'oiseau chante dans l'arbre.", english: "The bird sings in the tree.", blankWord: "oiseau", hint: "ois", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s92", french: "Le poisson nage dans l'aquarium.", english: "The fish swims in the aquarium.", blankWord: "poisson", hint: "poi", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s93", french: "La vache donne du lait.", english: "The cow gives milk.", blankWord: "vache", hint: "vac", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s94", french: "Le cheval galope dans le champ.", english: "The horse gallops in the field.", blankWord: "cheval", hint: "che", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s95", french: "Le lapin mange une carotte.", english: "The rabbit eats a carrot.", blankWord: "lapin", hint: "lap", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s96", french: "La poule est dans le poulailler.", english: "The hen is in the chicken coop.", blankWord: "poule", hint: "pou", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s97", french: "Le cochon est rose et gros.", english: "The pig is pink and fat.", blankWord: "cochon", hint: "coc", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s98", french: "Le mouton a de la laine blanche.", english: "The sheep has white wool.", blankWord: "mouton", hint: "mou", category: "Animals", cefr: "A1", difficulty: "easy" },

  // ============================
  //  ANIMALS — A2
  // ============================
  { id: "s99", french: "Le lion est le roi de la jungle.", english: "The lion is the king of the jungle.", blankWord: "lion", hint: "lio", category: "Animals", cefr: "A2", difficulty: "easy" },
  { id: "s100", french: "Le singe grimpe dans les arbres.", english: "The monkey climbs in the trees.", blankWord: "singe", hint: "sin", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s101", french: "L'éléphant est un animal très grand.", english: "The elephant is a very big animal.", blankWord: "éléphant", hint: "élé", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s102", french: "Le papillon a de belles ailes colorées.", english: "The butterfly has beautiful colored wings.", blankWord: "papillon", hint: "pap", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s103", french: "La tortue avance très lentement.", english: "The turtle moves very slowly.", blankWord: "tortue", hint: "tor", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s104", french: "Le renard est un animal rusé.", english: "The fox is a cunning animal.", blankWord: "renard", hint: "ren", category: "Animals", cefr: "A2", difficulty: "medium" },

  // ============================
  //  TRAVEL — A1
  // ============================
  { id: "s105", french: "Je vais à la gare pour prendre le train.", english: "I go to the station to take the train.", blankWord: "train", hint: "tra", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s106", french: "L'avion décolle à huit heures.", english: "The plane takes off at eight.", blankWord: "avion", hint: "avi", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s107", french: "Nous allons à l'hôtel ce soir.", english: "We are going to the hotel tonight.", blankWord: "hôtel", hint: "hôt", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s108", french: "Le bus arrive dans cinq minutes.", english: "The bus arrives in five minutes.", blankWord: "bus", hint: "bu", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s109", french: "Où est l'aéroport, s'il vous plaît ?", english: "Where is the airport, please?", blankWord: "aéroport", hint: "aér", category: "Travel", cefr: "A1", difficulty: "medium" },
  { id: "s110", french: "J'ai mon passeport dans mon sac.", english: "I have my passport in my bag.", blankWord: "passeport", hint: "pas", category: "Travel", cefr: "A1", difficulty: "medium" },
  { id: "s111", french: "La valise est trop grande pour la voiture.", english: "The suitcase is too big for the car.", blankWord: "valise", hint: "val", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s112", french: "Je cherche la sortie du métro.", english: "I'm looking for the subway exit.", blankWord: "métro", hint: "mét", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s113", french: "Le taxi nous attend dehors.", english: "The taxi is waiting for us outside.", blankWord: "taxi", hint: "tax", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s114", french: "Nous regardons la carte pour trouver la route.", english: "We look at the map to find the road.", blankWord: "carte", hint: "car", category: "Travel", cefr: "A1", difficulty: "easy" },

  // ============================
  //  TRAVEL — A2
  // ============================
  { id: "s115", french: "Le vol a été annulé à cause du mauvais temps.", english: "The flight was cancelled due to bad weather.", blankWord: "vol", hint: "vo", category: "Travel", cefr: "A2", difficulty: "easy" },
  { id: "s116", french: "Je voudrais réserver une chambre pour deux nuits.", english: "I would like to book a room for two nights.", blankWord: "chambre", hint: "cha", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s117", french: "Le billet de train coûte vingt euros.", english: "The train ticket costs twenty euros.", blankWord: "billet", hint: "bil", category: "Travel", cefr: "A2", difficulty: "easy" },
  { id: "s118", french: "Nous visitons un musée ce matin.", english: "We are visiting a museum this morning.", blankWord: "musée", hint: "mus", category: "Travel", cefr: "A2", difficulty: "easy" },
  { id: "s119", french: "L'excursion en bateau est très agréable.", english: "The boat trip is very pleasant.", blankWord: "bateau", hint: "bat", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s120", french: "Il faut prendre la correspondance à la prochaine station.", english: "You need to transfer at the next station.", blankWord: "correspondance", hint: "cor", category: "Travel", cefr: "A2", difficulty: "hard" },
  { id: "s121", french: "Le voyage en train dure trois heures.", english: "The train journey lasts three hours.", blankWord: "voyage", hint: "voy", category: "Travel", cefr: "A2", difficulty: "easy" },
  { id: "s122", french: "Nous avons besoin d'un guide touristique.", english: "We need a tourist guide.", blankWord: "guide", hint: "gui", category: "Travel", cefr: "A2", difficulty: "easy" },

  // ============================
  //  FAMILY — A1
  // ============================
  { id: "s123", french: "Ma mère prépare le dîner.", english: "My mother is preparing dinner.", blankWord: "mère", hint: "mèr", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s124", french: "Mon père travaille à Paris.", english: "My father works in Paris.", blankWord: "père", hint: "pèr", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s125", french: "J'ai une grande sœur et un petit frère.", english: "I have a big sister and a little brother.", blankWord: "sœur", hint: "sœ", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s126", french: "Mon frère joue au football.", english: "My brother plays football.", blankWord: "frère", hint: "frè", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s127", french: "Ma grand-mère habite à la campagne.", english: "My grandmother lives in the countryside.", blankWord: "grand-mère", hint: "gra", category: "Family", cefr: "A1", difficulty: "medium" },
  { id: "s128", french: "Mon grand-père raconte de belles histoires.", english: "My grandfather tells beautiful stories.", blankWord: "grand-père", hint: "gra", category: "Family", cefr: "A1", difficulty: "medium" },
  { id: "s129", french: "Les enfants jouent dans le jardin.", english: "The children play in the garden.", blankWord: "enfants", hint: "enf", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s130", french: "Toute la famille se réunit pour Noël.", english: "The whole family gets together for Christmas.", blankWord: "famille", hint: "fam", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s131", french: "Le bébé dort dans son berceau.", english: "The baby sleeps in its crib.", blankWord: "bébé", hint: "béb", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s132", french: "Mon oncle habite à Lyon.", english: "My uncle lives in Lyon.", blankWord: "oncle", hint: "onc", category: "Family", cefr: "A1", difficulty: "easy" },

  // ============================
  //  FAMILY — A2
  // ============================
  { id: "s133", french: "Ma tante vient nous rendre visite dimanche.", english: "My aunt is coming to visit us on Sunday.", blankWord: "tante", hint: "tan", category: "Family", cefr: "A2", difficulty: "easy" },
  { id: "s134", french: "Mon cousin a le même âge que moi.", english: "My cousin is the same age as me.", blankWord: "cousin", hint: "cou", category: "Family", cefr: "A2", difficulty: "easy" },
  { id: "s135", french: "Les parents sont fiers de leurs enfants.", english: "The parents are proud of their children.", blankWord: "parents", hint: "par", category: "Family", cefr: "A2", difficulty: "easy" },
  { id: "s136", french: "Mon neveu a trois ans.", english: "My nephew is three years old.", blankWord: "neveu", hint: "nev", category: "Family", cefr: "A2", difficulty: "medium" },
  { id: "s137", french: "Ma nièce est très intelligente.", english: "My niece is very smart.", blankWord: "nièce", hint: "niè", category: "Family", cefr: "A2", difficulty: "medium" },
  { id: "s138", french: "Mon beau-frère travaille dans un hôpital.", english: "My brother-in-law works in a hospital.", blankWord: "beau-frère", hint: "bea", category: "Family", cefr: "A2", difficulty: "hard" },

  // ============================
  //  CLOTHING — A1
  // ============================
  { id: "s139", french: "Il fait froid, mets ton manteau.", english: "It's cold, put on your coat.", blankWord: "manteau", hint: "man", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s140", french: "Elle porte une belle robe bleue.", english: "She wears a beautiful blue dress.", blankWord: "robe", hint: "rob", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s141", french: "Où sont mes chaussures noires ?", english: "Where are my black shoes?", blankWord: "chaussures", hint: "cha", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s142", french: "J'ai acheté un nouveau pantalon.", english: "I bought new pants.", blankWord: "pantalon", hint: "pan", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s143", french: "Il porte une chemise blanche au bureau.", english: "He wears a white shirt to the office.", blankWord: "chemise", hint: "che", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s144", french: "Mon pull est très chaud.", english: "My sweater is very warm.", blankWord: "pull", hint: "pu", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s145", french: "Il porte un chapeau en été.", english: "He wears a hat in summer.", blankWord: "chapeau", hint: "cha", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s146", french: "Je cherche ma ceinture marron.", english: "I'm looking for my brown belt.", blankWord: "ceinture", hint: "cei", category: "Clothing", cefr: "A1", difficulty: "medium" },
  { id: "s147", french: "N'oublie pas tes chaussettes !", english: "Don't forget your socks!", blankWord: "chaussettes", hint: "cha", category: "Clothing", cefr: "A1", difficulty: "medium" },
  { id: "s148", french: "Cette jupe est trop courte.", english: "This skirt is too short.", blankWord: "jupe", hint: "jup", category: "Clothing", cefr: "A1", difficulty: "easy" },

  // ============================
  //  CLOTHING — A2
  // ============================
  { id: "s149", french: "L'écharpe en laine est très douce.", english: "The wool scarf is very soft.", blankWord: "écharpe", hint: "éch", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s150", french: "Je porte des bottes quand il pleut.", english: "I wear boots when it rains.", blankWord: "bottes", hint: "bot", category: "Clothing", cefr: "A2", difficulty: "easy" },
  { id: "s151", french: "Le costume est parfait pour l'entretien.", english: "The suit is perfect for the interview.", blankWord: "costume", hint: "cos", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s152", french: "Elle porte un gilet par-dessus sa chemise.", english: "She wears a cardigan over her shirt.", blankWord: "gilet", hint: "gil", category: "Clothing", cefr: "A2", difficulty: "medium" },

  // ============================
  //  VERBS — A1 (common verbs in sentences)
  // ============================
  { id: "s153", french: "Je mange une pomme chaque jour.", english: "I eat an apple every day.", blankWord: "mange", hint: "man", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s154", french: "Elle boit un verre de jus d'orange.", english: "She drinks a glass of orange juice.", blankWord: "boit", hint: "bo", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s155", french: "Nous parlons français en classe.", english: "We speak French in class.", blankWord: "parlons", hint: "par", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s156", french: "Je lis un livre avant de dormir.", english: "I read a book before sleeping.", blankWord: "lis", hint: "li", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s157", french: "Ils vont au cinéma ce soir.", english: "They are going to the cinema tonight.", blankWord: "vont", hint: "vo", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s158", french: "Tu fais tes devoirs après l'école.", english: "You do your homework after school.", blankWord: "fais", hint: "fa", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s159", french: "Elle chante une chanson française.", english: "She sings a French song.", blankWord: "chante", hint: "cha", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s160", french: "Je dors huit heures par nuit.", english: "I sleep eight hours per night.", blankWord: "dors", hint: "dor", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s161", french: "Il regarde la télévision le soir.", english: "He watches television in the evening.", blankWord: "regarde", hint: "reg", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s162", french: "Nous écoutons de la musique ensemble.", english: "We listen to music together.", blankWord: "écoutons", hint: "éco", category: "Verbs", cefr: "A1", difficulty: "medium" },

  // ============================
  //  VERBS — A2
  // ============================
  { id: "s163", french: "Elle apprend le piano depuis deux ans.", english: "She has been learning piano for two years.", blankWord: "apprend", hint: "app", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s164", french: "Je choisis toujours le même restaurant.", english: "I always choose the same restaurant.", blankWord: "choisis", hint: "cho", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s165", french: "Ils attendent le bus depuis vingt minutes.", english: "They have been waiting for the bus for twenty minutes.", blankWord: "attendent", hint: "att", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s166", french: "Nous devons partir avant midi.", english: "We must leave before noon.", blankWord: "devons", hint: "dev", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s167", french: "Tu connais la réponse à cette question ?", english: "Do you know the answer to this question?", blankWord: "connais", hint: "con", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s168", french: "Elle conduit prudemment sur l'autoroute.", english: "She drives carefully on the highway.", blankWord: "conduit", hint: "con", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s169", french: "Il oublie souvent ses clés.", english: "He often forgets his keys.", blankWord: "oublie", hint: "oub", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s170", french: "Nous recevons des amis pour le dîner.", english: "We are hosting friends for dinner.", blankWord: "recevons", hint: "rec", category: "Verbs", cefr: "A2", difficulty: "hard" },

  // ============================
  //  B1 — Mixed Categories (expanding for A2+ learners)
  // ============================
  { id: "s171", french: "Le quartier est calme et agréable.", english: "The neighborhood is quiet and pleasant.", blankWord: "quartier", hint: "qua", category: "Things", cefr: "B1", difficulty: "medium" },
  { id: "s172", french: "L'ambiance du restaurant était chaleureuse.", english: "The restaurant's atmosphere was warm.", blankWord: "ambiance", hint: "amb", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s173", french: "Il faut protéger l'environnement.", english: "We must protect the environment.", blankWord: "environnement", hint: "env", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s174", french: "Elle a obtenu son diplôme avec mention.", english: "She got her degree with honors.", blankWord: "diplôme", hint: "dip", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s175", french: "La recette demande du beurre et de la farine.", english: "The recipe requires butter and flour.", blankWord: "recette", hint: "rec", category: "Food", cefr: "B1", difficulty: "medium" },
  { id: "s176", french: "Le paysage de montagne est magnifique.", english: "The mountain landscape is magnificent.", blankWord: "paysage", hint: "pay", category: "Travel", cefr: "B1", difficulty: "medium" },
  { id: "s177", french: "Le dauphin est un mammifère marin intelligent.", english: "The dolphin is an intelligent marine mammal.", blankWord: "dauphin", hint: "dau", category: "Animals", cefr: "B1", difficulty: "hard" },
  { id: "s178", french: "Les échantillons de tissu sont sur la table.", english: "The fabric samples are on the table.", blankWord: "tissu", hint: "tis", category: "Clothing", cefr: "B1", difficulty: "medium" },

  // ============================
  //  More A1-A2 sentences for density
  // ============================
  { id: "s179", french: "Le professeur explique la leçon.", english: "The teacher explains the lesson.", blankWord: "professeur", hint: "pro", category: "Conversations", cefr: "A1", difficulty: "medium" },
  { id: "s180", french: "L'école est fermée le dimanche.", english: "School is closed on Sunday.", blankWord: "école", hint: "éco", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s181", french: "J'habite dans une grande ville.", english: "I live in a big city.", blankWord: "ville", hint: "vil", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s182", french: "Il pleut beaucoup en automne.", english: "It rains a lot in autumn.", blankWord: "pleut", hint: "ple", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s183", french: "La boulangerie ouvre à sept heures.", english: "The bakery opens at seven o'clock.", blankWord: "boulangerie", hint: "bou", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s184", french: "Je cuisine un gâteau au chocolat.", english: "I'm baking a chocolate cake.", blankWord: "gâteau", hint: "gât", category: "Food", cefr: "A2", difficulty: "easy" },
  { id: "s185", french: "Le marché est ouvert le samedi matin.", english: "The market is open on Saturday morning.", blankWord: "marché", hint: "mar", category: "Food", cefr: "A2", difficulty: "easy" },
  { id: "s186", french: "Nous prenons le petit-déjeuner ensemble.", english: "We have breakfast together.", blankWord: "petit-déjeuner", hint: "pet", category: "Food", cefr: "A1", difficulty: "hard" },
  { id: "s187", french: "Il fait beau, allons nous promener.", english: "The weather is nice, let's go for a walk.", blankWord: "promener", hint: "pro", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s188", french: "La pharmacie est à côté de la banque.", english: "The pharmacy is next to the bank.", blankWord: "pharmacie", hint: "pha", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s189", french: "Je prends une douche le matin.", english: "I take a shower in the morning.", blankWord: "douche", hint: "dou", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s190", french: "Le jardin est plein de fleurs.", english: "The garden is full of flowers.", blankWord: "jardin", hint: "jar", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s191", french: "Elle porte un t-shirt et un jean.", english: "She wears a t-shirt and jeans.", blankWord: "jean", hint: "jea", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s192", french: "Les gants sont indispensables en hiver.", english: "Gloves are essential in winter.", blankWord: "gants", hint: "gan", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s193", french: "Le canard nage dans l'étang.", english: "The duck swims in the pond.", blankWord: "canard", hint: "can", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s194", french: "L'abeille fait du miel.", english: "The bee makes honey.", blankWord: "abeille", hint: "abe", category: "Animals", cefr: "A2", difficulty: "medium" },
  { id: "s195", french: "Le dentiste m'a donné un rendez-vous.", english: "The dentist gave me an appointment.", blankWord: "dentiste", hint: "den", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s196", french: "La bibliothèque est un endroit calme.", english: "The library is a quiet place.", blankWord: "bibliothèque", hint: "bib", category: "Conversations", cefr: "A2", difficulty: "hard" },
  { id: "s197", french: "Le facteur apporte le courrier chaque matin.", english: "The postman brings the mail every morning.", blankWord: "facteur", hint: "fac", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s198", french: "J'adore les croissants du matin.", english: "I love morning croissants.", blankWord: "croissants", hint: "cro", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s199", french: "Le dessert était délicieux.", english: "The dessert was delicious.", blankWord: "dessert", hint: "des", category: "Food", cefr: "A2", difficulty: "easy" },
  { id: "s200", french: "Nous visitons la cathédrale demain.", english: "We are visiting the cathedral tomorrow.", blankWord: "cathédrale", hint: "cat", category: "Travel", cefr: "A2", difficulty: "hard" },

  // ============================
  //  EXPANSION — Multiple sentences per word + new words
  // ============================
  // --- More THINGS ---
  { id: "s201", french: "J'ai laissé mon livre à la maison.", english: "I left my book at home.", blankWord: "livre", hint: "liv", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s202", french: "Ce livre est très intéressant à lire.", english: "This book is very interesting to read.", blankWord: "livre", hint: "liv", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s203", french: "La table de la cuisine est en bois.", english: "The kitchen table is made of wood.", blankWord: "table", hint: "tab", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s204", french: "Il y a une chaise libre ici.", english: "There is a free chair here.", blankWord: "chaise", hint: "cha", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s205", french: "N'oublie pas de fermer la porte à clé.", english: "Don't forget to lock the door.", blankWord: "porte", hint: "por", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s206", french: "La fenêtre de ma chambre donne sur le jardin.", english: "My bedroom window overlooks the garden.", blankWord: "fenêtre", hint: "fen", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s207", french: "Mon téléphone ne marche plus.", english: "My phone doesn't work anymore.", blankWord: "téléphone", hint: "tél", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s208", french: "Le bureau est couvert de papiers.", english: "The desk is covered with papers.", blankWord: "bureau", hint: "bur", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s209", french: "Éteins la lumière quand tu sors.", english: "Turn off the light when you leave.", blankWord: "lumière", hint: "lum", category: "Things", cefr: "A1", difficulty: "medium" },
  { id: "s210", french: "Le savon sent très bon.", english: "The soap smells very good.", blankWord: "savon", hint: "sav", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s211", french: "Je range mes affaires dans le tiroir.", english: "I put my things in the drawer.", blankWord: "tiroir", hint: "tir", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s212", french: "Le canapé du salon est très confortable.", english: "The living room sofa is very comfortable.", blankWord: "canapé", hint: "can", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s213", french: "Le tapis est doux sous mes pieds.", english: "The carpet is soft under my feet.", blankWord: "tapis", hint: "tap", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s214", french: "L'étagère est pleine de livres.", english: "The shelf is full of books.", blankWord: "étagère", hint: "éta", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s215", french: "Le rideau bloque la lumière du soleil.", english: "The curtain blocks the sunlight.", blankWord: "rideau", hint: "rid", category: "Things", cefr: "A2", difficulty: "medium" },

  // --- More FOOD ---
  { id: "s216", french: "Je mange du pain avec du beurre.", english: "I eat bread with butter.", blankWord: "pain", hint: "pa", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s217", french: "Le fromage français est délicieux.", english: "French cheese is delicious.", blankWord: "fromage", hint: "fro", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s218", french: "Je bois du lait chaud avant de dormir.", english: "I drink warm milk before sleeping.", blankWord: "lait", hint: "la", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s219", french: "La tarte aux pommes est ma préférée.", english: "Apple pie is my favorite.", blankWord: "tarte", hint: "tar", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s220", french: "Elle ajoute du miel dans son thé.", english: "She adds honey to her tea.", blankWord: "miel", hint: "mi", category: "Food", cefr: "A2", difficulty: "easy" },
  { id: "s221", french: "Les pâtes sont prêtes en dix minutes.", english: "The pasta is ready in ten minutes.", blankWord: "pâtes", hint: "pât", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s222", french: "Nous mangeons des crêpes le dimanche.", english: "We eat crêpes on Sunday.", blankWord: "crêpes", hint: "crê", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s223", french: "Le chocolat chaud est parfait en hiver.", english: "Hot chocolate is perfect in winter.", blankWord: "chocolat", hint: "cho", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s224", french: "J'ai commandé une pizza pour ce soir.", english: "I ordered a pizza for tonight.", blankWord: "pizza", hint: "piz", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s225", french: "Le jus d'orange est frais et naturel.", english: "The orange juice is fresh and natural.", blankWord: "jus", hint: "ju", category: "Food", cefr: "A1", difficulty: "easy" },
  { id: "s226", french: "La cerise est un petit fruit rouge.", english: "The cherry is a small red fruit.", blankWord: "cerise", hint: "cer", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s227", french: "Il coupe les oignons pour la soupe.", english: "He cuts the onions for the soup.", blankWord: "oignons", hint: "oig", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s228", french: "Les champignons poussent dans la forêt.", english: "Mushrooms grow in the forest.", blankWord: "champignons", hint: "cha", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s229", french: "La crème fraîche rend la sauce onctueuse.", english: "Sour cream makes the sauce creamy.", blankWord: "crème", hint: "crè", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s230", french: "Je prends une baguette à la boulangerie.", english: "I get a baguette from the bakery.", blankWord: "baguette", hint: "bag", category: "Food", cefr: "A1", difficulty: "easy" },

  // --- More CONVERSATIONS ---
  { id: "s231", french: "Comment tu t'appelles ?", english: "What is your name?", blankWord: "appelles", hint: "app", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s232", french: "D'où venez-vous exactement ?", english: "Where exactly are you from?", blankWord: "venez", hint: "ven", category: "Conversations", cefr: "A1", difficulty: "medium" },
  { id: "s233", french: "Qu'est-ce que vous faites dans la vie ?", english: "What do you do for a living?", blankWord: "faites", hint: "fai", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s234", french: "Je suis étudiant à l'université.", english: "I am a student at the university.", blankWord: "étudiant", hint: "étu", category: "Conversations", cefr: "A1", difficulty: "medium" },
  { id: "s235", french: "Le temps est magnifique aujourd'hui.", english: "The weather is beautiful today.", blankWord: "temps", hint: "tem", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s236", french: "Je suis fatigué après le travail.", english: "I am tired after work.", blankWord: "fatigué", hint: "fat", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s237", french: "Est-ce que tu as le temps de m'aider ?", english: "Do you have time to help me?", blankWord: "temps", hint: "tem", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s238", french: "Je voudrais payer par carte bancaire.", english: "I would like to pay by credit card.", blankWord: "carte", hint: "car", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s239", french: "Combien coûte cette robe bleue ?", english: "How much does this blue dress cost?", blankWord: "coûte", hint: "coû", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s240", french: "Je ne suis pas d'accord avec toi.", english: "I don't agree with you.", blankWord: "accord", hint: "acc", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s241", french: "C'est une bonne idée pour le projet.", english: "It's a good idea for the project.", blankWord: "idée", hint: "idé", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s242", french: "Quelle est ta couleur préférée ?", english: "What is your favorite color?", blankWord: "couleur", hint: "cou", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s243", french: "Je suis content de te rencontrer.", english: "I am happy to meet you.", blankWord: "content", hint: "con", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s244", french: "L'examen est très difficile cette année.", english: "The exam is very difficult this year.", blankWord: "difficile", hint: "dif", category: "Conversations", cefr: "A2", difficulty: "medium" },

  // --- More COLOURS ---
  { id: "s245", french: "Sa voiture est rouge vif.", english: "His car is bright red.", blankWord: "rouge", hint: "rou", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s246", french: "Les nuages deviennent gris avant la pluie.", english: "Clouds become grey before rain.", blankWord: "gris", hint: "gri", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s247", french: "Les feuilles deviennent marron en automne.", english: "Leaves turn brown in autumn.", blankWord: "marron", hint: "mar", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s248", french: "J'ai peint ma chambre en bleu clair.", english: "I painted my room light blue.", blankWord: "bleu", hint: "bl", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s249", french: "Elle a les yeux verts.", english: "She has green eyes.", blankWord: "verts", hint: "ver", category: "Colours", cefr: "A1", difficulty: "easy" },

  // --- More ANIMALS ---
  { id: "s250", french: "Mon chat aime dormir au soleil.", english: "My cat likes to sleep in the sun.", blankWord: "chat", hint: "cha", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s251", french: "Le chien aboie quand quelqu'un arrive.", english: "The dog barks when someone arrives.", blankWord: "chien", hint: "chi", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s252", french: "L'araignée tisse sa toile dans le coin.", english: "The spider weaves its web in the corner.", blankWord: "araignée", hint: "ara", category: "Animals", cefr: "A2", difficulty: "hard" },
  { id: "s253", french: "Le loup vit dans la forêt.", english: "The wolf lives in the forest.", blankWord: "loup", hint: "lou", category: "Animals", cefr: "A2", difficulty: "easy" },
  { id: "s254", french: "La grenouille saute dans la mare.", english: "The frog jumps in the pond.", blankWord: "grenouille", hint: "gre", category: "Animals", cefr: "A2", difficulty: "hard" },
  { id: "s255", french: "L'écureuil cache des noisettes.", english: "The squirrel hides hazelnuts.", blankWord: "écureuil", hint: "écu", category: "Animals", cefr: "A2", difficulty: "hard" },
  { id: "s256", french: "Le tigre est un animal sauvage.", english: "The tiger is a wild animal.", blankWord: "tigre", hint: "tig", category: "Animals", cefr: "A2", difficulty: "easy" },
  { id: "s257", french: "La souris a peur du chat.", english: "The mouse is afraid of the cat.", blankWord: "souris", hint: "sou", category: "Animals", cefr: "A1", difficulty: "easy" },
  { id: "s258", french: "Le perroquet peut parler comme les humains.", english: "The parrot can talk like humans.", blankWord: "perroquet", hint: "per", category: "Animals", cefr: "A2", difficulty: "medium" },

  // --- More TRAVEL ---
  { id: "s259", french: "Le train part à quelle heure ?", english: "What time does the train leave?", blankWord: "train", hint: "tra", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s260", french: "L'hôtel se trouve près de la plage.", english: "The hotel is near the beach.", blankWord: "plage", hint: "pla", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s261", french: "La réception de l'hôtel est au rez-de-chaussée.", english: "The hotel reception is on the ground floor.", blankWord: "réception", hint: "réc", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s262", french: "Le bagage est dans le coffre de la voiture.", english: "The luggage is in the car trunk.", blankWord: "bagage", hint: "bag", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s263", french: "Je voudrais un aller-retour pour Lyon.", english: "I would like a round trip to Lyon.", blankWord: "aller-retour", hint: "all", category: "Travel", cefr: "A2", difficulty: "hard" },
  { id: "s264", french: "La frontière est à deux heures de route.", english: "The border is two hours drive away.", blankWord: "frontière", hint: "fro", category: "Travel", cefr: "B1", difficulty: "hard" },
  { id: "s265", french: "Le quai numéro trois est à gauche.", english: "Platform number three is on the left.", blankWord: "quai", hint: "qu", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s266", french: "Nous louons une voiture pour les vacances.", english: "We are renting a car for the holidays.", blankWord: "louons", hint: "lou", category: "Travel", cefr: "A2", difficulty: "medium" },
  { id: "s267", french: "Le monument est très ancien et impressionnant.", english: "The monument is very old and impressive.", blankWord: "monument", hint: "mon", category: "Travel", cefr: "A2", difficulty: "medium" },

  // --- More FAMILY ---
  { id: "s268", french: "Ma mère cuisine très bien.", english: "My mother cooks very well.", blankWord: "mère", hint: "mèr", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s269", french: "Mon père m'apprend à conduire.", english: "My father is teaching me to drive.", blankWord: "père", hint: "pèr", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s270", french: "Ma sœur est plus grande que moi.", english: "My sister is taller than me.", blankWord: "sœur", hint: "sœ", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s271", french: "Mon frère fait ses devoirs dans sa chambre.", english: "My brother does his homework in his room.", blankWord: "frère", hint: "frè", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s272", french: "Les grands-parents gardent les enfants ce soir.", english: "The grandparents are watching the kids tonight.", blankWord: "grands-parents", hint: "gra", category: "Family", cefr: "A2", difficulty: "hard" },
  { id: "s273", french: "Notre fille apprend à marcher.", english: "Our daughter is learning to walk.", blankWord: "fille", hint: "fil", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s274", french: "Mon fils joue avec ses amis.", english: "My son plays with his friends.", blankWord: "fils", hint: "fi", category: "Family", cefr: "A1", difficulty: "easy" },
  { id: "s275", french: "Le mari de ma sœur est très gentil.", english: "My sister's husband is very kind.", blankWord: "mari", hint: "mar", category: "Family", cefr: "A2", difficulty: "easy" },
  { id: "s276", french: "Sa femme travaille dans une école.", english: "His wife works in a school.", blankWord: "femme", hint: "fem", category: "Family", cefr: "A1", difficulty: "easy" },

  // --- More CLOTHING ---
  { id: "s277", french: "Il fait chaud, je mets un short.", english: "It's hot, I'm putting on shorts.", blankWord: "short", hint: "sho", category: "Clothing", cefr: "A1", difficulty: "easy" },
  { id: "s278", french: "Elle porte de jolies boucles d'oreilles.", english: "She wears pretty earrings.", blankWord: "boucles", hint: "bou", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s279", french: "Mon manteau est accroché dans l'entrée.", english: "My coat is hanging in the hallway.", blankWord: "manteau", hint: "man", category: "Clothing", cefr: "A1", difficulty: "medium" },
  { id: "s280", french: "Les sandales sont parfaites pour l'été.", english: "Sandals are perfect for summer.", blankWord: "sandales", hint: "san", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s281", french: "La cravate va très bien avec la chemise.", english: "The tie goes very well with the shirt.", blankWord: "cravate", hint: "cra", category: "Clothing", cefr: "A2", difficulty: "medium" },
  { id: "s282", french: "Je mets un bonnet quand il neige.", english: "I wear a beanie when it snows.", blankWord: "bonnet", hint: "bon", category: "Clothing", cefr: "A2", difficulty: "easy" },

  // --- More VERBS ---
  { id: "s283", french: "Je comprends bien le français maintenant.", english: "I understand French well now.", blankWord: "comprends", hint: "com", category: "Verbs", cefr: "A1", difficulty: "medium" },
  { id: "s284", french: "Elle écrit une lettre à son ami.", english: "She writes a letter to her friend.", blankWord: "écrit", hint: "écr", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s285", french: "Nous courons dans le parc chaque matin.", english: "We run in the park every morning.", blankWord: "courons", hint: "cou", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s286", french: "Il prend le bus pour aller travailler.", english: "He takes the bus to go to work.", blankWord: "prend", hint: "pre", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s287", french: "Tu sais nager dans la piscine ?", english: "Can you swim in the pool?", blankWord: "nager", hint: "nag", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s288", french: "Elle dessine un portrait magnifique.", english: "She draws a magnificent portrait.", blankWord: "dessine", hint: "des", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s289", french: "Ils voyagent en Europe cet été.", english: "They are traveling in Europe this summer.", blankWord: "voyagent", hint: "voy", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s290", french: "Je crois que tu as raison.", english: "I think you are right.", blankWord: "crois", hint: "cro", category: "Verbs", cefr: "A2", difficulty: "easy" },
  { id: "s291", french: "Elle achète des fleurs pour sa mère.", english: "She buys flowers for her mother.", blankWord: "achète", hint: "ach", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s292", french: "Il ouvre la boîte avec précaution.", english: "He opens the box carefully.", blankWord: "ouvre", hint: "ouv", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s293", french: "Nous vendons notre maison.", english: "We are selling our house.", blankWord: "vendons", hint: "ven", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s294", french: "Ils construisent un nouveau pont.", english: "They are building a new bridge.", blankWord: "construisent", hint: "con", category: "Verbs", cefr: "B1", difficulty: "hard" },
  { id: "s295", french: "Elle pense souvent à ses vacances.", english: "She often thinks about her holidays.", blankWord: "pense", hint: "pen", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s296", french: "Je préfère rester à la maison ce soir.", english: "I prefer to stay home tonight.", blankWord: "préfère", hint: "pré", category: "Verbs", cefr: "A2", difficulty: "medium" },
  { id: "s297", french: "Nous commençons le cours à neuf heures.", english: "We start the class at nine.", blankWord: "commençons", hint: "com", category: "Verbs", cefr: "A2", difficulty: "hard" },
  { id: "s298", french: "Il essaie de réparer la voiture.", english: "He tries to fix the car.", blankWord: "essaie", hint: "ess", category: "Verbs", cefr: "A2", difficulty: "medium" },

  // --- DAILY LIFE A1-A2 ---
  { id: "s299", french: "Je me réveille à sept heures.", english: "I wake up at seven.", blankWord: "réveille", hint: "rév", category: "Verbs", cefr: "A1", difficulty: "medium" },
  { id: "s300", french: "Elle se brosse les dents après manger.", english: "She brushes her teeth after eating.", blankWord: "dents", hint: "den", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s301", french: "Je prends le petit-déjeuner à huit heures.", english: "I have breakfast at eight.", blankWord: "petit-déjeuner", hint: "pet", category: "Food", cefr: "A1", difficulty: "hard" },
  { id: "s302", french: "Il se couche tard le vendredi soir.", english: "He goes to bed late on Friday night.", blankWord: "couche", hint: "cou", category: "Verbs", cefr: "A1", difficulty: "easy" },
  { id: "s303", french: "Nous dînerons dans un restaurant italien.", english: "We will dine at an Italian restaurant.", blankWord: "restaurant", hint: "res", category: "Food", cefr: "A2", difficulty: "medium" },
  { id: "s304", french: "La piscine est ouverte en été.", english: "The pool is open in summer.", blankWord: "piscine", hint: "pis", category: "Things", cefr: "A2", difficulty: "easy" },
  { id: "s305", french: "Mon voisin a un grand jardin.", english: "My neighbor has a big garden.", blankWord: "voisin", hint: "voi", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s306", french: "La rue est très animée le soir.", english: "The street is very lively in the evening.", blankWord: "rue", hint: "ru", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s307", french: "Le supermarché ferme à vingt-et-une heures.", english: "The supermarket closes at nine PM.", blankWord: "supermarché", hint: "sup", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s308", french: "Je fais mes courses le samedi.", english: "I do my shopping on Saturday.", blankWord: "courses", hint: "cou", category: "Conversations", cefr: "A1", difficulty: "easy" },

  // --- WEATHER/NATURE A1-A2 ---
  { id: "s309", french: "Il neige beaucoup en montagne.", english: "It snows a lot in the mountains.", blankWord: "neige", hint: "nei", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s310", french: "Le soleil brille dans le ciel.", english: "The sun shines in the sky.", blankWord: "soleil", hint: "sol", category: "Colours", cefr: "A1", difficulty: "easy" },
  { id: "s311", french: "Les fleurs poussent au printemps.", english: "Flowers grow in spring.", blankWord: "fleurs", hint: "fle", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s312", french: "La mer est calme aujourd'hui.", english: "The sea is calm today.", blankWord: "mer", hint: "me", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s313", french: "Les étoiles brillent dans la nuit.", english: "The stars shine in the night.", blankWord: "étoiles", hint: "éto", category: "Things", cefr: "A2", difficulty: "medium" },
  { id: "s314", french: "L'orage arrive avec de gros nuages.", english: "The storm comes with big clouds.", blankWord: "orage", hint: "ora", category: "Conversations", cefr: "A2", difficulty: "medium" },

  // --- NUMBERS/TIME A1-A2 ---
  { id: "s315", french: "Il est midi, c'est l'heure du déjeuner.", english: "It's noon, it's lunchtime.", blankWord: "midi", hint: "mid", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s316", french: "La réunion commence dans une heure.", english: "The meeting starts in one hour.", blankWord: "heure", hint: "heu", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s317", french: "Mon anniversaire est en décembre.", english: "My birthday is in December.", blankWord: "anniversaire", hint: "ann", category: "Family", cefr: "A1", difficulty: "medium" },
  { id: "s318", french: "Nous sommes lundi aujourd'hui.", english: "Today is Monday.", blankWord: "lundi", hint: "lun", category: "Conversations", cefr: "A1", difficulty: "easy" },

  // --- PLACES A1-A2 ---
  { id: "s319", french: "Le cinéma est au centre-ville.", english: "The cinema is in the city center.", blankWord: "cinéma", hint: "cin", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s320", french: "La banque est fermée le dimanche.", english: "The bank is closed on Sunday.", blankWord: "banque", hint: "ban", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s321", french: "L'hôpital est à dix minutes d'ici.", english: "The hospital is ten minutes from here.", blankWord: "hôpital", hint: "hôp", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s322", french: "Le parc est très beau au printemps.", english: "The park is very beautiful in spring.", blankWord: "parc", hint: "par", category: "Travel", cefr: "A1", difficulty: "easy" },
  { id: "s323", french: "L'église du village est très ancienne.", english: "The village church is very old.", blankWord: "église", hint: "égl", category: "Travel", cefr: "A2", difficulty: "medium" },

  // --- EMOTIONS/FEELINGS A1-A2 ---
  { id: "s324", french: "Je suis très heureux de te voir.", english: "I am very happy to see you.", blankWord: "heureux", hint: "heu", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s325", french: "Elle est triste parce qu'il pleut.", english: "She is sad because it's raining.", blankWord: "triste", hint: "tri", category: "Conversations", cefr: "A1", difficulty: "easy" },
  { id: "s326", french: "Il est en colère contre son frère.", english: "He is angry at his brother.", blankWord: "colère", hint: "col", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s327", french: "Les enfants sont surpris par le cadeau.", english: "The children are surprised by the gift.", blankWord: "surpris", hint: "sur", category: "Conversations", cefr: "A2", difficulty: "medium" },
  { id: "s328", french: "J'ai peur du noir.", english: "I am afraid of the dark.", blankWord: "peur", hint: "peu", category: "Conversations", cefr: "A1", difficulty: "easy" },

  // --- BODY PARTS A1 ---
  { id: "s329", french: "J'ai mal à la tête.", english: "I have a headache.", blankWord: "tête", hint: "têt", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s330", french: "Il se lave les mains avant de manger.", english: "He washes his hands before eating.", blankWord: "mains", hint: "mai", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s331", french: "Elle a de beaux yeux bleus.", english: "She has beautiful blue eyes.", blankWord: "yeux", hint: "ye", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s332", french: "Le bébé a de petits pieds.", english: "The baby has small feet.", blankWord: "pieds", hint: "pie", category: "Things", cefr: "A1", difficulty: "easy" },
  { id: "s333", french: "Il porte un sac sur le dos.", english: "He carries a bag on his back.", blankWord: "dos", hint: "do", category: "Things", cefr: "A1", difficulty: "easy" },

  // --- More B1 stretch ---
  { id: "s334", french: "Le spectacle commence à vingt heures.", english: "The show starts at eight PM.", blankWord: "spectacle", hint: "spe", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s335", french: "La pollution est un problème grave.", english: "Pollution is a serious problem.", blankWord: "pollution", hint: "pol", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s336", french: "Il faut économiser l'énergie.", english: "We must save energy.", blankWord: "économiser", hint: "éco", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s337", french: "Je cherche un appartement à louer.", english: "I am looking for an apartment to rent.", blankWord: "appartement", hint: "app", category: "Things", cefr: "B1", difficulty: "medium" },
  { id: "s338", french: "Le médecin m'a prescrit des médicaments.", english: "The doctor prescribed me medication.", blankWord: "médicaments", hint: "méd", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s339", french: "La technologie change le monde.", english: "Technology changes the world.", blankWord: "technologie", hint: "tec", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s340", french: "Il a réussi son entretien d'embauche.", english: "He passed his job interview.", blankWord: "entretien", hint: "ent", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s341", french: "Le gouvernement propose de nouvelles lois.", english: "The government proposes new laws.", blankWord: "gouvernement", hint: "gou", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s342", french: "La société évolue rapidement.", english: "Society evolves rapidly.", blankWord: "société", hint: "soc", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s343", french: "Je suis passionné par la musique classique.", english: "I am passionate about classical music.", blankWord: "passionné", hint: "pas", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s344", french: "Le bénévolat est une activité enrichissante.", english: "Volunteering is a rewarding activity.", blankWord: "bénévolat", hint: "bén", category: "Conversations", cefr: "B1", difficulty: "hard" },
  { id: "s345", french: "La culture française est riche et diverse.", english: "French culture is rich and diverse.", blankWord: "culture", hint: "cul", category: "Conversations", cefr: "B1", difficulty: "medium" },
  { id: "s346", french: "Le concombre est un légume rafraîchissant.", english: "The cucumber is a refreshing vegetable.", blankWord: "concombre", hint: "con", category: "Food", cefr: "B1", difficulty: "medium" },
  { id: "s347", french: "Elle porte un imperméable quand il pleut.", english: "She wears a raincoat when it rains.", blankWord: "imperméable", hint: "imp", category: "Clothing", cefr: "B1", difficulty: "hard" },
  { id: "s348", french: "Le hibou chasse la nuit.", english: "The owl hunts at night.", blankWord: "hibou", hint: "hib", category: "Animals", cefr: "B1", difficulty: "medium" },
  { id: "s349", french: "La baleine est le plus grand animal marin.", english: "The whale is the largest marine animal.", blankWord: "baleine", hint: "bal", category: "Animals", cefr: "B1", difficulty: "medium" },
  { id: "s350", french: "Le phare guide les bateaux la nuit.", english: "The lighthouse guides boats at night.", blankWord: "phare", hint: "pha", category: "Travel", cefr: "B1", difficulty: "medium" },
];

// Helper to get all available categories from the sentence bank
export function getSentenceCategories(): Category[] {
  const cats = new Set<Category>();
  sentenceBank.forEach(s => cats.add(s.category));
  return Array.from(cats);
}

// Helper to get all available levels from the sentence bank
export function getSentenceLevels(): CEFRLevel[] {
  const levels = new Set<CEFRLevel>();
  sentenceBank.forEach(s => levels.add(s.cefr));
  return Array.from(levels).sort();
}
