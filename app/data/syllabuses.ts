import type { Syllabus } from "../syllabus/syllabus-card";

export const syllabusCategories: {
  categoryTitle: string;
  syllabuses: Syllabus[];
}[] = [
  {
    categoryTitle: "A-Level Syllabuses",
    syllabuses: [
      {
        id: 1,
        title: "Computer Science (9618)",
        description: "The official syllabus for examinations in 2024 and 2025.",
        file: "https://www.cambridgeinternational.org/Images/636089-2024-2025-syllabus.pdf",
        year: "2024 - 2025",
      },
      {
        id: 2,
        title: "Computer Science (9618)",
        description: "The official syllabus for examinations in 2026.",
        file: "https://www.cambridgeinternational.org/Images/697372-2026-syllabus.pdf",
        year: "2026",
      },
      {
        id: 3,
        title: "Computer Science (9618)",
        description: "The official syllabus for exams in 2027, 2028 and 2029.",
        file: "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf",
        year: "2027 - 2029",
      },
    ],
  },
  {
    categoryTitle: "IGCSE Syllabuses",
    syllabuses: [
      {
        id: 4,
        title: "Computer Science (0478)",
        description:
          "The official syllabus for examinations in 2023, 2024 and 2025.",
        file: "https://www.cambridgeinternational.org/Images/595424-2023-2025-syllabus.pdf",
        year: "2023 - 2025",
      },
      {
        id: 5,
        title: "Computer Science (0478)",
        description:
          "The official syllabus for examinations in 2026, 2027 and 2028.",
        file: "https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf",
        year: "2026 - 2028",
      },
    ],
  },
];
