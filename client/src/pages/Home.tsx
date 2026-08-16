import Hero from "../components/Hero";
import Blogs from "../components/Blogs";
import About from "../components/About";
import OurServices from "../components/OurServices";
import Subscribe from "../components/Subscribe";
import Partnerships from "../components/Partnerships";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Lando Travels | Sri Lanka Travel Agency"
        description="Lando Travels is a trusted Sri Lankan travel agency offering inbound tours, outbound travel packages, corporate travel services, air ticketing, visa processing, and travel assistance."
        canonical="https://www.landotravels.com/"
        image="/logo-white.webp"
      />

      <div>
        <Hero />
        <Blogs />
        <About />
        <OurServices />
        <Subscribe />
        <Partnerships />
      </div>
    </>
  );
};

export default Home;