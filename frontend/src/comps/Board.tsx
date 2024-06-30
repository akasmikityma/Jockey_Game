import React, { useState } from 'react';
import Card from './CardCell';


const Board: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [gblength, setGblength] = useState<number>(4);
  const [modalopen,setModalopen]=useState(false);
  // Sample card images
  const cardImages: string[] = [
    'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png',
    'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png'
    // Add more card images as needed
  ];

  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
      
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/6 rounded-xl text-center  font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>

        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-200'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>

        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>

        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>

        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>

        </div>


        {/* player set 2 */}

        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center  font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
        
        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-200'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>
        
        </div>

        {/* player set 3 */}


        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/6 rounded-xl text-center  font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
        
        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-200'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>


        </div>
        
        {/* player set 4 */}
        
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center  font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
        
        <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-200'>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        <div className='flex border-2 border-black'>
          <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full'/>
        </div>
        </div>

        </div>
        
        <div className='absolute top-1/4 left-1/3' onClick={(e)=>{
          setModalopen((prev)=>!prev)
          
        }}>
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
        {modalopen&&<Modal/>}
        <div className='absolute top-1/4 right-1/3 flex items-center' onClick={()=>{
          setModalopen((prev)=>!prev)
        }}>
          {Array.from({ length: gblength }).map((_, index) => (
            <Card
              key={index}
              src={cardImages[index % cardImages.length]}
              alt={`Given back card ${index + 1}`}
              style={{
                top: `${index * 1}px`,
                right: `${index * 2}px`,
                zIndex: length - index,
              }}
              className="bg-white h-20 w-14 border-black"
            />
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
const Modal=()=>{
  
  return (
    <div className='flex justify-center items-center border-2 border-yellow-300 w-1/6 h-1/3 mt-16'>
      <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt=""  className='w-full h-full p-1'/>
    </div>
  )
}
export default Board;
// import React, { useState } from 'react';
// import Card from './CardCell';

// const Board: React.FC = () => {
//   const [length, setLength] = useState<number>(10);
//   const [gblength, setGblength] = useState<number>(4);
//   const [modalopen, setModalopen] = useState<boolean>(false);
  
//   // Sample card images
//   const cardImages: string[] = [
//     'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png',
//     'https://www.improvemagic.com/wp-content/uploads/2020/11/la.png'
//     // Add more card images as needed
//   ];

//   return (
//     <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
//       <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        
//         {/* Player set 1 */}
//         <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1/6 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
//           <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-200'>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//           </div>
//           <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//           </div>
//           <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//           </div>
//           <div className='w-1/5 h-4/5 flex gap-0.5 border-2 border-yellow-400'>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//             <div className='flex border-2 border-black'>
//               <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//             </div>
//           </div>
//         </div>

//         {/* Player set 2 */}
//         <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/6 h-1/2 rounded-xl text-center font-bold p-2 flex flex-col gap-4 justify-center items-center overflow-hidden'>
//           {Array.from({ length: 4 }).map((_, index) => (
//             <div key={index} className='w-full h-3/4 flex gap-0.5 border-2 border-yellow-200'>
//               <div className='flex border-2 border-black'>
//                 <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//               </div>
//               <div className='flex border-2 border-black'>
//                 <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full' />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Player set 3 */}
//         <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
        
//         {/* Player set 4 */}
//         <div className='absolute top-1/2 left-0 transform -translate-y-1/2 border-2 border-yellow-400 w-1/6 h-1/6 rounded-xl text-center bg-blue-400 font-bold p-2'>valid sets</div>
        
//         {/* Card stacks */}
//         <div className='absolute top-1/4 left-1/3' onClick={() => setModalopen(prev => !prev)}>
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

//         {modalopen && <Modal />}

//         <div className='absolute top-1/4 right-1/3 flex items-center' onClick={() => setModalopen(prev => !prev)}>
//           {Array.from({ length: gblength }).map((_, index) => (
//             <Card
//               key={index}
//               src={cardImages[index % cardImages.length]}
//               alt={`Given back card ${index + 1}`}
//               style={{
//                 top: `${index * 1}px`,
//                 right: `${index * 2}px`,
//                 zIndex: length - index,
//               }}
//               className="bg-white h-20 w-14 border-black"
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* Player indicators */}
//       <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
//       <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
//       <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16'>Player 3</div>
//       <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
//     </div>
//   );
// };

// const Modal: React.FC = () => {
//   return (
//     <div className='flex justify-center items-center border-2 border-yellow-300 w-1/6 h-1/3 mt-16'>
//       <img src="https://www.improvemagic.com/wp-content/uploads/2020/11/la.png" alt="" className='w-full h-full p-1' />
//     </div>
//   )
// }

// export default Board;
