import Link from "next/link";
import { getAvailableSeries } from "@/lib/paper-utils";
import { Folder } from "lucide-react";

export default async function ChooseSeriesPage({
  params,
}: {
  params: { program: "a-level" | "igcse" };
}) {
  const series = getAvailableSeries(params.program);
  const programName = params.program === "a-level" ? "A-Level" : "IGCSE";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Select a Series for {programName}</h1>

      <div className="border rounded-lg">
        <ul className="divide-y">
          {series.map((s) => (
            <li key={s.slug}>
              <Link href={`/past-papers/${params.program}/${s.slug}`}>
                <div className="flex items-center p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <Folder className="h-5 w-5 mr-4 text-primary" />
                  <span className="font-medium">{s.displayName}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
