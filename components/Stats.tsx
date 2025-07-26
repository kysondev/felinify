import { Clock, Users, BookOpen, Award } from "lucide-react";

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface StatsProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
}

export function Stats({
  title = "Trusted by Students Worldwide",
  subtitle = "Join thousands who are already studying smarter with Lumix",
  stats = [
    {
      value: "6+",
      label: "Active Users",
      icon: <Users className="w-6 h-6" />,
    },
    {
      value: "150+",
      label: "Flashcards Created",
      icon: <BookOpen className="w-6 h-6" />,
    },
    {
      value: "5+",
      label: "Study Hours",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      value: "94%",
      label: "Improved Grades",
      icon: <Award className="w-6 h-6" />,
    },
  ],
}: StatsProps) {
  return (
    <section className="pb-20">
      <div className="px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold lg:text-4xl mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4 text-primary">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 text-primary">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
