import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'

const App = () => {
  return (
  <div className='relative h-full w-full'>
  <div className='absolute inset-0 -z-10 h-full w-full 
  [background:radial-gradient(125%_125%_at_50%_10%,#1a1a1a_60%,#00FF9D80_100%)]' />
  
      <Routes>
        <Route path="/" element= {<HomePage/>} />
        <Route path="/create" element= {<CreatePage/>}/>
        <Route path="/note/:id" element= {<NoteDetailPage/>}/>     
      </Routes>

    </div>
  )
}

export default App