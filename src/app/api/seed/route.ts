import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {

  
  const categories = [
    { name: "آسمانی" },
    { name: "پاستلی" },
    { name: "نئونی" },
    { name: "گرم" },
    { name: "سرد" },
    { name: "طبیعی" },
    { name: "زمستانی" },
    { name: "تابستانی" },
    { name: "پاییزی" },
    { name: "بهاری" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: { name: category.name },
    });
  }

  const palettes = [
    { name: "آبی‌های آسمانی", categoryName: "آسمانی", colors: ["#A2D2FF", "#BDE0FE", "#CFFAFE", "#E0F7FA"] },
    { name: "غروب آسمان", categoryName: "آسمانی", colors: ["#FF9A8B", "#FF6A88", "#FF99AC", "#FDCB8D"] },
    { name: "پاستلی ملایم", categoryName: "پاستلی", colors: ["#FAD2E1", "#F8EDEB", "#D4A5A5", "#C6DEF1"] },
    { name: "پاستلی روشن", categoryName: "پاستلی", colors: ["#E5CFF7", "#D5AAFF", "#C4B0FF", "#A084E8"] },
    { name: "نئونی درخشان", categoryName: "نئونی", colors: ["#FF00FF", "#00FFFF", "#FF9900", "#00FF00"] },
    { name: "شب نئونی", categoryName: "نئونی", colors: ["#0F0F0F", "#FF1F1F", "#1F51FF", "#FFD700"] },
    { name: "رنگ‌های گرم", categoryName: "گرم", colors: ["#FF5733", "#FFC300", "#FF6F61", "#FF4D00"] },
    { name: "آتشین", categoryName: "گرم", colors: ["#D72638", "#F46036", "#2E294E", "#E2C044"] },
    { name: "رنگ‌های سرد", categoryName: "سرد", colors: ["#2E86C1", "#3498DB", "#5DADE2", "#85C1E9"] },
    { name: "زمستانی یخی", categoryName: "زمستانی", colors: ["#D4F1F4", "#75E6DA", "#189AB4", "#05445E"] },
    { name: "طبیعت سبز", categoryName: "طبیعی", colors: ["#A7C957", "#6A994E", "#386641", "#264653"] },
    { name: "پاییزی", categoryName: "پاییزی", colors: ["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F"] },
    { name: "بهاری شکوفه‌ای", categoryName: "بهاری", colors: ["#FFB7C5", "#FF9AA2", "#FFC3A0", "#FFDAC1"] },
    { name: "تابستانی شاد", categoryName: "تابستانی", colors: ["#F72585", "#B5179E", "#7209B7", "#560BAD"] },
  ];

  for (const palette of palettes) {
    const category = await prisma.category.findUnique({
      where: { name: palette.categoryName },
    });

    if (category) {
      await prisma.palette.create({
        data: {
          name: palette.name,
          categoryId: category.id,
          colors: palette.colors,
        },
      });
    }
  }
    
  return NextResponse.json({ message: 'Seed data created successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create seed data' }, { status: 500 });
  }


}