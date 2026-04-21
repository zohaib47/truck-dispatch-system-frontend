
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import RouteMap from './RouteMap';
import ServicesSection from './Services';
import ClientsSection from './ClientSection';
import IntelligenceSection from './IntelligenceSection';
import LandingPage from './LandingPage';

const Home = () => {
  




  return (

    <div>
      <LandingPage />
      <ServicesSection />
      <IntelligenceSection />
      <ClientsSection />
      <RouteMap />
    </div>
  );
};

export default Home;
