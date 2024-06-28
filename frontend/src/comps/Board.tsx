// import React from 'react'

// const Board = () => {
//     return (
//         <div className='bg-slate-700 flex justify-center min-h-screen p-10'>
//           <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'> 
//             <div className='absolute top-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player1</div>

//             <div className='absolute top-1/2 right-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player2</div>

//             <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player3</div>

//             <div className='absolute top-1/2 left-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player4</div>

//             <div className='absolute top-1/4 left-1/4 border-2 border-red-500'>remaining cards</div>
//             <div className='absolute top-1/4 right-1/4'>given-back cards</div>
//           </div> 
//         </div>
//       );
// }

// export default Board

import React, { useState } from 'react';

const Board = () => {
  const [length, setLength] = useState(10);
  const [gblength,setGblength]=useState(4)
  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10'>
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player1</div>
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player2</div>
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player3</div>
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>player4</div>

        <div className='absolute top-1/4 left-1/3 '>
          {Array.from({ length }).map((_, index) => (
            <div
              key={index}
              className='bg-black h-24 w-16 rounded-sm absolute border border-white'
              style={{
                top: `${index * 1}px`,
                right: `${index * 1}px`,
                zIndex: length - index,
              }}
            ></div>
          ))}
        </div>

        <div className='absolute top-1/4 right-1/4 flex items-center'>
          {
            Array.from({length:gblength}).map((_,index)=>(
                // <div className='bg-white h-24 w-16 rounded-sm border-2 border-black'></div>
                <div
              key={index}
              className='bg-white h-24 w-16 rounded-sm absolute border border-black'
              style={{
                top: `${index * 1}px`,
                right: `${index * 1}px`,
                zIndex: length - index,
              }}
            ></div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Board;

