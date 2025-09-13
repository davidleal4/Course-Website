import Link from "next/link";
import { Code, Database, Brain, Smartphone, Globe, Shield } from "lucide-react";

const categories = [
  {
    name: "Web Development",
    description: "Frontend & Backend development",
    icon: Globe,
    color: "bg-blue-500",
    courses: 45,
  },
  {
    name: "Mobile Development",
    description: "iOS & Android development",
    icon: Smartphone,
    color: "bg-green-500",
    courses: 28,
  },
  {
    name: "Data Science",
    description: "Analytics & Machine Learning",
    icon: Brain,
    color: "bg-purple-500",
    courses: 32,
  },
  {
    name: "Programming",
    description: "Languages & Algorithms",
    icon: Code,
    color: "bg-orange-500",
    courses: 56,
  },
  {
    name: "Database",
    description: "SQL & NoSQL databases",
    icon: Database,
    color: "bg-indigo-500",
    courses: 24,
  },
  {
    name: "Cybersecurity",
    description: "Security & Ethical Hacking",
    icon: Shield,
    color: "bg-red-500",
    courses: 19,
  },
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover courses across different computer science disciplines and find the perfect path for your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={`/courses?category=${encodeURIComponent(category.name)}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {category.description}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      {category.courses} courses available
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
}