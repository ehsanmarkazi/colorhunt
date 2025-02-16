import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const filePath = path.join(process.cwd(), "src", "data", "palettes.json");


    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const res = JSON.parse(fileContent);


    return NextResponse.json(res.palettes);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json(
      { error: "Failed to read palettes data" },
      { status: 500 }
    );
  }
}
