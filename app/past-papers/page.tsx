import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function ChooseProgramPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Select a Program</h1>
        <p className="text-muted-foreground mt-2">
          Choose between Cambridge A-Level or IGCSE to find relevant past
          papers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link href="/past-papers/a-level">
          <Card className="hover:border-purple-800 transition-colors">
            <CardHeader className="items-center text-center">
              <GraduationCap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle className="text-xl">A-Level</CardTitle>
              <CardDescription>Computer Science (9618)</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/past-papers/igcse">
          <Card className="hover:border-purple-800 transition-colors">
            <CardHeader className="items-center text-center">
              <GraduationCap className="h-10 w-10 mb-2 text-primary" />
              <CardTitle className="text-xl">IGCSE</CardTitle>
              <CardDescription>Computer Science (0478)</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
