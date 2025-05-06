import Navbar from '../components/Navbar';
import CategoryHeader from '../components/CategoryHeader';
import SubcategorySelector from '../components/SubcategorySelector';
import CategoryFeatured from '../components/CategoryFeatured';
import CategoryContentFeed from '../components/CategoryContentFeed';
import Footer from '../components/Footer';
import NewsletterAfterFooter from '../components/NewsletterAfterFooter';

export default function Society() {
  const categoryData = {
    title: "High Value Society",
    description: "Analyses et réflexions sur les enjeux qui façonnent notre monde.",
    subcategories: ["Technologie", "Économie", "Culture", "Environnement", "Politique"],
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