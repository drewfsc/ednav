import React from "react";

export default function VisualVolume({ themes, theme, setTheme }) {
  return (
    <div className="">
      <input
        onChange={(e) => {
          setTheme(e.target.value);
        }}
        type="range"
        min={0}
        max={28}
        value={theme}
        className="range"
        step="1"
      />
      {/*<div className="flex justify-between px-2.5 mt-2 text-xs">*/}
      {/*    {*/}
      {/*        themes.map((t) => (*/}
      {/*            <span key={t}>|</span>*/}
      {/*        ))*/}
      {/*    }*/}
      {/*</div>*/}
      <div className="mt-2 flex w-full justify-between px-2.5 text-xs">
        {themes.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
