
import React from 'react';
import './App.css';
<<<<<<< HEAD
import useContractEvents from './hooks/useContractEvents';
=======
import Login from './Login';
import LetterGlitch from './backgrounds/LetterGlitch/LetterGlitch.jsx';
>>>>>>> feat/front-end

function App() {
  useContractEvents(
    (data) => {
      console.log("📥 Evento Registered:", data);
      // Aquí podrías usar setState si quieres mostrar en pantalla
    },
    (data) => {
      console.log("✅ Evento Verified:", data);
    }
  );

  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Escuchando eventos del contrato...
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
    <div className="app-container">
      <div className="background-layer">
        <LetterGlitch />
      </div>
      <div className="content-layer">
        <Login />
      </div>
>>>>>>> feat/front-end
    </div>
  );
}

<<<<<<< HEAD
export default App;

=======
export default App;
>>>>>>> feat/front-end
