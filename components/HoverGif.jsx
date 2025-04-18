import { useState } from "react";
import Image from "next/image";

const HoverGif = ({ staticSrc, hoverSrc, alt, width, height }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Image
        src={staticSrc}
        alt={alt}
        width={width}
        height={height}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-opacity duration-200 ${isHovered ? "hidden" : "visible"}`}
      />
      <Image
        src={hoverSrc}
        alt={alt}
        width={width}
        height={height}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`transition-opacity duration-200 ${isHovered ? "visible" : "hidden"}`}
      />
    </>
  );
};

export default HoverGif;
