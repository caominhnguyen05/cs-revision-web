"use client";

import Link from "next/link";
import { Menu, Code } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Past Papers", href: "/past-papers" },
  { label: "Books", href: "/books" },
  { label: "Syllabus", href: "/syllabus" },
  { label: "Revision Notes", href: "/revision-notes" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-800 sticky top-0 left-0 z-50 w-full border-b border-purple-900/50 shadow-md">
      <div className="container relative mx-auto px-6 py-3.5 flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-purple-300" />
          <span className="font-bold text-lg text-white">CS Past Papers</span>
        </Link>

        {/* Nav items on far right on Desktop */}
        <div className="hidden md:flex items-center space-x-2 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-white hover:bg-white hover:text-black relative group"
              )}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start px-4 pt-2 pb-2 space-y-1 bg-purple-900">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "text-white hover:bg-purple-700 hover:text-white relative group w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
