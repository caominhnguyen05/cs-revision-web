import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";

const syllabusCategories = [
  {
    categoryTitle: "A-Level Syllabuses",
    syllabuses: [
      {
        id: 1,
        title: "Computer Science (9618)",
        description: "The official syllabus for examinations in 2024 and 2025.",
        file: "https://www.cambridgeinternational.org/Images/636089-2024-2025-syllabus.pdf",
        year: "2024 - 2025",
      },
      {
        id: 2,
        title: "Computer Science (9618)",
        description: "The official syllabus for examinations in 2026.",
        file: "https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf",
        year: "2026",
      },
      {
        id: 3,
        title: "Computer Science (9618)",
        description: "The official syllabus for exams in 2027, 2028 and 2029.",
        file: "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
        year: "2027 - 2029",
      },
    ],
  },
  {
    categoryTitle: "IGCSE Syllabuses",
    syllabuses: [
      {
        id: 4,
        title: "Computer Science (0478)",
        description:
          "The official syllabus for examinations in 2023, 2024 and 2025.",
        file: "https://www.cambridgeinternational.org/Images/595424-2023-2025-syllabus.pdf",
        year: "2023 - 2025",
      },
      {
        id: 5,
        title: "Computer Science (0478)",
        description:
          "The official syllabus for examinations in 2026, 2027 and 2028.",
        file: "https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf",
        year: "2026 - 2028",
      },
    ],
  },
];

export default function SyllabusPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl">
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
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight mb-6">
              <FileText className="h-7 w-7 text-primary" />
              <span>{category.categoryTitle}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.syllabuses.map((s) => (
                <Card key={s.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{s.title}</CardTitle>

                      <Badge variant="secondary">{s.year}</Badge>
                    </div>

                    <CardDescription>{s.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {s.file ? (
                      <a
                        href={s.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button className="w-full bg-purple-700 hover:bg-purple-800">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </a>
                    ) : (
                      <Button className="w-full" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
