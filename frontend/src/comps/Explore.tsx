// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilState, useSetRecoilState } from 'recoil';
// import { plyers_InHands, gamePlayers, remainingCards, JockeyOftheGame, RealJockey } from '../store/atoms';
// import { useWebSocket } from '../store/ContextProviderer';
// import { join_Button_State } from '../store/atoms';
// import "../css/explore.css"; // Import the CSS for styling

// const Explore = () => {
//     const navigate = useNavigate();
//     const setcardsINHands = useSetRecoilState(plyers_InHands);
//     const setgamesLeftout = useSetRecoilState(remainingCards);
//     const setPlayers = useSetRecoilState(gamePlayers);
//     const [messages, setMessages] = useState<string[]>([]);
//     const socket = useWebSocket();
//     const setRealJockey = useSetRecoilState(RealJockey);
//     const setJockey = useSetRecoilState(JockeyOftheGame);
//     const [name, setName] = useState('');
//     const [joinedState, setJoinedState] = useRecoilState(join_Button_State);

//     const getToGame = () => {
//         navigate(`/board?socket=${socket}`);
//     };

//     useEffect(() => {
//         if (!socket) {
//             return;
//         }
//         console.log(messages);
//         socket.onmessage = (event) => {
//             const message = JSON.parse(event.data);
//             console.log(message.msg);
//             setMessages((prev: string[]) => [...prev, message.msg]);
//             switch (message.type) {
//                 case "start":
//                     getToGame();
//                     setcardsINHands(message.msg);
//                     setgamesLeftout(message.remainingCards);
//                     setJockey(message.JockyDecider);
//                     setPlayers(message.totalplayers);
//                     setRealJockey(message.Jockey);
//                     break;
//                 case "join":
//                     setJoinedState(true);
//                     console.log(`in case of join message-type`);
//                     break;
//                 case "init_game":
//                     break;
//                 default:
//                     break;
//             }
//         };
//     }, [socket, messages]);

//     return (
//         <div className='explore-page'>
//             <div className='explore-header'>
//                 <h1 className='explore-title'>Explore the Game</h1>
//                 <p className='explore-tagline'>Join or Start a Multiplayer Card Game</p>
//             </div>
//             <div className='explore-controls'>
//                 <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} className='explore-input' />
//                 <button className='explore-button' onClick={() => {
//                     console.log(`button clicked`);
//                     socket?.send(JSON.stringify({ type: "init_game", name: name }));
//                     setName('');
//                 }}>Init Game</button>
//                 <button className={`explore-button ${joinedState ? "disabled" : ""}`} onClick={() => {
//                     if (joinedState) return;
//                     console.log(`join clicked`);
//                     socket?.send(JSON.stringify({ type: "join" }));
//                 }}>{joinedState ? "Joined" : "Join"}</button>
//                 <button className='explore-button' onClick={() => {
//                     socket?.send(JSON.stringify({ type: "start" }));
//                 }}>Start</button>
//             </div>
//             <div className='explore-messages'>
//                 {messages && messages.map((m, i) => <div key={i} className='message'>{m}</div>)}
//             </div>
//         </div>
//     );
// };

// export default Explore;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  plyers_InHands,
  gamePlayers,
  remainingCards,
  JockeyOftheGame,
  RealJockey,
} from "../store/atoms";
import { useWebSocket } from "../store/ContextProviderer";
import { join_Button_State } from "../store/atoms";
import "../css/explore.css"; // Import the CSS for styling
import Toast from "./Toast"; // Import the Toast component

const Explore = () => {
  const navigate = useNavigate();
  const setcardsINHands = useSetRecoilState(plyers_InHands);
  const setgamesLeftout = useSetRecoilState(remainingCards);
  const setPlayers = useSetRecoilState(gamePlayers);
  const [messages, setMessages] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // State for toast message
  const socket = useWebSocket();
  const setRealJockey = useSetRecoilState(RealJockey);
  const setJockey = useSetRecoilState(JockeyOftheGame);
  const [name, setName] = useState("");
  const [joinedState, setJoinedState] = useRecoilState(join_Button_State);

  const getToGame = () => {
    navigate(`/board?socket=${socket}`);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }
    console.log(messages);
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message.msg);
      setMessages((prev: string[]) => [...prev, message.msg]);

      // Show toast for the received message
      setToastMessage(message.msg);

      switch (message.type) {
        case "start":
          getToGame();
          setcardsINHands(message.msg);
          setgamesLeftout(message.remainingCards);
          setJockey(message.JockyDecider);
          setPlayers(message.totalplayers);
          setRealJockey(message.Jockey);
          break;
        case "join":
          setJoinedState(true);
          console.log(`in case of join message-type`);
          break;
        case "init_game":
          // localStorage.setItem("playerId", message.playerId);
          // console.log(`Player ID received and stored: ${message.playerId}`);
          break;
        case "playerId":
          localStorage.setItem("playerId", message.playerId);
          console.log(`Player ID received and stored: ${message.playerId}`);
        break;
        default:
          break;
      }
    };
  }, [socket, messages]);

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h1 className="explore-title">Explore the Game</h1>
        <p className="explore-tagline">Join or Start a Multiplayer Card Game</p>
      </div>
      <div className="explore-controls">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="explore-input"
        />
        <button
          className="explore-button"
          onClick={() => {
            console.log(`button clicked`,socket);
            socket?.send(JSON.stringify({ type: "init_game", name: name }));
            setName("");
          }}
        >
          Init Game
        </button>
        <button
          className={`explore-button ${joinedState ? "disabled" : ""}`}
          onClick={() => {
            if (joinedState) return;
            console.log(`join clicked`);
            socket?.send(JSON.stringify({ type: "join" }));
          }}
        >
          {joinedState ? "Joined" : "Join"}
        </button>
        <button
          className="explore-button"
          onClick={() => {
            socket?.send(JSON.stringify({ type: "start" }));
          }}
        >
          Start
        </button>
      </div>
      <div className="explore-messages">
        {messages &&
          messages.map((m, i) => (
            <div key={i} className="message">
              {m}
            </div>
          ))}
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default Explore;