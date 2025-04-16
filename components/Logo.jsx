import React from 'react';

function Logo(props) {
  return (
    <div className={`mb-4`}>
      <div className={`text-[57px] font-black italic antialiased`}>
        <a href={`/`}><span className={`text-secondary z-10 relative drop-shadow-lg shadow-black`}>ED</span><span
          className={`text-accent -ml-[12px] z-0 relative`}>NAV</span></a>
      </div>
      <div className={`uppercase text-base-content font-light -mt-3 tracking-widest text-[18px]`}>
        <p className={` leading-4 tracking-[2px]`}>SUCCESS TRACKER</p>
      </div>
    </div>
  );
}

export default Logo;
