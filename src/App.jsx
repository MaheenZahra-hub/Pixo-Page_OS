import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';

import Navbar from './components/NavbarSide.jsx';
import Footer from './components/Footer.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import VisualizerPage from './components/VisualizerPage.jsx';
import ComparisonPage from './components/ComparisonPage.jsx';
import VivaPage from './components/VivaPage.jsx';

import { simulateFIFO, simulateLRU, simulateOptimal } from './utils/algorithms.js';
import { sfx } from './utils/sound.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [rawInput, setRawInput] = useState('7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2');
  const [frameCount, setFrameCount] = useState(3);
  const [algorithm, setAlgorithm] = useState('FIFO');

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1000);

  // Defensive input parsing
  const parsedPages = useMemo(() => {
    const matches = rawInput.match(/\b\d+\b/g);
    return matches ? matches.map(Number) : [7, 0, 1, 2, 0, 3];
  }, [rawInput]);

  // Execute algorithm simulation
  const simulationData = useMemo(() => {
    if (parsedPages.length === 0) return { steps: [], hits: 0, faults: 0, total: 0 };
    if (algorithm === 'FIFO') return simulateFIFO(parsedPages, frameCount);
    if (algorithm === 'LRU') return simulateLRU(parsedPages, frameCount);
    return simulateOptimal(parsedPages, frameCount);
  }, [parsedPages, frameCount, algorithm]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [rawInput, frameCount, algorithm]);

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < simulationData.steps.length - 1) {
            const nextIdx = prev + 1;
            const step = simulationData.steps[nextIdx];
            if (step.isHit) sfx.hit();
            else sfx.fault();
            return nextIdx;
          } else {
            setIsPlaying(false);
            sfx.victory();
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
            return prev;
          }
        });
      }, playSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, simulationData, playSpeed]);

  return (
    <div className="min-h-screen text-black flex flex-col font-sans selection:bg-[#fbcfe8]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'welcome' && (
          <WelcomePage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'trace' && (
          <VisualizerPage
            rawInput={rawInput}
            setRawInput={setRawInput}
            frameCount={frameCount}
            setFrameCount={setFrameCount}
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            simulationData={simulationData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            playSpeed={playSpeed}
            setPlaySpeed={setPlaySpeed}
          />
        )}

        {activeTab === 'battle' && (
          <ComparisonPage
            parsedPages={parsedPages}
            frameCount={frameCount}
          />
        )}

        {activeTab === 'viva' && (
          <VivaPage />
        )}
      </main>

      <Footer />
    </div>
  );
}