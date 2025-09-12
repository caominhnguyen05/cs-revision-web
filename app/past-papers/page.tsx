import ProgramCard from "./program-card";

export default function ChooseProgramPage() {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center">
          Select a Program
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose between Cambridge A-Level or IGCSE to find relevant past
          papers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <ProgramCard
          programName="A-Level"
          programCode="Computer Science (9618)"
          programHref="/past-papers/a-level"
        />
        <ProgramCard
          programName="IGCSE"
          programCode="Computer Science (0478)"
          programHref="/past-papers/igcse"
        />
      </div>
    </div>
  );
}
