import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Level } from "@prisma/client"; // Import the Level enum

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? undefined;
    const search = searchParams.get("search") ?? "";
    const level = searchParams.get("level") ?? undefined;

    // Build the where clause with correct types
  let where: any = {
      published: true,
    };

    if (category) {
      where.category = category;
    }

    if (level && Object.values(Level).includes(level as Level)) {
      where.level = { equals: level as Level };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { instructor: { contains: search, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        lessons: {
          select: {
            id: true,
            duration: true,
          },
        },
        _count: {
          select: {
            lessons: true,
            purchases: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return placeholder if no courses found
    if (!courses || courses.length === 0) {
      return NextResponse.json([
        {
          id: "placeholder-id",
          title: "Placeholder Course",
          description: "This is a placeholder course.",
          instructor: "Placeholder Instructor",
          category: "placeholder-category",
          level: "placeholder-level",
          published: true,
          lessons: [{ id: "placeholder-lesson-id", duration: 0 }],
          _count: { lessons: 1, purchases: 0 },
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}