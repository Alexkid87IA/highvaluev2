import { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { client } from "../lib/sanityClient";
import imageUrlBuilder from '@sanity/image-url';

// Initialiser le constructeur d'URL d'image Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) {
    // Retourner une image placeholder carrée par défaut si aucune image n'est fournie
    // Pour les émissions, nous voulons un format paysage, donc nous ajusterons cela plus tard si nécessaire
    return "https://via.placeholder.com/400x225?text=Pas+d%27image"; 
  }
  return builder.image(source).auto('format').fit('max').url();
}

// Type pour les données venant de Sanity pour les Émissions
type SanityEmission = {
  _id: string;
  title?: string;
  description?: string;
  coverImage?: any; 
  slug?: { current: string };
  duration?: string;
  publishedAt?: string;
  // videoUrlExternal?: string; // Si on décide de l'utiliser un jour
};

// Type pour les cartes d'émission utilisées dans le composant
type EmissionCard = {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string; 
  slug: string; 
  duration?: string;
  date?: string; 
};

// Props du composant
type VideoSectionProps = {
  title?: string;
  description?: string;
};

export default function VideoSection({
  title = "L'émission", // Titre par défaut pour la section Émission
  description = "Découvrez nos dernières émissions et interviews.", // Description par défaut
}: VideoSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [emissions, setEmissions] = useState<EmissionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmissions = async () => {
      console.log("VideoSection.tsx (Émissions): fetchEmissions CALLED");
      setLoading(true);
      try {
        console.log("VideoSection.tsx (Émissions): Attempting to fetch emission data from Sanity...");
        const sanityData: SanityEmission[] = await client.fetch(
          `*[_type == "emission" && defined(slug.current) && defined(coverImage)]{
            _id,
            title,
            description,
            coverImage,
            slug,
            duration,
            publishedAt
          } | order(publishedAt desc)`
        );
        console.log("VideoSection.tsx (Émissions): Data RECEIVED from Sanity:", sanityData);

        if (!sanityData) {
          console.warn("VideoSection.tsx (Émissions): Sanity data is null or undefined after fetch.");
          throw new Error("Aucune donnée reçue de Sanity pour les émissions.");
        }

        const mappedEmissions: EmissionCard[] = sanityData.map((item) => ({
          id: item._id,
          title: item.title || "Titre non disponible",
          description: item.description || undefined,
          thumbnailUrl: urlFor(item.coverImage), // Utilisation de urlFor pour l'image de couverture
          slug: item.slug?.current ? `/emission/${item.slug.current}` : "#", // Lien interne
          duration: item.duration || undefined,
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : undefined,
        }));
        console.log("VideoSection.tsx (Émissions): Emissions MAPPED:", mappedEmissions);
        
        setEmissions(mappedEmissions);
        setError(null);
      } catch (err: any) {
        console.error("VideoSection.tsx (Émissions): ERROR during fetchEmissions:", err);
        setError(err.message || "Impossible de charger les émissions.");
        setEmissions([]);
      }
      setLoading(false);
      console.log("VideoSection.tsx (Émissions): fetchEmissions COMPLETED, loading set to false.");
    };

    fetchEmissions();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Ajustement pour mieux détecter la fin du scroll
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    // S'assurer que les boutons sont vérifiés après le chargement des émissions
    if (scrollContainer && emissions.length > 0) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      // Vérifier l'état initial des boutons après un court délai pour le rendu
      const timer = setTimeout(checkScrollButtons, 150);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(timer);
      };
    } else if (emissions.length <= 1 && scrollRef.current) {
        // S'il y a une seule ou aucune émission, on ne peut pas scroller à droite
        setCanScrollLeft(false);
        setCanScrollRight(false);
    }
  }, [emissions]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      // Défilement d'une carte à la fois, en supposant une largeur de carte d'environ 300-400px
      // Ou un pourcentage de la largeur visible pour un défilement plus fluide
      const scrollAmount = clientWidth * 0.75; // Défilement de 75% de la largeur visible
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <p className="text-center py-10">Chargement de l'émission...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (emissions.length === 0) {
    return <p className="text-center py-10">Aucune émission à afficher pour le moment.</p>;
  }

  return (
    <section className="relative py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tighter mb-2">{title}</h2>
            <p className="text-hv-white/80 max-w-2xl">{description}</p>
          </div>
          {/* Afficher les boutons seulement s'il y a plus d'éléments que ce qui est visible sans scroll 
              Pour simplifier, on affiche si plus d'un item, la logique de canScrollRight gère la désactivation */}
          {emissions.length > 1 && ( 
            <div className="hidden sm:flex space-x-3">
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
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        >
          {emissions.map((emission) => (
            // Ajustement de la largeur des cartes pour un format paysage et pour en afficher plusieurs
            // w-[calc(50%-12px)] pour 2 par ligne sur mobile, puis plus sur grands écrans
            // ou une largeur fixe plus petite pour un effet carrousel plus prononcé
            <div key={emission.id} className="flex-none w-[320px] sm:w-[360px] md:w-[400px]">
              <div className="group h-full bg-hv-dark/30 backdrop-blur-sm rounded-xl border border-hv-white/10 overflow-hidden flex flex-col">
                {/* Image en format paysage (aspect-video est 16:9) */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={emission.thumbnailUrl} 
                    alt={emission.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/80 via-hv-dark/30 to-transparent" />
                  
                  {/* Lien cliquable sur l'image avec icône Play */}
                  <a href={emission.slug} className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-hv-dark/80 backdrop-blur-sm flex items-center justify-center border-2 border-hv-turquoise shadow-lg transform transition-all duration-300 group-hover:border-hv-blue">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-hv-turquoise group-hover:text-hv-blue transition-colors" fill="currentColor" />
                    </div>
                  </a>
                  
                  {emission.duration && (
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-hv-dark/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-hv-white/10">
                      {emission.duration}
                    </div>
                  )}
                </div>
                
                {/* Contenu textuel de la carte */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tighter leading-tight mb-2 group-hover:text-hv-turquoise transition-colors">
                    <a href={emission.slug}>{emission.title}</a>
                  </h3>
                  {emission.description && (
                    <p className="text-hv-white/80 text-sm line-clamp-3 mb-3 sm:mb-4 flex-grow">{emission.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs sm:text-sm mt-auto pt-3 border-t border-hv-white/10">
                    <div className="flex items-center space-x-3 sm:space-x-4 text-hv-white/60">
                      {emission.date && <span>{emission.date}</span>}
                    </div>
                    <a 
                      href={emission.slug} 
                      className="text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center gap-1 sm:gap-2"
                    >
                      Voir l'émission
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
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

