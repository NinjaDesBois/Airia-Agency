/* Application principale — Airia Landing Page */
import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Composants de mise en page */
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ModalContact from './components/ModalContact'
import ChatWidget from './components/ChatWidget'
import SEO from './components/SEO'

/* Sections de la landing page — chargement lazy pour le code splitting */
import Hero from './sections/Hero'
import LogosClients from './sections/LogosClients'

const Stats = lazy(() => import('./sections/Stats'))
const Probleme = lazy(() => import('./sections/Probleme'))
const HowItWorks = lazy(() => import('./sections/HowItWorks'))
const Features = lazy(() => import('./sections/Features'))
const ROI = lazy(() => import('./sections/ROI'))
import ModalDemo from './components/DemoSection'
const Temoignages = lazy(() => import('./sections/Temoignages'))

/* Pages */
const Dashboard = lazy(() => import('./components/Dashboard'))

gsap.registerPlugin(ScrollTrigger)

/* Fallback de chargement léger */
function SectionSkeleton() {
  return <div style={{ height: '400px' }} aria-hidden="true" />
}

/* Routeur minimal — sans dépendance externe
   TODO : remplacer par react-router-dom pour des routes plus complexes */
function useRoute() {
  return typeof window !== 'undefined' ? window.location.pathname : '/'
}

/* ===== Page d'accueil — landing page principale ===== */
function PageAccueil() {
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
      {/* Balises SEO dynamiques */}
      <SEO />

      {/* Navigation sticky */}
      <Navbar />

      {/* Contenu principal */}
      <main id="contenu-principal">
        {/* 1. Hero — Scène 3D + headline */}
        <Hero />

        {/* 2. Logos outils intégrés */}
        <LogosClients />

        {/* 3–9. Sections chargées en lazy avec Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
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

          {/* 9. Témoignages */}
          <Temoignages />
        </Suspense>
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Modal de contact — ouvert via événement 'airia:ouvrir-modal-contact' */}
      <ModalContact />

      {/* Modal démo — ouvert via événement 'airia:ouvrir-modal-demo' */}
      <ModalDemo />

      {/* Widget chat IA flottant */}
      <ChatWidget />
    </>
  )
}

/* ===== Composant racine — routing basique ===== */
export default function App() {
  const route = useRoute()

  if (route.startsWith('/dashboard')) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <Dashboard />
      </Suspense>
    )
  }

  return <PageAccueil />
}
