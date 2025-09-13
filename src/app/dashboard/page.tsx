"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play,
  Calendar,
  User,
  Settings,
  LogOut
} from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface PurchasedCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  totalDuration: number;
  lastAccessed: string;
}

// Mock data
const mockPurchasedCourses: PurchasedCourse[] = [
  {
    id: "1",
    title: "Complete React Development Course",
    instructor: "John Smith",
    category: "Web Development",
    progress: 65,
    totalLessons: 25,
    completedLessons: 16,
    totalDuration: 3600,
    lastAccessed: "2024-01-15",
  },
  {
    id: "2",
    title: "Python for Data Science",
    instructor: "Sarah Johnson",
    category: "Data Science",
    progress: 30,
    totalLessons: 30,
    completedLessons: 9,
    totalDuration: 4200,
    lastAccessed: "2024-01-10",
  },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [purchasedCourses, setPurchasedCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPurchasedCourses(mockPurchasedCourses);
      setLoading(false);
    }, 1000);
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const totalCoursesEnrolled = purchasedCourses.length;
  const totalHoursLearned = purchasedCourses.reduce(
    (acc, course) => acc + (course.totalDuration * course.progress / 100),
    0
  ) / 60;
  const coursesCompleted = purchasedCourses.filter(course => course.progress === 100).length;
  const averageProgress = totalCoursesEnrolled > 0 
    ? purchasedCourses.reduce((acc, course) => acc + course.progress, 0) / totalCoursesEnrolled 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name || "Student"}!
          </h1>
          <p className="text-gray-600">
            Continue your learning journey and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-900">{totalCoursesEnrolled}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hours Learned</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(totalHoursLearned)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{coursesCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(averageProgress)}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                <Link
                  href="/courses"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Browse More Courses
                </Link>
              </div>

              {purchasedCourses.length > 0 ? (
                <div className="space-y-4">
                  {purchasedCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {course.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{formatDuration(course.totalDuration)}</span>
                            </div>
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500">
                            Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="ml-4">
                          <Link
                            href={`/courses/${course.id}`}
                            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Play className="h-4 w-4" />
                            <span>Continue</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                  <Link
                    href="/courses"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{session.user.name}</h3>
                <p className="text-sm text-gray-600">{session.user.email}</p>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/certificates"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 py-2 transition-colors"
                >
                  <Award className="h-4 w-4" />
                  <span>Certificates</span>
                </Link>
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Learning Goals</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Weekly Goal</span>
                    <span className="font-medium">3/5 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Monthly Goal</span>
                    <span className="font-medium">12/20 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-600">Completed lesson &quot;React Hooks&quot;</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="text-gray-600">Started &quot;Python for Data Science&quot;</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-600">Earned certificate for React course</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}