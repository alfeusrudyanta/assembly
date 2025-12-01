import React from 'react';
import { cn } from '../lib/utils';
import { getFarewellText } from '../lib/gameUtils';
import { languages } from '../constants/languages';

type GameStatusProps = {
  guessedLetters: string[];
  isLastGuessedLetterCorrect: boolean;
  isGameOver: boolean;
  isGameWon: boolean;
  wrongGuessCount: React.RefObject<number>;
};

const GameStatus: React.FC<GameStatusProps> = ({
  guessedLetters,
  isLastGuessedLetterCorrect,
  isGameOver,
  isGameWon,
  wrongGuessCount,
}) => {
  return (
    <section
      aria-live='polite'
      role='status'
      className={cn(
        'min-h-[60px] rounded-[4px] p-[6px] flex flex-col items-center justify-center',
        guessedLetters.length !== 0 &&
          isLastGuessedLetterCorrect === false &&
          'bg-[#7A5EA7]',
        isGameOver && (isGameWon ? 'bg-[#10A95B]' : 'bg-[#BA2A2A]')
      )}
    >
      {isGameOver ? (
        <>
          <span className='font-medium text-[16px] md:text-[20px] text-[#F9F4DA]'>
            {isGameWon ? 'You win!' : 'Game over!'}
          </span>
          <span className='font-medium text-[12px] md:text-[16px] text-[#F9F4DA]'>
            {isGameWon
              ? 'Well done! 🎉'
              : 'You lose! Better start learning Assembly 😭'}
          </span>
        </>
      ) : (
        guessedLetters.length !== 0 &&
        isLastGuessedLetterCorrect === false && (
          <span className='italic font-medium text-[16px] md:text-[20px] text-[#F9F4DA]'>
            {getFarewellText(languages[wrongGuessCount.current - 1].name)}
          </span>
        )
      )}
    </section>
  );
};

export { GameStatus };
