import Link from "next/link";
import { ArrowRight, Play, Users, Award } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Master
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Computer Science{" "}
              </span>
              with Expert-Led Courses
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Learn programming, algorithms, and cutting-edge technologies from industry professionals. 
              Build real projects and advance your career with our comprehensive course library.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">200+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Industry Certified</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/auth/signup"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>

          {/* Hero Image/Video */}
          <div className="relative">
            <div className="aspect-w-16 aspect-h-12 rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-indigo-600">
                <div className="text-center text-white">
                  <Play className="h-20 w-20 mx-auto mb-4 opacity-90" />
                  <p className="text-lg font-medium">Watch Course Preview</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">JavaScript Mastery</p>
                  <p className="text-xs text-gray-500">4.9 ★ (2,341 reviews)</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Certificate Ready</p>
                  <p className="text-xs text-gray-500">Complete & Earn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}