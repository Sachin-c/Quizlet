import fs from 'fs';
import path from 'path';

// Verb definitions
// Format: [infinitive, english, group, auxiliary]
// group: 'er', 'ir' (regular), 're' (regular), 'irr'
// auxiliary: 'avoir' or 'etre'
const verbs = [
  // ━━━━━━━━━━━━━━━━━━━━━━
  // 1. Être Verbs (DR MRS VANDERTRAMP)
  // ━━━━━━━━━━━━━━━━━━━━━━
  ['aller', 'to go', 'aller', 'être'],
  ['arriver', 'to arrive', 'er', 'être'],
  ['descendre', 'to go down', 're', 'être'],
  ['devenir', 'to become', 'venir', 'être'],
  ['entrer', 'to enter', 'er', 'être'],
  ['monter', 'to go up', 'er', 'être'],
  ['mourir', 'to die', 'mourir', 'être'],
  ['naître', 'to be born', 'naître', 'être'],
  ['partir', 'to leave', 'partir', 'être'],
  ['rentrer', 'to return home', 'er', 'être'],
  ['rester', 'to stay', 'er', 'être'],
  ['retourner', 'to return', 'er', 'être'],
  ['revenir', 'to come back', 'venir', 'être'],
  ['sortir', 'to go out', 'sortir', 'être'],
  ['tomber', 'to fall', 'er', 'être'],
  ['venir', 'to come', 'venir', 'être'],

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 2. Regular -ER (Avoir)
  // ━━━━━━━━━━━━━━━━━━━━━━
  ['accepter', 'to accept', 'er', 'avoir'],
  ['aider', 'to help', 'er', 'avoir'],
  ['aimer', 'to like/love', 'er', 'avoir'],
  ['ajouter', 'to add', 'er', 'avoir'],
  ['apporter', 'to bring', 'er', 'avoir'],
  ['arrêter', 'to stop', 'er', 'avoir'],
  ['changer', 'to change', 'ger', 'avoir'],
  ['chanter', 'to sing', 'er', 'avoir'],
  ['chercher', 'to search/look for', 'er', 'avoir'],
  ['commencer', 'to start', 'cer', 'avoir'],
  ['continuer', 'to continue', 'er', 'avoir'],
  ['coûter', 'to cost', 'er', 'avoir'],
  ['décider', 'to decide', 'er', 'avoir'],
  ['demander', 'to ask', 'er', 'avoir'],
  ['donner', 'to give', 'er', 'avoir'],
  ['écouter', 'to listen', 'er', 'avoir'],
  ['enseigner', 'to teach', 'er', 'avoir'],
  ['espérer', 'to hope', 'esperer', 'avoir'],
  ['étudier', 'to study', 'er', 'avoir'],
  ['fermer', 'to close', 'er', 'avoir'],
  ['gagner', 'to win/earn', 'er', 'avoir'],
  ['garder', 'to keep', 'er', 'avoir'],
  ['habiter', 'to live', 'er', 'avoir'],
  ['inviter', 'to invite', 'er', 'avoir'],
  ['jouer', 'to play', 'er', 'avoir'],
  ['laisser', 'to leave/let', 'er', 'avoir'],
  ['laver', 'to wash', 'er', 'avoir'],
  ['manger', 'to eat', 'ger', 'avoir'],
  ['marcher', 'to walk', 'er', 'avoir'],
  ['montrer', 'to show', 'er', 'avoir'],
  ['oublier', 'to forget', 'er', 'avoir'],
  ['parler', 'to speak', 'er', 'avoir'],
  ['passer', 'to pass', 'er', 'avoir'],
  ['penser', 'to think', 'er', 'avoir'],
  ['pleurer', 'to cry', 'er', 'avoir'],
  ['porter', 'to carry/wear', 'er', 'avoir'],
  ['pousser', 'to push', 'er', 'avoir'],
  ['préparer', 'to prepare', 'er', 'avoir'],
  ['présenter', 'to present', 'er', 'avoir'],
  ['proposer', 'to propose', 'er', 'avoir'],
  ['regarder', 'to look/watch', 'er', 'avoir'],
  ['rencontrer', 'to meet', 'er', 'avoir'],
  ['réveiller', 'to wake up', 'er', 'avoir'],
  ['trouver', 'to find', 'er', 'avoir'],
  ['utiliser', 'to use', 'er', 'avoir'],
  ['voyager', 'to travel', 'ger', 'avoir'],

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 3. Regular -IR (Avoir)
  // ━━━━━━━━━━━━━━━━━━━━━━
  ['choisir', 'to choose', 'ir', 'avoir'],
  ['finir', 'to finish', 'ir', 'avoir'],
  ['grandir', 'to grow', 'ir', 'avoir'],
  ['grossir', 'to gain weight', 'ir', 'avoir'],
  ['investir', 'to invest', 'ir', 'avoir'],
  ['maigrir', 'to lose weight', 'ir', 'avoir'],
  ['nourrir', 'to feed', 'ir', 'avoir'],
  ['obéir', 'to obey', 'ir', 'avoir'],
  ['punir', 'to punish', 'ir', 'avoir'],
  ['réfléchir', 'to reflect/think', 'ir', 'avoir'],
  ['remplir', 'to fill', 'ir', 'avoir'],
  ['réussir', 'to succeed', 'ir', 'avoir'],

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 4. Regular -RE (Avoir)
  // ━━━━━━━━━━━━━━━━━━━━━━
  ['attendre', 'to wait', 're', 'avoir'],
  ['défendre', 'to defend', 're', 'avoir'],
  ['dépendre', 'to depend', 're', 'avoir'],
  ['entendre', 'to hear', 're', 'avoir'],
  ['perdre', 'to lose', 're', 'avoir'],
  ['rendre', 'to return/render', 're', 'avoir'],
  ['répondre', 'to answer', 're', 'avoir'],
  ['vendre', 'to sell', 're', 'avoir'],

  // ━━━━━━━━━━━━━━━━━━━━━━
  // 5. Irregular (Avoir)
  // ━━━━━━━━━━━━━━━━━━━━━━
  ['être', 'to be', 'etre', 'avoir'],
  ['avoir', 'to have', 'avoir', 'avoir'],
  ['faire', 'to do/make', 'faire', 'avoir'],
  ['dire', 'to say', 'dire', 'avoir'],
  ['pouvoir', 'to be able to', 'pouvoir', 'avoir'],
  ['vouloir', 'to want', 'vouloir', 'avoir'],
  ['savoir', 'to know (fact)', 'savoir', 'avoir'],
  ['connaître', 'to know (person)', 'connaitre', 'avoir'],
  ['devoir', 'to have to', 'devoir', 'avoir'],
  ['voir', 'to see', 'voir', 'avoir'],
  ['croire', 'to believe', 'croire', 'avoir'],
  ['prendre', 'to take', 'prendre', 'avoir'],
  ['apprendre', 'to learn', 'prendre', 'avoir'],
  ['comprendre', 'to understand', 'prendre', 'avoir'],
  ['mettre', 'to put', 'mettre', 'avoir'],
  ['permettre', 'to allow', 'mettre', 'avoir'],
  ['lire', 'to read', 'lire', 'avoir'],
  ['écrire', 'to write', 'ecrire', 'avoir'],
  ['boire', 'to drink', 'boire', 'avoir'],
  ['courir', 'to run', 'courir', 'avoir'],
  ['dormir', 'to sleep', 'dormir', 'avoir'],
  ['ouvrir', 'to open', 'ouvrir', 'avoir'],
  ['offrir', 'to offer', 'ouvrir', 'avoir'],
  ['recevoir', 'to receive', 'recevoir', 'avoir'],
  ['rire', 'to laugh', 'rire', 'avoir'],
  ['sourire', 'to smile', 'rire', 'avoir'],
  ['tenir', 'to hold', 'tenir', 'avoir'],
  ['vivre', 'to live', 'vivre', 'avoir'],
  ['suivre', 'to follow', 'suivre', 'avoir'],
];

