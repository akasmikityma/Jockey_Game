// import React, { useEffect, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { given_backs, pl1_Valids, pl2_Valids, pl3_Valids, pl4_Valids, plyers_InHands, gamePlayers ,remainingCards} from '../store/atoms';
// import { Card } from '../store/Cards';
// import { useWebSocket } from '../store/ContextProviderer';
// import CardCell from './CardCell';

// const Board: React.FC = () => {
//   const mePlayer = useWebSocket();
//   const [length, setLength] = useState<number>(10);
//   const [modalopen, setModalopen] = useState(false);
//   const [openCards, setOpenCards] = useState(false);
//   const [given_back_cards, setGivenBackCards] = useRecoilState(given_backs);
//   const [boardRemainings,setBoardRemainigs]=useRecoilState(remainingCards);
//   const [playercards, setPlayerCards] = useRecoilState(plyers_InHands);
//   const [player1valids, setPlayer1Valids] = useRecoilState(pl1_Valids);
//   const [player2valids, setPlayer2Valids] = useRecoilState(pl2_Valids);
//   const [player3valids, setPlayer3Valids] = useRecoilState(pl3_Valids);
//   const [player4valids, setPlayer4Valids] = useRecoilState(pl4_Valids);
//   const [clickedBy, setClickedBy] = useState('');
//   const [players, setPlayers] = useRecoilState(gamePlayers);

//   useEffect(() => {
//     console.log(`players in the game: ${JSON.stringify(players)}`);
//     if (mePlayer) {
//       mePlayer.onmessage = (event) => {
//         const message = JSON.parse(event.data);
//         switch (message.type) {
//           case "takeRemRes":
//             console.log(message.msg);
//             setBoardRemainigs(message.nowRem);
//             setPlayerCards(message.msg);
//             alert(`you have to give one back ${message.action}`);
//             break;
//           case "takeGbRes":
//             console.log(message.msg);
//             setPlayerCards(message.msg);
//             alert(`you have to give one back ${message.action}`);
//             break;
//           case "aftergb":
//             setPlayerCards(message.msg);
//             setGivenBackCards(message.givenBacks);
//             alert(`your turn is complete`);
//             break;
//           case "updateState":
//             // Update the remaining cards and given back cards across all players
//             setBoardRemainigs(message.remainingCards);
//             setGivenBackCards(message.givenBackCards);
//             setPlayerCards(message.playerCards);
//             break;
//           default:
//             console.log(message.type);
//         }
//       };
//     }
//   }, [mePlayer]);

//   const take_card = () => {
//     let topCard: Card | undefined;
//     if (clickedBy === 'remaining') {
//       console.log('Sending message:', JSON.stringify({ type: "takefromrem" }));
//       mePlayer?.send(JSON.stringify({ type: "takefromrem" }));
//     } else if (clickedBy === 'gb') {
//       console.log('Sending message:', JSON.stringify({ type: "takefromgb" }));
//       mePlayer?.send(JSON.stringify({ type: "takefromgb" }));
//     }
//     // if (topCard) {
//     //   setPlayerCards(prev => [...prev, topCard]);
//     // }
//     setModalopen(false);
//   };

//   const give_card_back = (e: React.MouseEvent<HTMLDivElement>, card: Card) => {
//     e.stopPropagation(); // Prevent event propagation
//     console.log(`card double clicked`);
//     mePlayer?.send(JSON.stringify({ type: "giveback", card }));
//   };

