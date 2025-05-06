import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryContentFeed() {
  const articles = [
    {
      id: 1,
      title: "L'évolution du marketing digital",
      excerpt: "Découvrez les dernières tendances et stratégies du marketing digital pour 2025",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      category: "Marketing"
    },
    {
      id: 2,
      title: "Pratiques business durables",
      excerpt: "Comment les entreprises s'adaptent aux défis environnementaux",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      category: "Innovation"
    },
    {
      id: 3,
      title: "Leadership en équipe distante",
      excerpt: "Meilleures pratiques pour gérer une équipe à distance",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      category: "Leadership"
    },
    {
      id: 4,
      title: "Planification financière pour startups",
      excerpt: "Stratégies financières essentielles pour les nouvelles entreprises",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      category: "Finance"
    },
    {
      id: 5,
      title: "L'IA dans le business moderne",
      excerpt: "Comment l'intelligence artificielle transforme les industries",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      category: "Technologie"
    },
    {
      id: 6,
      title: "Construire une culture d'entreprise forte",
      excerpt: "Créer un environnement qui favorise le succès",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      category: "Culture"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group hv-card overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-dark opacity-60 group-hover:opacity-50 transition-opacity" />
              <div className="absolute top-4 left-4">
                <span className="inline-block bg-gradient-primary px-3 py-1.5 rounded-full text-sm font-medium text-hv-dark">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-hv-turquoise transition-colors">
                {article.title}
              </h3>
              <p className="text-hv-white-700 mb-4 line-clamp-2">
                {article.excerpt}
              </p>
              <div className="flex items-center text-hv-turquoise group-hover:text-hv-blue transition-colors">
                Lire l'article
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}