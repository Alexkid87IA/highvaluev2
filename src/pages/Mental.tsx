import Navbar from '../components/Navbar';
import CategoryHeader from '../components/CategoryHeader';
import SubcategorySelector from '../components/SubcategorySelector';
import CategoryFeatured from '../components/CategoryFeatured';
import CategoryContentFeed from '../components/CategoryContentFeed';
import Footer from '../components/Footer';
import NewsletterAfterFooter from '../components/NewsletterAfterFooter';

export default function Mental() {
  const categoryData = {
    title: "High Value Mental",
    description: "Développez votre potentiel et votre résilience mentale grâce à nos contenus exclusifs.",
    subcategories: ["Mindset", "Productivité", "Méditation", "Habitudes", "Stress"],
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