import Navbar from '../components/Navbar';
import HeroThreeColumns from '../components/HeroThreeColumns';
import VerticalVideos from '../components/VerticalVideos';
import AllArticles from '../components/AllArticles';
import EditorialUniverses from '../components/EditorialUniverses';
import VideoSection from '../components/VideoSection';
import Top5Essentiels from '../components/Top5Essentiels';
import Footer from '../components/Footer';
import NewsletterAfterFooter from '../components/NewsletterAfterFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 space-y-20 py-10">
        <HeroThreeColumns />
        <VerticalVideos />
        <AllArticles />
        <EditorialUniverses />
        <VideoSection />
        <Top5Essentiels />
      </main>
      <Footer />
      <NewsletterAfterFooter />
    </>
  );
}