// Helper to determine pronouns
const isVowel = (str) => /^[aeiouyhéèàâêîôû]/i.test(str);

const prons = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
const getPronoun = (idx, startsWithVowel) => {
  if (idx === 0) return startsWithVowel ? "j'" : "je ";
  return prons[idx] + ' ';
};

// Conjugation functions return array of 6 forms (strings)
function getPresent(verb, group) {
  let stem = '';
  switch (group) {
    case 'er':
      stem = verb.slice(0, -2);
      return [stem + 'e', stem + 'es', stem + 'e', stem + 'ons', stem + 'ez', stem + 'ent'];
    case 'ger':
      stem = verb.slice(0, -2);
      return [stem + 'e', stem + 'es', stem + 'e', stem + 'eons', stem + 'ez', stem + 'ent'];
    case 'cer':
      stem = verb.slice(0, -3);
      return [stem + 'ce', stem + 'ces', stem + 'ce', stem + 'çons', stem + 'cez', stem + 'cent'];
    case 'esperer':
      stem = verb.slice(0, -4);
      return [stem + 'ère', stem + 'ères', stem + 'ère', stem + 'érons', stem + 'érez', stem + 'èrent'];
    case 'ir':
      stem = verb.slice(0, -2);
      return [stem + 'is', stem + 'is', stem + 'it', stem + 'issons', stem + 'issez', stem + 'issent'];
    case 're':
      stem = verb.slice(0, -2);
      return [stem + 's', stem + 's', stem + '', stem + 'ons', stem + 'ez', stem + 'ent'];
    case 'aller': return ['vais', 'vas', 'va', 'allons', 'allez', 'vont'];
    case 'etre': return ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];
    case 'avoir': return ['ai', 'as', 'a', 'avons', 'avez', 'ont'];
    case 'faire': return ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'];
    case 'dire': return ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'];
    case 'pouvoir': return ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'];
    case 'vouloir': return ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'];
    case 'savoir': return ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'];
    case 'connaitre': return ['connais', 'connais', 'connaît', 'connaissons', 'connaissez', 'connaissent'];
    case 'devoir': return ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'];
    case 'voir': return ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'];
    case 'croire': return ['crois', 'crois', 'croit', 'croyons', 'croyez', 'croient'];
    case 'prendre':
      stem = verb.slice(0, -6);
      return [stem + 'prends', stem + 'prends', stem + 'prend', stem + 'prenons', stem + 'prenez', stem + 'prennent'];
    case 'mettre':
      stem = verb.slice(0, -6);
      return [stem + 'mets', stem + 'mets', stem + 'met', stem + 'mettons', stem + 'mettez', stem + 'mettent'];
    case 'lire': return ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'];
    case 'ecrire': return ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'];
    case 'boire': return ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'];
    case 'courir': return ['cours', 'cours', 'court', 'courons', 'courez', 'courent'];
    case 'dormir': return ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'];
    case 'ouvrir': return ['ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent'];
    case 'recevoir': return ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'];
    case 'rire': return ['ris', 'ris', 'rit', 'rions', 'riez', 'rient'];
    case 'tenir': return ['tiens', 'tiens', 'tient', 'tenons', 'tenez', 'tiennent'];
    case 'venir': return ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'];
    case 'vivre': return ['vis', 'vis', 'vit', 'vivons', 'vivez', 'vivent'];
    case 'suivre': return ['suis', 'suis', 'suit', 'suivons', 'suivez', 'suivent'];
    case 'mourir': return ['meurs', 'meurs', 'meurt', 'mourons', 'mourez', 'meurent'];
    case 'naître': return ['nais', 'nais', 'naît', 'naissons', 'naissez', 'naissent'];
    case 'partir': return ['pars', 'pars', 'part', 'partons', 'partez', 'partent'];
    case 'sortir': return ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'];
    default: return ['', '', '', '', '', ''];
  }
}

