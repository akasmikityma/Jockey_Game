import React, { useEffect, useState } from 'react';

const url = "ws://localhost:8080";

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      console.log("WebSocket is connected");
    };
    ws.onclose = () => {
      console.log("WebSocket is disconnected");
    };

    ws.onmessage = (event) => {
      const messageGot = event.data;
      setMessages((prev) => [...prev, messageGot]);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  const sendMessageToServer = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputMessage);
      setInputMessage(''); // Clear the input after sending the message
    }
  };

  return (
    <div className='h-screen bg-slate-600 flex justify-center items-center flex-col'>
      <div className='flex flex-row gap-4 w-3/4 justify-center'>
        <input 
          type="text" 
          className='p-3 text-center rounded-lg w-2/3'
          value={inputMessage} 
          onChange={(e) => setInputMessage(e.target.value)} 
        />
        <button onClick={sendMessageToServer}>Send</button>
      </div>
      <div className='flex flex-col '>
        {messages.map((m, index) => (
          <div key={index} className='font-extrabold text-lg'>{m}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
