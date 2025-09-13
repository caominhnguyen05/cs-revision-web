import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { completePaper } from "@/lib/actions/paper-actions";
import { CheckSquare, ListTodo } from "lucide-react";
import { toast } from "sonner";

export default function TodoPastPapersTab({
  papers,
  refreshLists,
}: {
  papers: string[];
  refreshLists: () => void;
}) {
  const handleCompletePaper = async (paperId: string) => {
    try {
      await completePaper(paperId);
      await refreshLists();
      toast.success(`Completed paper: ${paperId}`);
    } catch (error) {
      toast.error("Failed to mark paper as complete.");
    }
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Todo Past Papers</h1>
        <p className="text-muted-foreground">
          Past papers you've scheduled to complete.
        </p>
      </div>

      <div className="grid gap-4">
        {papers.length > 0 ? (
          papers.map((paperId) => (
            <Card key={paperId}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-muted-foreground" />
                  <span className="font-mono font-medium">{paperId}</span>
                </div>
                <Button size="sm" onClick={() => handleCompletePaper(paperId)}>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="flex items-center justify-center h-40">
              <div className="text-center">
                <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Your to-do list is empty.
                </p>
                <p className="text-sm text-muted-foreground">
                  Go to the past papers section to add papers.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
