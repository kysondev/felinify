"use client";

import { Star, Quote } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";

const TestimonialCard = memo(
  ({ testimonial, index }: { testimonial: any; index: number }) => (
    <motion.div
      className="group relative bg-card border border-border rounded-xl p-8 h-full overflow-hidden hover:shadow-lg transition-shadow duration-200"
      role="article"
      aria-labelledby={`testimonial-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/30 transition-colors duration-200">
        <Quote className="w-8 h-8" />
      </div>

      <div className="relative z-10">
        <div className="flex mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/30"
              } transition-colors duration-200`}
            />
          ))}
        </div>

        <blockquote className="mb-6">
          <p
            id={`testimonial-${index}`}
            className="text-muted-foreground leading-relaxed text-sm italic"
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 ring-2 ring-primary/20 group-hover:ring-primary/30 transition-all duration-300">
            <span className="text-primary font-semibold text-base">
              {testimonial.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {testimonial.name}
            </h4>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/20 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-200" />
    </motion.div>
  )
);

TestimonialCard.displayName = "TestimonialCard";

export function Testimonials() {
  const testimonials = [
    {
      name: "Emily Carter",
      role: "High School Junior",
      quote:
        "Felinify made studying for my AP Biology test way easier. The flashcards were actually fun to use and helped me remember stuff I usually forget, like cell parts and processes.",
      rating: 5,
    },
    {
      name: "Jaden Brooks",
      role: "High School Sophomore",
      quote:
        "I used Felinify to make flashcards for history and vocab quizzes. It's cool how it pulls stuff from my notes automatically. The quizzes helped me figure out what I needed to review more.",
      rating: 5,
    },
    {
      name: "Sofia Nguyen",
      role: "High School Senior",
      quote:
        "Studying for finals stressed me out, but Felinify kept me on track. The app's layout is super simple, and it helped me stay focused and actually remember what I studied.",
      rating: 4,
    },
  ];
  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="testimonials-heading"
            className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4 text-foreground"
          >
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg leading-relaxed">
            Join thousands of students who've transformed their study habits with Felinify
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`testimonial-${index}`}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
