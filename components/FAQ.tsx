import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/Accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export function FAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about Lumix",
  faqs = [
    {
      question: "How does Lumix's AI flashcard generation work?",
      answer:
        "Lumix uses advanced AI to analyze your notes or documents and extract key concepts. It then creates flashcards with questions on one side and answers on the other. The AI is trained to identify important information and create effective study materials tailored to your content.",
    },
    {
      question: "Can I use Lumix on multiple devices?",
      answer:
        "Yes! Lumix is accessible on any device with a web browser. Your flashcards and progress sync automatically across all your devices, so you can study seamlessly whether you're on your laptop, tablet, or smartphone.",
    },
    {
      question: "Is there a limit to how many flashcards I can create?",
      answer:
        "Free accounts can create up to 15 decks with unlimited cards per deck. Pro accounts can create up to 30 decks, and Ultra accounts can create up to 80 decks. All plans include unlimited cards within each deck.",
    },
    {
      question: "Can I customize my flashcards?",
      answer:
        "Absolutely! You can edit any flashcard the AI generates, add your own, and organize them into custom decks. You can also include images, code snippets, and formatted text to better suit your study needs.",
    },
    {
      question: "Can I share my flashcard decks with others?",
      answer:
        "Yes! Flashcard sharing is available to all users. You can create a shareable link to let others view and study your decks. Collaborative editing features are coming soon!",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "If you cancel your subscription, you'll maintain access to all features until the end of your billing period. After that, your account will revert to the free tier, but you'll still have access to all your flashcards (though you may need to reduce your deck count to meet free tier limits).",
    },
  ],
}: FAQProps) {
  return (
    <section className="py-24 bg-muted/30" id="faq">
      <div className="px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold lg:text-4xl mb-4">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="bg-background rounded-xl p-8 border border-border shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border last:border-0"
              >
                <AccordionTrigger className="text-left hover:text-primary text-lg py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
