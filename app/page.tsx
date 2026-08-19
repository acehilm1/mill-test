import { Contact } from './components/Contact';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Hero } from './components/Hero';
import { MouseFollow } from './components/MouseFollow';
import { Specs } from './components/Specs';

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <MouseFollow />
      <Hero />
      <Features />
      <Specs />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
