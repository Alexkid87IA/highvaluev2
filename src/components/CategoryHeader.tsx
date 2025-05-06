import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type CategoryHeaderProps = {
  title?: string;
  description?: string;
  featuredArticle?: {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    slug: string;
  };
  quote?: {
    text: string;
    author: string;
    role?: string;
  };
  latestArticles?: {
    title: string;
    excerpt: string;
    category: string;
    slug: string;
    date: string;
  }[];
};

export default function CategoryHeader({
  title = "High Value Mental",
  description = "Développez votre potentiel et votre résilience mentale grâce à nos contenus exclusifs.",
  featuredArticle = {
    title: "Comment développer une résilience mentale à toute épreuve",
    excerpt: "Les stratégies des athlètes de haut niveau pour renforcer votre mental et atteindre vos objectifs les plus ambitieux.",
    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
    category: "Mental",
    slug: "/article-principal",
  },
  quote = {
    text: "Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte.",
    author: "Winston Churchill",
    role: "Homme d'État",
  },
  latestArticles = [
    {
      title: "Les clés du leadership authentique",
      excerpt: "Découvrez comment développer votre propre style de leadership.",
      category: "Business",
      slug: "/article/leadership-authentique",
      date: "Il y a 2 heures",
    },
    {
      title: "Méditation : guide complet",
      excerpt: "Un parcours étape par étape pour intégrer la méditation.",
      category: "Mental",
      slug: "/article/meditation-debutants",
      date: "Il y a 4 heures",
    },
  ],
}: CategoryHeaderProps) {
  return (
    <section className="pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-8">
            <article className="group h-full">
              <a href={featuredArticle.slug} className="block h-full">
                <div className="relative aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-dark"></div>
                  <span className="absolute top-6 left-6 bg-gradient-primary px-4 py-2 text-sm font-medium text-hv-dark rounded-lg">
                    {featuredArticle.category}
                  </span>
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight mb-4 text-white group-hover:text-hv-turquoise transition-colors">
                        {title}
                      </h1>
                      <p className="text-hv-white-800 text-xl mb-4 max-w-3xl">
                        {description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </a>
            </article>
          </div>

          {/* Quote of the Day */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-full hv-card p-8 flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Citation inspirante</h3>
                <div className="w-12 h-1 bg-gradient-primary rounded-full"></div>
              </div>
              <blockquote className="flex-grow flex flex-col justify-center">
                <p className="text-2xl font-medium leading-relaxed text-hv-white-900 mb-6">
                  "{quote.text}"
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-lg font-semibold text-hv-turquoise">
                      {quote.author}
                    </span>
                    {quote.role && (
                      <span className="text-hv-white-600">{quote.role}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </div>

          {/* Latest Articles */}
          <div className="lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hv-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-hv-white-100">
                Derniers articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestArticles.map((article, index) => (
                  <article key={index} className="group">
                    <a href={article.slug} className="block">
                      <span className="inline-block bg-gradient-primary px-2 py-1 text-xs font-medium text-hv-dark rounded mb-3">
                        {article.category}
                      </span>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-hv-turquoise transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-hv-white-700 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-hv-white-500">{article.date}</span>
                        <span className="text-sm text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center">
                          Lire
                          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}