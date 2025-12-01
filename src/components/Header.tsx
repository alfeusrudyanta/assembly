import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='flex flex-col gap-1'>
      <span className='font-medium text-[18px] md:text-[20px] text-[#F9F4DA]'>
        Assembly: Endgame
      </span>
      <span className='font-medium text-[12px] md:text-[14px] text-[#8E8E8E]'>
        Guess the word in under 8 attempts to keep the programming world safe
        from Assembly!
      </span>
    </header>
  );
};

export { Header };
