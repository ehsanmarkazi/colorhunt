"use client";
import { useState } from "react";

interface ColorBoxProps {
  color: string;
  boxSize : number
}

const ColorBox: React.FC<ColorBoxProps> = ({ color,boxSize }) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={` ${boxSize === 60 ?  "size-60" :"size-80"} relative transition-all duration-300 ease-in-out`}
      style={{ backgroundColor: color }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover && (
        <div
          className="absolute w-fit py-1 px-2 bottom-1 right-1 flex items-center justify-center 
          bg-black/70 text-white text-xs rounded-lg cursor-pointer transition-all duration-300 ease-in-out"
          onClick={copyToClipboard}
        >
          {copied ? "کپی شد!" : color}
        </div>
      )}
    </div>
  );
};

export default ColorBox;
