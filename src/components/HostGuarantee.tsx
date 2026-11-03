
import { ShieldCheck, CalendarCheck, Headset } from "lucide-react";

const features = [
  {
    title: "Verified Studios",
    description:
      "Explore trusted and quality-checked creative spaces for your projects.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Booking",
    description:
      "Enjoy a simple and reliable booking experience with confidence.",
    icon: CalendarCheck,
  },
  {
    title: "Creator Support",
    description:
      "We're here to support your creative journey whenever you need us.",
    icon: Headset,
  },
];

export default function HostGuarantee() {
  return (
<section
  id="about"
  className="py-20 px-5 bg-gray-50 dark:bg-gray-950"
>      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet-600 font-semibold mb-2">
            YOUR TRUST MATTERS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Host Guarantee & Creator Support
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            A better, safer and more supportive space for every creator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center hover:shadow-xl hover:border-violet-500 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-violet-100 dark:bg-violet-950 text-violet-600 flex items-center justify-center">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
