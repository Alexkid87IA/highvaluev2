import { useState } from "react";
import { motion } from "framer-motion";

type SubcategorySelectorProps = {
  subcategories?: string[];
};

export default function SubcategorySelector({ 
  subcategories = [] 
}: SubcategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap gap-4"
    >
      {subcategories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
          className={`px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
            category === selectedCategory
              ? "bg-gradient-primary text-hv-dark shadow-lg scale-105"
              : "bg-hv-dark-800/30 border border-hv-white-200 text-hv-white-800 hover:border-hv-turquoise hover:text-hv-turquoise"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
}