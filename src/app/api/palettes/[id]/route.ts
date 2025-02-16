import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // مسیر فایل JSON
    const filePath = path.join(process.cwd(), "src", "data", "palettes.json");

    // بررسی وجود فایل
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // خواندن داده‌ها
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // جستجوی پالت با `id`
    const palette = data.palettes.find((p: any) => p.id === id);

    console.log(palette)

    if (!palette) {
      return NextResponse.json({ error: "Palette not found" }, { status: 404 });
    }

    return NextResponse.json(palette);
  } catch (error) {
    console.error("Error fetching palette:", error);
    return NextResponse.json(
      { error: "Failed to fetch palette" },
      { status: 500 }
    );
  }
}
