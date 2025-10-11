import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "How does Felinify's AI flashcard generation work?",
      answer:
        "Felinify uses advanced AI to analyze your notes or documents and extract key concepts. It then creates flashcards with questions on one side and answers on the other. The AI is trained to identify important information and create effective study materials tailored to your content.",
    },
    {
      question: "Can I use Felinify on multiple devices?",
      answer:
        "Yes! Felinify is accessible on any device with a web browser. Your flashcards and progress sync automatically across all your devices, so you can study seamlessly whether you're on your laptop, tablet, or smartphone.",
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
  ];
  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="faq-heading"
            className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-foreground"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Everything you need to know about Felinify
          </p>
        </div>

        {/* FAQ content */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Common Questions
            </h3>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="border-b border-border/50 last:border-0 group"
              >
                <AccordionTrigger className="text-left hover:text-primary text-base sm:text-lg py-4 sm:py-5 font-medium transition-colors duration-200 group-hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 leading-relaxed text-sm sm:text-base">
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
