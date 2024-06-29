import React, { useState } from 'react';

const Board = () => {
  const [length, setLength] = useState(10);
  const [gblength, setGblength] = useState(4);

  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>

        <div className='absolute top-1/4 left-1/3 '>
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className='bg-black h-20 w-12 rounded-sm absolute border border-white'
              style={{
                top: `${index * 1}px`,
                right: `${index * 1}px`,
                zIndex: length - index,
              }}
            ></div>
          ))}
        </div>

        <div className='absolute top-1/4 right-1/3 flex items-center'>
          {Array.from({ length: gblength }).map((_, index) => (
            <div
              key={index}
              className='bg-white h-20 w-12 rounded-sm absolute border border-black'
              style={{
                top: `${index * 1}px`,
                right: `${index * 1}px`,
                zIndex: length - index,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Player indicators */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
      <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16'>Player 3</div>
      <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
    </div>
  );
};

export default Board;
