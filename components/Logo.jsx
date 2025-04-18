import React from 'react';

function Logo() {
  return (
    <div className="mb-2 md:mb-4">
      <div className="flex items-center justify-center md:justify-start">
        <a href="/" className="inline-block">
          <div className="text-[36px] sm:text-[45px] md:text-[57px] font-black italic antialiased">
            <span className="text-secondary z-10 relative drop-shadow-lg shadow-black">ED</span>
            <span className="text-accent -ml-[8px] sm:-ml-[10px] md:-ml-[12px] z-0 relative">NAV</span>
          </div>
          <div
            className="uppercase text-base-content font-light -mt-1 md:-mt-3 tracking-widest text-[12px] sm:text-[15px] md:text-[18px]">
            <p className="leading-4 tracking-[1px] sm:tracking-[1.5px] md:tracking-[2px]">SUCCESS TRACKER</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Logo;