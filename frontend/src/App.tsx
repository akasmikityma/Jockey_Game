// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Board from './comps/Board'
import Explore from './comps/Explore'
import { WebSocketProvider } from './store/ContextProviderer'
import LandingPage from './comps/LandingPage'
const App = () => {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
            <Route path='/board' element={<Board/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/' element={<LandingPage/>}/>
        </Routes>
    </Router>
    </WebSocketProvider>
  )
}

export default App

//get react-router-dom and have the routing done >>