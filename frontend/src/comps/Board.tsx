import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { given_backs, pl1_Valids, pl2_Valids, pl3_Valids, pl4_Valids, plyers_InHands, remainingCards } from '../store/atoms';
import CardCell from './CardCell';
import { Card } from '../store/Cards';

const Board: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [gblength, setGblength] = useState<number>(4);
  const [modalopen, setModalopen] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const [topCard, setTopCard] = useState<Card>();
  const [remainings, setRemainings] = useRecoilState(remainingCards);
  const [given_back_cards, setGivenBackCards] = useRecoilState(given_backs);
  const [playercards, setPlayerCards] = useRecoilState(plyers_InHands);
  const [player1valids, setPlayer1Valids] = useRecoilState(pl1_Valids);
  const [player2valids, setPlayer2Valids] = useRecoilState(pl2_Valids);
  const [player3valids, setPlayer3Valids] = useRecoilState(pl3_Valids);
  const [player4valids, setPlayer4Valids] = useRecoilState(pl4_Valids);
  const [clickedBy, setClickedBy] = useState('');

  useEffect(() => {
    console.log(player1valids, player2valids, player3valids, player4valids);
    setTopCard(remainings[remainings.length - 1]);
  }, [remainings, player1valids, player2valids, player3valids, player4valids]);

 const take_card=()=>{
  let topCard: Card | undefined;
    if (clickedBy === 'remaining') {
      topCard = remainings[remainings.length - 1];
      if (topCard) {
        setRemainings(prev => prev.slice(0, -1));
      }
    } else if (clickedBy === 'gb') {
      topCard = given_back_cards[0];
      if (topCard) {
        setGivenBackCards(prev => prev.slice(1));
      }
    }
   if(topCard){
    setPlayerCards((prev)=>[...prev,topCard])
   }
   setModalopen(false)
 }
  const give_card_back=(e:React.MouseEvent<HTMLDivElement>,card:Card)=>{
    //player double clicks the card and the card gets erased from the hand and gets added to the given_backs >>
    setPlayerCards((prev)=>prev.filter(c=>c!==card));
    setGivenBackCards((prev)=>[card,...prev])
  }
  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        
        {/* Player set 1 */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player1valids && player1valids.map((ca, i) => (
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

        {/* Player set 2 */}
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2  h-1/5 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player2valids && player2valids.map((ca, i) => (
              <div className='w-full h-4/5 flex gap-0.5 ' key={i}>
                {ca.map((cs, j) => (
                  <div className='flex border-2 border-black' key={j}>
                    <img src={cs.image} alt="" className='w-full h-full' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Player set 3 */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
          {openCards ? (
            <div className='flex '>
              {playercards && playercards.map((C, i) => (
                <div className='border-2' key={i} onDoubleClick={(e)=>give_card_back(e,C)}>
                  <img src={C.image} alt="" />
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-3 w-full h-full'>
              {player3valids && player3valids.map((ca, i) => (
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

        {/* Player set 4 */}
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
          <div className='grid grid-cols-3 w-full h-full'>
            {player4valids && player4valids.map((ca, i) => (
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

        <div className='absolute top-1/4 left-1/3' onClick={(e) => { 
          setModalopen((prev) => !prev); 
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
        
        <div className='absolute top-1/4 right-1/3 flex items-center' onClick={() => {
           setModalopen((prev) => !prev);
           setClickedBy('gb');
        }}>
          {given_back_cards && given_back_cards.map((c, index) => (
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
        
        {modalopen && <Modal openerHandler={() => setModalopen((prev) => !prev)} clickedby={clickedBy} takefunc={take_card}/>}

      </div>
      
      {/* Player indicators */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
      <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16'>
        <p>Player 3</p>
        <button onClick={() => setOpenCards((prev) => !prev)}>Open</button>
      </div>
      <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
    </div>
  );
};



const Modal: React.FC<{ openerHandler: () => void ,clickedby:string,takefunc:()=>void}> = ({ openerHandler,clickedby,takefunc }) => {
  const [topCard, setTopCard] = useState<Card>();
  const [remainings, setremainigs] = useRecoilState(remainingCards);
  const [givencards, setGivenCards] = useRecoilState(given_backs);

  useEffect(() => {
    if (clickedby === 'gb') {
      setTopCard(givencards[0]);
    } else {
      setTopCard(remainings[remainings.length - 1]);
    }
  }, [clickedby, remainings, givencards]);
  return (
    <div className='flex justify-center items-center w-1/6 h-1/3 mt-16 z-50'>
      <div className="relative w-full h-full">
        {/* Buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 mb-2">
          <button className="bg-white/30 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={takefunc}>Take</button>
          <button className="bg-white/30 hover:bg-red-700 text-black font-bold py-2 px-4 rounded border-2 border-yellow-300" onClick={() => {
              // disappears the modal and adds that card to the given backs
              openerHandler();
              if (clickedby === 'remaining') {
                setremainigs((prev) => prev.filter((c) => c !== topCard));
              }
              if (topCard) {
                setGivenCards((prev) => [topCard, ...prev]);
                console.log(givencards);
              }
            }}>Leave
          </button>
        </div>

        {/* Image */}
        <img src={topCard?.image} alt="" className='w-full h-full p-1 bg-green-500 shadow-2xl shadow-black rounded-md border-green-500' />
      </div>
    </div>
  );
};

export default Board;

