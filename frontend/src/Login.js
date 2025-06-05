import React from 'react';
import './App.css';
import AnimatedText from './components/AnimatedText'; // Asegúrate de que la ruta sea correcta

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login aquí
  };

  return (
    <div className="login-box">
      <h2>
        <AnimatedText text="Iniciar Sesión" delay={0.2} />
      </h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Usuario" 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;