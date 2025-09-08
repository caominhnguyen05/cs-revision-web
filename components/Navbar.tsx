"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 left-0 z-50 w-full border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">CS Past Papers</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-4">
          <Link href="/past-papers">
            <Button variant="ghost" asChild>
              <span>Past Papers</span>
            </Button>
          </Link>
          <Link href="/books">
            <Button variant="ghost">Books</Button>
          </Link>
          <Link href="/syllabus">
            <Button variant="ghost">Syllabus</Button>
          </Link>
          <Link href="/revision-notes">
            <Button variant="ghost">Revision Notes</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 border-t">
          <Link href="/past-papers">
            <Button variant="ghost" className="w-full">
              Past Papers
            </Button>
          </Link>
          <Link href="/books">
            <Button variant="ghost" className="w-full">
              Books
            </Button>
          </Link>
          <Link href="/syllabus">
            <Button variant="ghost" className="w-full">
              Syllabus
            </Button>
          </Link>
          <Link href="/revision-notes">
            <Button variant="ghost" className="w-full">
              Revision Notes
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
