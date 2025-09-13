import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { removeCompletedPaper } from "@/lib/actions/paper-actions";
import { CheckCircle2, CheckSquare, CircleX, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CompletedPastPapersTab({
  papers,
  refreshLists,
}: {
  papers: string[];
  refreshLists: () => void;
}) {
  const handleRemovePaper = async (paperId: string) => {
    try {
      await removeCompletedPaper(paperId);
      await refreshLists();
      toast.success(`Removed from Completed paper: ${paperId}`);
    } catch (error) {
      toast.error("Failed to remove from Completed.");
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Todo Past Papers
          </h1>
          <p className="text-muted-foreground">
            Past papers you&apos;ve scheduled to complete.
          </p>
        </div>

        <Button asChild>
          <Link href="/past-papers">
            <Plus className="mr-2 h-4 w-4" />
            Add Completed Paper
          </Link>
        </Button>
      </div>

      <div className="grid gap-2">
        {papers.length > 0 ? (
          papers.map((paperId) => (
            <Card key={paperId} className="py-0.2">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-mono font-medium">{paperId}</span>
                </div>

                <Button
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleRemovePaper(paperId)}
                >
                  <CircleX className="mr-2 h-4 w-4" />
                  Unmark Completed
                </Button>
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
