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
    coverImage:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTCZTI7fdj_o3qlfVeXn7uJSsrq0M4np7ak8DPssbVB9vmEllo6",
    pdfUrl:
      "https://drive.google.com/file/d/1nb859S164RvpbcRB3dZ-SSn2uTjBnT_1/view?usp=sharing",
    author: "David Watson, Helen Williams",
    description: "Hodder Education",
  },
  {
    title: "Cambridge IGCSE and O Level Computer Science - Second Edition",
    coverImage:
      "https://m.media-amazon.com/images/I/71cGqLy1UGL._UF1000,1000_QL80_.jpg",
    pdfUrl:
      "https://drive.google.com/file/d/1axKhBz83_g8xTZCCBBfSSz_7acSVn9iA/view?usp=sharing",
    author: "David Watson, Helen Williams",
    description: "Hodder Education",
  },
  {
    title:
      "Computer Science for Cambridge International AS & A Level - Coursebook",
    coverImage:
      "https://wisdombooks.lk/cdn/shop/products/416pMsBoDRL.jpg?v=1659520049",
    pdfUrl:
      "https://drive.google.com/file/d/18I9tLp7yYr5BZyJAkAUICcMIQ1gQCvOQ/view?usp=sharing",
    author: "Sylvia Langfield & Dave Duddell",
    description: "Cambridge University Press",
  },
];
