// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
// import Board from './comps/Board.tsx'
// import ImprovBoard from './comps/ImprovBoard.tsx'
// import AnotherBoard from './comps/anotherBoard.tsx'
import { RecoilRoot } from 'recoil'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
)
