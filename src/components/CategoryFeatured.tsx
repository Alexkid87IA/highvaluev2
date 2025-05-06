import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryFeatured() {
  return (
    <section className="relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
              alt="Featured article" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-dark opacity-60 group-hover:opacity-50 transition-opacity duration-300" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="mb-4">
                <span className="inline-block bg-gradient-primary px-4 py-2 rounded-full text-sm font-medium text-hv-dark">
                  À la une
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-hv-turquoise transition-colors">
                L'innovation au service de l'humain
              </h3>
              <p className="text-hv-white-800 mb-6 line-clamp-2">
                Comment les nouvelles technologies transforment notre façon de vivre et de travailler
              </p>
              <button className="hv-button-primary w-fit">
                Lire l'article
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="group cursor-pointer hv-card p-6 hover:border-hv-turquoise transition-colors duration-300"
            >
              <div className="flex gap-6 items-start">
                <div className="relative w-32 h-32 overflow-hidden rounded-lg flex-shrink-0">
                  <img 
                    src={`https://images.pexels.com/photos/318${item}291/pexels-photo-318${item}291.jpeg`}
                    alt={`Featured item ${item}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-sm text-hv-turquoise mb-2">Catégorie</span>
                  <h4 className="text-xl font-semibold group-hover:text-hv-turquoise transition-colors">
                    Les stratégies essentielles pour 2025
                  </h4>
                  <p className="text-hv-white-700 mt-2 line-clamp-2">
                    Découvrez les approches innovantes qui façonnent le futur du business
                  </p>
                  <div className="flex items-center mt-4 text-hv-turquoise group-hover:text-hv-blue transition-colors">
                    Lire plus
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}