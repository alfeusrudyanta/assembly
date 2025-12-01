import React from 'react';

type NewGameProps = {
  isGameOver: boolean;
  handleNewGame: () => void;
};

const NewGame: React.FC<NewGameProps> = ({ handleNewGame, isGameOver }) => {
  if (!isGameOver) return null;

  return (
    <button
      onClick={handleNewGame}
      className='h-10 max-w-[228px] w-full bg-[#11B5E5] py-[6px] px-3 gap-[6px] rounded-[4px] border border-[#D7D7D7] font-semibold text-[12px] md:text-[16px] text-[#1E1E1E] cursor-pointer'
    >
      New Game
    </button>
  );
};

export { NewGame };
