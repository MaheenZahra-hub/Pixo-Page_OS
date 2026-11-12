import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sfx } from '../utils/sound.js';

export default function Navbar({ activeTab, setActiveTab, soundEnabled, setSoundEnabled }) {
  const toggleSound = () => {
    sfx.muted = !sfx.muted;
    setSoundEnabled(!sfx.muted);
    if (!sfx.muted) sfx.pop();
  };

  const navItems = [
    { id: 'welcome', label: 'START' },
    { id: 'trace', label: 'MEMORY GRID' },
    { id: 'battle', label: 'ALGORITHM ARENA' },
    { id: 'viva', label: 'FLOWCHART' },
  ];

  return (
    <header className="bg-[#f472b6] border-b-4 border-black px-4 py-3 sticky top-0 z-50 shadow-[0_5px_0_#000]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand Mascot */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => { sfx.tab(); setActiveTab('welcome'); }}
        >
          <div className="w-11 h-11 bg-[#fef08a] border-3 border-black rounded-xl flex items-center justify-center shadow-[3px_3px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition-transform">
            <span className="text-2xl select-none animate-bounce">👻</span>
          </div>
          <div>
            <h1 className="font-pixel text-xs sm:text-sm text-black tracking-wider flex items-center gap-1.5">
              <span>PIXO-PAGE</span>
              <span className="text-[9px] bg-[#facc15] text-black px-1.5 py-0.5 border-2 border-black rounded shadow-[1px_1px_0_#000]">
                OS
              </span>
            </h1>
            <p className="text-[9px] text-pink-950 font-pixel mt-0.5 font-bold">ARCADE SIMULATOR</p>
          </div>
        </div>

        {/* Level Navigation Buttons */}
        <nav className="flex items-center gap-2">
          {navItems.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { sfx.tab(); setActiveTab(tab.id); }}
                className={`px-3 py-2 border-3 border-black rounded-lg font-pixel text-[10px] transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#facc15] text-black shadow-[3px_3px_0_#000] -translate-y-0.5' 
                    : 'bg-white hover:bg-[#fef9c3] text-black shadow-[2px_2px_0_#000]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute' : 'Unmute'}
            className="p-2 border-3 border-black rounded-lg bg-[#2dd4bf] hover:bg-[#14b8a6] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-gray-800" />}
          </button>
        </nav>
      </div>
    </header>
  );
}