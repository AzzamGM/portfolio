import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import InteractiveGrid from './components/InteractiveGrid';
import BackToTop from './components/BackToTop';
import './App.css';

function App() {
  return (
    <>
      <InteractiveGrid />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <BackgroundParticles />
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
