import { FileText } from "lucide-react";
import { SyllabusCard } from "./syllabus-card";
import { syllabusCategories } from "../data/syllabuses";

export default function SyllabusPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Explore the Latest Syllabus
        </h1>
        <p className="text-muted-foreground mt-4">
          Stay on track with the latest curriculum and know exactly what topics
          to focus on.
        </p>
      </div>

      <div className="space-y-12">
        {syllabusCategories.map((category) => (
          <section key={category.categoryTitle}>
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold tracking-tight mb-6">
              <FileText className="h-7 w-7 text-primary" />
              <span>{category.categoryTitle}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.syllabuses.map((syllabus) => (
                <SyllabusCard key={syllabus.id} syllabus={syllabus} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
