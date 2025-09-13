"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  thumbnail: string;
  category: string;
  level: string;
  duration: number;
  instructor: string;
  lessons: { duration: number }[];
  _count: {
    lessons: number;
    purchases: number;
  };
}

// Mock data for demonstration
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Development Course",
    description: "Master React from basics to advanced concepts with hands-on projects",
    price: 89.99,
    image: "",
    thumbnail: "",
    category: "Web Development",
    level: "Intermediate",
    duration: 3600,
    instructor: "John Smith",
    lessons: [
      { duration: 30 },
      { duration: 45 },
      { duration: 60 },
    ],
    _count: {
      lessons: 25,
      purchases: 1234,
    },
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis with real-world datasets",
    price: 79.99,
    image: "",
    thumbnail: "",
    category: "Data Science",
    level: "Beginner",
    duration: 4200,
    instructor: "Sarah Johnson",
    lessons: [
      { duration: 40 },
      { duration: 50 },
      { duration: 35 },
    ],
    _count: {
      lessons: 30,
      purchases: 856,
    },
  },
  {
    id: "3",
    title: "iOS App Development with Swift",
    description: "Build iOS apps from scratch using Swift and Xcode",
    price: 99.99,
    image: "",
    thumbnail: "",
    category: "Mobile Development",
    level: "Intermediate",
    duration: 5400,
    instructor: "Mike Chen",
    lessons: [
      { duration: 55 },
      { duration: 40 },
      { duration: 65 },
    ],
    _count: {
      lessons: 35,
      purchases: 642,
    },
  },
];

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your learning journey with our most popular and highly-rated courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const totalDuration = course.lessons.reduce((acc, lesson) => acc + lesson.duration, 0);
            
            return (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
                    <span className="text-white text-lg font-medium">{course.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(totalDuration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course._count.purchases} students</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">4.8</span>
                      </div>
                      <span className="text-sm text-gray-500">({course._count.lessons} lessons)</span>
                    </div>
                    
                    <Link
                      href={`/courses/${course.id}`}
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back soon for new courses!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Courses
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}