//   return (
//     <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
//       <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
//         {/* Player 1 */}
//         <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
//           <div className='grid grid-cols-3 w-full h-full'>
//             {player1valids.map((ca, i) => (
//               <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
//                 {ca.map((cs, j) => (
//                   <div className='flex border-2 border-black' key={j}>
//                     <img src={cs.image} alt="" className='w-full h-full' />
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Player 2 */}
//         <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2 h-1/5 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
//           <div className='grid grid-cols-3 w-full h-full'>
//             {player2valids.map((ca, i) => (
//               <div className='w-full h-4/5 flex gap-0.5' key={i}>
//                 {ca.map((cs, j) => (
//                   <div className='flex border-2 border-black' key={j}>
//                     <img src={cs.image} alt="" className='w-full h-full' />
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Player 3 - Current Player */}
//         <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
//           {openCards ? (
//             <div className='flex'>
//               {playercards.map((C, i) => (
//                 <div className='border-2' key={i} onDoubleClick={(e) => {
//                   console.log('Double click event triggered'); // Debugging log
//                   give_card_back(e, C);
//                 }}>
//                   <img src={C.image} alt="" />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className='grid grid-cols-3 w-full h-full'>
//               {player3valids.map((ca, i) => (
//                 <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
//                   {ca.map((cs, j) => (
//                     <div className='flex border-2 border-black' key={j}>
//                       <img src={cs.image} alt="" className='w-full h-full' />
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Player 4 */}
//         <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
//           <div className='grid grid-cols-3 w-full h-full'>
//             {player4valids.map((ca, i) => (
//               <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
//                 {ca.map((cs, j) => (
//                   <div className='flex border-2 border-black' key={j}>
//                     <img src={cs.image} alt='' className='w-full h-full' />
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>

//         {boardRemainings&&<div className='absolute top-1/4 left-1/3' onClick={() => {
//           setModalopen(prev => !prev);
//           setClickedBy('remaining');
//         }}>
//           {Array.from({ length }).map((_, index) => (
//             <div
//               key={index}
//               className='bg-black h-20 w-12 rounded-sm absolute border border-white mt-2'
//               style={{
//                 top: `${index * 1}px`,
//                 right: `${index * 1}px`,
//                 zIndex: length - index,
//               }}
//             ></div>
//           ))}
//         </div>}

//         {given_back_cards.length>0&&<div className='absolute top-1/4 right-1/3 flex items-center' onClick={() => {
//           setModalopen(prev => !prev);
//           setClickedBy('gb');
//         }}>
//           {given_back_cards.map((c, index) => (
//             <CardCell
//               key={index}
//               src={c.image}
//               alt={`Given back card ${index + 1}`}
//               style={{
//                 top: `${index * 1}px`,
//                 right: `${index * 2}px`,
//                 zIndex: length - index,
//               }}
//               className="bg-white h-20 w-14 border-black"
//             />
//           ))}
//         </div>}

//         {modalopen && <Modal openerHandler={() => setModalopen(prev => !prev)} clickedby={clickedBy} takefunc={take_card} remainings={boardRemainings}/>}
//       </div>

//       {/* Player indicators */}
//       <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
//       <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
//       <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16'>
//         <p>Player 3</p>
//         <button onClick={() => setOpenCards(prev => !prev)}>Open</button>
//       </div>
//       <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
//     </div>
//   );
// };

// const Modal: React.FC<{ openerHandler: () => void, clickedby: string, takefunc: () => void ,remainings:Card[]}> = ({ openerHandler, clickedby, takefunc,remainings }) => {
//   const [topCard, setTopCard] = useState<Card>();
//   // const [remainings, setRemainings] = useRecoilState(remainingCards);
//   const [givencards, setGivenCards] = useRecoilState(given_backs);

//   useEffect(() => {
//     console.log('Clicked by:', clickedby);
//     console.log('Remaining Cards:', remainings);
//     console.log('Given Back Cards:', givencards);

//     if (clickedby === 'gb' && givencards.length > 0) {
//       console.log('Setting topCard from given back cards:', givencards[0]);
//       setTopCard(givencards[givencards.length-1]);
//     } else if (clickedby === 'remaining' && remainings.length > 0) {
//       console.log('Setting topCard from remaining cards:', remainings[0]);
//       setTopCard(remainings[remainings.length-1]);
//     } else {
//       console.log('No cards available to set as topCard.');
//       setTopCard(undefined);
//     }
//   }, []);

