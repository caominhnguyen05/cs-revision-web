"use client";

import { buildThresholdUrl } from "@/lib/paper-utils";
import { Loader2, FileX2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ThresholdViewerProps {
  program: "a-level" | "igcse";
  seriesSlug: string;
}

export function ThresholdViewer({ program, seriesSlug }: ThresholdViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const pdfUrl = useMemo(
    () => buildThresholdUrl(program, seriesSlug),
    [program, seriesSlug]
  );

  if (!pdfUrl) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileX2 className="h-5 w-5 text-muted-foreground" />
            Not Available
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A Grade Threshold document could not be found for this series.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative w-full h-[75vh] rounded-md overflow-hidden border bg-muted">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading PDF...</p>
        </div>
      )}

      <iframe
        src={pdfUrl}
        onLoad={() => setIsLoading(false)}
        className="w-full h-full border-0"
        title={`Grade Threshold for ${seriesSlug}`}
      />
    </div>
  );
}
