import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "../lib/sanityClient"; // Assurez-vous que ce chemin est correct
import imageUrlBuilder from '@sanity/image-url';

// Initialiser le constructeur d'URL d'image Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  if (!source || !source.asset) {
    return "https://via.placeholder.com/400x225?text=Pas+d%27image";
  }
  return builder.image(source) .auto('format').fit('max').url();
}

console.log("AllArticles.tsx: Script loaded");

// Définition du type pour les articles venant de Sanity
type SanityArticle = {
  _id: string;
  title?: string;
  slug?: { current: string };
  mainImage?: any;
  categories?: Array<{ title?: string }>;
  publishedAt?: string;
  excerpt?: string;
};

// Définition du type pour les articles utilisés dans le composant
type Article = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  category: string;
  date: string;
};

export default function AllArticles() {
  console.log("AllArticles.tsx: Component RENDERED");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AllArticles.tsx: useEffect TRIGGERED");
    const fetchArticles = async () => {
      console.log("AllArticles.tsx: fetchArticles CALLED");
      setLoading(true);
      try {
        console.log("AllArticles.tsx: Attempting to fetch data from Sanity...");
        const sanityData: SanityArticle[] = await client.fetch(
          `*[_type == "post" && defined(slug.current) && defined(mainImage)]{
            _id,
            title,
            slug,
            mainImage,
            "categories": categories[]->title,
            publishedAt,
            excerpt
          } | order(publishedAt desc)`
        );
        console.log("AllArticles.tsx: Data RECEIVED from Sanity:", sanityData);

        if (!sanityData) {
          console.warn("AllArticles.tsx: Sanity data is null or undefined after fetch.");
          throw new Error("Aucune donnée reçue de Sanity.");
        }

        const mappedArticles: Article[] = sanityData.map((item) => ({
          id: item._id,
          title: item.title || "Titre non disponible",
          excerpt: item.excerpt || "Extrait non disponible. Configurez le champ 'excerpt' dans Sanity.",
          slug: item.slug?.current ? `/article/${item.slug.current}` : "/article-manquant",
          image: urlFor(item.mainImage), // Utilisation de urlFor
          category: item.categories && item.categories.length > 0 ? item.categories.join(', ') : "Non catégorisé",
          date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : "Date inconnue",
        }));
        console.log("AllArticles.tsx: Articles MAPPED:", mappedArticles);
        
        setArticles(mappedArticles);
        setError(null);
      } catch (err: any) {
        console.error("AllArticles.tsx: ERROR during fetchArticles:", err);
        setError(err.message || "Impossible de charger les articles.");
        setArticles([]);
      }
      setLoading(false);
      console.log("AllArticles.tsx: fetchArticles COMPLETED, loading set to false.");
    };

    fetchArticles();
  }, []);

  if (loading) {
    console.log("AllArticles.tsx: RENDERING Loading state");
    return <p className="text-center mt-20">Chargement des articles...</p>;
  }

  if (error) {
    console.log("AllArticles.tsx: RENDERING Error state:", error);
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  if (articles.length === 0) {
    console.log("AllArticles.tsx: RENDERING No articles state");
    return <p className="text-center mt-20">Aucun article à afficher pour le moment.</p>;
  }

  console.log("AllArticles.tsx: RENDERING Articles list, count:", articles.length);
  return (
    <section className="mt-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter mb-2">Tous les articles</h2>
          <p className="text-hv-white/80">Les derniers contenus publiés sur High Value</p>
        </div>
        <a 
          href="/articles"
          className="hidden sm:flex items-center text-hv-turquoise hover:text-hv-blue transition-colors"
        >
          Voir tous les articles
          <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="group">
            <a href={article.slug}>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                <img
                  src={article.image} // Ceci utilisera l'URL de Sanity
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-hv-blue px-3 py-1 text-xs font-medium text-hv-white rounded">
                    {article.category}
                  </span>
                </div>
              </div>
            </a>
            
            <h3 className="text-xl font-semibold tracking-tighter leading-tight mb-2 group-hover:text-hv-turquoise transition-colors">
              <a href={article.slug}>{article.title}</a>
            </h3>
            <p className="text-hv-white/80 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-hv-white/60">{article.date}</span>
              <a 
                href={article.slug} 
                className="text-sm text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center"
              >
                Lire l'article
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <a 
          href="/articles"
          className="block w-full py-3 text-center text-hv-turquoise border border-hv-turquoise/20 rounded-lg hover:bg-hv-turquoise/10 transition-colors"
        >
          Voir tous les articles
        </a>
      </div>
    </section>
  );
}
