// import React, { useState } from 'react';

// const ImprovBoard = () => {
//   const [length, setLength] = useState(10);
//   const [gblength, setGblength] = useState(4);

//   return (
//     <div className='bg-slate-700 flex justify-center items-center min-h-screen p-8 relative'>
//       {/* Player Positions */}
//       <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white'>Player 1</div>
//       <div className='absolute top-1/2 right-8 transform -translate-y-1/2 text-white'>Player 2</div>
//       <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white'>Player 3</div>
//       <div className='absolute top-1/2 left-8 transform -translate-y-1/2 text-white'>Player 4</div>

//       {/* Board */}
//       <div className='flex justify-center '> 
//       <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 h-full lg:h-3/4 relative flex justify-center items-center'>
//         {/* Valid Sets */}
//         <div className='absolute top-8 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-16 h-16 rounded-xl text-center bg-blue-400 font-bold p-2'>
//           Valid Sets
//         </div>
//         <div className='absolute top-1/2 right-8 transform -translate-y-1/2 border-2 border-yellow-400 w-16 h-16 rounded-xl text-center bg-blue-400 font-bold p-2'>
//           Valid Sets
//         </div>
//         <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-16 h-16 rounded-xl text-center bg-blue-400 font-bold p-2'>
//           Valid Sets
//         </div>
//         <div className='absolute top-1/2 left-8 transform -translate-y-1/2 border-2 border-yellow-400 w-16 h-16 rounded-xl text-center bg-blue-400 font-bold p-2'>
//           Valid Sets
//         </div>

//         {/* Deck */}
//         <div className='absolute top-1/4 left-1/3'>
//           {Array.from({ length }).map((_, index) => (
//             <div
//               key={index}
//               className='bg-black h-20 w-12 rounded-sm absolute border border-white'
//               style={{
//                 top: `${index * 1}px`,
//                 right: `${index * 1}px`,
//                 zIndex: length - index,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Given-back Deck */}
//         <div className='absolute top-1/4 right-1/4 flex items-center'>
//           {Array.from({ length: gblength }).map((_, index) => (
//             <div
//               key={index}
//               className='bg-white h-20 w-12 rounded-sm absolute border border-black'
//               style={{
//                 top: `${index * 1}px`,
//                 right: `${index * 1}px`,
//                 zIndex: length - index,
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ImprovBoard;
