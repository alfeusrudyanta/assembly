import React from 'react';
import { cn } from '../lib/utils';

type KeyboardProps = {
  alphabet: string;
  addGuessedLetter: (letter: string) => void;
  isGameOver: boolean;
  guessedLetters: string[];
  currentWord: string;
};

const Keyboard: React.FC<KeyboardProps> = ({
  alphabet,
  addGuessedLetter,
  isGameOver,
  guessedLetters,
  currentWord,
}) => {
  return (
    <section className='flex flex-wrap justify-center items-center gap-2 max-w-[480px]'>
      {alphabet.split('').map((letter) => (
        <button
          onClick={() => addGuessedLetter(letter)}
          key={letter}
          disabled={isGameOver}
          aria-disabled={guessedLetters.includes(letter)}
          aria-label={`Letter ${letter}`}
          className={cn(
            'h-10 w-10 flex items-center justify-center bg-[#FCBA29] rounded-[4px] p-[6px] border border-[#D7D7D7] cursor-pointer font-semibold text-[12px] md:text-[16px] text-[#1E1E1E]',
            guessedLetters.includes(letter) &&
              (currentWord.includes(letter) ? 'bg-[#10A95B]' : 'bg-[#EC5D49]'),
            'disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </section>
  );
};

export { Keyboard };
