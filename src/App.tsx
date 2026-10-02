import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Masthead } from './components/Masthead';
import { Nav } from './components/Nav';
import { ScrollRail } from './components/ScrollRail';
import { Work } from './components/Work';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <ScrollRail />
        <main id="main">
          <Masthead />
          <Work />
          <Experience />
          <About />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
