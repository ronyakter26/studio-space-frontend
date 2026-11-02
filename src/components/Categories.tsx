
import {
  Camera,
  Mic,
  Music,
  Video,
  Shirt,
  Users,
} from "lucide-react";

const categories = [
  {
    name: "Photography",
    description: "Professional photo shoots",
    icon: Camera,
    count: "12+ Studios",
  },
  {
    name: "Podcast",
    description: "Record your next podcast",
    icon: Mic,
    count: "8+ Studios",
  },
  {
    name: "Music Production",
    description: "Create amazing music",
    icon: Music,
    count: "10+ Studios",
  },
  {
    name: "Video Production",
    description: "Bring your ideas to life",
    icon: Video,
    count: "9+ Studios",
  },
  {
    name: "Fashion",
    description: "Fashion and creative shoots",
    icon: Shirt,
    count: "7+ Studios",
  },
  {
    name: "Dance & Rehearsal",
    description: "Practice and perform",
    icon: Users,
    count: "6+ Studios",
  },
];

export default function Categories() {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-violet-600 font-semibold mb-2">
            EXPLORE CATEGORIES
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Find the Perfect Studio
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Explore creative spaces for every type of project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-7 hover:border-violet-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-600 mb-5 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {category.description}
                </p>

                <span className="text-violet-600 text-sm font-semibold">
                  {category.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
