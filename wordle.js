const readline = require('readline');


// publicly available:
//const words = require('./pt-5-natura.json');       // likely PT words
const words = require('./en-5-google-10k.json'); // likely EN words
//const words = require('./en-5-scowl.json');      // likely and unlikely EN words

// these are from existing games thereofre I'm not making them available myself O:)
//const words = require('./words-pt-palavra-do-dia').all;
//const words = require('./words-en-wordle').all;


////////////////

// TERMINAL COLORS
/*const C_RED = '\x1b[31m';
const C_YELLOW = '\x1b[33m';
const C_GREEN = '\x1b[32m';
const C_DEFAULT = '\x1b[0m';
const C_RIGHT = `${C_GREEN}O${C_DEFAULT}`;
const C_EXISTS = `${C_YELLOW}O${C_DEFAULT}`;
const C_NONE_OF_THESE = `${C_RED}O${C_DEFAULT}`;
const [RIGHT, EXISTS, NONE_OF_THESE] = [C_RIGHT, C_EXISTS, C_NONE_OF_THESE];*/

// EMOJIS (DON'T WORK WELL IN WINDOWS)
/*const E_RIGHT = `🟩`;
const E_EXISTS = `🟨`;
const E_NONE_OF_THESE = `⬛`;
const [RIGHT, EXISTS, NONE_OF_THESE] = [E_RIGHT, E_EXISTS, E_NONE_OF_THESE];*/

// ASCII
const A_RIGHT = `O`;
const A_EXISTS = `.`;
const A_NONE_OF_THESE = `_`;
const [RIGHT, EXISTS, NONE_OF_THESE] = [A_RIGHT, A_EXISTS, A_NONE_OF_THESE];

////////////////



function to26(word) {
    return word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const toAccents = {};   // 1 to many
const fromAccents = {}; // 1 to 1

for (let w of words) {
    //console.log(`${w} -> ${to26(w)}`);
    const w26 = to26(w);
    fromAccents[w] = w26;
    let bag = toAccents[w26];
    if (!bag) toAccents[w26] = bag = [];
    bag.push(w);
}

const words26 = Object.keys(toAccents);

console.log(`Loaded dictionary\n# words   : ${words.length}\n# words 26: ${words26.length}`);

function randomN(n) {
    return Math.floor( n * Math.random() );
}

function pickOneOf(arr) {
    return arr[ randomN(arr.length) ];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function evaluateGuess(guess, secret26) {
    const feedback = [];
    for (let i = 0; i < guess.length; ++i) {
        const guessLetter = guess[i];
        const secretLetter = secret26[i];
        const letterAtRightPlace = guessLetter === secretLetter;
        const letterAtWrongPlace = !letterAtRightPlace && secret26.indexOf(guessLetter) !== -1;
        feedback.push(
            letterAtRightPlace ? RIGHT :
            letterAtWrongPlace ? EXISTS :
            NONE_OF_THESE
        );
    }
    return feedback;
}

function addCriteriaFromEvaluation(guess, feedback, criteria) {
    for (let i = 0; i < guess.length; ++i) {
        const guessLetter = guess[i];
        const feedbackLetter = feedback[i];
        if (feedbackLetter === RIGHT) {
            criteria[i] = `(w[${i}] === '${guessLetter}')`;
        }
        else if (feedbackLetter === EXISTS) {
            criteria[i] = `(w[${i}] !== '${guessLetter}' && w.indexOf('${guessLetter}') !== -1)`;
        }
        else {
            const subExpr = ` && (w.indexOf('${guessLetter}') === -1)`;
            if (criteria[guess.length].indexOf(subExpr) === -1) {
                criteria[guess.length] += subExpr;
            }
        }
    }
    return criteria;
}

function criteriaToFilterFunction(criteria) {
    console.log('criteria', criteria);
    const l = criteria.length;
    const expr = (criteria.map((c, i) => `${c}${i !== l-1 ? ' && ' : ''}`)).join('');
    return new Function(`const w = arguments[0]; return (${expr})`);
}

function getArrayOfConstants(arraySize, constant) {
    return Array.from( new Array(arraySize+1).join(1) ).map(()=>constant);
}



async function runGame(cheat) {
    const rl = readline.createInterface(process.stdin, process.stdout);

    function getWord(question) {
        return new Promise(resolve => {
            rl.question(question, (answer) => {
                resolve(answer.split(' ')[0]);
            });
        });
    }

    const secret = cheat ? getArrayOfConstants(5, 'a').join('') : pickOneOf(words);
    const secret26 = to26(secret);
    let roundNum = 1;
    
    // we're holding space of a dedicated expression per local character + 1 where we update characters we know appear nowhere
    // the expressions may result in a bit of redundancy but are easy to follow and evaluate
    let criteria = getArrayOfConstants(secret26.length + 1, 'true');
    let universe = [...words26];

    while (true) {
        const guess = to26( await getWord(`Your guess at #${roundNum}? `) );
        //console.log(guess, secret26, secret);

        if (guess.length !== secret26.length) {
            console.log(`Secret word has ${secret26.length} letters!`);
        }
        else if (words26.indexOf(guess) === -1) {
            console.log('Unknown word!');
        }
        else if (guess === secret26) {
            console.log(`It was ${secret} and you found it in ${roundNum} attempts!`);
            return;
        }
        else {
            const feedback = cheat ? (await getWord(`Feedback you got ( ${secret.length} x [ ${RIGHT}, ${EXISTS} or ${NONE_OF_THESE} ] )? `)).split('') : evaluateGuess(guess, secret26);
            console.log(`feedback: ${feedback.join('')}`);
            criteria = addCriteriaFromEvaluation(guess, feedback, criteria);
            const fn = criteriaToFilterFunction(criteria);
            universe = words26.filter(fn);
            shuffle(universe);
            console.log(`# of possibilities: ${universe.length}`);
            console.log(`sample of 10: ${universe.slice(0, 10)}`);
            ++roundNum;
        }
    }
}

// If cheat is set to true, you're not playing against a word the computer picked
// You're instead making the computer help you filter the wordlist universe with the feedback you get from an external game
runGame(false);
