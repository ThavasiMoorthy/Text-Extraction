import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Center, Float } from '@react-three/drei';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -5]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'hotpink'} />
        </mesh>
      </Float>
    </>
  );
}

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setExtractedText('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Use the Render backend URL
      const response = await axios.post('https://text-extraction-alw7.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
      setExtractedText('Error extracting text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#111' }}>
      <div style={{ position: 'absolute', zIndex: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div style={{
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' // Allow clicks to pass through to canvas where not on UI
      }}>
        <div style={{ pointerEvents: 'auto', width: '80%', maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: '20px', textShadow: '0 0 10px cyan' }}>
            Tamil Text Extractor 3D
          </h1>
          <FileUpload onFileUpload={handleFileUpload} />
          <ResultDisplay text={extractedText} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
