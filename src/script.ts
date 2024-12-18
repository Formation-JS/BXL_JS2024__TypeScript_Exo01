// Les éléments DOM
const container = document.getElementById('container') as HTMLDivElement;

// Le typage
type TrouveMot = {
    name: string,
    categorie: string
} 

// Constante
const MAX_FAIL = 6;

// Variable
let mysteryWord : string;
let letterWord : string[];
let nbFail : number;

//TODO Affiche le dessin

// Méthodes
async function initialisation() : Promise<void> {
    mysteryWord = await getRandomWord();
    letterWord = getLettersOfMystery();
    nbFail = 0;

    generateMystery(mysteryWord);
    generateKeyboard();
}
initialisation();

async function getRandomWord() : Promise<string> {
    const response = await fetch('https://trouve-mot.fr/api/sizemin/7');
    const result : [TrouveMot] = await response.json();
    return result[0].name;
};

function getLettersOfMystery() : string[] {
    const result = new Set(getWordForCompare().replaceAll(/[ -]/g, ''))
    return [...result];
}

function generateMystery(word : string) : void {
    const baliseText = document.createElement('p');
    baliseText.id = "mystery-text"
    
    for(const letter of word) {
        const baliseLetter = document.createElement('span');
        baliseLetter.textContent = (letter !== ' ') ? '_' : letter;
        
        baliseText.append(baliseLetter);
    }

    container.append(baliseText);
}

function generateKeyboard() : void {
    const keyboard = document.createElement('div');
    keyboard.id= "keyboard";

    const letterStart = 'A'.charCodeAt(0);
    const letterEnd = 'Z'.charCodeAt(0);

    for(let code = letterStart; code <= letterEnd; code++) {
        // console.log(code, String.fromCharCode(code));
        const letter = String.fromCharCode(code);

        const buttonLetter = document.createElement('button');
        buttonLetter.textContent = letter;
        buttonLetter.addEventListener('click', handleKeyboardClick);

        keyboard.append(buttonLetter);
    }

    container.append(keyboard)
}

function getWordForCompare() : string {
    return mysteryWord.toUpperCase()                    // Majuscule
                      .normalize("NFD")                 // Normalise (Caractere acentué)
                      .replace(/\p{Diacritic}/gu, "");  // Supprime les "Diacritique"
}

function handleKeyboardClick(event: Event) : void {
    const button = event.target as HTMLButtonElement; 
    button.disabled = true;

    const letter = button.textContent ?? '';

    if(letterWord.includes(letter)) {
        revealLetter(letter);
        letterWord = letterWord.filter(l => l !== letter);

        if(letterWord.length === 0) {
            displayWin();
        }
    }
    else {
        nbFail++;

        if(nbFail >= MAX_FAIL) {
            displayLose();
        }
    }
}

function revealLetter(letter: string) {
    const mysteryText = document.getElementById('mystery-text') as HTMLDivElement;
    console.log(mysteryText.children);
    
    Array.from(getWordForCompare()).forEach((wordLetter, index) => {
        if(wordLetter === letter) {
            // console.log(wordLetter, index);
            mysteryText.children[index].textContent = mysteryWord[index];
        }
    });
}

function displayWin() : void {
    alert('Bravo');
}

function displayLose() : void {
    alert('Perdu');
}