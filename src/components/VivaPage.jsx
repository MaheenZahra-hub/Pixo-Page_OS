import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function VivaPage() {
  const qas = [
    {
      q: 'How does your UI visually distinguish hits from faults?',
      a: 'Each memory step shows hits in mint green (#a7f3d0) and faults in pastel pink (#fbcfe8). In addition, an eviction row highlights which victim page got kicked out (e.g. -7) when memory is full.',
    },
    {
      q: 'How did you prevent the app from freezing on bad user inputs?',
      a: 'We built a defensive regex parser: rawInput.match(/\\b\\d+\\b/g). It extracts valid numbers while ignoring duplicate commas, spaces, or accidental letters without crashing or freezing.',
    },
    {
      q: 'What is Bélády’s Anomaly and how do you demo it?',
      a: 'In FIFO, giving a process more frames can sometimes increase page faults instead of decreasing them. Using string [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5], 3 frames produce 9 faults, while 4 frames produce 10 faults. You can test this using the preset buttons in the Memory Grid.',
    },
    {
      q: 'Why does Optimal have fewer or equal faults compared to FIFO & LRU?',
      a: 'Optimal replaces the page that will not be needed for the longest time in the future. Because it utilizes future lookahead knowledge, it delivers the theoretical minimum possible page fault count.',
    },
  ];

  return (
    <div className="bg-white border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0_#000] space-y-4 max-w-4xl mx-auto select-none">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📝</span>
        <h3 className="font-pixel text-xs sm:text-sm text-black">
          EXAM & VIVA CHEAT SHEET
        </h3>
      </div>
      <p className="text-xs font-mono text-gray-700">
        High-yield answers for viva questions on page replacement algorithms and UI architecture.
      </p>

      <div className="space-y-3 pt-2">
        {qas.map((item, idx) => (
          <div key={idx} className="border-3 border-black rounded-xl p-4 bg-[#f0fdfa] shadow-[3px_3px_0_#000]">
            <span className="font-pixel text-[9px] text-[#f472b6] block mb-1">
              QUESTION {idx + 1}
            </span>
            <h4 className="font-pixel text-[11px] text-black mb-2">
              {item.q}
            </h4>
            <p className="text-xs text-gray-800 leading-relaxed font-mono bg-white p-3 border-2 border-black rounded-lg">
              "{item.a}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}