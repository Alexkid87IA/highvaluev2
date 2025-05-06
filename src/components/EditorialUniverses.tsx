import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

type Universe = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  image?: string;
  color?: string;
  ctaText?: string;
};

const defaultUniverses: Universe[] = [
  {
    id: "story",
    title: "High Value Story",
    description: "Des histoires inspirantes qui changent les perspectives",
    slug: "/story",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    color: "from-hv-blue to-hv-turquoise",
    ctaText: "Explorer",
  },
  {
    id: "business",
    title: "High Value Business",
    description: "Stratégies et insights pour entrepreneurs ambitieux",
    slug: "/business",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    color: "from-hv-blue to-hv-turquoise",
    ctaText: "Explorer",
  },
  {
    id: "mental",
    title: "High Value Mental",
    description: "Développez votre potentiel et votre résilience mentale",
    slug: "/mental",
    image: "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg",
    color: "from-hv-blue to-hv-turquoise",
    ctaText: "Explorer",
  },
  {
    id: "society",
    title: "High Value Society",
    description: "Analyses sociales pour mieux comprendre notre monde",
    slug: "/society",
    image: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg",
    color: "from-hv-blue to-hv-turquoise",
    ctaText: "Explorer",
  },
];

export default function EditorialUniverses() {
  const [showMore, setShowMore] = useState(false);
  const displayedUniverses = showMore ? defaultUniverses : defaultUniverses.slice(0, 4);
  const hasMoreUniverses = defaultUniverses.length > 4;

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter mb-2">Nos univers</h2>
          <p className="text-hv-white/80">Explorez les différentes facettes de High Value</p>
        </div>
        {hasMoreUniverses && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="hidden sm:flex items-center gap-2 text-hv-turquoise hover:text-hv-white transition-colors"
          >
            {showMore ? "Voir moins" : "Voir plus"}
            <ChevronRight className={`w-5 h-5 transition-transform ${showMore ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {displayedUniverses.map((universe) => (
          <a 
            href={universe.slug} 
            key={universe.id}
            className="group relative block"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                {universe.image ? (
                  <img
                    src={universe.image}
                    alt={universe.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${universe.color || 'from-hv-blue to-hv-turquoise'}`}></div>
                )}
              </div>
              
              <div className="absolute inset-0 flex flex-col">
                <div className="h-2/3 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hv-dark/20 to-hv-dark/90"></div>
                </div>
                
                <div className="h-1/3 relative bg-hv-dark/80 backdrop-blur-sm p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tighter mb-2 group-hover:text-hv-turquoise transition-colors">
                      {universe.title}
                    </h3>
                    {universe.description && (
                      <p className="text-hv-white/90 text-sm line-clamp-2">
                        {universe.description}
                      </p>
                    )}
                  </div>
                  
                  <span className="text-hv-turquoise font-medium text-sm inline-flex items-center mt-2">
                    {universe.ctaText || "Explorer"} 
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {hasMoreUniverses && (
        <div className="mt-8 sm:hidden">
          <button
            onClick={() => setShowMore(!showMore)}
            className="block w-full py-3 text-center text-hv-turquoise border border-hv-turquoise/20 rounded-lg hover:bg-hv-turquoise/10 transition-colors"
          >
            {showMore ? "Voir moins" : "Voir plus"}
          </button>
        </div>
      )}
    </section>
  );
}