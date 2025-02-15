"use client";
import { useState } from "react";

interface ColorBallsProps {
  color: string;
}

const ColorBalls: React.FC<ColorBallsProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div
        className="rounded-full shadow-lg overflow-hidden size-10 "
        style={{ backgroundColor: color }}
      ></div>
      <span
        className="text-gray-700 font-normal text-sm cursor-pointer hover:shadow-sm"
        onClick={copyToClipboard}
      >
        {copied ? "کپی شد!" : color}
      </span>
    </div>
  );
};

export default ColorBalls;
