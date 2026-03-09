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
  | { type: "GAME_RESET"; payload: ScrambleWordState }
  | { type: "GAME_CHECK_WORD" }
  | { type: "GAME_SET_GUESS"; payload: string };

//Creamos la funcion Reducer
export const scrambleWordsReducer = (
  state: ScrambleWordState,
  action: ScrambleWordsActions,
): ScrambleWordState => {
  switch (action.type) {
    case "GAME_SET_GUESS": {
      return {
        //siempre se hace el spread del state para asegurar el cambio del estado
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };
    }
    case "GAME_CHECK_WORD": {
      const newWords = state.words.slice(1);

      if (state.guess === state.currentWord) {
        return {
          ...state,
          words: newWords,
          points: state.points + 1,
          guess: "",
          currentWord: newWords[0],
          scrambledWord: scrambleWord(newWords[0]),
        };
      }

      return {
        ...state,
        errorCounter: state.errorCounter + 1,
        guess: "",
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }

    case "GAME_SKIP": {
      if (state.skipCounter >= state.maxSkips) {
        return {
          ...state,
          isGameOver: true,
        };
      }

      const newWords = state.words.slice(1);
      return {
        ...state,
        skipCounter: state.skipCounter + 1,
        guess: "",
        words: newWords,
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
      };
    }

    case "GAME_RESET":
      return action.payload;

    /* const newWords = shuffleArray(GAME_WORDS);

      return {
        ...state,
        skipCounter: 0,
        errorCounter: 0,
        isGameOver: false,
        points: 0,
        guess: "",
        words: newWords,
        currentWord: newWords[0],
        scrambledWord: scrambleWord(newWords[0]),
        maxAllowErrors: 3,
        maxSkips: 3,
      }; */

    default:
      return state;
  }
};
