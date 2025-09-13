import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('password', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@coursehub.com' },
    update: {},
    create: {
      email: 'admin@coursehub.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create sample courses
  const courses = [
    {
      id: 'course-1',
      title: 'Complete React Development Course',
      description: 'Master React from basics to advanced concepts with hands-on projects and real-world applications. Learn React hooks, context API, routing, state management, and build modern web applications.',
      price: 89.99,
      category: 'Web Development',
      level: 'INTERMEDIATE',
      duration: 3600, // 60 hours
      instructor: 'John Smith',
      published: true,
      lessons: [
        {
          title: 'Introduction to React',
          description: 'Overview of React and its ecosystem',
          duration: 30,
          order: 1,
          content: 'Welcome to React! In this lesson, we will explore what React is and why it\'s become so popular...',
        },
        {
          title: 'JSX and Components',
          description: 'Understanding JSX syntax and creating components',
          duration: 45,
          order: 2,
          content: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code...',
        },
        {
          title: 'Props and State',
          description: 'Managing component data with props and state',
          duration: 60,
          order: 3,
          content: 'Props and state are fundamental concepts in React for managing data...',
        },
      ],
    },
    {
      id: 'course-2',
      title: 'Python for Data Science',
      description: 'Learn Python programming and data analysis with real-world datasets and machine learning techniques.',
      price: 79.99,
      category: 'Data Science',
      level: 'BEGINNER',
      duration: 4200, // 70 hours
      instructor: 'Sarah Johnson',
      published: true,
      lessons: [
        {
          title: 'Python Basics',
          description: 'Introduction to Python programming',
          duration: 40,
          order: 1,
          content: 'Python is a versatile programming language perfect for data science...',
        },
        {
          title: 'Data Structures',
          description: 'Lists, dictionaries, and sets in Python',
          duration: 50,
          order: 2,
          content: 'Understanding Python data structures is crucial for data manipulation...',
        },
      ],
    },
    {
      id: 'course-3',
      title: 'iOS App Development with Swift',
      description: 'Build iOS apps from scratch using Swift and Xcode with hands-on projects.',
      price: 99.99,
      category: 'Mobile Development',
      level: 'INTERMEDIATE',
      duration: 5400, // 90 hours
      instructor: 'Mike Chen',
      published: true,
      lessons: [
        {
          title: 'Swift Fundamentals',
          description: 'Learning Swift programming language',
          duration: 55,
          order: 1,
          content: 'Swift is Apple\'s modern programming language for iOS development...',
        },
      ],
    },
  ];

  for (const courseData of courses) {
    const { lessons, ...courseInfo } = courseData;

    // Convert level string to Prisma enum
    const course = await prisma.course.upsert({
      where: { id: courseData.id },
      update: {},
      create: {
        ...courseInfo,
        level: courseInfo.level as any, // Replace 'any' with 'Level' if you import it from Prisma
      },
    });

    // Create lessons for each course
    for (const lessonData of lessons) {
      await prisma.lesson.upsert({
        where: { 
          id: `${course.id}-lesson-${lessonData.order}` 
        },
        update: {},
        create: {
          id: `${course.id}-lesson-${lessonData.order}`,
          ...lessonData,
          courseId: course.id,
        },
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });