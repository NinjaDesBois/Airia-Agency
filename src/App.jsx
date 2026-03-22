/* Application principale — Airia Landing Page */
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Composants de mise en page */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ModalContact from './components/ModalContact'

/* Sections de la landing page */
import Hero from './sections/Hero'
import LogosClients from './sections/LogosClients'
import Stats from './sections/Stats'
import Probleme from './sections/Probleme'
import HowItWorks from './sections/HowItWorks'
import Features from './sections/Features'
import ROI from './sections/ROI'
import Temoignages from './sections/Temoignages'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  // Initialisation de Lenis pour le smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    // Synchronisation Lenis ↔ GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      {/* Navigation sticky */}
      <Navbar />

      {/* Contenu principal */}
      <main id="contenu-principal">
        {/* 1. Hero — Scène 3D + headline */}
        <Hero />

        {/* 2. Logos outils intégrés */}
        <LogosClients />

        {/* 3. Chiffres clés */}
        <Stats />

        {/* 4. Section problème — bento grid */}
        <Probleme />

        {/* 5. Comment ça marche — 3 étapes */}
        <HowItWorks />

        {/* 6. Fonctionnalités — 6 cartes */}
        <Features />

        {/* 7. Calculateur ROI interactif */}
        <ROI />

        {/* 8. Témoignages */}
        <Temoignages />
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Modal de contact — ouvert via événement 'airia:ouvrir-modal-contact' */}
      <ModalContact />
    </>
  )
}
