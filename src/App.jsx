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
import SeoContent from './components/SeoContent'
import BandeauCTA from './components/BandeauCTA'

/* Sections de la landing page — chargement lazy pour le code splitting */
import Hero from './sections/Hero'
import LogosClients from './sections/LogosClients'

const Stats = lazy(() => import('./sections/Stats'))
const Probleme = lazy(() => import('./sections/Probleme'))
const HowItWorks = lazy(() => import('./sections/HowItWorks'))
const Features = lazy(() => import('./sections/Features'))
const ROI = lazy(() => import('./sections/ROI'))
const Pricing = lazy(() => import('./sections/Pricing'))
import ModalDemo from './components/DemoSection'
const Temoignages = lazy(() => import('./sections/Temoignages'))
const FAQ = lazy(() => import('./sections/FAQ'))

/* Pages */
const Dashboard = lazy(() => import('./components/Dashboard'))

/* Pages légales — Bahassi Solutions SRL */
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const CGV = lazy(() => import('./pages/CGV'))
const Confidentialite = lazy(() => import('./pages/Confidentialite'))

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

        {/* 3–10. Sections chargées en lazy avec Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          {/* 3. Chiffres clés */}
          <Stats />

          {/* 4. Section problème — bento grid */}
          <Probleme />

          {/* 5. Bandeau CTA — au moment de douleur maximale */}
          <BandeauCTA />

          {/* 6. Comment ça marche — 3 étapes */}
          <HowItWorks />

          {/* 7. Fonctionnalités — 6 cartes */}
          <Features />

          {/* 8. Calculateur ROI interactif */}
          <ROI />

          {/* 9. Tarifs — Voice IA à partir de 350€/mois */}
          <Pricing />

          {/* 10. Témoignages */}
          <Temoignages />

          {/* 11. FAQ — traitement des objections */}
          <FAQ />
        </Suspense>
      </main>

      {/* Contenu SEO crawlable — texte visible pour les moteurs de recherche */}
      <SeoContent />

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

  if (route.startsWith('/mentions-legales')) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <MentionsLegales />
      </Suspense>
    )
  }

  if (route.startsWith('/cgv')) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <CGV />
      </Suspense>
    )
  }

  if (route.startsWith('/confidentialite')) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <Confidentialite />
      </Suspense>
    )
  }

  return <PageAccueil />
}
