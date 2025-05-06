import { ArrowRight, Quote } from "lucide-react";

type ArticlePreview = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  category?: string;
  date?: string;
};

type HeroThreeColumnsProps = {
  mainArticle?: ArticlePreview;
  quoteOfTheDay?: {
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

export default function HeroThreeColumns({
  mainArticle = {
    id: "main",
    title: "Comment développer une résilience mentale à toute épreuve",
    excerpt: "Les stratégies des athlètes de haut niveau pour renforcer votre mental et atteindre vos objectifs les plus ambitieux.",
    slug: "/article-principal",
    image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
    category: "Mental",
    date: "Aujourd'hui",
  },
  quoteOfTheDay = {
    text: "Le succès n'est pas final, l'échec n'est pas fatal. C'est le courage de continuer qui compte.",
    author: "Winston Churchill",
    role: "Homme d'État",
  },
  latestArticles = [
    {
      title: "Les clés du leadership authentique",
      excerpt: "Découvrez comment développer votre propre style de leadership et inspirer vos équipes.",
      category: "Business",
      slug: "/article/leadership-authentique",
      date: "Il y a 2 heures",
    },
    {
      title: "Méditation : guide complet pour débutants",
      excerpt: "Un parcours étape par étape pour intégrer la méditation dans votre quotidien.",
      category: "Mental",
      slug: "/article/meditation-debutants",
      date: "Il y a 4 heures",
    },
    {
      title: "Crypto-monnaies : comprendre les fondamentaux",
      excerpt: "Les bases essentielles pour comprendre la blockchain et son potentiel.",
      category: "Business",
      slug: "/article/crypto-fondamentaux",
      date: "Il y a 6 heures",
    },
    {
      title: "L'art de la communication non-verbale",
      excerpt: "Comment utiliser le langage corporel pour améliorer vos interactions.",
      category: "Mental",
      slug: "/article/communication-non-verbale",
      date: "Il y a 8 heures",
    },
  ],
}: HeroThreeColumnsProps) {
  return (
    <section className="pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Main Featured Article */}
        <div className="lg:col-span-8">
          <article className="group h-full">
            <a href={mainArticle.slug} className="block h-full">
              <div className="relative aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-xl">
                <img
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/90 via-hv-dark/40 to-transparent"></div>
                {mainArticle.category && (
                  <span className="absolute top-6 left-6 bg-hv-blue px-4 py-2 text-sm font-medium text-hv-white rounded-lg">
                    {mainArticle.category}
                  </span>
                )}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter leading-tight mb-4 text-white group-hover:text-hv-turquoise transition-colors">
                    {mainArticle.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-4 line-clamp-2 max-w-3xl">
                    {mainArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">{mainArticle.date}</span>
                    <span className="inline-flex items-center text-hv-turquoise group-hover:text-hv-blue transition-colors">
                      Lire l'article
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>

        {/* Quote of the Day */}
        <div className="lg:col-span-4">
          <div className="h-full bg-hv-dark/30 backdrop-blur-sm rounded-xl border border-hv-white/10 p-8 flex flex-col">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Quote className="w-5 h-5 text-hv-turquoise" />
                Citation du jour
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-hv-blue to-hv-turquoise rounded-full"></div>
            </div>
            <blockquote className="flex-grow flex flex-col justify-center">
              <p className="text-2xl font-medium leading-relaxed text-white/90 mb-6">
                "{quoteOfTheDay.text}"
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-lg font-semibold text-hv-turquoise">
                    {quoteOfTheDay.author}
                  </span>
                  {quoteOfTheDay.role && (
                    <span className="text-white/60">{quoteOfTheDay.role}</span>
                  )}
                </cite>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Latest Articles Section */}
        <div className="lg:col-span-12">
          <div className="bg-hv-dark/30 backdrop-blur-sm p-6 rounded-xl border border-hv-white/10">
            <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-hv-white/10">
              Derniers articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestArticles.map((article, index) => (
                <article key={index} className="group">
                  <a href={article.slug} className="block">
                    <span className="inline-block bg-hv-blue/90 px-2 py-1 text-xs font-medium text-hv-white rounded mb-3">
                      {article.category}
                    </span>
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-hv-turquoise transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-white/70 mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">{article.date}</span>
                      <span className="text-sm text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center">
                        Lire
                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}