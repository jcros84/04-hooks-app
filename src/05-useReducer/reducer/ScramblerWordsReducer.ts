export interface ScrambleWordState {
  words: string[];
  currentWord: string;
  scrambledWord: string;
  guess: string;
  points: number;
  errorCounter: number;
  maxAllowErrors: number;
  skipCounter: number;
  maxSkips: number;
  isGameOver: boolean;
  totalWords: number;
}

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];
// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

export const getInitialState = (): ScrambleWordState => {
  //al usar el spread aseguramos que no se muta el arreglo original
  const array_words = shuffleArray([...GAME_WORDS]);
  return {
    words: GAME_WORDS,
    currentWord: array_words[0],
    scrambledWord: scrambleWord(array_words[0]),
    guess: "",
    points: 0,
    errorCounter: 0,
    maxAllowErrors: 3,
    skipCounter: 0,
    maxSkips: 3,
    isGameOver: false,
    totalWords: array_words.length,
  };
};
export type ScrambleWordsActions =
  | { type: "GAME_SKIP" }
  | { type: "GAME_RESET" }
  | { type: "GAME_SEND_WORD" };

//Creamos la funcion Reducer
export const scrambleWordsReducer = (
  state: ScrambleWordState,
  action: ScrambleWordsActions,
): ScrambleWordState => {
  switch (action.type) {
    case "GAME_SKIP": {
    
    if (state.skipCounter >= state.maxSkips) {
      console.log("no se puede sartar debes reiniciar Juego");
      
      return{state,
        state.isGameOver=true      };
    } else {
      const newWords = state.words.slice(1);
      state.skipCounter= prev +1;
      setGuess("");
      setWords(newWords);
      setCurrentWord(newWords[0]);
      setScrambledWord(scrambleWord(newWords[0]));
    } */

      return {
        ...state,
        skipCounter: state.skipCounter + 1,
      };
    }
    case "GAME_RESET": {



    }
    case "GAME_SEND_WORD": {
    }

    default:
      return state;
  }
};
