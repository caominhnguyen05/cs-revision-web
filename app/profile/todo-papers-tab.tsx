import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { completePaper } from "@/lib/actions/paper-actions";
import { CheckSquare, FileText, ListTodo } from "lucide-react";
import { toast } from "sonner";

const generatePaperUrl = (paperId: string) => {
  const parts = paperId.split("_");
  const subjectCode = parts[0];
  const yearShort = parts[1].substring(1);

  const program = subjectCode === "9618" ? "a-level" : "igcse";
  const year = `20${yearShort}`;

  return `/papers/${program}/${year}/${paperId}.pdf`;
};

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
            <Card key={paperId} className="py-0.2">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={generatePaperUrl(paperId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-medium hover:underline hover:text-primary transition-colors"
                  >
                    {paperId}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={generatePaperUrl(paperId)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Paper
                    </a>
                  </Button>

                  <Button
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => handleCompletePaper(paperId)}
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Mark as Complete
                  </Button>
                </div>
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
