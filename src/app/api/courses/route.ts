import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Level } from "@prisma/client"; // Import the Level enum

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") ?? "placeholder-category";
    const search = searchParams.get("search") ?? "";
    const level = searchParams.get("level") ?? "placeholder-level";


    // Use Prisma's CourseWhereInput type for better type safety
    const where: any = {
      published: true,
    };


    if (category && category !== "placeholder-category") {
      where.category = category;
    }

    if (level && level !== "placeholder-level") {
      // Ensure 'level' is a valid Level enum value
      if (Object.values(Level).includes(level as Level)) {
        where.level = { equals: level as Level };
      }
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
            duration: true, // Placeholder: ensure 'duration' exists in your schema
          },
        },
        _count: {
          select: {
            lessons: true,
            purchases: true, // Placeholder: ensure 'purchases' exists in your schema
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Placeholder: ensure 'createdAt' exists in your schema
      },
    });

    // Add placeholder data if no courses found
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