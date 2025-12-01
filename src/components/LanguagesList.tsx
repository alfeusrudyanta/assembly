import React from 'react';

import { languages } from '../constants/languages';

type LanguagesListProps = {
  wrongGuessCount: React.RefObject<number>;
};

const LanguagesList: React.FC<LanguagesListProps> = ({ wrongGuessCount }) => {
  return (
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
  );
};

export { LanguagesList };
