import papersData from "./papers-data.json";

interface Paper {
  program: string;
  qp: string;
  ms: string;
}

const parseFileName = (filename: string) => {
  const parts = filename.split("_");
  if (parts.length < 3) return null;

  const seasonCode = parts[1][0];
  const yearCode = parts[1].substring(1);

  const fullYear = parseInt(`20${yearCode}`);
  const seasonName = seasonCode == "s" ? "May/June" : "Oct/Nov";
  const seriesSlug = `${fullYear}-${seasonCode === "s" ? "mj" : "on"}`; // e.g., 2023-mj

  return {
    fullYear,
    seasonName,
    seriesSlug,
    displayName: `${fullYear} ${seasonName}`,
  };
};

export const getAvailableSeries = (program: "a-level" | "igcse") => {
  const seriesSet = new Set<string>();

  papersData.papers
    .filter((p) => p.program === program)
    .forEach((p) => {
      const parsed = parseFileName(p.qp);
      if (parsed) {
        seriesSet.add(
          JSON.stringify({
            slug: parsed.seriesSlug,
            displayName: parsed.displayName,
          })
        );
      }
    });

  const seriesArray = Array.from(seriesSet).map((s) => JSON.parse(s));
  seriesArray.sort((a, b) => b.displayName.localeCompare(a.displayName));

  return seriesArray;
};

// This gets all the papers for a specific program and series slug
export const getPapersForSeries = (program: string, seriesSlug: string) => {
  return papersData.papers
    .filter((p) => {
      const parsed = parseFileName(p.qp);
      return (
        p.program === program && parsed && parsed.seriesSlug === seriesSlug
      );
    })
    .map((p) => {
      const parsed = parseFileName(p.qp);
      return {
        ...p,
        year: parsed!.fullYear,
      };
    });
};