function getPastParticiple(verb, group) {
  switch (group) {
    case 'er': case 'ger': case 'cer': case 'esperer': case 'aller': return verb.slice(0, -2) + 'é';
    case 'ir': return verb.slice(0, -2) + 'i';
    case 're': return verb.slice(0, -2) + 'u';
    case 'etre': return 'été';
    case 'avoir': return 'eu';
    case 'faire': return 'fait';
    case 'dire': return 'dit';
    case 'pouvoir': return 'pu';
    case 'vouloir': return 'voulu';
    case 'savoir': return 'su';
    case 'connaitre': return verb.slice(0, -8) + 'connu';
    case 'devoir': return 'dû';
    case 'voir': return 'vu';
    case 'croire': return 'cru';
    case 'prendre': return verb.slice(0, -6) + 'pris';
    case 'mettre': return verb.slice(0, -6) + 'mis';
    case 'lire': return 'lu';
    case 'ecrire': return 'écrit';
    case 'boire': return 'bu';
    case 'courir': return 'couru';
    case 'dormir': return 'dormi';
    case 'ouvrir': return 'ouvert';
    case 'recevoir': return 'reçu';
    case 'rire': return 'ri';
    case 'tenir': return verb.slice(0, -5) + 'tenu';
    case 'venir': return verb.slice(0, -5) + 'venu';
    case 'vivre': return 'vécu';
    case 'suivre': return 'suivi';
    case 'mourir': return 'mort(e)';
    case 'naître': return 'né(e)';
    case 'partir': return 'parti(e)';
    case 'sortir': return 'sorti(e)';
    default: return verb;
  }
}

function getImparfaitStem(verb, group) {
  if (verb === 'être') return 'ét';
  const pres = getPresent(verb, group);
  return pres[3].slice(0, -3); // remove 'ons'
}

function getFutureStem(verb, group) {
  switch (group) {
    case 'aller': return 'ir';
    case 'etre': return 'ser';
    case 'avoir': return 'aur';
    case 'faire': return 'fer';
    case 'pouvoir': return 'pourr';
    case 'vouloir': return 'voudr';
    case 'savoir': return 'saur';
    case 'devoir': return 'devr';
    case 'voir': return 'verr';
    case 'recevoir': return 'recevr';
    case 'venir': return 'viendr';
    case 'tenir': return verb.replace('tenir', 'tiendr');
    case 'mourir': return 'mourr';
    default:
      if (verb.endsWith('re')) return verb.slice(0, -1);
      return verb;
  }
}

