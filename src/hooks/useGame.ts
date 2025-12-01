import { useCallback, useRef, useState } from 'react';
import { languages } from '../constant/languages';
import { words } from '../constant/words';

const useGame = () => {
  const [currentWord, setCurrentWord] = useState<string>(
    () => words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const wrongGuessCount = useRef<number>(0);

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessedLetterCorrect: boolean = currentWord
    .split('')
    .includes(lastGuessedLetter);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const isGameWon = currentWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount.current >= languages.length;
  const isGameOver = isGameWon || isGameLost;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (!isGameOver) {
        setGuessedLetters((prevLetters) =>
          prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
        );

        if (!currentWord.includes(letter)) {
          wrongGuessCount.current++;
        }
      }
    },
    [currentWord, isGameOver]
  );

  const handleNewGame = () => {
    setGuessedLetters([]);
    wrongGuessCount.current = 0;
    setCurrentWord(() => words[Math.floor(Math.random() * words.length)]);
  };

  return {
    alphabet,
    currentWord,
    wrongGuessCount,
    isLastGuessedLetterCorrect,
    isGameOver,
    isGameWon,
    isGameLost,
    guessedLetters,
    addGuessedLetter,
    handleNewGame,
  };
};

export { useGame };
