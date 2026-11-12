import React from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Printer, Sparkles } from 'lucide-react';
import { sfx } from '../utils/sound.js';

export default function VisualizerPage({
  rawInput,
  setRawInput,
  frameCount,
  setFrameCount,
  algorithm,
  setAlgorithm,
  simulationData,
  currentStep,
  setCurrentStep,
  isPlaying,
  setIsPlaying,
  playSpeed,
  setPlaySpeed,
}) {
  const handleManualStep = (direction) => {
    sfx.pop();
    if (direction === 'next' && currentStep < simulationData.steps.length - 1) {
      const nextIdx = currentStep + 1;
      setCurrentStep(nextIdx);
      if (simulationData.steps[nextIdx].isHit) sfx.hit();
      else sfx.fault();
    } else if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleApplyPreset = (str, frames) => {
    sfx.preset();
    setRawInput(str);
    if (frames) setFrameCount(frames);
  };

  // Pure Random Generator (0-9)
  const generateRandomString = () => {
    const arr = Array.from({ length: 14 }, () => Math.floor(Math.random() * 8));
    handleApplyPreset(arr.join(', '));
  };

  // Principle of Locality Generator (clusters of working-set pages)
  const generateLocalityString = () => {
    const clusterA = [1, 2, 3];
    const clusterB = [6, 7, 8];
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(clusterA[Math.floor(Math.random() * clusterA.length)]);
    }
    for (let i = 0; i < 7; i++) {
      arr.push(clusterB[Math.floor(Math.random() * clusterB.length)]);
    }
    handleApplyPreset(arr.join(', '));
  };

  const handleExportSnapshot = () => {
    sfx.pop();
    window.print();
  };

  const hitPercentage = simulationData.total > 0 
    ? ((simulationData.hits / simulationData.total) * 100).toFixed(1) 
    : '0.0';

  const faultPercentage = simulationData.total > 0 
    ? ((simulationData.faults / simulationData.total) * 100).toFixed(1) 
    : '0.0';

  const activeStepObj = simulationData.steps[currentStep] || null;

  return (
    <div className="space-y-6">
      
      {/* Control Deck */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0_#000] no-print">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          <div className="md:col-span-2">
            <label className="font-pixel text-[10px] text-black block mb-2 flex items-center justify-between">
              <span>REFERENCE STRING INPUT</span>
              <span className="text-[9px] text-[#f472b6] font-pixel">REGEX SANITIZER ACTIVE</span>
            </label>
            <input
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="e.g. 7, 0, 1, 2, 0, 3, 0, 4, 2, 3"
              className="w-full px-3.5 py-2.5 border-3 border-black rounded-xl font-mono font-bold text-sm bg-[#f0fdfa] text-black focus:outline-none focus:bg-white"
            />
            
            {/* Presets & Generators */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[9px] font-pixel text-gray-500">PRESETS:</span>
              <button
                onClick={() => handleApplyPreset('7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2', 3)}
                className="text-[9px] font-pixel px-2.5 py-1 border-2 border-black rounded bg-[#ccfbf1] hover:bg-[#99f6e4] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              >
                Silberschatz OS
              </button>
              <button
                onClick={() => handleApplyPreset('1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5', 3)}
                className="text-[9px] font-pixel px-2.5 py-1 border-2 border-black rounded bg-[#fef08a] hover:bg-[#fde047] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              >
                Bélády (F=3)
              </button>
              <button
                onClick={() => handleApplyPreset('1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5', 4)}
                className="text-[9px] font-pixel px-2.5 py-1 border-2 border-black rounded bg-[#fbcfe8] hover:bg-[#f472b6] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              >
                Bélády (F=4)
              </button>
              <button
                onClick={generateRandomString}
                className="text-[9px] font-pixel px-2.5 py-1 border-2 border-black rounded bg-[#e0e7ff] hover:bg-[#c7d2fe] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              >
                🎲 Random
              </button>
              <button
                onClick={generateLocalityString}
                className="text-[9px] font-pixel px-2.5 py-1 border-2 border-black rounded bg-[#dcfce7] hover:bg-[#bbf7d0] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              >
                ⚡ Locality
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="font-pixel text-[10px] text-black block mb-2">FRAMES</label>
              <select
                value={frameCount}
                onChange={(e) => { sfx.pop(); setFrameCount(Number(e.target.value)); }}
                className="w-full px-3 py-2 border-3 border-black rounded-xl font-mono font-bold text-sm bg-white cursor-pointer shadow-[2px_2px_0_#000]"
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>{num} Frames</option>
                ))}
              </select>
            </div>

            <div className="w-1/2">
              <label className="font-pixel text-[10px] text-black block mb-2">ALGORITHM</label>
              <select
                value={algorithm}
                onChange={(e) => { sfx.pop(); setAlgorithm(e.target.value); }}
                className="w-full px-3 py-2 border-3 border-black rounded-xl font-mono font-bold text-sm bg-white cursor-pointer shadow-[2px_2px_0_#000]"
              >
                <option value="FIFO">FIFO</option>
                <option value="LRU">LRU</option>
                <option value="OPTIMAL">Optimal</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Metrics Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#a7f3d0] border-3 border-black p-3.5 rounded-xl shadow-[4px_4px_0_#000]">
          <span className="font-pixel text-[9px] text-emerald-950">PAGE HITS</span>
          <p className="text-2xl font-black text-black font-mono mt-1">{simulationData.hits}</p>
        </div>
        <div className="bg-[#fbcfe8] border-3 border-black p-3.5 rounded-xl shadow-[4px_4px_0_#000]">
          <span className="font-pixel text-[9px] text-pink-950">PAGE FAULTS</span>
          <p className="text-2xl font-black text-black font-mono mt-1">{simulationData.faults}</p>
        </div>
        <div className="bg-[#ddd6fe] border-3 border-black p-3.5 rounded-xl shadow-[4px_4px_0_#000]">
          <span className="font-pixel text-[9px] text-purple-950">HIT RATIO</span>
          <p className="text-2xl font-black text-black font-mono mt-1">{hitPercentage}%</p>
        </div>
        <div className="bg-[#fef08a] border-3 border-black p-3.5 rounded-xl shadow-[4px_4px_0_#000]">
          <span className="font-pixel text-[9px] text-amber-950">FAULT RATIO</span>
          <p className="text-2xl font-black text-black font-mono mt-1">{faultPercentage}%</p>
        </div>
      </div>

      {/* Stepper Deck + Timeline Scrubber */}
      <div className="bg-white border-3 border-black p-3.5 rounded-xl shadow-[4px_4px_0_#000] space-y-3 no-print">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { sfx.reset(); setCurrentStep(0); setIsPlaying(false); }}
              className="p-2 border-2 border-black rounded-lg bg-[#f3f4f6] hover:bg-gray-200 shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => handleManualStep('prev')}
              disabled={currentStep === 0}
              className="p-2 border-2 border-black rounded-lg bg-[#f3f4f6] hover:bg-gray-200 disabled:opacity-30 shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              title="Previous Step"
            >
              <SkipBack size={16} />
            </button>
            <button
              onClick={() => { sfx.pop(); setIsPlaying(!isPlaying); }}
              className="px-4 py-2 bg-[#f472b6] hover:bg-[#ec4899] text-white font-pixel text-[10px] border-2 border-black rounded-lg shadow-[2px_2px_0_#000] active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? <><Pause size={14} /> PAUSE</> : <><Play size={14} /> AUTO RUN</>}
            </button>
            <button
              onClick={() => handleManualStep('next')}
              disabled={currentStep === simulationData.steps.length - 1}
              className="p-2 border-2 border-black rounded-lg bg-[#f3f4f6] hover:bg-gray-200 disabled:opacity-30 shadow-[2px_2px_0_#000] active:translate-y-0.5 cursor-pointer"
              title="Next Step"
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="font-pixel text-[10px] bg-[#fef08a] px-3.5 py-1.5 border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
            STEP {simulationData.steps.length > 0 ? currentStep + 1 : 0} / {simulationData.steps.length}
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { label: '0.5x', speed: 1500 },
              { label: '1x', speed: 1000 },
              { label: '2x', speed: 450 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => { sfx.pop(); setPlaySpeed(s.speed); }}
                className={`px-2.5 py-1 border-2 border-black text-[10px] font-mono rounded cursor-pointer ${
                  playSpeed === s.speed 
                    ? 'bg-[#f472b6] text-white font-bold shadow-[1px_1px_0_#000]' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Scrubber Bar */}
        {simulationData.steps.length > 1 && (
          <div className="flex items-center gap-3 pt-1 border-t-2 border-dashed border-gray-200">
            <span className="font-pixel text-[8px] text-gray-500">SCRUB:</span>
            <input
              type="range"
              min={0}
              max={simulationData.steps.length - 1}
              value={currentStep}
              onChange={(e) => {
                setIsPlaying(false);
                sfx.slider();
                setCurrentStep(Number(e.target.value));
              }}
              className="w-full accent-[#f472b6] cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Frame Table Matrix (Centered Container & Table) */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 shadow-[6px_6px_0_#000] text-center">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="hidden sm:block w-28" />
          <h3 className="font-pixel text-xs text-black mx-auto">
            MEMORY FRAME ALLOCATION MATRIX ({algorithm} • M={frameCount})
          </h3>
          <button
            onClick={handleExportSnapshot}
            className="no-print text-[9px] font-pixel px-2.5 py-1.5 border-2 border-black rounded-lg bg-[#facc15] hover:bg-[#fde047] text-black shadow-[2px_2px_0_#000] active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            title="Print or Save Snapshot for Report"
          >
            <Printer size={12} /> SNAPSHOT
          </button>
        </div>

        {simulationData.steps.length === 0 ? (
          <p className="text-xs font-pixel text-gray-500 p-4">NO PAGES FOUND</p>
        ) : (
          <div className="overflow-x-auto flex justify-center pb-2">
            <table className="border-collapse select-none border-2 border-black mx-auto">
              <thead>
                <tr>
                  <th className="p-2.5 font-pixel text-[10px] text-center bg-[#ccfbf1] border-2 border-black min-w-[70px]">
                    PAGE
                  </th>
                  {simulationData.steps.map((st, idx) => (
                    <th
                      key={idx}
                      onClick={() => { setIsPlaying(false); sfx.pop(); setCurrentStep(idx); }}
                      title="Click to inspect this step"
                      className={`p-2 font-mono text-sm border-2 border-black text-center min-w-[56px] cursor-pointer transition-colors ${
                        idx === currentStep ? 'bg-[#facc15]' : 'bg-[#f0fdfa] hover:bg-[#ccfbf1]'
                      }`}
                    >
                      <div className="text-[9px] font-pixel text-gray-500">#{st.stepNumber}</div>
                      <div className="font-black text-base text-black">{st.page}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: frameCount }).map((_, fIdx) => (
                  <tr key={fIdx}>
                    <td className="p-2 font-pixel text-[9px] bg-[#f9fafb] border-2 border-black text-center">
                      Slot {fIdx}
                    </td>
                    {simulationData.steps.map((st, sIdx) => {
                      const pageInSlot = st.frames[fIdx];
                      const isOccupied = pageInSlot !== undefined;
                      const isTarget = sIdx === currentStep && st.targetIndex === fIdx;

                      return (
                        <td
                          key={sIdx}
                          onClick={() => { setIsPlaying(false); sfx.pop(); setCurrentStep(sIdx); }}
                          className={`p-2 text-center border-2 border-black font-mono text-sm font-bold cursor-pointer ${
                            isTarget ? 'bg-[#fef08a]' : ''
                          }`}
                        >
                          {isOccupied ? (
                            <span className={`inline-block px-2.5 py-1 rounded border-2 border-black shadow-[1px_1px_0_#000] ${
                              st.isHit && st.targetIndex === fIdx 
                                ? 'bg-[#a7f3d0]' 
                                : 'bg-white'
                            }`}>
                              {pageInSlot}
                            </span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Result Row */}
                <tr>
                  <td className="p-2 font-pixel text-[9px] bg-[#f9fafb] border-2 border-black text-center">
                    STATUS
                  </td>
                  {simulationData.steps.map((st, idx) => (
                    <td
                      key={idx}
                      className={`p-1.5 text-center border-2 border-black font-pixel text-[9px] ${
                        st.isHit 
                          ? 'bg-[#a7f3d0] text-emerald-950' 
                          : 'bg-[#fbcfe8] text-pink-950'
                      }`}
                    >
                      {st.isHit ? 'HIT' : 'FAULT'}
                    </td>
                  ))}
                </tr>

                {/* Eviction Row */}
                <tr>
                  <td className="p-2 font-pixel text-[9px] bg-[#f9fafb] border-2 border-black text-center">
                    EVICT
                  </td>
                  {simulationData.steps.map((st, idx) => (
                    <td 
                      key={idx} 
                      className="p-1 text-center border-2 border-black text-[11px] font-mono font-bold text-amber-900 bg-[#fef9c3]"
                    >
                      {st.evicted !== null ? `-${st.evicted}` : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Live Decision Reasoning Inspector Box */}
        {activeStepObj && (
          <div className="mt-4 max-w-3xl mx-auto bg-[#f0fdfa] border-3 border-black rounded-xl p-3.5 shadow-[3px_3px_0_#000] flex items-start gap-3 text-left">
            <div className={`px-2 py-1 border-2 border-black rounded font-pixel text-[9px] shrink-0 ${
              activeStepObj.isHit ? 'bg-[#a7f3d0]' : 'bg-[#fbcfe8]'
            }`}>
              STEP #{activeStepObj.stepNumber}
            </div>
            <div className="text-xs font-mono font-bold text-black leading-relaxed">
              <span className="inline-flex items-center gap-1 text-[#db2777] font-pixel text-[9px] mr-2">
                <Sparkles size={11} /> DECISION LOGIC:
              </span>
              {activeStepObj.reason}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}