import Navbar from '../components/Navbar';
import CategoryHeader from '../components/CategoryHeader';
import SubcategorySelector from '../components/SubcategorySelector';
import CategoryFeatured from '../components/CategoryFeatured';
import CategoryContentFeed from '../components/CategoryContentFeed';
import Footer from '../components/Footer';
import NewsletterAfterFooter from '../components/NewsletterAfterFooter';

export default function Business() {
  const categoryData = {
    title: "High Value Business",
    description: "Stratégies et insights pour entrepreneurs ambitieux qui veulent avoir un impact.",
    subcategories: ["Startups", "Marketing", "Finance", "Leadership", "Innovation"],
  };

  return (
    <>
      <Navbar />
      <CategoryHeader 
        title={categoryData.title}
        description={categoryData.description}
      />
      <div className="container mx-auto px-4 space-y-20 py-10">
        <SubcategorySelector subcategories={categoryData.subcategories} />
        <CategoryFeatured />
        <CategoryContentFeed />
      </div>
      <Footer />
      <NewsletterAfterFooter />
    </>
  );
}