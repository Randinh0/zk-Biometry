/*global BigInt*/
import React, { useState, useEffect } from 'react';
import './App.css';
import TemplateExtractor from './TemplateExtractor';
import { poseidon15, poseidon16 } from 'poseidon-lite';

function Login() {
  const [template, setTemplate] = useState(null);
  const [salt, setSalt] = useState(null);
  const [commitment, setCommitment] = useState(null);

  useEffect(() => {
    if (!template) return;

    const generateCommitment = () => {
      // Generar salt como BigInt
      const hexString = crypto.randomUUID().replace(/-/g, '');
      const newSalt = BigInt('0x' + hexString);
      
      // Convertir template a BigInt (valores ya cuantizados)
      const templateBigInts = template.map(value => BigInt(value));
      
      // Función para hashear chunks usando poseidon15
      const hashChunks = (chunks, chunkSize = 15) => {
        const result = [];
        for (let i = 0; i < chunks.length; i += chunkSize) {
          let chunk = chunks.slice(i, i + chunkSize);
          // Rellenar con ceros si es necesario
          while (chunk.length < chunkSize) {
            chunk.push(BigInt(0));
          }
          result.push(poseidon15(chunk));
        }
        return result;
      };

      // Hashear el template en bloques de 15 elementos
      const hashedTemplate = hashChunks(templateBigInts, 15);
      
      // Combinar con salt y hashear final (16 entradas)
      const finalInput = [
        ...hashedTemplate,
        newSalt,
        ...Array(16 - hashedTemplate.length - 1).fill(BigInt(0))
      ].slice(0, 16);
      
      const hash = poseidon16(finalInput);
      
      setSalt(newSalt);
      setCommitment(hash);
    };

    generateCommitment();
  }, [template]);

  return (
    <div className="login-box">
      <h2>Login Biométrico</h2>
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="button" disabled>
          {template ? 'Template listo' : 'Esperando captura facial...'}
        </button>
      </form>

      <TemplateExtractor onTemplateReady={setTemplate} />

      {template && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Template facial final (promedio cuantizado):</h3>
          
        </div>
      )}

      {commitment && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Commitment (Poseidon Hash):</h3>
          <code style={{
            fontSize: '0.8em',
            background: '#111',
            color: '#FFD700',
            padding: '8px',
            borderRadius: '5px',
            display: 'block',
            wordWrap: 'break-word'
          }}>
            {commitment.toString()}
          </code>
        </div>
      )}
    </div>
  );
}

export default Login;