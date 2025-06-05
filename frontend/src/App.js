
import React from 'react';
import './App.css';
import Login from './Login';
import LetterGlitch from './backgrounds/LetterGlitch/LetterGlitch.jsx';

function App() {
  return (
    <div className="app-container">
      <div className="background-layer">
        <LetterGlitch />
      </div>
      <div className="content-layer">
        <Login />
      </div>
    </div>
  );
}

export default App;