import Hero from '../sections/Hero.jsx'
import Stats from '../sections/Stats.jsx'
import AboutStrip from '../sections/AboutStrip.jsx'
import ProductShowcase from '../sections/ProductShowcase.jsx'
import Applications from '../sections/Applications.jsx'
import CTA from '../sections/CTA.jsx'

export default function Home() {
  return (
    <main className="overflow-y-auto">
      <Hero />
      <Stats />
      <AboutStrip />
      <ProductShowcase />
      <Applications />
      <CTA />
    </main>
  )
}