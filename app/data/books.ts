export interface Book {
  title: string;
  coverImage: string;
  pdfUrl: string;
  author: string;
  description?: string;
}

export const books: Book[] = [
  {
    title: "Cambridge International AS & A Level Computer Science",
    coverImage: "/books/a-level-hodder.jpg",
    pdfUrl:
      "https://drive.google.com/file/d/1nb859S164RvpbcRB3dZ-SSn2uTjBnT_1/view?usp=sharing",
    author: "David Watson, Helen Williams",
    description: "Hodder Education",
  },
  {
    title: "Cambridge IGCSE and O Level Computer Science - Second Edition",
    coverImage: "/books/igcse-hodder.jpg",
    pdfUrl:
      "https://drive.google.com/file/d/1axKhBz83_g8xTZCCBBfSSz_7acSVn9iA/view?usp=sharing",
    author: "David Watson, Helen Williams",
    description: "Hodder Education",
  },
  {
    title:
      "Computer Science for Cambridge International AS & A Level - Coursebook",
    coverImage: "/books/a-level-cambridge.jpg",
    pdfUrl:
      "https://drive.google.com/file/d/18I9tLp7yYr5BZyJAkAUICcMIQ1gQCvOQ/view?usp=sharing",
    author: "Sylvia Langfield & Dave Duddell",
    description: "Cambridge University Press",
  },
];
