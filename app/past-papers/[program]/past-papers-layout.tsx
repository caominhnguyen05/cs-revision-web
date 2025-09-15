"use client";

import { useSearchParams } from "next/navigation";
import {
  buildPaperUrl,
  getAvailableSeries,
  getPapersForSeries,
  parseFileName,
} from "@/lib/paper-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  CheckSquare,
  PanelLeftOpen,
  PanelLeftClose,
  ListPlus,
  CheckCircle2,
  ListX,
  LineChart,
} from "lucide-react";
import { ComponentType, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import { ThresholdViewer } from "@/components/threshold-viewer";

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

type Tab = {
  id: string;
  label: string;
  icon?: ComponentType<{ className?: string }>;
};

export default function PastPapersLayoutPage({
  program,
}: {
  program: "a-level" | "igcse";
}) {
  const searchParams = useSearchParams();
  const seriesParam = searchParams.get("series");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const seriesList = getAvailableSeries(program);
  const activeSeriesSlug =
    seriesParam || (seriesList.length > 0 ? seriesList[0].slug : "");
  const [papers, setPapers] = useState<Paper[]>([]);

  const [paperLists, setPaperLists] = useState<PaperLists>({
    todo: [],
    completed: [],
  });

  const [activeTab, setActiveTab] = useState("all");

  const tabs: Tab[] = useMemo(() => {
    const baseTabs = [
      { id: "all", label: "All Papers" },
      { id: "p1", label: "Paper 1" },
      { id: "p2", label: "Paper 2" },
    ];

    const aLevelSpecificTabs = [
      { id: "p3", label: "Paper 3" },
      { id: "p4", label: "Paper 4" },
    ];

    const finalTab = {
      id: "gt",
      label: "Grade Thresholds",
      icon: LineChart,
    };

    if (program === "a-level") {
      return [...baseTabs, ...aLevelSpecificTabs, finalTab];
    }
    // Default to IGCSE
    return [...baseTabs, finalTab];
  }, [program]);

  useEffect(() => {
    const isTabValid = tabs.some((tab) => tab.id === activeTab);
    if (!isTabValid) {
      setActiveTab("all");
    }
  }, [tabs, activeTab]);

  const filteredPapers = papers.filter((paper) => {
    if (activeTab === "all") return true;
    if (activeTab === "p1") return paper.qp.includes("_qp_1");
    if (activeTab === "p2") return paper.qp.includes("_qp_2");
    if (activeTab === "p3") return paper.qp.includes("_qp_3");
    if (activeTab === "p4") return paper.qp.includes("_qp_4");
    return false;
  });

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
      const filteredPapers = getPapersForSeries(program, activeSeriesSlug);
      setPapers(filteredPapers);
    }
    refreshLists();
  }, [activeSeriesSlug, program]);

  const programName = program === "a-level" ? "A-Level" : "IGCSE";
  const currentSeries = seriesList.find((s) => s.slug === activeSeriesSlug);

  const sidebarContent = (
    <SeriesSidebar
      program={program}
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
          <header className="flex items-center gap-4 p-4 sticky top-0 bg-background z-10 border-b">
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
            <h1 className="text-xl font-bold truncate flex items-center gap-2">
              {programName}
              {currentSeries && (
                <Badge
                  className={
                    program === "a-level"
                      ? "bg-green-100 text-green-800 font-medium px-3 py-1 text-base rounded-lg"
                      : "bg-orange-100 text-orange-800 font-medium px-3 py-1 text-base rounded-lg"
                  }
                >
                  {currentSeries.displayName}
                </Badge>
              )}
            </h1>
          </header>

          {/* Paper List */}
          <main className="p-4 md:p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-start lg:justify-center w-full overflow-x-auto pb-2">
                <TabsList className="flex w-fit sm:w-auto sm:inline-flex justify-start md:justify-center mb-6 bg-neutral-100 gap-1 sm:gap-2 mx-auto md:h-10">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-shrink-0 md:px-4"
                    >
                      {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab}>
                {activeTab !== "gt" ? (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredPapers.map((paper) => {
                      const paperId = paper.qp.replace(".pdf", "");
                      const isCompleted =
                        paperLists.completed.includes(paperId);
                      const isTodo = paperLists.todo.includes(paperId);

                      return (
                        <Card key={paper.qp}>
                          <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-base font-semibold">
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
                                    size="icon"
                                    onClick={() => handleRemoveTodo(paperId)}
                                    className="h-8 w-8"
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
                                    size="icon"
                                    onClick={() => handleAddTodo(paperId)}
                                    className="h-8 w-8"
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
                              href={buildPaperUrl(
                                paper.program as "a-level" | "igcse",
                                parseFileName(paper.qp)!,
                                paper.qp
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" /> QP
                              </Button>
                            </a>
                            <a
                              href={buildPaperUrl(
                                paper.program as "a-level" | "igcse",
                                parseFileName(paper.qp)!,
                                paper.ms
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button size="sm">
                                <CheckSquare className="mr-2 h-4 w-4" /> MS
                              </Button>
                            </a>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <ThresholdViewer
                    program={program}
                    seriesSlug={activeSeriesSlug}
                  />
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
