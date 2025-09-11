"use client";

import { useSearchParams } from "next/navigation";
import { getAvailableSeries, getPapersForSeries } from "@/lib/paper-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  CheckSquare,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SeriesSidebar } from "@/components/series-sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Paper {
  program: string;
  qp: string;
  ms: string;
  year: number;
}

export default function PastPapersLayoutPage({
  params,
}: {
  params: { program: "a-level" | "igcse" };
}) {
  const searchParams = useSearchParams();
  const seriesParam = searchParams.get("series");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false); // State for mobile sheet

  const seriesList = getAvailableSeries(params.program);
  const activeSeriesSlug =
    seriesParam || (seriesList.length > 0 ? seriesList[0].slug : "");
  const [papers, setPapers] = useState<Paper[]>([]);

  useEffect(() => {
    if (activeSeriesSlug) {
      const filteredPapers = getPapersForSeries(
        params.program,
        activeSeriesSlug
      );
      setPapers(filteredPapers);
    }
  }, [activeSeriesSlug, params.program]);

  const programName = params.program === "a-level" ? "A-Level" : "IGCSE";
  const currentSeries = seriesList.find((s) => s.slug === activeSeriesSlug);
  const pageTitle = currentSeries
    ? programName + " - " + currentSeries.displayName
    : "Select a Series";

  const sidebarContent = (
    <SeriesSidebar
      program={params.program}
      seriesList={seriesList}
      activeSeriesSlug={activeSeriesSlug}
      onSelect={() => setIsMobileSheetOpen(false)} // Close sheet on selection
    />
  );

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Desktop Sidebar (Sliding) */}
      <div
        className={cn(
          "hidden md:block bg-background border-r transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-0 p-0 border-0"
        )}
      >
        <div className="overflow-hidden h-full">{sidebarContent}</div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center gap-4 p-4 sticky top-0 bg-background z-10">
          {/* Desktop Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>

          {/* Mobile Sheet Trigger */}
          <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <PanelLeftOpen className="h-5 w-5" />
                <span className="sr-only">Open Series Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              {sidebarContent}
            </SheetContent>
          </Sheet>

          {/* Page Title */}
          <h1 className="text-xl font-bold truncate">{pageTitle}</h1>
        </header>

        {/* Paper List */}
        <main className="p-6">
          {papers.length > 0 ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {papers.map((paper) => (
                <Card key={paper.qp}>
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
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" /> QP
                      </Button>
                    </a>
                    <a
                      href={`/papers/${paper.program}/${paper.year}/${paper.ms}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">
                        <CheckSquare className="mr-2 h-4 w-4" /> MS
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>Select a series from the menu to view papers.</p>
          )}
        </main>
      </div>
    </div>
  );
}
