import { Hero } from "@/components/hero";
import { FeaturedCourses } from "@/components/featured-courses";
import { Categories } from "@/components/categories";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedCourses />
    </div>
  );
}
