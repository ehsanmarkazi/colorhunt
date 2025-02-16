import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim().toLowerCase() || "";

    if (!query) {
      return NextResponse.json({ palettes: [] });
    }

    const filePath = path.join(process.cwd(), "src", "data", "palettes.json");

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    const filteredPalettes = data.palettes.filter((palette: any) =>
      (palette.name?.toLowerCase().includes(query) || false) ||  // بررسی مقدار `name`
      (palette.category?.toLowerCase().includes(query) || false) // بررسی مقدار `category`
    );

    return NextResponse.json({ palettes: filteredPalettes.slice(0, 10) });
  } catch (error) {
    console.error("❌ Error fetching palettes:", error);
    return NextResponse.json(
      { error: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}
