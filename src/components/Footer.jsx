import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-black bg-[#f472b6] py-4 text-center select-none shadow-[0_-5px_0_#000]">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-pixel text-[10px] text-black">
          <span className="w-2.5 h-2.5 bg-[#facc15] border border-black inline-block animate-ping rounded-full" />
          <span>PIXO-PAGE OS ARCADE</span>
        </div>
        <p className="font-pixel text-[9px] text-pink-950 font-bold">
          VIRTUAL MEMORY SIMULATOR • REACT + TAILWIND
        </p>
        <div className="font-pixel text-[9px] bg-[#facc15] text-black px-2 py-1 border-2 border-black rounded shadow-[1px_1px_0_#000]">
          CREDITS 00
        </div>
      </div>
    </footer>
  );
}