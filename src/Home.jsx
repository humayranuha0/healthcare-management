import Hero from "./Hero";
import Services from "./Services";
import AboutSection from "./About";
import Blog from "./Blog";
import Doctors from "./Doctor";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Hero />

      <AboutSection />
      <Services />
      <Doctors />
      <Blog />
      <Contact />
    </div>
  );
};

export default Home;
