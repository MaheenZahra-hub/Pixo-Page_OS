import React from 'react';
import { Play, Sparkles } from 'lucide-react';
import { sfx } from '../utils/sound.js';

export default function WelcomePage({ setActiveTab }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      
      {/* Arcade Screen Card */}
      <div className="bg-white border-4 border-black rounded-2xl p-6 sm:p-10 shadow-[8px_8px_0_#000] text-center relative overflow-hidden">
        
        {/* Top Pixel Hearts Life Bar */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 font-pixel text-xs">
          <span className="text-red-500 text-lg">❤️</span>
          <span className="text-red-500 text-lg">❤️</span>
          <span className="text-red-500 text-lg">❤️</span>
        </div>

        {/* Pixel Badge */}
        <div className="inline-block px-3 py-1 bg-[#fef08a] border-2 border-black rounded font-pixel text-[9px] shadow-[2px_2px_0_#000] mb-4">
          ★ LEVEL 0 : INSERT COIN ★
        </div>

        {/* Center Pixel Ghost Stage */}
        <div className="my-3 flex justify-center">
          <div className="relative p-6 bg-[#ccfbf1] border-4 border-black rounded-2xl shadow-[4px_4px_0_#000]">
            <div className="text-7xl animate-pulse">👻</div>
            {/* Cute Pixel Blush Bubble */}
            <div className="absolute -top-3 -right-4 bg-[#f472b6] text-white border-2 border-black font-pixel text-[9px] px-2 py-0.5 rounded shadow-[2px_2px_0_#000]">
              ♥ HI!
            </div>
          </div>
        </div>

        <h2 className="font-pixel text-lg sm:text-2xl text-black mb-3 tracking-wide">
          PIXO-PAGE SIMULATOR
        </h2>
        
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-800 leading-relaxed font-pixel mb-6">
          Step into physical RAM frames! Guide memory pages step-by-step, eliminate page misses, and test FIFO, LRU, and Optimal algorithms.
        </p>

        {/* Big Retro Arcade Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => { sfx.pop(); setActiveTab('trace'); }}
            className="px-6 py-4 bg-[#f472b6] hover:bg-[#ec4899] text-white font-pixel text-xs rounded-xl border-3 border-black shadow-[4px_4px_0_#000] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[1px_1px_0_#000] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play size={16} className="fill-current" /> PRESS START
          </button>
          
          <button
            onClick={() => { sfx.pop(); setActiveTab('battle'); }}
            className="px-6 py-4 bg-[#facc15] hover:bg-[#eab308] text-black font-pixel text-xs rounded-xl border-3 border-black shadow-[4px_4px_0_#000] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[1px_1px_0_#000] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} /> ALGORITHM ARENA
          </button>
        </div>
      </div>

      {/* 3 Retro Pixel Mission Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-[#fef9c3] border-3 border-black rounded-xl p-4 shadow-[4px_4px_0_#000]">
          <div className="w-9 h-9 rounded bg-[#facc15] border-2 border-black flex items-center justify-center font-pixel text-xs mb-2 shadow-[2px_2px_0_#000]">
            01
          </div>
          <span className="font-pixel text-[9px] text-amber-800 block mb-1">INPUT STAGE</span>
          <h3 className="font-pixel text-[11px] text-black">Page References</h3>
          <p className="text-xs text-gray-700 mt-2 font-medium">
            Feed any custom sequence. Our regex sanitizer scrubs spaces, typos, and commas automatically.
          </p>
        </div>

        <div className="bg-[#ecfdf5] border-3 border-black rounded-xl p-4 shadow-[4px_4px_0_#000]">
          <div className="w-9 h-9 rounded bg-[#34d399] border-2 border-black flex items-center justify-center font-pixel text-xs mb-2 shadow-[2px_2px_0_#000]">
            02
          </div>
          <span className="font-pixel text-[9px] text-emerald-800 block mb-1">TRACE MATRIX</span>
          <h3 className="font-pixel text-[11px] text-black">Frame Allocation</h3>
          <p className="text-xs text-gray-700 mt-2 font-medium">
            Watch RAM slots fill. Page Hits flash bright mint, Faults glow retro pink, and evicted victims get flagged.
          </p>
        </div>

        <div className="bg-[#fce7f3] border-3 border-black rounded-xl p-4 shadow-[4px_4px_0_#000]">
          <div className="w-9 h-9 rounded bg-[#f472b6] border-2 border-black text-white flex items-center justify-center font-pixel text-xs mb-2 shadow-[2px_2px_0_#000]">
            03
          </div>
          <span className="font-pixel text-[9px] text-pink-800 block mb-1">ARENA BATTLE</span>
          <h3 className="font-pixel text-[11px] text-black">Compare & Thrash</h3>
          <p className="text-xs text-gray-700 mt-2 font-medium">
            Inspect FIFO vs LRU vs Optimal head-to-head, try Bélády’s Anomaly, and adjust the thrashing slider!
          </p>
        </div>

      </div>

    </div>
  );
}