import { useCallback, useEffect, useRef, useState } from 'react';
import languages from './constant/languages';
import { cn } from './lib/utils';
import getFarewellText from './lib/gameUtils';
import words from './constant/words';
import ReactConfetti from 'react-confetti';

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
          <header className='flex flex-col gap-1'>
            <span className='font-medium text-[18px] md:text-[20px] text-[#F9F4DA]'>
              Assembly: Endgame
            </span>
            <span className='font-medium text-[12px] md:text-[14px] text-[#8E8E8E]'>
              Guess the word in under 8 attempts to keep the programming world
              safe from Assembly!
            </span>
          </header>

          {/* Status Banner */}
          <section
            aria-live='polite'
            role='status'
            className={cn(
              'min-h-[60px] rounded-[4px] p-[6px] flex flex-col items-center justify-center',
              isGameOver && (isGameWon ? 'bg-[#10A95B]' : 'bg-[#BA2A2A]'),
              guessedLetters.length !== 0 &&
                isLastGuessedLetterCorrect === false &&
                'bg-[#7A5EA7]'
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
        </div>

        {/* Languages List */}
        <section className='flex gap-1 justify-center flex-wrap max-w-[266px] mx-auto '>
          {languages.map((languages, index) => (
            <div
              key={languages.name}
              className='font-bold text-[10px] md:text-[12px] p-[4.5px] rounded-[4px] relative overflow-hidden'
              style={{
                background: languages.backgroundColor,
                color: languages.color,
              }}
            >
              {languages.name}
              {index < wrongGuessCount.current && (
                <span className='absolute inset-0 bg-black/70 flex justify-center items-center'>
                  💀
                </span>
              )}
            </div>
          ))}
        </section>

        {/* Word */}
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

        {/* Keyboard */}
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
                  (currentWord.includes(letter)
                    ? 'bg-[#10A95B]'
                    : 'bg-[#EC5D49]'),
                'disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </section>

        {/* New Game Button */}
        {isGameOver && (
          <button
            onClick={handleNewGame}
            className='h-10 max-w-[228px] w-full bg-[#11B5E5] py-[6px] px-3 gap-[6px] rounded-[4px] border border-[#D7D7D7] font-semibold text-[12px] md:text-[16px] text-[#1E1E1E] cursor-pointer'
          >
            New Game
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
