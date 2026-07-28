/* Layout partagé des pages légales — en-tête de retour + footer commun */
import { Helmet } from 'react-helmet-async'
import Footer from '../components/Footer'
import './PageLegale.css'

export default function PageLegale({ titre, dateMaj, children }) {
  return (
    <div className="page-legale">
      <Helmet>
        <title>{titre} — Airia</title>
      </Helmet>

      <header className="page-legale__entete">
        <a href="/" className="page-legale__retour">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour au site
        </a>
        <a href="/" className="navbar__logo" aria-label="Airia — Accueil">
          <img src="/logo.png" alt="Airia logo" className="navbar__logo-image" aria-hidden="true" />
          <span className="navbar__logo-texte">Airia</span>
          <span className="navbar__logo-point" aria-hidden="true" />
        </a>
      </header>

      <main className="page-legale__contenu">
        <h1 className="page-legale__titre">{titre}</h1>
        {dateMaj && <p className="page-legale__maj">Dernière mise à jour : {dateMaj}</p>}
        {children}
      </main>

      <Footer />
    </div>
  )
}
