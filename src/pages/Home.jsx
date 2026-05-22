// pages/Home.jsx — Main page assembling all sections

import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home({ isRevealing }) {
  return (
    <main>
      <Hero isRevealing={isRevealing} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