let generatedTS = 'import type { VerbTenseEntry } from "../types";\n\n';

const modules = {
  pres: []
};

let counter = 1;

for (const [verb, eng, group, aux] of verbs) {
  // PRESENT
  const presForms = getPresent(verb, group);
  const v = isVowel(presForms[0]);
  const presArray = prons.map((p, i) => `{ pronoun: "${getPronoun(i, v).trim()}", form: "${presForms[i]}" }`).join(', ');
  
  // Future Simple
  const fStem = getFutureStem(verb, group);
  const fForms = ['ai','as','a','ons','ez','ont'].map(e => fStem + e);
  const fsArray = prons.map((p, i) => `{ pronoun: "${getPronoun(i, isVowel(fForms[0])).trim()}", form: "${fForms[i]}" }`).join(', ');

  // Imparfait
  const iStem = getImparfaitStem(verb, group);
  let iForms = ['ais','ais','ait','ions','iez','aient'].map(e => iStem + e);
  if (group === 'ger') iForms = ['eais','eais','eait','ions','iez','eaient'].map(e => iStem + e);
  if (group === 'cer') iForms = ['çais','çais','çait','cions','ciez','çaient'].map(e => iStem.slice(0,-1) + e);
  const impArray = prons.map((p, i) => `{ pronoun: "${getPronoun(i, isVowel(iForms[0])).trim()}", form: "${iForms[i]}" }`).join(', ');

  // Passe Compose
  const pp = getPastParticiple(verb, group);
  // generate passe compose array
  let pcAux = aux === 'avoir' ? ['ai','as','a','avons','avez','ont'] : ['suis','es','est','sommes','êtes','sont'];
  let pcForms = [];
  for (let i=0; i<6; i++) {
    let auxForm = pcAux[i];
    let ppForm = pp;
    if (aux === 'être' && !pp.includes('(e)')) {
      if (i>=3) ppForm += 's';
      if (vVowelsOnly(ppForm, verb) && aux==='être') ppForm += "(e)(s)"; // just a rough approximation for standard etre verbs
    }
    pcForms.push(auxForm + " " + pp);
  }
  const isVPc = aux === 'avoir' ? true : false;
  const pcArray = prons.map((p, i) => `{ pronoun: "${getPronoun(i, isVPc && i===0).trim()}", form: "${pcForms[i]}" }`).join(', ');

  // Append to strings
  generatedTS += `export const mega_pres_${counter}: VerbTenseEntry = { id: "mega-pres-${counter}", infinitive: "${verb}", english: "${eng}", tense: "présent", cefr: "A2", conjugations: [${presArray}], examples: [] };\n`;
  generatedTS += `export const mega_fs_${counter}: VerbTenseEntry = { id: "mega-fs-${counter}", infinitive: "${verb}", english: "${eng}", tense: "futur_simple", cefr: "B1", conjugations: [${fsArray}], examples: [] };\n`;
  generatedTS += `export const mega_imp_${counter}: VerbTenseEntry = { id: "mega-imp-${counter}", infinitive: "${verb}", english: "${eng}", tense: "imparfait", cefr: "B1", conjugations: [${impArray}], examples: [] };\n`;
  generatedTS += `export const mega_pc_${counter}: VerbTenseEntry = { id: "mega-pc-${counter}", infinitive: "${verb}", english: "${eng}", tense: "passé_composé", cefr: "A2", auxiliary: "${aux}", conjugations: [${pcArray}], examples: [] };\n`;
  
  counter++;
}

function vVowelsOnly() { return false; }

generatedTS += `\nexport const megaPresent = [${Array.from({length:counter-1}, (_,i) => `mega_pres_${i+1}`).join(', ')}];\n`;
generatedTS += `export const megaFuturSimple = [${Array.from({length:counter-1}, (_,i) => `mega_fs_${i+1}`).join(', ')}];\n`;
generatedTS += `export const megaImparfait = [${Array.from({length:counter-1}, (_,i) => `mega_imp_${i+1}`).join(', ')}];\n`;

// Split PC by aux
const pcAvoir = [];
const pcEtre = [];
for (let i=0; i<verbs.length; i++) {
   if (verbs[i][3] === 'avoir') pcAvoir.push(`mega_pc_${i+1}`);
   else pcEtre.push(`mega_pc_${i+1}`);
}
generatedTS += `export const megaPasseAvoir = [${pcAvoir.join(', ')}];\n`;
generatedTS += `export const megaPasseEtre = [${pcEtre.join(', ')}];\n`;


fs.writeFileSync(path.join(process.cwd(), 'src/data/megaVerbs.ts'), generatedTS);
console.log('Successfully generated megaVerbs.ts with ' + verbs.length + ' verbs across 4 tenses!');