//   return (
//     <div className='flex justify-center items-center w-1/6 h-1/3 mt-16 z-50'>
//       <div className="relative w-full h-full">
//         {/* Buttons */}
//         <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mb-2">
//           <button className="bg-white/30 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={takefunc}>Take</button>
//           <button className="bg-white/30 hover:bg-red-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={() => {
//               openerHandler();
//               // if (clickedby === 'remaining') {
//               //   setRemainings(prev => prev.filter(c => c !== topCard));
//               // }
//               // if (topCard) {
//               //   setGivenCards(prev => [topCard, ...prev]);
//               // }
//             }}>Leave
//           </button>
//         </div>

//         {/* Image */}
//         {topCard && (
//           <img src={topCard.image} alt="Top Card" className='w-full h-full p-1 bg-green-500 shadow-2xl shadow-black rounded-md border-green-500' />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Board;
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { given_backs, pl1_Valids, pl2_Valids, pl3_Valids, pl4_Valids, plyers_InHands, gamePlayers, remainingCards } from '../store/atoms';
import { Card } from '../store/Cards';
import { useWebSocket } from '../store/ContextProviderer';
import CardCell from './CardCell';

const Board: React.FC = () => {
  const mePlayer = useWebSocket();
  const [length, setLength] = useState<number>(10);
  const [modalopen, setModalopen] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const [given_back_cards, setGivenBackCards] = useRecoilState(given_backs);
  const [boardRemainings, setBoardRemainigs] = useRecoilState(remainingCards);
  const [playercards, setPlayerCards] = useRecoilState(plyers_InHands);
  const [player1valids, setPlayer1Valids] = useRecoilState(pl1_Valids);
  const [player2valids, setPlayer2Valids] = useRecoilState(pl2_Valids);
  const [player3valids, setPlayer3Valids] = useRecoilState(pl3_Valids);
  const [player4valids, setPlayer4Valids] = useRecoilState(pl4_Valids);
  const [clickedBy, setClickedBy] = useState('');
  const [players, setPlayers] = useRecoilState(gamePlayers);

  useEffect(() => {
    console.log(`players in the game: ${JSON.stringify(players)}`);
    if (mePlayer) {
      mePlayer.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "takeRemRes":
            console.log(message.msg);
            setBoardRemainigs(message.nowRem);
            setPlayerCards(message.msg);
            alert(`you have to give one back ${message.action}`);
            break;
          case "takeGbRes":
            console.log(message.msg);
            setPlayerCards(message.msg);
            alert(`you have to give one back ${message.action}`);
            break;
          case "aftergb":
            setPlayerCards(message.msg);
            setGivenBackCards(message.givenBacks);
            alert(`your turn is complete`);
            break;
          case "gameStateUpdate":
            // Update the remaining cards and given back cards across all players
            setBoardRemainigs(message.remainingCards);
            setGivenBackCards(message.givenBackCards);
            break;

          case "afterleave":
            console.log(message)
            setBoardRemainigs(message.remainingCards);
            setGivenBackCards(message.givenBackCards);
            break;
          default:
            console.log(message.type);
        }
      };
    }
  }, [mePlayer]);

  const take_card = () => {
    if (clickedBy === 'remaining') {
      console.log('Sending message:', JSON.stringify({ type: "takefromrem" }));
      mePlayer?.send(JSON.stringify({ type: "takefromrem" }));
    } else if (clickedBy === 'gb') {
      console.log('Sending message:', JSON.stringify({ type: "takefromgb" }));
      mePlayer?.send(JSON.stringify({ type: "takefromgb" }));
    }
    setModalopen(false);
  };

  const give_card_back = (e: React.MouseEvent<HTMLDivElement>, card: Card) => {
    e.stopPropagation(); // Prevent event propagation
    console.log(`card double clicked`);
    mePlayer?.send(JSON.stringify({ type: "giveback", card }));
  };

  const buttonWalagiveBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent event propagation
    console.log(`leave clicked`);
    console.log('Sending message:', JSON.stringify({ type: "leaveCard" }));
    mePlayer?.send(JSON.stringify({ type: "leaveCard"}));
  };

  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        {/* Player 1 */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player1valids.map((ca, i) => (
              <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
                {ca.map((cs, j) => (
                  <div className='flex border-2 border-black' key={j}>
                    <img src={cs.image} alt="" className='w-full h-full' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2 h-1/5 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player2valids.map((ca, i) => (
              <div className='w-full h-4/5 flex gap-0.5' key={i}>
                {ca.map((cs, j) => (
                  <div className='flex border-2 border-black' key={j}>
                    <img src={cs.image} alt="" className='w-full h-full' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Player 3 - Current Player */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
          {openCards ? (
            <div className='flex'>
              {playercards.map((C, i) => (
                <div className='border-2' key={i} onDoubleClick={(e) => {
                  console.log('Double click event triggered'); // Debugging log
                  give_card_back(e, C);
                }}>
                  <img src={C.image} alt="" />
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-3 w-full h-full'>
              {player3valids.map((ca, i) => (
                <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
                  {ca.map((cs, j) => (
                    <div className='flex border-2 border-black' key={j}>
                      <img src={cs.image} alt="" className='w-full h-full' />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Player 4 */}
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player4valids.map((ca, i) => (
              <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
                {ca.map((cs, j) => (
                  <div className='flex border-2 border-black' key={j}>
                    <img src={cs.image} alt='' className='w-full h-full' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {boardRemainings && (
          <div className='absolute top-1/4 left-1/3' onClick={() => {
            setModalopen(prev => !prev);
            setClickedBy('remaining');
          }}>
            {Array.from({ length }).map((_, index) => (
              <div
                key={index}
                className='bg-black h-20 w-12 rounded-sm absolute border border-white mt-2'
                style={{
                  top: `${index * 1}px`,
                  right: `${index * 1}px`,
                  zIndex: length - index,
                }}
              ></div>
            ))}
          </div>
        )}

        {given_back_cards?.length > 0 && (
          <div className='absolute top-1/4 right-1/3 flex items-center' onClick={() => {
            setModalopen(prev => !prev);
            setClickedBy('gb');
          }}>
            {given_back_cards.slice().reverse().map((c, index)=> (
              <CardCell
                key={index}
                src={c.image}
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
        )}

        {modalopen && <Modal openerHandler={() => setModalopen(prev => !prev)} clickedby={clickedBy} takefunc={take_card} remainings={boardRemainings} giveCardBack={buttonWalagiveBack}/>}
      </div>

      {/* Player indicators */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
      <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16'>
        <p>Player 3</p>
        <button onClick={() => setOpenCards(prev => !prev)}>Open</button>
      </div>
      <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
    </div>
  );
};

const Modal: React.FC<{ openerHandler: () => void, clickedby: string, takefunc: () => void, remainings: Card[], giveCardBack: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }> = ({ openerHandler, clickedby, takefunc, remainings, giveCardBack }) => {
  const [topCard, setTopCard] = useState<Card>();
  const [givencards, setGivenCards] = useRecoilState(given_backs);

  useEffect(() => {
    console.log('Modal opened. Clicked by:', clickedby);
    console.log('Remaining Cards:', remainings);
    console.log('Given Back Cards:', givencards);

    if (clickedby === 'gb' && givencards.length > 0) {
      setTopCard(givencards[givencards.length - 1]);
    } else if (clickedby === 'remaining' && remainings.length > 0) {
      setTopCard(remainings[remainings.length - 1]);
    } else {
      setTopCard(undefined);
    }
  }, [clickedby, remainings, givencards]);

  return (
    <div className='flex justify-center items-center w-1/6 h-1/3 mt-16 z-50'>
      <div className="relative w-full h-full">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mb-2">
          <button className="bg-white/30 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={takefunc}>Take</button>
          <button className="bg-white/30 hover:bg-red-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={(e) => {
            e.preventDefault()
            console.log('Leaving card:', topCard);
            if (topCard) {
              giveCardBack(e);
            }
            openerHandler();
          }}>Leave</button>
        </div>
        {topCard && (
          <img src={topCard.image} alt="Top Card" className='w-full h-full p-1 bg-green-500 shadow-2xl shadow-black rounded-md border-green-500' />
        )}
      </div>
    </div>
  );
};

export default Board;
