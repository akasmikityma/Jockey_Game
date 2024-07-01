import React, { useEffect,useState } from 'react'
import { useSocketHook } from '../store/useSocketHook'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { plyers_InHands } from '../store/atoms';
const Explore = () => {
    const navigate=useNavigate();
    const [cardsINHands,setcardsINHands]=useRecoilState(plyers_InHands);
     const [messages,setMessages]=useState<string[]>([])
     const getToGame=()=>{
        navigate('/');
     }
    const socket =useSocketHook();
    useEffect(()=>{
        if(!socket){
            return 
        }
        console.log(messages)
        socket.onmessage=(event)=>{
            const message =JSON.parse(event.data);
            console.log(message.msg)
            setMessages((prev:string[])=>[...prev,message.msg])
            switch(message.type){
                case "start":
                    getToGame()
                    // break
                    console.log(`now just change the backend of cards a bit and set the playercards here `)
                case "join":
                    console.log(`in case of join message-type`)

            }
        }
    },[socket,messages])
  return (
    <div className='flex min-h-screen bg-slate-500 justify-center items-center flex-col gap-10'>
        <div className='flex gap-4 '>
        <button className='p-4 text-white bg-black' onClick={(()=>{
            console.log(`button clicked`)
            socket?.send(JSON.stringify({
                type:"init_game"
            }))
        })}>init_game</button>
        <button className='p-4 text-white bg-black' onClick={()=>{
            console.log(`join clicked`)
            socket?.send(JSON.stringify({
                type:"join"
            }))
        }}>join</button>
        <button className='p-4 text-white bg-black' onClick={()=>{
            socket?.send(JSON.stringify({
                 type:"start"
            }))
        }}>start</button>
        </div>
        <div>
        {
            messages&&messages.map((m,i)=>{
                return <div key={i}>{m}</div>
            })
        }
        </div>
    </div>
  )
}

export default Explore