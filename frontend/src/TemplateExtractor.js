import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

function averageEmbeddings(embeddings) {
  const length = embeddings[0].length;
  const avg = new Float32Array(length);
  for (let i = 0; i < embeddings.length; i++) {
    for (let j = 0; j < length; j++) {
      avg[j] += embeddings[i][j];
    }
  }
  for (let j = 0; j < length; j++) {
    avg[j] /= embeddings.length;
  }
  return avg;
}

function quantizeEmbedding(embedding, factor = 1000) {
  return Array.from(embedding).map(x => Math.round(x * factor));
}

export default function TemplateExtractor({ onTemplateReady }) {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Cargando modelos...');
  const [templates, setTemplates] = useState([]);
  const [finalTemplate, setFinalTemplate] = useState(null);

  // Cargar modelos y encender cámara
  useEffect(() => {
    const loadModelsAndCamera = async () => {
      try {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
        setLoadingMessage('');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error loading models:', error);
        setLoadingMessage('Error loading models. Check console.');
      }
    };

    loadModelsAndCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Captura automática de templates
  useEffect(() => {
    if (!modelsLoaded) return;
    if (templates.length >= 5) return;

    const intervalId = setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState < 2) return;
      try {
        const detection = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection && detection.descriptor) {
          setTemplates(prev => {
            if (prev.length < 5) {
              return [...prev, detection.descriptor];
            }
            return prev;
          });
        }
      } catch (error) {
        // Silencia errores de detección
      }
    }, 1200);

    return () => clearInterval(intervalId);
  }, [modelsLoaded, templates.length]);

  // Cuando se capturen 5 templates, calcula el promedio y lo cuantiza
  useEffect(() => {
    if (templates.length === 5) {
      const avg = averageEmbeddings(templates);
      const quantized = quantizeEmbedding(avg);
      setFinalTemplate(quantized);
      if (onTemplateReady) onTemplateReady(quantized);
    }
  }, [templates, onTemplateReady]);

  return (
    <div style={{ marginTop: '1rem', position: 'relative' }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="240"
        height="180"
        style={{ borderRadius: 8, backgroundColor: '#333' }}
      />
      {!modelsLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.7)'
        }}>
          {loadingMessage}
        </div>
      )}
      <div style={{
        position: 'absolute',
        bottom: 8,
        right: 8,
        background: 'rgba(0,0,0,0.5)',
        color: '#27A603',
        borderRadius: 4,
        padding: '2px 8px',
        fontSize: '0.9em'
      }}>
        {modelsLoaded
          ? (templates.length < 5
              ? `Capturando rostro (${templates.length}/5)`
              : 'Capturas completas')
          : ''}
      </div>
    </div>
  );
}