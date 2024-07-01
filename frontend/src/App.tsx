import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Board from './comps/Board'
import Explore from './comps/Explore'
const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<Board/>}/>
            <Route path='/explore' element={<Explore/>}/>
        </Routes>
    </Router>
  )
}

export default App

//get react-router-dom and have the routing done >>