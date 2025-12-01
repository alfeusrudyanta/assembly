import { useCallback, useEffect, useRef, useState } from 'react';

import { Header } from './components/Header';
import { GameStatus } from './components/GameStatus';
import { LanguagesList } from './components/LanguagesList';
import { GuessedWord } from './components/GuessedWord';
import { Keyboard } from './components/Keyboard';
import { NewGame } from './components/NewGame';

import ReactConfetti from 'react-confetti';

import { words } from './constants/words';
import { languages } from './constants/languages';

function App() {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (/^[a-z]$/.test(key) && !guessedLetters.includes(key)) {
        addGuessedLetter(key);
      }

      if (e.key === 'Enter' && isGameOver) {
        handleNewGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addGuessedLetter, guessedLetters, isGameOver]);

  const handleNewGame = () => {
    setGuessedLetters([]);
    wrongGuessCount.current = 0;
    setCurrentWord(() => words[Math.floor(Math.random() * words.length)]);
  };

  return (
    <main className='flex justify-center bg-[#282726] min-h-screen'>
      <div className='max-w-[600px] text-center py-12 md:py-16 px-4 flex flex-col items-center gap-6 md:gap-9'>
        <div className='flex flex-col gap-4 md:gap-5 max-w-[360px]'>
          {/* Confetti */}
          {isGameWon && <ReactConfetti recycle={false} numberOfPieces={1000} />}

          {/* Title */}
          <Header />

          {/* Status Banner */}
          <GameStatus
            guessedLetters={guessedLetters}
            isLastGuessedLetterCorrect={isLastGuessedLetterCorrect}
            isGameOver={isGameOver}
            isGameWon={isGameWon}
            wrongGuessCount={wrongGuessCount}
          />
        </div>

        {/* Languages List */}
        <LanguagesList wrongGuessCount={wrongGuessCount} />

        {/* Guessed Word */}
        <GuessedWord
          currentWord={currentWord}
          guessedLetters={guessedLetters}
          isGameLost={isGameLost}
        />

        {/* Keyboard */}
        <Keyboard
          alphabet={alphabet}
          addGuessedLetter={addGuessedLetter}
          isGameOver={isGameOver}
          guessedLetters={guessedLetters}
          currentWord={currentWord}
        />

        {/* New Game Button */}
        <NewGame handleNewGame={handleNewGame} isGameOver={isGameOver} />
      </div>
    </main>
  );
}

export default App;
