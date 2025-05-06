import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { client } from "../lib/sanityClient"; 
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) {
    // Retourner une image placeholder qui respecte le ratio 9/16
    return "https://via.placeholder.com/270x480?text=Pas+d%27image"; 
  }
  return builder.image(source) .auto('format').fit('max').url();
}

type SanityAmuseBouche = {
  _id: string;
  title?: string;
  description?: string;
  coverImage?: any; 
  videoUrl?: string; 
  duration?: string;
  slug?: { current: string };
  publishedAt?: string;
};

type Video = {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string; 
  videoUrl: string; 
  internalUrl: string; 
  duration?: string;
  date?: string; 
};

type VideoSectionProps = {
  title?: string;
  description?: string;
};

export default function VideoSection({
  title = "Amuses-bouches",
  description = "Des conseils percutants en format court",
}: VideoSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmuseBouches = async () => {
      setLoading(true);
      try {
        const sanityData: SanityAmuseBouche[] = await client.fetch(
          `*[_type == "amuseBouche" && defined(slug.current) && defined(coverImage)]{
            _id,
            title,
            description,
            coverImage,
            videoUrl,
            duration,
            slug,
            publishedAt
          } | order(publishedAt desc)`
        );

        const mappedVideos: Video[] = sanityData.map((item) => ({
          id: item._id,
          title: item.title || "Titre non disponible",
          description: item.description || undefined,
          thumbnailUrl: urlFor(item.coverImage),
          videoUrl: item.videoUrl || "#",
          internalUrl: item.slug?.current ? `/amuse-bouche/${item.slug.current}` : "#",
          duration: item.duration || undefined,
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : undefined,
        }));
        
        setVideos(mappedVideos);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Impossible de charger les amuses-bouches.");
        setVideos([]);
      }
      setLoading(false);
    };

    fetchAmuseBouches();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && videos.length > 0) {
      checkScrollButtons();
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [videos]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 280; // Ajuster si la largeur de carte change
      const scrollAmount = cardWidth * 1.5; // Défile d'une carte et demie pour mieux voir la suivante
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <p className="text-center py-10">Chargement des amuses-bouches...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (videos.length === 0) {
    return <p className="text-center py-10">Aucun amuse-bouche à afficher pour le moment.</p>;
  }

  return (
    <section className="relative">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter mb-2">{title}</h2>
          <p className="text-hv-white/80 max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="relative">
        {videos.length > 1 && (
          <div className="absolute -top-14 right-0 z-10 hidden sm:flex space-x-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-3 rounded-full bg-hv-dark/80 border border-hv-white/10 text-hv-white/80 hover:text-hv-white hover:border-hv-turquoise disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-hv-dark/80 border border-hv-white/10 text-hv-white/80 hover:text-hv-white hover:border-hv-turquoise disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth pt-2"
        >
          {videos.map((video) => (
            // Ajustement de la largeur des cartes pour un format plus vertical
            // La largeur est légèrement réduite pour compenser la hauteur accrue et permettre le défilement
            <div key={video.id} className="flex-none w-[240px] sm:w-[260px] md:w-[280px]"> 
              <div className="group h-full bg-hv-dark/30 backdrop-blur-sm rounded-xl border border-hv-white/10 overflow-hidden flex flex-col">
                {/* MODIFICATION ICI pour l'aspect ratio 9/16 */}
                <div className="relative w-full overflow-hidden aspect-[9/16]">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/90 via-hv-dark/40 to-transparent" />
                  <a href={video.internalUrl} className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-hv-dark/80 backdrop-blur-sm flex items-center justify-center border-2 border-hv-turquoise shadow-lg transform transition-all duration-300 group-hover:border-hv-blue">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-hv-turquoise group-hover:text-hv-blue transition-colors" fill="currentColor" />
                    </div>
                  </a>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-hv-dark/90 backdrop-blur-sm px-2 py-1 text-xs font-medium rounded-lg border border-hv-white/10">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-semibold tracking-tighter leading-tight mb-1 sm:mb-2 group-hover:text-hv-turquoise transition-colors">
                    <a href={video.internalUrl}>{video.title}</a>
                  </h3>
                  {video.description && (
                    <p className="text-hv-white/80 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">{video.description}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2 sm:space-x-3 text-hv-white/60">
                      {video.date && <span>{video.date}</span>}
                    </div>
                    <a 
                      href={video.internalUrl} 
                      className="text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center gap-1"
                    >
                      Regarder
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
