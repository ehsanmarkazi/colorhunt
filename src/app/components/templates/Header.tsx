"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import _, { debounce } from 'lodash';
import ColorBox from "../modules/ColorBox";
import Link from "next/link";
import { Search } from 'lucide-react';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [palettes, setPalettes] = useState<{ id: string; name: string; colors: string[] }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);


  const fetchPalettes = async (query: string) => {
    if (!query) {
      setPalettes([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?query=${query}`);
      const data = await res.json();
      setPalettes(data.palettes || []); 
    } catch (error) {
      console.error("Error fetching palettes:", error);
      setPalettes([]);
    }
  };

 
  const debouncedFetchPalettes = debounce(fetchPalettes, 300);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedFetchPalettes(e.target.value);
  };


  const handleClickOutside = (e: MouseEvent) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(e.target as Node) &&
      inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full flex justify-between items-center py-3 border-b-[1px] border-gray-300 px-2">
      <div className="flex items-center">
        <Image src="/brush.png" alt="colorhunt" width={40} height={40} className="object-contain" />
        <p className="ml-2 text-xl font-semibold">رنگستان</p>
      </div>


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 md:w-96 lg:w-[60%] z-50">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="جستجو کنید..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setSearchOpen(true)}
            className="w-full p-2 border rounded-3xl ps-12 ring-0 outline-none"
          />
          <Search className="absolute start-4 top-1/4 text-gray-500" />
        </div>

      
        {searchOpen && (
          <>

            {palettes.length > 0 && (
              <div
                ref={searchResultsRef}
                className="absolute grid grid-cols-1 left-0 mt-2 bg-white max-h-[450px] overflow-y-auto overflow-x-clip shadow-2xl pt-5 pb-10 rounded-lg p-2 space-y-2 z-50"
              >
                {palettes.map((palette) => (
                  <Link key={palette.id} href={`/palette/${palette.id}`}>
                    <div className="border p-2 rounded-lg">
                      <p className="text-sm font-medium mb-1">{palette.name}</p>
                      <div className="gap-2 flex">
                        {palette.colors.slice(0, 4).map((color, index) => (
                          <ColorBox key={index} color={color} boxSize={60} />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}