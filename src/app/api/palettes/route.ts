import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const palettes = await prisma.palette.findMany({
      include: { category: true },
    });

    return NextResponse.json(palettes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطایی رخ داد" }, { status: 500 });
  }
}
