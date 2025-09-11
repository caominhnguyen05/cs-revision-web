import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Series {
  slug: string;
  displayName: string;
}

interface SeriesSidebarProps {
  program: string;
  seriesList: Series[];
  activeSeriesSlug: string;
  onSelect?: () => void;
}

export function SeriesSidebar({
  program,
  seriesList,
  activeSeriesSlug,
  onSelect,
}: SeriesSidebarProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold tracking-tight">Exam Series</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {seriesList.map((series) => (
          <Link
            key={series.slug}
            href={`/past-papers/${program}?series=${series.slug}`}
            scroll={false}
            className="block"
            onClick={handleClick}
          >
            <Button
              variant={activeSeriesSlug === series.slug ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              {series.displayName}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
