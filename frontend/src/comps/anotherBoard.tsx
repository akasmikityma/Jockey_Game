// import React, { useState } from 'react';

// const AnotherBoard = () => {
//   const [length, setLength] = useState(10);
//   const [gblength, setGblength] = useState(4);

//   return (
//     <div className='p-8 flex justify-center items-center bg-slate-700 min-h-screen'>
//       <div className='w-full items-center flex justify-center h-full'>
//         <div className='absolute top-8 left-1/2 transform -translate-x-1/2 text-white'>Player 1</div>
//         <div className='absolute top-1/2 right-8 transform -translate-y-1/2 text-white'>Player 2</div>
//         <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white'>Player 3</div>
//         <div className='absolute top-1/2 left-8 transform -translate-y-1/2 text-white'>Player 4</div>
        
//         <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
//           <div className='absolute top-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
//           <div className='absolute top-1/2 right-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
//           <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
//           <div className='absolute top-1/2 left-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
          
//           <div className='absolute top-1/4 left-1/3 '>
//             {Array.from({ length }).map((_, index) => (
//               <div
//                 key={index}
//                 className='bg-black h-20 w-12 rounded-sm absolute border border-white'
//                 style={{
//                   top: `${index * 1}px`,
//                   right: `${index * 1}px`,
//                   zIndex: length - index,
//                 }}
//               ></div>
//             ))}
//           </div>

//           <div className='absolute top-1/4 right-1/4 flex items-center'>
//             {Array.from({ length: gblength }).map((_, index) => (
//               <div
//                 key={index}
//                 className='bg-white h-20 w-12 rounded-sm absolute border border-black'
//                 style={{
//                   top: `${index * 1}px`,
//                   right: `${index * 1}px`,
//                   zIndex: length - index,
//                 }}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnotherBoard;
