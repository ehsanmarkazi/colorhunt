import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ palettes: [] });
  }

  try {
 
    const palettes = await prisma.palette.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } }, 
          { category: { name: { contains: query, mode: "insensitive" } } }, 
        ],
      },
      include: {
        category: true, 
      },
      take: 10, 
    });

    return NextResponse.json({ palettes });
  } catch (error) {
    console.error("Error fetching palettes:", error);
    return NextResponse.json({ error: "خطایی رخ داده است" }, { status: 500 });
  }
}
