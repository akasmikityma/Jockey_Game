
import button from '../../button.mp3'
import React, { useEffect, useState,useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { given_backs,  pl3_Valids, plyers_InHands, gamePlayers, remainingCards, selectedCards, JockeyOftheGame,allvalids, RealJockey, setIntheModal } from '../store/atoms';
import { Card } from '../store/Cards';
import { useWebSocket } from '../store/ContextProviderer';
import CardCell from './CardCell';
import { DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd';
import notseenJockeycard from '../../notseenJockeycard.png';
import Toast from './Toast';
const Board: React.FC = () => {
  const mePlayer = useWebSocket();
  // const [length, setLength] = useState<number>(10);
  const length = 10;
  const [modalopen, setModalopen] = useState(false);
  const [openCards, setOpenCards] = useState(false);
  const [given_back_cards, setGivenBackCards] = useRecoilState(given_backs);
  const [boardRemainings, setBoardRemainigs] = useRecoilState(remainingCards);
  const [playercards, setPlayerCards] = useRecoilState(plyers_InHands);
  const [player3valids, setPlayer3Valids] = useRecoilState(pl3_Valids);
  const [clickedBy, setClickedBy] = useState('');
  const players = useRecoilValue(gamePlayers);
  const [makingSet,setMakingSet]=useState(false)
  const [selectedforset,setselectedforset]=useRecoilState(selectedCards);
  const [seeJocky,setSeejockey]=useState(false);
  const jockeyCard=useRecoilValue(JockeyOftheGame);
  const realJockey=useRecoilValue(RealJockey)
  const [allthevalids,setAlltheValids]=useRecoilState(allvalids)
  const [isModalOpen,setisModalOpen]=useState(false)
  const setSetintheModal=useSetRecoilState(setIntheModal)
  const [seenJockey,setseenJockey]=useState(false);
  const [Winner,setWinner]=useState('');
  const [gameEnded,setGameEnded]=useState(false);
  const [clickedCardRight,setclickedCardRight]=useState<Card|null>(null)
  const [OpenOptions,setOpenOptions]=useState(false);
  const [alertMessage, setAlertMessage] = useState<string|null>("");
  const [currentPlayer,setCurrentPlayer] = useState<{playerId: string, name: string} | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<String|null>(null);
  const [showToast,setShowToast] = useState(false);
  const [CanJoinNewGame,setCanJoinNewGame] = useState<boolean>(false);
  const audioRef = useRef(null);
  
  useEffect(()=>{
    console.log(CanJoinNewGame)
    const storedPlayerId = localStorage.getItem("playerId");
      if (storedPlayerId) {
          setMyPlayerId(storedPlayerId);
      }
  },[])
  useEffect(() => {
    console.log(Winner.length);
    const storedPlayerId = localStorage.getItem("playerId");
    if(storedPlayerId){
      setMyPlayerId(storedPlayerId);
    }
    if (mePlayer) {
      mePlayer.send(JSON.stringify({
        type:"getGameState",
        playerId: storedPlayerId
      }))
      mePlayer.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "playerId":
            console.log("lets handle the playerId , inside board.tsx", message.playerId);
            localStorage.setItem("playerId", message.playerId);
            console.log(`Player ID: ${message.playerId}`);
            break;
          case "reconnect":
            console.log("Reconnected successfully:", message);
            // setAlertMessage("Reconnected to the game!");
            // setPlayerCards(message.gameState.cards); // Update player's cards
            // setBoardRemainigs(message.gameState.remainingCards); // Update remaining cards
            // setGivenBackCards(message.gameState.givenBackCards); // Update given-back cards
            // setAlltheValids(message.gameState.validSets); // Update valid sets
            // setWinner(message.gameState.winner); // Update winner if the game has ended
            if (message.gameState) {
                setAlertMessage("Successfully reconnected to the game!");
                setPlayerCards(message.gameState.cards);
                setBoardRemainigs(message.gameState.remainingCards);
                setGivenBackCards(message.gameState.givenBackCards);
                setAlltheValids(message.gameState.validSets);
                setWinner(message.gameState.winner);
                if (message.gameState.currentPlayer) {
                  setCurrentPlayer({
                    playerId: message.gameState.currentPlayer,
                    name: message.gameState.currentPlayerName || ""
                  });
                }
            }
            break;
          case "takeRemRes":
            console.log(message.msg);
            setBoardRemainigs(message.nowRem);
            setPlayerCards(message.msg);
            setAlertMessage(`you have to give one back ${message.action}`);
            break;
            
          // case "gameStateUpdate":
          //   setBoardRemainigs(message.remainingCards);
          //   setGivenBackCards(message.givenBackCards);
          //   setAlltheValids(message.validSets);
          //   setWinner(message.Winner);
          //   break;
          case "takeGbRes":
            console.log(message.msg);
            setPlayerCards(message.msg);
            setAlertMessage(`you have to give one card back ... ${message.action}`);
            break;
          case "aftergb":
            setPlayerCards(message.msg);
            setGivenBackCards(message.givenBacks);
            setAlertMessage(`your turn is complete`);
            break;
          case "gameStateUpdate":
            // Update the remaining cards and given back cards across all players
            setBoardRemainigs(message.remainingCards);
            setGivenBackCards(message.givenBackCards);
            setAlltheValids(message.validSets)
            console.log(message.Winner)
            setWinner(message.Winner)
            console.log("case gamestate",message.currentPlayer)
            setCurrentPlayer({
              playerId: message.currentPlayer || "",
              name: message.currentPlayerName || ""
            });
            gameEndedMethod(message.Winner);
            break;
           case "turnChange":
            setCurrentPlayer({
                playerId: message.currentPlayer,
                name: message.currentPlayerName
            });
            break;
          case "showRes":
            console.log(message.msg)
            handle_SHOW_RES(message)
          // case "join":
          //   setPlayers(message.noOFplayers)
           break;
          case "addCardRes":
            console.log(message.msg);
            setAlltheValids(message.allValids)
            setPlayerCards(message.cardsleftIn_hands);
            // setWinner(message.Winner)
            break;
          case "afterleave":
            console.log(message)
            setBoardRemainigs(message.remainingCards);
            setGivenBackCards(message.givenBacks);
            break;
          case "notYourTurn":
            setAlertMessage(message.msg);
            break;
          case "yourTurn":
            setAlertMessage(message.msg)
            break;
          case "afterleavefromGB":
            setPlayerCards(message.msg);
            setGivenBackCards(message.givenBacks);
            break;
          case "error":
            console.log("Error message received:", message);
            if (message.msg.includes("Player not found") || 
                message.msg.includes("grace period expired")) {
                setCanJoinNewGame(true);
            }
            setAlertMessage(message.msg);
            break;
          case "gameLeft":
            setCanJoinNewGame(true);
            setAlertMessage(message.msg);
            break;
          default:
            console.log(message.type);
        }
      };
    }
    console.log(`players in the game: ${JSON.stringify(players)}`);
    console.log(`current player `,currentPlayer)
    console.log(`valid current player ${currentPlayer?.playerId} and im ${myPlayerId} so my turn is`,currentPlayer?.playerId === myPlayerId)
  }, [mePlayer]);
  
  const isMyTurn = currentPlayer?.playerId === myPlayerId;
  //handleDragEnd-------

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
    if(showToast){
      const timer = setTimeout(()=> setShowToast(false),3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage,showToast]);
  
  const handleOnDragEnd = (result:any) => {
    if (!result.destination) return;

    const { source, destination } = result;

  
    // Proceed with moving the card within playercards
    const newPlayerCards = Array.from(playercards);
    const [movedCard] = newPlayerCards.splice(source.index, 1);
    newPlayerCards.splice(destination.index, 0, movedCard);
  
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
    setseenJockey(true);
    // setWinner(message.Winner);
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
        // alertMessage(`one card added ${JSON.stringify(selectedforset)}`)
        setselectedforset((prev)=>[...prev,card])
      }
    }
  };

  const sendAddMessage=(cards:Card[])=>{
    mePlayer?.send(JSON.stringify({
      type:"addCardtoSet",
      set:cards
    }))
  }
 const gameEndedMethod=(winner:string)=>{
   setGameEnded(winner.length>0)
 }
 const putCardToset=(card: Card,value:string)=>{
   //get the card to either to the beginning of the set or to the end>>
     if(value==='start'){
      setSetintheModal((prev)=>[card,...prev])
     }else{
      setSetintheModal((prev)=>[...prev,card])
     }
 }
  const isSected=(card:Card)=>{
    const value=selectedforset.includes(card);
    return value;
  }
  const openModalofset=()=>{
      setisModalOpen(prev=>!prev)
  }
  
  const handleClick = () => {
    mePlayer?.send(JSON.stringify({ type: 'moveOver' }));
    if (audioRef.current) {
      //@ts-ignore
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    setAlertMessage(`your move's over`);
  };
  
  // const handleLeave = ()=>{
  //    mePlayer?.send(JSON.stringify({ type: 'leaveGame' }));
  //    setAlertMessage("U opt to leave the game")
  // }
  // const handleJoinNewGame =()=>{
  //   if (mePlayer) {
  //       mePlayer.send(JSON.stringify({
  //           type: "leaveGame"
  //       }));
  //       // Navigate back to explore page
  //       navigate('/explore');
  //   }
  // }

  const firstThreeValids = allthevalids.slice(0, 3);
  const nextThreeValids = allthevalids.slice(3, 6);
  const remainingValids = allthevalids.slice(6);

  return (
    <div className='bg-slate-700 flex justify-center min-h-screen p-10 relative'>
       {/* {alertMessage && <AlertBoard msg={alertMessage} />} */}
       {(alertMessage && !showToast) && <Toast message={alertMessage} onClose={()=>setAlertMessage("")} position='top'/>}
       {showToast && <Toast message={"Its not ur turn brother .Plz wait. Click Anywhere Else Except the Cards"}
        onClose={()=> {}}
        position='top'
       />}

      {/* over button */}
      <div className="absolute top-0 right-0 p-8 flex flex-col space-y-4">
        {/* <div className='top-0 right-0 absolute p-8'>  */}
      <button className='px-4 py-2 bg-pink-600 text-white font-bold shadow-lg shadow-black rounded-lg transform transition-transform duration-100 active:scale-95 focus:outline-none' onClick={handleClick}>over</button>
      <audio ref={audioRef} src={button}></audio>
      {/* </div> */}
      
      {/* Leave Game button */}
      {/* <div className='top-0 right-0 absolute p-8'> */}
          {/* <button className='px-4 py-2 bg-pink-600 text-white font-bold shadow-lg shadow-black rounded-lg transform transition-transform duration-100 active:scale-95 focus:outline-none' onClick={handleLeave}>
             leave Game
          </button> */}
      {/* </div> */}
      </div>
      <div className='bg-green-600 border-4 border-red-600 rounded-full w-full lg:w-3/4 relative flex justify-center items-center'>
        {/* Player 1 */}
        <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1/4 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full'>
            {firstThreeValids.map((ca, i) => (
              <div className='w-2/3 h-4/5 flex gap-0.5' key={i} onClick={()=>{
                setAlertMessage('clicked on a set')
                openModalofset();
                setSetintheModal(ca)
              }}>
                {ca.map((cs, j) => (
                  <div className='flex border-2 border-black' key={j}>
                    <img src={`${(!seenJockey&&cs.card===realJockey)?notseenJockeycard:cs.image}`} alt="" className='w-full h-full' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Player 2 */}
        <div className='absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2 h-1/5 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden'>
          <div className='grid grid-cols-3 w-full h-full '>
            {nextThreeValids.map((ca, i) => (
              <div className='w-5/6 h-5/6 flex gap-0.5' key={i}
              onClick={()=>{
                setAlertMessage('clicked on a set')
                openModalofset();
                setSetintheModal(ca)
              }}
              >
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
                {Array.isArray(playercards)&&playercards.map((C, i) => (
                  <Draggable key={C.image} draggableId={C.image} index={i}>
                    {(provided) => (
                      <div
                      className={`${makingSet ? `border-4 border-red-600` : `border-2`} ${isSected(C)?`border-yellow-500`:``} select-none p-2 mr-2 mb-0 min-h-36 bg-white overflow-visible rounded-md relative`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onDoubleClick={(e) => {
                        console.log('Double click event triggered');
                        give_card_back(e, C);
                      }}
                      onContextMenu={(e)=>{
                        if(makingSet){
                          settingValids(e, C);
                        }else{
                          setclickedCardRight(C)
                          setOpenOptions(prev=>!prev)  
                        }
                        e.preventDefault()
                      }}
                    >
                      <img src={C.image} alt="" className='w-full h-full flex items-center'/>
                      {
                            (clickedCardRight === C && OpenOptions) && (
                              <div className='z-50 flex flex-row absolute bottom-10 justify-around left-0'>
                                <button className='px-2 py-1 bg-blue-400 text-white font-bold rounded-md' onClick={() => putCardToset(C, 'start')}>start</button>
                                <button className='px-2 py-1 bg-yellow-500 text-white font-bold rounded-md' onClick={() => putCardToset(C, 'end')}>end</button>
                              </div>
                            )
                       }
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
        // <div className='grid grid-cols-3 w-full h-full'>
        //   {player3valids&&player3valids?.map((ca, i) => (
        //     <div className='w-2/3 h-4/5 flex gap-0.5' key={i}>
        //       {ca.map((cs, j) => (
        //         <div className='flex border-2 border-black' key={j}>
        //           <img src={cs.image} alt="" className='w-full h-full' />
        //         </div>
        //       ))}
        //     </div>
        //   ))}
        // </div>
        <div></div>
      )}
    </div>

        {/* Player 4 */}
        <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-1/2 h-1/6 rounded-xl text-center font-bold p-2 flex gap-4 justify-center items-center overflow-hidden mt-4'>
          <div className='grid grid-cols-3 w-full h-full'>
            {remainingValids.map((ca, i) => (
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
          <div className='absolute top-1/4 left-1/3 cursor-pointer' onContextMenu={(e)=>{
            e.preventDefault()
            if(player3valids.flat().length>=3){
              setAlertMessage(`the Jocky is -> ${realJockey}`)
              setSeejockey((prev)=>!prev)
            }else{
              setAlertMessage(`u need to have a valid set first`)
            }
            
          }}>
            {Array.from({ length:boardRemainings.length+1 }).map((_, index) => (
              <div
                key={index}
                className='bg-black h-20 w-12 rounded-sm absolute border border-white mt-2'
                style={{
                  top: `${index * 1}px`,
                  right: `${index * 1}px`,
                  zIndex: length - index,
                }}
                onClick={() => {
                 if(!isMyTurn){
                    setShowToast(true);
                 }
                 if(boardRemainings.length===0){
                  mePlayer?.send(JSON.stringify({
                    type:"takefromrem"
                  }))
                 }else{
                  if(modalopen===true){
                    alert(`You have to take or leave the card`)
                  }else{
                    setModalopen(true)
                  }
                  setClickedBy('remaining');
                 }
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

        {modalopen && <Modal onClose={()=>setModalopen(false)} clickedby={clickedBy} takefunc={take_card} remainings={boardRemainings} giveCardBack={buttonWalagiveBack}/>}
        {seeJocky&&<JockeyModal jockeyCard={jockeyCard} onClose={()=>setSeejockey(false)}/>}
        {isModalOpen && <SetModal sedMessageAddCard={(cards) => sendAddMessage(cards)} modalOpener={setisModalOpen} />}
        {playercards.length===0&&<WinDisclaimer winner={Winner} Text='You Won'/>}
        {(gameEnded &&playercards.length!==0)&& <LoseDisclaimer winner={Winner} Text='You Lose'/>}
      </div>


      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 text-white p-16 flex flex-col  items-center z-50'>
        
       <div className='flex flex-row gap-2'>
       <button onClick={() => setOpenCards(prev => !prev)} className={`${openCards?`bg-yellow-500`:`bg-white shadow-lg shadow-black`} text-black px-2 py-1 rounded`}>{openCards?`close`:`Cards`}</button>
       <button className={`px-2 py1 ${makingSet?`bg-blue-700`:`bg-orange-600`} text-white font-semibold shadow-lg shadow-black rounded-lg`} onClick={()=>{
        setMakingSet((prev)=>!prev)
        //now its true>>
       if(makingSet && selectedforset.length>=3){
        mePlayer?.send(JSON.stringify({      
          type:"showSet",
          set:selectedforset
      }))
      setAlertMessage(`set put to validation`)
      setAlertMessage("once u are done with ur moves CLICK ON OVER : ")
      setselectedforset([])
       }else if(makingSet && selectedforset.length<3){
        setselectedforset([])
        alert(`u have to at least select 3 cards`)
       }
       }}>{makingSet?`submit`:`makeSet`}</button>
       </div>
      </div>
       {/* <div> */}
        {/* {(CanJoinNewGame || Winner) &&(
          <button className='join-new-game-btn'
            onClick={handleJoinNewGame}
          >
            Join New Game
          </button>
       )} */}
       {/* </div> */}
    </div>
  );
};

const SetModal: React.FC<{ sedMessageAddCard: (cards: Card[]) => void ,modalOpener: React.Dispatch<React.SetStateAction<boolean>>,}> = ({ sedMessageAddCard ,modalOpener}) => {
  const Modalset = useRecoilValue(setIntheModal);
  // const [submitON,setSubmitON] = useState(false);
  const submitON = false;
  console.log(Modalset);
  
  return (
    <div className='bg border-8 border-black bg-green-800 w-full h-1/2 z-50 rounded-lg shadow-lg shadow-black'>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <div className={`flex flex-row w-3/4 h-4/5`}>
          {Modalset && Modalset.map((m, i) => (
            <div className='h-full w-full border-black p-4' key={i}>
              <img src={m.image} alt="" className={`${submitON ? 'w-4/5' : 'w-full'} h-5/6 bg-white p-4 rounded-md`} />
            </div>
          ))}
        </div>
       <div className='flex flex-row gap-4 '>
       <button className='px-2 py-1 bg-blue-700 hover:bg-slate-500 text-white font-bold rounded-md shadow-black shadow-md' onClick={() => {
          // send a new message and listen that in the backend
          sedMessageAddCard(Modalset);
          modalOpener((prev)=>!prev)
        }}>
          submit
        </button>
        <button className='px-2 py-1 bg-yellow-700 hover:bg-slate-500 text-black font-bold rounded-md shadow-black shadow-md' onClick={()=>modalOpener(prev=>!prev)}>close</button>
       </div>
      </div>
    </div>
  );
};
const LoseDisclaimer:React.FC<{Text:string,winner?:string}>=({Text,winner})=>{
  const [isFlashing, setIsFlashing] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [])
  return (
  
      <div className={`border-4 bg-slate-500 shadow-lg z-50 w-2/3 text-center shadow-black h-36 flex flex-col justify-center items-center ${isFlashing ? 'visible' : 'hidden'}`}>
      <h1 className='font-extrabold text-2xl'>{Text}</h1>
      {winner&&<h1 className='text-white font-bold'>{`the Winner - ${winner}`}</h1>}
    </div>
   
  )
}
const WinDisclaimer:React.FC<{Text:string,winner?:string}>=({Text,winner})=>{
  const [isFlashing, setIsFlashing] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlashing((prev) => !prev);
    }, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [])
  return (
    <div className={`border-4 bg-slate-500 shadow-lg z-50 w-2/3 text-center shadow-black h-36 flex flex-col justify-center items-center ${isFlashing ? 'visible' : 'hidden'}`}>
      <h1 className='font-extrabold text-2xl'>{Text}</h1>
      {winner&&<h1 className='text-white font-bold'>{winner}</h1>}
    </div>
  )
}

const Modal: React.FC<{ clickedby: string, takefunc: () => void, remainings: Card[], giveCardBack: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void ,onClose:()=>void}> = ({  clickedby, takefunc, remainings, giveCardBack ,onClose}) => {
  const [topCard, setTopCard] = useState<Card>();
  // const [givencards, setGivenCards] = useRecoilState(given_backs);
  const givencards = useRecoilValue(given_backs);
  const modalRef = useRef<HTMLDivElement>(null);
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
  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })
  return (
    <div className='flex justify-center items-center w-1/6 h-1/3 mt-16 z-50' ref={modalRef}>
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
const JockeyModal: React.FC<{ jockeyCard: Card; onClose: () => void }> = ({
  jockeyCard,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg">
        <img src={jockeyCard.image} alt="Jockey" className="w-full h-auto" />
      </div>
    </div>
  );
};

// export default JockeyModal;
export default Board;
// -----------------------------------------------------------------------------------------------------------------
