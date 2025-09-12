import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export interface Syllabus {
  id: number;
  title: string;
  description: string;
  file?: string;
  year: string;
}

export function SyllabusCard({ syllabus }: { syllabus: Syllabus }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg md:text-xl">{syllabus.title}</CardTitle>
          <Badge variant="secondary">{syllabus.year}</Badge>
        </div>
        <CardDescription>{syllabus.description}</CardDescription>
      </CardHeader>

      <CardFooter>
        {syllabus.file ? (
          <a
            href={syllabus.file}
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
  );
}
