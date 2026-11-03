
import { Search, CalendarCheck, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find Your Studio",
    description:
      "Explore different creative studios and choose the perfect space for your needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Book Your Space",
    description:
      "Select your preferred date and time and submit your booking request.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Create Something Amazing",
    description:
      "Visit your booked studio and bring your creative vision to life.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
<section
  id="how-it-works"
  className="py-20 px-5 bg-white dark:bg-gray-900"
>      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-600 font-semibold mb-2">
            SIMPLE & EASY
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            How Booking Works
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Book your perfect creative space in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="text-center p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:border-violet-500 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center">
                    <Icon size={36} />
                  </div>
                </div>

                <p className="text-violet-600 font-bold mb-2">
                  STEP {step.number}
                </p>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
