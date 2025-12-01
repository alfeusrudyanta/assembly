import React from 'react';
import { cn } from '../lib/utils';

type GuessedWordProps = {
  currentWord: string;
  isGameLost: boolean;
  guessedLetters: string[];
};

const GuessedWord: React.FC<GuessedWordProps> = ({
  currentWord,
  isGameLost,
  guessedLetters,
}) => {
  return (
    <section className='flex justify-center gap-1'>
      {currentWord.split('').map((letter, index) => (
        <span
          key={index}
          className={cn(
            'h-10 w-10 flex items-center justify-center bg-[#323232] border-b border-b-[#F9F4DA] font-bold text-[14px] md:text-[18px] text-[#F9F4DA]',
            isGameLost && !guessedLetters.includes(letter) && 'bg-[#EC5D49]'
          )}
        >
          {isGameLost || guessedLetters.includes(letter)
            ? letter.toUpperCase()
            : ''}
        </span>
      ))}
    </section>
  );
};

export { GuessedWord };
