import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RevisionPage() {
  const chapters = [
    {
      id: "chapter1",
      title: "1. Information representation",
      notes: "Placeholder notes for Information representation...",
      description:
        "Description: Learn how data is represented inside a computer (binary, text, images etc.).",
    },
    {
      id: "chapter2",
      title: "2. Communication",
      notes: "Placeholder notes for Communication & Networks...",
      description:
        "Description: Explore how computers talk to each other, network topologies, protocols, etc.",
    },
    {
      id: "chapter3",
      title: "3. Hardware",
      notes: "Placeholder notes for Hardware & Computer Systems...",
      description:
        "Description: Components of hardware, input/output devices, embedded systems, etc.",
    },
    {
      id: "chapter4",
      title: "4. Processor Fundamentals",
      notes: "Placeholder for Processor Fundamentals notes...",
      description:
        "Description: CPU architecture, fetch-execute cycle, registers, performance factors, etc.",
    },
    {
      id: "chapter5",
      title: "5. System Software",
      notes: "Placeholder for System Software notes...",
      description:
        "Description: Operating systems, utilities, language translators, etc.",
    },
    {
      id: "chapter6",
      title: "6. Security, Privacy & Data Integrity",
      notes: "Placeholder for Security, Privacy & Data Integrity notes...",
      description:
        "Description: Threats, protection methods, validation/verification, etc.",
    },
    {
      id: "chapter7",
      title: "7. Ethics and Ownership",
      notes: "Placeholder for Ethics & Ownership notes...",
      description:
        "Description: Ethical considerations, intellectual property, legal constraints, responsibilities.",
    },
    {
      id: "chapter8",
      title: "8. Databases",
      notes: "Placeholder for Databases notes...",
      description:
        "Description: Relational databases, SQL, normalization, DBMS, etc.",
    },
    {
      id: "chapter9",
      title: "9. Algorithm Design and Problem-solving",
      notes: "Placeholder for Algorithm design & Problem Solving notes...",
      description:
        "Description: Pseudocode, logic, decomposition, algorithms, flowcharts etc.",
    },
    {
      id: "chapter10",
      title: "10. Data Types and Structures",
      notes: "Placeholder for Data Types & Structures notes...",
      description: "Description: Arrays, records, abstract data types, etc.",
    },
    {
      id: "chapter11",
      title: "11. Programming",
      notes: "Placeholder for Programming notes...",
      description:
        "Description: Writing programs, constructs, functions, error handling, etc.",
    },
    {
      id: "chapter12",
      title: "12. Software Development",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter13",
      title: "13. Data Representation",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter14",
      title: "14. Communication and internet technologies",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter15",
      title: "15. Hardware and Virtual Machines",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter16",
      title: "16. System Software",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter17",
      title: "Security",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter18",
      title: "18. Artificial Intelligence (AI)",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter19",
      title: "19. Computational thinking and Problem-solving",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
    {
      id: "chapter20",
      title: "20. Further Programming",
      notes: "Placeholder for Software Development notes...",
      description:
        "Description: Life cycle models, testing, maintenance, documentation etc.",
    },
  ];
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
