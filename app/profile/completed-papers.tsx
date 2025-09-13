import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CheckSquare } from "lucide-react";

export default function CompletedPastPapersTab({
  papers,
}: {
  papers: string[];
}) {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Completed Papers</h1>
        <p className="text-muted-foreground">
          Track your progress and review completed papers.
        </p>
      </div>

      <div className="grid gap-2">
        {papers.length > 0 ? (
          papers.map((paperId) => (
            <Card key={paperId} className="py-0.2">
              <CardContent className="p-4 flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-mono font-medium">{paperId}</span>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center">
              <div className="text-center">
                <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No completed papers yet</p>
                <p className="text-sm text-muted-foreground">
                  Complete your first paper to see it here.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
