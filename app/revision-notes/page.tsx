import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { chapters } from "../data/revision-chapters";

export default function RevisionPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-center text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Your Quick-Access Study Notes
        </h1>
        <p className="text-muted-foreground mt-4 text-center">
          Concise, exam-focused notes to help you quickly revise key topics and
          prepare with confidence.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        {chapters.map((chapter) => (
          <AccordionItem key={chapter.id} value={chapter.id}>
            <AccordionTrigger className="text-base">
              {chapter.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="text-muted-foreground">{chapter.description}</p>
              <div className="bg-gray-50 p-3 rounded-md">{chapter.notes}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
