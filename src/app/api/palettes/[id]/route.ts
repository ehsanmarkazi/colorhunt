import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const palette = await prisma.palette.findUnique({
      where: { id },
      include: { category: true }, 
    });

    if (!palette) {
      return NextResponse.json({ error: 'Palette not found' }, { status: 404 });
    }

    return NextResponse.json(palette);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch palette' },
      { status: 500 }
    );
  }
}