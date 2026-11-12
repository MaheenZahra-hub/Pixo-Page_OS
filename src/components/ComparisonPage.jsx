import React, { useState } from 'react';
import { Trophy, Activity, AlertTriangle } from 'lucide-react';
import { simulateFIFO, simulateLRU, simulateOptimal } from '../utils/algorithms.js';
import { sfx } from '../utils/sound.js';

export default function ComparisonPage({ parsedPages, frameCount }) {
  const [allocatedFrames, setAllocatedFrames] = useState(2);

  const fifoRes = simulateFIFO(parsedPages, frameCount);
  const lruRes = simulateLRU(parsedPages, frameCount);
  const optRes = simulateOptimal(parsedPages, frameCount);

  // Check if FIFO exhibits Belady's Anomaly compared to (frameCount - 1)
  const prevFifoRes = frameCount > 1 ? simulateFIFO(parsedPages, frameCount - 1) : null;
  const hasBeladyAnomaly = prevFifoRes && fifoRes.faults > prevFifoRes.faults;

  const algorithms = [
    { 
      name: 'FIFO (First-In, First-Out)', 
      data: fifoRes, 
      color: 'bg-[#dbeafe]', 
      tag: 'Queue Order'
    },
    { 
      name: 'LRU (Least Recently Used)', 
      data: lruRes, 
      color: 'bg-[#f3e8ff]', 
      tag: 'Past History'
    },
    { 
      name: 'Optimal (Theoretical Best)', 
      data: optRes, 
      color: 'bg-[#d1fae5]', 
      tag: 'Future Lookahead'
    },
  ];

  const isThrashing = allocatedFrames <= 2;
  const cpuTime = allocatedFrames === 1 ? 8 : allocatedFrames === 2 ? 22 : allocatedFrames === 3 ? 55 : allocatedFrames === 4 ? 78 : 94;
  const ioTime = 100 - cpuTime;

  return (
    <div className="space-y-6">
      
      {/* Dynamic Belady's Anomaly Alert Banner */}
      {hasBeladyAnomaly && (
        <div className="bg-[#fef08a] border-4 border-black rounded-2xl p-4 shadow-[6px_6px_0_#000] flex items-center gap-3">
          <div className="p-2.5 bg-[#f472b6] border-2 border-black rounded-xl text-white shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="font-pixel text-[10px] text-black block mb-1">
              ⚠️ BÉLÁDY’S ANOMALY DETECTED!
            </span>
            <p className="text-xs font-mono font-bold text-gray-900">
              Under FIFO, increasing frames from {frameCount - 1} to {frameCount} paradoxically increased page faults from{' '}
              <span className="underline">{prevFifoRes.faults}</span> to{' '}
              <span className="text-red-600 underline">{fifoRes.faults}</span>!
            </p>
          </div>
        </div>
      )}

      {/* Algorithm Arena Cards */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#000]">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-black flex items-center gap-2">
              <Trophy size={16} className="text-[#facc15]" /> ALGORITHM ARENA SHOWDOWN
            </h3>
            <p className="text-xs text-gray-700 font-mono mt-1">
              Comparing algorithms for {frameCount} frames
            </p>
          </div>
          <span className="font-pixel text-[9px] bg-[#fef08a] px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0_#000]">
            M = {frameCount} FRAMES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {algorithms.map((item, idx) => {
            const faultRate = item.data.total > 0 
              ? ((item.data.faults / item.data.total) * 100).toFixed(1) 
              : '0.0';

            return (
              <div key={idx} className={`${item.color} border-3 border-black rounded-xl p-4 shadow-[3px_3px_0_#000]`}>
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[9px] text-black bg-white px-2 py-0.5 border border-black rounded">
                    {item.tag}
                  </span>
                  {item.name.includes('Optimal') && (
                    <span className="font-pixel text-[10px] text-amber-700">👑 OPTIMAL</span>
                  )}
                </div>
                <h4 className="font-pixel text-xs text-black mt-2">{item.name}</h4>

                <div className="mt-3 space-y-1.5 font-mono text-xs font-bold">
                  <div className="flex justify-between p-1.5 bg-white border border-black rounded">
                    <span className="text-gray-700">Total Faults:</span>
                    <span className="text-red-600">{item.data.faults}</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-white border border-black rounded">
                    <span className="text-gray-700">Total Hits:</span>
                    <span className="text-emerald-600">{item.data.hits}</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-white border border-black rounded">
                    <span className="text-gray-700">Fault Rate:</span>
                    <span className="text-purple-700">{faultRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thrashing Meter (Centered Card & Controls) */}
      <div className="bg-white border-4 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0_#000] text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity size={18} className="text-red-500" />
          <h3 className="font-pixel text-xs text-black">
            THRASHING SIMULATION LAB
          </h3>
        </div>
        <p className="text-xs text-gray-700 font-mono mb-6 max-w-xl mx-auto">
          Thrashing happens when allocated frames are insufficient for the process's working set. The CPU sits idle while waiting for the swap disk!
        </p>

        {/* Centered Slider Container */}
        <div className="max-w-md mx-auto bg-[#fee2e2] border-3 border-black rounded-xl p-5 mb-6 shadow-[3px_3px_0_#000]">
          <label className="font-pixel text-[11px] block mb-3 text-black">
            ALLOCATED FRAMES: {allocatedFrames}
          </label>
          <input
            type="range"
            min="1"
            max="6"
            value={allocatedFrames}
            onChange={(e) => {
              sfx.slider();
              setAllocatedFrames(Number(e.target.value));
            }}
            className="w-full accent-[#f472b6] cursor-pointer"
          />
          <div className="flex justify-between font-pixel text-[9px] text-gray-800 mt-2.5">
            <span>1 FRAME (THRASHING 🔥)</span>
            <span>6 FRAMES (STABLE ✨)</span>
          </div>
        </div>

        {/* Centered Gauges */}
        <div className="space-y-4 max-w-xl mx-auto text-left">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>CPU Execution Time: {cpuTime}%</span>
              <span className={isThrashing ? 'text-red-600 font-pixel text-[10px]' : 'text-emerald-700 font-pixel text-[10px]'}>
                {isThrashing ? '⚠️ STALLED' : '⚡ HEALTHY'}
              </span>
            </div>
            <div className="w-full h-5 bg-gray-200 border-2 border-black rounded overflow-hidden">
              <div 
                className="h-full bg-[#34d399] transition-all duration-300" 
                style={{ width: `${cpuTime}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Disk Swap Overhead: {ioTime}%</span>
              <span className={isThrashing ? 'text-red-600 font-pixel text-[10px]' : 'text-gray-600 font-pixel text-[10px]'}>
                {isThrashing ? '🔥 THRASHING ACTIVE' : 'NORMAL'}
              </span>
            </div>
            <div className="w-full h-5 bg-gray-200 border-2 border-black rounded overflow-hidden">
              <div 
                className="h-full bg-[#f87171] transition-all duration-300" 
                style={{ width: `${ioTime}%` }}
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}