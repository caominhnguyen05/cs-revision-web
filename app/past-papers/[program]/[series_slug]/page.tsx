import { getPapersForSeries, getAvailableSeries } from "@/lib/paper-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function PaperListPage({
  params,
}: {
  params: { program: string; series_slug: string };
}) {
  const papers = getPapersForSeries(params.program, params.series_slug);

  // Find the display name for the current series to use in the title
  const allSeries = getAvailableSeries(params.program as "a-level" | "igcse");
  const currentSeries = allSeries.find((s) => s.slug === params.series_slug);
  const pageTitle = currentSeries ? currentSeries.displayName : "Past Papers";

  return (
    <div className="space-y-6">
      <Link
        href={`/past-papers/${params.program}`}
        className="text-sm text-primary hover:underline"
      >
        &larr; Back to series selection
      </Link>
      <h1 className="text-3xl font-bold">Papers for {pageTitle}</h1>

      {papers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {papers.map((paper, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">
                  Paper {paper.qp.replace(".pdf", "").split("_")[3]}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <a
                  href={`/papers/${paper.program}/${paper.year}/${paper.qp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" /> Question Paper
                  </Button>
                </a>
                <a
                  href={`/papers/${paper.program}/${paper.year}/${paper.ms}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>
                    <CheckSquare className="mr-2 h-4 w-4" /> Mark Scheme
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No papers found for this series.</p>
      )}
    </div>
  );
}
