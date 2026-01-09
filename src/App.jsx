import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import ChessGame from './ChessGame';

function App() {

  return (
    <>
      <div className="w-full max-w-[750px] flex flex-col items-center justify-center border border-gray-800 rounded-t-lg mx-auto mt-4 pb-4">
        <Header />
        <ChessGame />
      </div>
    </>
  )
}

export default App
