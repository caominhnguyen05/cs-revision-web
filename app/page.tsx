import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  Lightbulb,
} from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <section className="flex flex-col items-center text-center space-y-6 px-6 py-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Computer Science Past Papers Hub
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Your one-stop resource for Cambridge International A-Level and IGCSE
            Computer Science materials. Find everything you need to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl pt-6">
          {/* Past Papers Card */}
          <Card className="text-left rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-xl hover:shadow-purple-100">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Past Papers</CardTitle>
              <CardDescription>
                The most important section. Access a comprehensive library of
                past question papers and mark schemes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/past-papers">
                <Button className="bg-purple-800 hover:bg-purple-900">
                  Go to Past Papers <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
          {/* Books Card */}
          <Card className="text-left rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-purple-100">
            <CardHeader>
              <BookOpen className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Recommended Books</CardTitle>
              <CardDescription>
                A curated list of textbooks and resources to supplement your
                learning and understanding.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/books">
                <Button variant="outline">View Books</Button>
              </Link>
            </CardContent>
          </Card>
          {/* Syllabus Card */}
          <Card className="text-left rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-purple-100">
            <CardHeader>
              <ClipboardList className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Syllabus</CardTitle>
              <CardDescription>
                Download the latest official syllabus documents to stay on track
                with course requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/syllabus">
                <Button variant="outline">See Syllabus</Button>
              </Link>
            </CardContent>
          </Card>
          {/* Revision Notes Card */}
          <Card className="text-left rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-purple-100">
            <CardHeader>
              <Lightbulb className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Revision Notes</CardTitle>
              <CardDescription>
                Concise and helpful notes to aid your revision for key computer
                science topics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/revision-notes">
                <Button variant="outline">Find Notes</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
