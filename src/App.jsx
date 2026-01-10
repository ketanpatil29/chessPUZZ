import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Login from './components/Login';
import ChessGame from './ChessGame';

function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <section className="font-[Babel]">
      <div className={`flex justify-center ${showLogin ? "overflow-hidden" : ""}`}>
        <div className="bg-linear-to-r from-gray-300 to-gray-200 w-full max-w-[700px] flex flex-col items-center justify-center border border-gray-400 rounded-t-3xl mx-auto mt-4 pb-4">
          <Header onLoginClick={() => setShowLogin(true)}/>
          <ChessGame />
        </div>
      </div>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)}></Login>
      )}
    </section>
  )
}

export default App
