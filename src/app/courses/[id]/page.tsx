"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  ShoppingCart,
  BookOpen,
  Download,
  Globe,
  Trophy
} from "lucide-react";
import { formatPrice, formatDuration } from "@/lib/utils";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  duration: number;
  instructor: string;
  lessons: {
    id: string;
    title: string;
    duration: number;
    order: number;
  }[];
  _count: {
    lessons: number;
    purchases: number;
  };
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  order: number;
}

// Mock data
const mockCourse: Course = {
  id: "1",
  title: "Complete React Development Course",
  description: "Master React from basics to advanced concepts with hands-on projects and real-world applications. Learn React hooks, context API, routing, state management, and build modern web applications.",
  price: 89.99,
  category: "Web Development",
  level: "Intermediate",
  duration: 3600,
  instructor: "John Smith",
  lessons: [
    { id: "1", title: "Introduction to React", duration: 30, order: 1 },
    { id: "2", title: "JSX and Components", duration: 45, order: 2 },
    { id: "3", title: "Props and State", duration: 60, order: 3 },
  ],
  _count: { lessons: 25, purchases: 1234 },
};

const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Overview of React and its ecosystem",
    duration: 30,
    order: 1,
  },
  {
    id: "2",
    title: "JSX and Components",
    description: "Understanding JSX syntax and creating components",
    duration: 45,
    order: 2,
  },
  {
    id: "3",
    title: "Props and State",
    description: "Managing component data with props and state",
    duration: 60,
    order: 3,
  },
  {
    id: "4",
    title: "Event Handling",
    description: "Handling user interactions in React",
    duration: 40,
    order: 4,
  },
  {
    id: "5",
    title: "React Hooks",
    description: "useState, useEffect, and custom hooks",
    duration: 75,
    order: 5,
  },
];

export default function CoursePage() {
  const params = useParams();
  const { data: session } = useSession();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourse(mockCourse);
      setLessons(mockLessons);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handlePurchase = async () => {
    if (!session) {
      // Redirect to sign in
      window.location.href = '/auth/signin';
      return;
    }

    setPurchasing(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course?.id,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to initiate purchase. Please try again.');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalDuration = lessons.reduce((acc, lesson) => acc + lesson.duration, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="mb-8">
            <Link href="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Courses
            </Link>
          </nav>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span>(2,341 reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{course._count.purchases} students enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{formatDuration(totalDuration)} total content</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course._count.lessons} lessons</span>
                </div>
              </div>

              <div className="bg-gray-100 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What you'll learn:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Modern React development patterns</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">React Hooks and Context API</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Building real-world applications</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">State management techniques</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border p-6 sticky top-8">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100 mb-6">
                  <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {formatPrice(course.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Full lifetime access
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {purchasing ? "Processing..." : "Enroll Now"}
                </button>

                <div className="text-center text-sm text-gray-500 mb-6">
                  30-day money-back guarantee
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{formatDuration(totalDuration)} on-demand video</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Download className="h-4 w-4 text-gray-400" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span>Access on mobile and TV</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-4 w-4 text-gray-400" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
              
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{formatDuration(lesson.duration)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-600">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600 mb-2">Senior React Developer</p>
                  <p className="text-sm text-gray-600">
                    John has over 8 years of experience in web development and has taught over 50,000 students online. 
                    He specializes in React, Node.js, and modern JavaScript technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}