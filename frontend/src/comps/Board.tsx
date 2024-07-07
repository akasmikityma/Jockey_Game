
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { given_backs, pl1_Valids, pl2_Valids, pl3_Valids, pl4_Valids, plyers_InHands, gamePlayers, remainingCards, selectedCards } from '../store/atoms';
import { Card } from '../store/Cards';
import { useWebSocket } from '../store/ContextProviderer';
import CardCell from './CardCell';
import { DragDropContext,Draggable,Droppable, DraggableId} from 'react-beautiful-dnd';
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
  const [players, setPlayers] = useState(0);
  const [makingSet,setMakingSet]=useState(false)
  const [selectedforset,setselectedforset]=useRecoilState(selectedCards);
  
  useEffect(() => {
    
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
          case "showRes":
            console.log(message)
            handle_SHOW_RES(message)
          case "join":
            setPlayers(message.noOFplayers)
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
    console.log(`players in the game: ${JSON.stringify(players)}`);
  }, [mePlayer]);
  
  //handleDragEnd-------

  const handleOnDragEnd = (result:any) => {
    if (!result.destination) return;

    const newPlayerCards = Array.from(playercards);
    const [movedCard] = newPlayerCards.splice(result.source.index, 1);
    newPlayerCards.splice(result.destination.index, 0, movedCard);

    // Update the state or handle the new order of cards
    setPlayerCards(newPlayerCards);
    console.log('New order of playercards:', newPlayerCards);
  };

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
  
  const handle_SHOW_RES = (message: any) => {
    setPlayer3Valids((prev) => [...prev, message.valids]);
    setPlayerCards(message.cardsleftIn_hands);
    
    // console.log(player3valids)
    // const validImages = new Set(message.valids.map((card: Card) => card.image));
    // const restValuesAfterValids = playercards.filter(item => !validImages.has(item.image));
    // setPlayerCards(restValuesAfterValids);
  
    // console.log(restValuesAfterValids);
  };
  

  const give_card_back = (e: React.MouseEvent<HTMLDivElement>, card: Card) => {
    e.stopPropagation(); // Prevent event propagation
    console.log(`card double clicked`);
    mePlayer?.send(JSON.stringify({ type: "giveback", card }));
  };

  const buttonWalagiveBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent event propagation
    console.log(`leave clicked`);
    console.log('Sending message:', JSON.stringify({ type: "leaveCard" }));
    try {
      // mePlayer?.send(JSON.stringify({ type: "leaveCard"}));
      if(clickedBy==="remaining"){
        mePlayer?.send(JSON.stringify({ type: "leaveCard"}));
      }else{
        mePlayer?.send(JSON.stringify({
          type:"leaveFormGB"
        }))
      }
    } catch (error) {
      console.error('Error sending leaveCard message:', error);
    }
    setModalopen(false);
  };
 
  const settingValids = (e: React.MouseEvent<HTMLDivElement>, card: Card) => {
    e.preventDefault();
    
    if (makingSet === true) {
      if(selectedforset.includes(card)){
        setselectedforset((prev)=>prev.filter(c=>c!==card))
        alert(`already included that card - removing the card from there ${JSON.stringify(selectedforset)}`)
        
      }else{
        alert(`one card added ${JSON.stringify(selectedforset)}`)
        setselectedforset((prev)=>[...prev,card])
      }
    }
  };

  const isSected=(card:Card)=>{
    const value=selectedforset.includes(card);
    return value;
  }

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
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${playercards.length<=4?`w-1/3`:`w-4/5 h-64`} rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-visible mt-4`}>
      {openCards ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playercards" direction="horizontal">
            {(provided) => (
              <div className='flex overflow-auto w-full ' {...provided.droppableProps} ref={provided.innerRef} >
                {playercards.map((C, i) => (
                  <Draggable key={C.image} draggableId={C.image} index={i}>
                    {(provided) => (
                      <div
                      className={`${makingSet ? `border-4 border-red-600` : `border-2`} ${isSected(C)?`border-yellow-500`:``} select-none p-2 mr-2 mb-0 min-h-36 bg-white overflow-visible rounded-md`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDoubleClick={(e) => {
                          console.log('Double click event triggered');
                          give_card_back(e, C);
                        }}
                        
                        onContextMenu={(e)=>settingValids(e,C)}
                        // style={{ 
                        //   userSelect: 'none',
                        //   padding: '8px',
                        //   margin: '0 8px 0 0',
                        //   minHeight: '50px',
                        //   backgroundColor: '#fff',
                        //   ...provided.draggableProps.style,
                        // }}
                      >
                        <img src={C.image} alt="" className='w-full h-full flex items-center'/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className='grid grid-cols-3 w-full h-full'>
          {player3valids?.map((ca, i) => (
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
            if(modalopen===true){
              alert(`You have to take or leave the card`)
            }else{
              setModalopen(true)
            }
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
            if(modalopen===true){
              alert(`You have to take or leave the card`)
            }else{
              setModalopen(true)
            }
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

        {modalopen && <Modal clickedby={clickedBy} takefunc={take_card} remainings={boardRemainings} giveCardBack={buttonWalagiveBack}/>}
      </div>

      {/* Player indicators */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-12 text-white p-16'>Player 1</div>
      <div className='absolute top-1/2 right-0 transform translate-x-12 -translate-y-1/2 text-white p-16'>Player 2</div>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16 flex flex-col  items-center'>
        <p>Player 3</p>
       <div className='flex flex-row gap-2'>
       <button onClick={() => setOpenCards(prev => !prev)} className={`${openCards?`bg-yellow-500`:`bg-white`} text-black px-2 py-1 rounded`}>{openCards?`close`:`Cards`}</button>
       <button className={`px-2 py1 ${makingSet?`bg-black`:`bg-orange-600`} text-white font-semibold`} onClick={()=>{
        setMakingSet((prev)=>!prev)
        //now its true>>
       if(makingSet && selectedforset.length>=3){
        mePlayer?.send(JSON.stringify({      
          type:"showSet",
          set:selectedforset
      }))
      alert(`set put to validation`)
       }else if(makingSet && selectedforset.length<3){
        setselectedforset([])
        alert(`u have to at least select 3 cards`)
       }
       }}>{makingSet?`submit`:`makeSet`}</button>
       </div>
      </div>
      <div className='absolute top-1/2 left-0 transform -translate-x-12 -translate-y-1/2 text-white p-16'>Player 4</div>
    </div>
  );
};

const Modal: React.FC<{ clickedby: string, takefunc: () => void, remainings: Card[], giveCardBack: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }> = ({  clickedby, takefunc, remainings, giveCardBack }) => {
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
