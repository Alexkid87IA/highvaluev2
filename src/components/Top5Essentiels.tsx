import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient"; // Assurez-vous que ce chemin est correct
import { ArrowRight } from "lucide-react";

// Type pour les données venant de Sanity pour les Essentiels
type SanityEssentiel = {
  _id: string;
  title?: string;
  description?: string;
  linkedContent?: {
    _type: string; // 'post', 'amuseBouche', 'emission'
    slug?: { current: string };
  };
  order?: number;
};

// Type pour les essentiels utilisés dans le composant
type EssentielItem = {
  id: string;
  title: string;
  description: string;
  slug: string; // Slug final pour le lien
  order: number;
};

// Props du composant
type Top5EssentielsProps = {
  sectionTitle?: string;
  sectionDescription?: string;
};

export default function Top5Essentiels({
  sectionTitle = "5 essentiels à ne pas manquer",
  sectionDescription = "Une sélection de contenus fondamentaux pour vous aider à progresser",
}: Top5EssentielsProps) {
  const [essentiels, setEssentiels] = useState<EssentielItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEssentiels = async () => {
      console.log("Top5Essentiels.tsx: fetchEssentiels CALLED");
      setLoading(true);
      try {
        console.log("Top5Essentiels.tsx: Attempting to fetch essentiel data from Sanity...");
        // Récupérer les 5 premiers essentiels, triés par le champ 'order'
        const sanityData: SanityEssentiel[] = await client.fetch(
          `*[_type == "essentiel"]{
            _id,
            title,
            description,
            linkedContent{
              _type,
              slug
            },
            order
          } | order(order asc)[0...5]`        
        );
        console.log("Top5Essentiels.tsx: Data RECEIVED from Sanity:", sanityData);

        if (!sanityData) {
          console.warn("Top5Essentiels.tsx: Sanity data is null or undefined after fetch.");
          throw new Error("Aucune donnée reçue de Sanity pour les essentiels.");
        }

        const mappedEssentiels: EssentielItem[] = sanityData.map((item) => {
          let basePath = "/";
          if (item.linkedContent?._type === "post") {
            basePath = "/article/";
          } else if (item.linkedContent?._type === "amuseBouche") {
            basePath = "/amuse-bouche/";
          } else if (item.linkedContent?._type === "emission") {
            basePath = "/emission/";
          }

          return {
            id: item._id,
            title: item.title || "Titre non disponible",
            description: item.description || "Description non disponible",
            slug: item.linkedContent?.slug?.current ? `${basePath}${item.linkedContent.slug.current}` : "#",
            order: item.order || 0, // Utiliser 0 si l'ordre n'est pas défini, bien que le tri devrait gérer cela
          };
        });
        console.log("Top5Essentiels.tsx: Essentiels MAPPED:", mappedEssentiels);
        
        setEssentiels(mappedEssentiels);
        setError(null);
      } catch (err: any) {
        console.error("Top5Essentiels.tsx: ERROR during fetchEssentiels:", err);
        setError(err.message || "Impossible de charger les essentiels.");
        setEssentiels([]);
      }
      setLoading(false);
      console.log("Top5Essentiels.tsx: fetchEssentiels COMPLETED, loading set to false.");
    };

    fetchEssentiels();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Chargement des essentiels...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (essentiels.length === 0) {
    return <p className="text-center py-10">Aucun essentiel à afficher pour le moment.</p>;
  }

  return (
    <section className="py-12 md:py-16 bg-hv-blue-darker rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-semibold tracking-tighter text-hv-white mb-2">{sectionTitle}</h2>
          <p className="text-hv-white/80 max-w-2xl mx-auto sm:mx-0">{sectionDescription}</p>
        </div>

        <div className="space-y-8">
          {essentiels.map((essentiel, index) => (
            <div key={essentiel.id} className="flex flex-col sm:flex-row items-start">
              <div className="text-5xl font-bold text-hv-turquoise mr-6 mb-2 sm:mb-0">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-hv-white mb-1">
                  <a href={essentiel.slug} className="hover:text-hv-turquoise transition-colors">
                    {essentiel.title}
                  </a>
                </h3>
                <p className="text-hv-white/70 text-sm mb-3">
                  {essentiel.description}
                </p>
                <a 
                  href={essentiel.slug} 
                  className="inline-flex items-center text-sm text-hv-turquoise hover:text-hv-blue transition-colors font-medium group"
                >
                  Lire la news
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

