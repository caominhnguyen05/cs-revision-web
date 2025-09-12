import { books } from "../data/books";
import { BookCard } from "./book-card";

export default function BookPage() {
  return (
    <div className="container mx-auto px-6 py-10 space-y-8 md:px-8">
      <h1 className="text-3xl font-bold text-center">
        Essential Computer Science Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </div>
  );
}
