import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function ProgramCard({
  programName,
  programCode,
  programHref,
}: {
  programName: string;
  programCode: string;
  programHref: string;
}) {
  return (
    <Link href={programHref}>
      <Card className="hover:border-purple-800 transition-colors">
        <CardHeader className="items-center text-center">
          <GraduationCap className="h-10 w-10 mb-2 text-primary" />
          <CardTitle className="text-xl">{programName}</CardTitle>
          <CardDescription>{programCode}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
