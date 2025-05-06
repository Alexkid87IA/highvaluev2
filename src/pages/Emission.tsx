import Navbar from '../components/Navbar';
import CategoryHeader from '../components/CategoryHeader';
import VideoSection from '../components/VideoSection';
import VerticalVideos from '../components/VerticalVideos';
import Footer from '../components/Footer';
import NewsletterAfterFooter from '../components/NewsletterAfterFooter';

export default function Emission() {
  const categoryData = {
    title: "L'Émission High Value",
    description: "Des conversations authentiques et inspirantes avec ceux qui façonnent le monde de demain.",
  };

  return (
    <>
      <Navbar />
      <CategoryHeader 
        title={categoryData.title}
        description={categoryData.description}
      />
      <div className="container mx-auto px-4 space-y-20 py-10">
        <VideoSection />
        <VerticalVideos 
          title="Extraits"
          description="Les meilleurs moments de nos conversations"
        />
      </div>
      <Footer />
      <NewsletterAfterFooter />
    </>
  );
}