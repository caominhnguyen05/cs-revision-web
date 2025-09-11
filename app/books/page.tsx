import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { books } from "../data/books";

export default function BookPage() {
  return (
    <div className="container mx-auto px-6 py-10 space-y-8 md:px-8">
      <h1 className="text-3xl font-bold text-center">
        Essential Computer Science Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
        {books.map((book, index) => (
          <Card
            key={index}
            className="flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:scale-102 hover:shadow-xl hover:shadow-purple-100"
          >
            <div className="flex justify-center items-center bg-gray-50 h-80">
              <img
                src={book.coverImage}
                alt={book.title}
                className="max-h-full object-contain"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              {book.description && (
                <CardDescription>{book.description}</CardDescription>
              )}
            </CardContent>
            <CardFooter>
              <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 bg-purple-800 hover:bg-purple-900">
                  <FileText className="h-4 w-4" /> Download PDF
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
