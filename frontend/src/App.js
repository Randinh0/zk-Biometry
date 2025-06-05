import logo from './logo.svg';
import './App.css';
import useContractEvents from './hooks/useContractEvents';

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
    </div>
  );
}

export default App;

