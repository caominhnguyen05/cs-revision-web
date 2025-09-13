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
  ListPlus,
  CheckCircle2,
  ListX,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SeriesSidebar } from "@/components/series-sidebar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getPastPaperLists,
  addTodoPaper,
  removeTodoPaper,
} from "@/lib/actions/paper-actions";

interface Paper {
  program: string;
  qp: string;
  ms: string;
  year: number;
}

type PaperLists = {
  todo: string[];
  completed: string[];
};

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

  const [paperLists, setPaperLists] = useState<PaperLists>({
    todo: [],
    completed: [],
  });

  // Function to fetch and update the user's paper lists
  const refreshLists = async () => {
    try {
      const lists = await getPastPaperLists();
      setPaperLists(lists);
    } catch (error) {
      console.log("Could not fetch paper lists, user may not be logged in.");
    }
  };

  useEffect(() => {
    if (activeSeriesSlug) {
      const filteredPapers = getPapersForSeries(
        params.program,
        activeSeriesSlug
      );
      setPapers(filteredPapers);
    }
    refreshLists();
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
      onSelect={() => setIsMobileSheetOpen(false)}
    />
  );

  const handleAddTodo = async (paperId: string) => {
    try {
      await addTodoPaper(paperId);
      await refreshLists();
      toast.success("Added to your To-do list!");
    } catch (error) {
      toast.error("Failed to add paper. Please try again.");
    }
  };

  const handleRemoveTodo = async (paperId: string) => {
    try {
      await removeTodoPaper(paperId);
      await refreshLists();
      toast.info("Removed from your To-do list.");
    } catch (error) {
      toast.error("Failed to remove paper. Please try again.");
    }
  };

  return (
    <TooltipProvider>
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
              className="hidden md:flex cursor-pointer"
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
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden cursor-pointer"
                >
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
                {papers.map((paper) => {
                  const paperId = paper.qp.replace(".pdf", "");
                  const isCompleted = paperLists.completed.includes(paperId);
                  const isTodo = paperLists.todo.includes(paperId);

                  return (
                    <Card key={paper.qp}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                          Paper {paperId.split("_")[3]}
                        </CardTitle>

                        {isCompleted ? (
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Completed</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : isTodo ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="cursor-pointer"
                                size="icon"
                                onClick={() => handleRemoveTodo(paperId)}
                              >
                                <ListX className="h-5 w-5 text-destructive" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove from To-do</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="cursor-pointer"
                                size="icon"
                                onClick={() => handleAddTodo(paperId)}
                              >
                                <ListPlus className="h-5 w-5 text-primary" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to To-do</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </CardHeader>
                      <CardContent className="flex justify-between items-center">
                        <a
                          href={`/papers/${paper.program}/${paper.year}/${paper.qp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                          >
                            <FileText className="mr-2 h-4 w-4" /> QP
                          </Button>
                        </a>
                        <a
                          href={`/papers/${paper.program}/${paper.year}/${paper.ms}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="cursor-pointer">
                            <CheckSquare className="mr-2 h-4 w-4" /> MS
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p>Select a series from the menu to view papers.</p>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
