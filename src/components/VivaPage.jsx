import React, { useState } from 'react';
import { GitBranch, ArrowDown, ShieldCheck, Cpu } from 'lucide-react';
import { sfx } from '../utils/sound.js';

export default function VivaPage() {
  const [selectedAlgo, setSelectedAlgo] = useState('FIFO');

  const evictionDetails = {
    FIFO: {
      title: 'FIFO EVICTION RULE',
      badge: 'QUEUE HEAD (OLDEST)',
      color: 'bg-[#dbeafe]',
      step: 'Remove frames[0] (the page that arrived earliest in RAM) and push the new page to the back of the queue.',
    },
    LRU: {
      title: 'LRU EVICTION RULE',
      badge: 'PAST SCAN (LEAST RECENT)',
      color: 'bg-[#f3e8ff]',
      step: 'Scan backward through past references (t - 1 down to 0) to find which loaded page was accessed longest ago, then replace it in-place.',
    },
    OPTIMAL: {
      title: 'OPTIMAL EVICTION RULE',
      badge: 'FUTURE SCAN (FARTHEST USE)',
      color: 'bg-[#d1fae5]',
      step: 'Scan forward through future references (t + 1 to N) to evict the loaded page not needed for the longest time (or never used again).',
    },
  };

  const activeRule = evictionDetails[selectedAlgo];

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none">
      
      {/* Section 1: Interactive Page Replacement Execution Flowchart */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 sm:p-8 shadow-[6px_6px_0_#000]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b-3 border-black pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#facc15] border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
              <GitBranch size={18} />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-black">
                EXECUTION FLOWCHART
              </h2>
              <p className="text-xs font-mono text-gray-600 mt-0.5">
                Toggle an algorithm to inspect its live eviction branch
              </p>
            </div>
          </div>

          {/* Algorithm Switcher */}
          <div className="flex items-center gap-2">
            {['FIFO', 'LRU', 'OPTIMAL'].map((algo) => (
              <button
                key={algo}
                onClick={() => { sfx.pop(); setSelectedAlgo(algo); }}
                className={`px-3 py-1.5 border-2 border-black rounded-lg font-pixel text-[10px] cursor-pointer transition-all ${
                  selectedAlgo === algo
                    ? 'bg-[#f472b6] text-white shadow-[2px_2px_0_#000] -translate-y-0.5'
                    : 'bg-[#f0fdfa] hover:bg-[#ccfbf1] text-black'
                }`}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>

        {/* Flowchart Nodes */}
        <div className="flex flex-col items-center space-y-2 text-center">
          
          {/* Node 1: Start */}
          <div className="bg-[#facc15] border-3 border-black rounded-full px-6 py-2.5 font-pixel text-[10px] shadow-[3px_3px_0_#000]">
            START: NEXT PAGE REQUEST (P)
          </div>

          <ArrowDown size={20} className="text-black stroke-[3]" />

          {/* Node 2: Decision 1 - Is Page in RAM? */}
          <div className="bg-[#ccfbf1] border-3 border-black rounded-xl p-4 max-w-md w-full shadow-[4px_4px_0_#000]">
            <span className="font-pixel text-[9px] text-teal-900 block mb-1">DECISION 1</span>
            <p className="font-pixel text-xs text-black">IS PAGE (P) ALREADY IN RAM FRAMES?</p>
          </div>

          {/* Branching Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-3">
            
            {/* LEFT BRANCH: YES (PAGE HIT) */}
            <div className="flex flex-col items-center space-y-2">
              <span className="font-pixel text-[10px] bg-[#a7f3d0] border-2 border-black px-3 py-1 rounded shadow-[2px_2px_0_#000]">
                YES → PAGE HIT
              </span>
              <ArrowDown size={18} className="text-black stroke-[3]" />
              <div className="bg-[#ecfdf5] border-3 border-black rounded-xl p-4 w-full shadow-[4px_4px_0_#000] text-left">
                <span className="font-pixel text-[9px] text-emerald-800 block mb-1.5">HIT HANDLER</span>
                <ul className="text-xs font-mono font-bold text-gray-800 space-y-1 list-disc list-inside">
                  <li>Increment <span className="text-emerald-700">Hits++</span> counter</li>
                  <li>Keep existing frames unchanged</li>
                  <li>Highlight slot in Mint Green</li>
                  <li>Play ascending chiptune chime</li>
                </ul>
              </div>
            </div>

            {/* RIGHT BRANCH: NO (PAGE FAULT) */}
            <div className="flex flex-col items-center space-y-2">
              <span className="font-pixel text-[10px] bg-[#fbcfe8] border-2 border-black px-3 py-1 rounded shadow-[2px_2px_0_#000]">
                NO → PAGE FAULT
              </span>
              <ArrowDown size={18} className="text-black stroke-[3]" />
              <div className="bg-[#fff1f2] border-3 border-black rounded-xl p-4 w-full shadow-[4px_4px_0_#000]">
                <span className="font-pixel text-[9px] text-pink-900 block mb-1">DECISION 2</span>
                <p className="font-pixel text-[11px] text-black">ARE FREE RAM SLOTS AVAILABLE?</p>
                <p className="text-[11px] font-mono text-gray-700 mt-1">
                  (frames.length &lt; frameCount)
                </p>
              </div>

              {/* Sub-branches for Free Slot vs Full Memory */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
                
                {/* Sub-branch YES */}
                <div className="flex flex-col items-center space-y-1.5">
                  <span className="font-pixel text-[9px] bg-[#fef08a] border-2 border-black px-2 py-0.5 rounded">
                    YES (FREE SLOT)
                  </span>
                  <ArrowDown size={16} className="text-black stroke-[2.5]" />
                  <div className="bg-white border-2 border-black rounded-xl p-3 w-full shadow-[3px_3px_0_#000] text-left h-full">
                    <span className="font-pixel text-[8px] text-amber-800 block mb-1">DIRECT LOAD</span>
                    <p className="text-[11px] font-mono font-bold text-gray-800">
                      Increment Faults++ and insert Page (P) into the next empty slot. No eviction needed.
                    </p>
                  </div>
                </div>

                {/* Sub-branch NO (Dynamic Selected Algorithm Rule) */}
                <div className="flex flex-col items-center space-y-1.5">
                  <span className="font-pixel text-[9px] bg-[#f472b6] text-white border-2 border-black px-2 py-0.5 rounded">
                    NO (RAM FULL)
                  </span>
                  <ArrowDown size={16} className="text-black stroke-[2.5]" />
                  <div className={`${activeRule.color} border-3 border-black rounded-xl p-3 w-full shadow-[3px_3px_0_#000] text-left h-full`}>
                    <span className="font-pixel text-[8px] text-black bg-white px-1.5 py-0.5 border border-black rounded inline-block mb-1">
                      {activeRule.badge}
                    </span>
                    <h4 className="font-pixel text-[9px] text-black mb-1">{activeRule.title}</h4>
                    <p className="text-[11px] font-mono font-bold text-gray-900 leading-snug">
                      {activeRule.step}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <ArrowDown size={20} className="text-black stroke-[3] pt-2" />

          {/* End Node */}
          <div className="bg-[#18182b] text-white border-3 border-black rounded-full px-6 py-2.5 font-pixel text-[10px] shadow-[3px_3px_0_#000]">
            RECORD STEP SNAPSHOT &amp; ADVANCE POINTER
          </div>

        </div>
      </div>

      {/* Section 2: Defensive Input Sanitization Pipeline */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#000]">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck size={18} className="text-emerald-600" />
          <h3 className="font-pixel text-xs text-black">
            DEFENSIVE INPUT PIPELINE (REGEX SANITIZER)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
          <div className="bg-[#fff1f2] border-3 border-black rounded-xl p-3.5 shadow-[3px_3px_0_#000]">
            <span className="font-pixel text-[8px] text-pink-800 block mb-1">1. RAW USER TEXT</span>
            <code className="text-xs font-mono font-bold text-black bg-white px-2 py-1 border border-black rounded block">
              "7,,, abc, 0, @#, 1"
            </code>
          </div>

          <div className="bg-[#fef9c3] border-3 border-black rounded-xl p-3.5 shadow-[3px_3px_0_#000]">
            <span className="font-pixel text-[8px] text-amber-800 block mb-1">2. REGEX FILTER</span>
            <code className="text-xs font-mono font-bold text-black bg-white px-2 py-1 border border-black rounded block">
              rawInput.match(/\b\d+\b/g)
            </code>
          </div>

          <div className="bg-[#ecfdf5] border-3 border-black rounded-xl p-3.5 shadow-[3px_3px_0_#000]">
            <span className="font-pixel text-[8px] text-emerald-800 block mb-1">3. CLEAN ARRAY / FALLBACK</span>
            <code className="text-xs font-mono font-bold text-black bg-white px-2 py-1 border border-black rounded block">
              [7, 0, 1] (or Safe Default)
            </code>
          </div>
        </div>
      </div>

      {/* Section 3: Algorithm Characteristics Matrix */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#000] overflow-x-auto">
        <div className="flex items-center gap-2 mb-4">
          <Cpu size={18} className="text-[#f472b6]" />
          <h3 className="font-pixel text-xs text-black">
            ALGORITHM COMPLEXITY &amp; OS CHARACTERISTICS
          </h3>
        </div>

        <table className="w-full border-collapse border-2 border-black text-left font-mono text-xs">
          <thead>
            <tr className="bg-[#ccfbf1] font-pixel text-[9px]">
              <th className="p-3 border-2 border-black">ALGORITHM</th>
              <th className="p-3 border-2 border-black">TIME COMPLEXITY</th>
              <th className="p-3 border-2 border-black">BÉLÁDY'S ANOMALY</th>
              <th className="p-3 border-2 border-black">REAL OS FEASIBILITY</th>
            </tr>
          </thead>
          <tbody className="font-bold">
            <tr className="bg-white">
              <td className="p-3 border-2 border-black font-pixel text-[10px] text-blue-700">FIFO</td>
              <td className="p-3 border-2 border-black">O(1) per page (Queue)</td>
              <td className="p-3 border-2 border-black text-red-600">Yes (Susceptible)</td>
              <td className="p-3 border-2 border-black">Easy to implement, ignores page frequency</td>
            </tr>
            <tr className="bg-[#f9fafb]">
              <td className="p-3 border-2 border-black font-pixel text-[10px] text-purple-700">LRU</td>
              <td className="p-3 border-2 border-black">O(N) scan / O(1) Hash+DLL</td>
              <td className="p-3 border-2 border-black text-emerald-700">No (Stack Algorithm)</td>
              <td className="p-3 border-2 border-black">Approximated in real kernels via Reference Bits</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 border-2 border-black font-pixel text-[10px] text-emerald-700">OPTIMAL</td>
              <td className="p-3 border-2 border-black">O(N × M) future scan</td>
              <td className="p-3 border-2 border-black text-emerald-700">No (Stack Algorithm)</td>
              <td className="p-3 border-2 border-black">Theoretical benchmark only (requires future knowledge)</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}