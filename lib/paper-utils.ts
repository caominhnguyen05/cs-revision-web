import papersData from "./papers-data";

export const parseFileName = (filename: string) => {
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

export const buildPaperUrl = (
  program: "a-level" | "igcse",
  parsed: ReturnType<typeof parseFileName>,
  filename: string
) => {
  const subjectFolders: Record<string, string> = {
    "a-level":
      "Computer%20Science%20(for%20first%20examination%20in%202021)%20(9618)",
    igcse: "Computer-Science-0478",
  };

  const seriesFolder = `${parsed?.fullYear}-${parsed?.seasonName.replace(
    "/",
    "-"
  )}`;

  return `https://pastpapers.co/cie/${
    program === "a-level" ? "A-Level" : "IGCSE"
  }/${subjectFolders[program]}/${seriesFolder}/${filename}`;
};

export const buildThresholdUrl = (
  program: "a-level" | "igcse",
  activeSeriesSlug: string
) => {
  const subjectFolders: Record<string, string> = {
    "a-level":
      "Computer%20Science%20(for%20first%20examination%20in%202021)%20(9618)",
    igcse: "Computer-Science-0478",
  };

  const year = activeSeriesSlug.split("-")[0];
  const seriesCode = activeSeriesSlug.split("-")[1];
  const month = seriesCode === "mj" ? "May-June" : "Oct-Nov";
  const seriesFolder = `${year}-${month}`;

  const programCode = program === "a-level" ? "9618" : "0478";
  const season = seriesCode === "mj" ? "s" : "w";
  const yearShort = year.substring(2);
  const thresholdFileName = `${programCode}_${season}${yearShort}_gt.pdf`;

  return `https://pastpapers.co/cie/${
    program === "a-level" ? "A-Level" : "IGCSE"
  }/${subjectFolders[program]}/${seriesFolder}/${thresholdFileName}`;
};
