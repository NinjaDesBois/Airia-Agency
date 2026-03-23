/* Navbar sticky avec logo + liens + sélecteur de langue + CTA — Airia */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ouvrirModalContact } from './ModalContact'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

export default function Navbar() {
  const { t } = useLanguage()
  const [défilé, setDéfilé] = useState(false)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const refNavbar = useRef(null)

  const liensNavigation = [
    { label: t('nav.services'), href: '#fonctionnalites' },
    { label: t('nav.howItWorks'), href: '#comment-ca-marche' },
    { label: 'Démo', href: '#demo' },
    { label: t('nav.testimonials'), href: '#temoignages' },
    { label: t('nav.pricing'), href: '#roi' },
  ]

  // Détection du défilement pour changer l'apparence
  useEffect(() => {
    const handleScroll = () => {
      setDéfilé(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animation d'entrée GSAP
  useEffect(() => {
    gsap.fromTo(
      refNavbar.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const handleLienClick = (e, href) => {
    e.preventDefault()
    const cible = document.querySelector(href)
    if (cible) {
      cible.scrollIntoView({ behavior: 'smooth' })
      setMenuOuvert(false)
    }
  }

  return (
    <motion.nav
      ref={refNavbar}
      className={`navbar ${défilé ? 'navbar--défilée' : ''}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar__conteneur">
        {/* Logo */}
        <a href="#" className="navbar__logo" aria-label="Airia — Accueil">
          <span className="navbar__logo-texte">AIRIA</span>
          <span className="navbar__logo-point" aria-hidden="true" />
        </a>

        {/* Liens desktop */}
        <ul className="navbar__liens" role="list">
          {liensNavigation.map((lien) => (
            <li key={lien.href}>
              <a
                href={lien.href}
                className="navbar__lien"
                onClick={(e) => handleLienClick(e, lien.href)}
              >
                {lien.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Contrôles desktop : sélecteur de langue + CTA */}
        <div className="navbar__contrôles">
          <LanguageSwitcher />
          <button
            className="navbar__cta btn-primaire"
            onClick={ouvrirModalContact}
          >
            {t('nav.cta')}
          </button>
        </div>

        {/* Burger mobile */}
        <button
          className={`navbar__burger ${menuOuvert ? 'navbar__burger--ouvert' : ''}`}
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label={menuOuvert ? t('nav.burgerClose') : t('nav.burgerOpen')}
          aria-expanded={menuOuvert}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Menu mobile */}
      <motion.div
        className="navbar__menu-mobile"
        initial={false}
        animate={{ height: menuOuvert ? 'auto' : 0, opacity: menuOuvert ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-hidden={!menuOuvert}
      >
        <ul role="list">
          {liensNavigation.map((lien) => (
            <li key={lien.href}>
              <a
                href={lien.href}
                className="navbar__lien-mobile"
                onClick={(e) => handleLienClick(e, lien.href)}
                tabIndex={menuOuvert ? 0 : -1}
              >
                {lien.label}
              </a>
            </li>
          ))}
          <li className="navbar__mobile-lang">
            <LanguageSwitcher />
          </li>
          <li>
            <button
              className="btn-primaire navbar__cta-mobile"
              onClick={() => { setMenuOuvert(false); ouvrirModalContact() }}
              tabIndex={menuOuvert ? 0 : -1}
            >
              {t('nav.cta')}
            </button>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  )
}
