import { Star } from "lucide-react";

interface TestimonialProps {
  title?: string;
  subtitle?: string;
  testimonials?: {
    name: string;
    role: string;
    quote: string;
    rating: number;
  }[];
}

export function Testimonials({
  title = "What Our Users Say",
  subtitle = "Join thousands of students who've transformed their study habits with Clami",
  testimonials = [
    {
      name: "Emily Carter",
      role: "High School Junior",
      quote:
        "Clami made studying for my AP Biology test way easier. The flashcards were actually fun to use and helped me remember stuff I usually forget, like cell parts and processes.",
      rating: 5,
    },
    {
      name: "Jaden Brooks",
      role: "High School Sophomore",
      quote:
        "I used Clami to make flashcards for history and vocab quizzes. It's cool how it pulls stuff from my notes automatically. The quizzes helped me figure out what I needed to review more.",
      rating: 5,
    },
    {
      name: "Sofia Nguyen",
      role: "High School Senior",
      quote:
        "Studying for finals stressed me out, but Clami kept me on track. The app’s layout is super simple, and it helped me stay focused and actually remember what I studied.",
      rating: 4,
    },
  ],
}: TestimonialProps) {
  return (
    <section className="py-24" id="testimonials">
      <div className="px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold lg:text-4xl mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-8 flex flex-col h-full border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mr-4 ring-2 ring-primary/20">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground flex-grow italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
