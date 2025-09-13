"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Clock, Users, Star, ChevronDown } from "lucide-react";
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
    description: "Master React from basics to advanced concepts with hands-on projects and real-world applications",
    price: 89.99,
    category: "Web Development",
    level: "Intermediate",
    duration: 3600,
    instructor: "John Smith",
    lessons: [{ duration: 30 }, { duration: 45 }, { duration: 60 }],
    _count: { lessons: 25, purchases: 1234 },
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python programming and data analysis with real-world datasets and machine learning",
    price: 79.99,
    category: "Data Science",
    level: "Beginner",
    duration: 4200,
    instructor: "Sarah Johnson",
    lessons: [{ duration: 40 }, { duration: 50 }, { duration: 35 }],
    _count: { lessons: 30, purchases: 856 },
  },
  {
    id: "3",
    title: "iOS App Development with Swift",
    description: "Build iOS apps from scratch using Swift and Xcode with hands-on projects",
    price: 99.99,
    category: "Mobile Development",
    level: "Intermediate",
    duration: 5400,
    instructor: "Mike Chen",
    lessons: [{ duration: 55 }, { duration: 40 }, { duration: 65 }],
    _count: { lessons: 35, purchases: 642 },
  },
  {
    id: "4",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and techniques using Python",
    price: 119.99,
    category: "Data Science",
    level: "Advanced",
    duration: 7200,
    instructor: "Dr. Emily Rodriguez",
    lessons: [{ duration: 60 }, { duration: 45 }, { duration: 90 }],
    _count: { lessons: 40, purchases: 523 },
  },
  {
    id: "5",
    title: "Full Stack Web Development",
    description: "Learn frontend and backend development with Node.js, Express, and MongoDB",
    price: 149.99,
    category: "Web Development",
    level: "Advanced",
    duration: 9600,
    instructor: "Alex Thompson",
    lessons: [{ duration: 45 }, { duration: 60 }, { duration: 75 }],
    _count: { lessons: 50, purchases: 789 },
  },
  {
    id: "6",
    title: "Cybersecurity Essentials",
    description: "Learn network security, ethical hacking, and cybersecurity best practices",
    price: 94.99,
    category: "Cybersecurity",
    level: "Intermediate",
    duration: 4800,
    instructor: "Robert Kim",
    lessons: [{ duration: 50 }, { duration: 40 }, { duration: 55 }],
    _count: { lessons: 28, purchases: 456 },
  },
];

const categories = ["All", "Web Development", "Data Science", "Mobile Development", "Cybersecurity", "Programming", "Database"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== "All") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              All Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive collection of computer science courses designed to advance your career.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="mt-4 lg:hidden space-y-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? "Loading..." : `Showing ${filteredCourses.length} of ${courses.length} courses`}
          </p>
        </div>

        {/* Course Grid */}
        {loading ? (
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
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => {
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
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">4.8</span>
                        </div>
                        <span className="text-sm text-gray-500">({course._count.lessons} lessons)</span>
                      </div>
                      <span className="text-sm text-gray-600">by {course.instructor}</span>
                    </div>
                    
                    <Link
                      href={`/courses/${course.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors block"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}