"use client";

import { useEffect, useState } from "react";
import PaletteCard from "./PaletteCard";
import Link from "next/link";

interface Palette {
  id: string;
  name: string;
  colors: string[];
}

const PaletteGrid: React.FC = () => {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await fetch("/api/palettes");
        const data = await response.json();
        setPalettes(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPalettes();
  }, []);

  if (loading) {
    return <div className="text-center p-4">در حال بارگذاری...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4">
      {palettes.map((palette) => (
        <Link key={palette.id} href={`/palette/${palette.id}`}>
        <PaletteCard key={palette.id} name={palette.name} colors={palette.colors} />
        </Link>
      ))}
    </div>
  );
};

export default PaletteGrid;
