/* Footer — Airia */
import { useTranslation } from 'react-i18next'
import './Footer.css'

export default function Footer() {
  const annéeActuelle = new Date().getFullYear()
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="conteneur footer__conteneur">
        {/* Haut du footer */}
        <div className="footer__haut">
          <div className="footer__marque">
            <a href="/" className="footer__logo" aria-label="Airia — Accueil">
              <img
                src="/logo.png"
                alt="Airia logo"
                className="footer__logo-image"
                width="28"
                height="28"
              />
              <span>Airia</span>
              <span className="footer__logo-point" aria-hidden="true" />
            </a>
            <p className="footer__slogan">
              {t('footer.slogan')}
            </p>
            <p className="footer__localisation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              {t('footer.location')}
            </p>
          </div>

          <div className="footer__liens-grille">
            <div className="footer__colonne">
              <h3 className="footer__titre-col">{t('footer.services')}</h3>
              <ul role="list">
                <li><a href="#fonctionnalites">Voice IA</a></li>
                <li><a href="#fonctionnalites">Lead Generation</a></li>
                <li><a href="#fonctionnalites">Pub Meta IA</a></li>
                <li><a href="#fonctionnalites">Dashboard</a></li>
              </ul>
            </div>

            <div className="footer__colonne">
              <h3 className="footer__titre-col">{t('footer.company')}</h3>
              <ul role="list">
                <li><a href="#comment-ca-marche">{t('footer.howItWorks')}</a></li>
                <li><a href="#temoignages">{t('footer.testimonials')}</a></li>
                <li><a href="#tarifs">{t('footer.pricing')}</a></li>
                <li><a href="mailto:hello@airia.be">{t('footer.contact')}</a></li>
              </ul>
            </div>

            <div className="footer__colonne">
              <h3 className="footer__titre-col">{t('footer.contact')}</h3>
              <ul role="list">
                <li>
                  <a href="mailto:hello@airia.be">hello@airia.be</a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/airia-be" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="footer__séparateur" />

        {/* Bas du footer */}
        <div className="footer__bas">
          <div className="footer__identité">
            <p className="footer__copyright">
              © {annéeActuelle} Airia — {t('footer.rights')}
            </p>
            <p className="footer__mentions-société">
              Bahassi Solutions SRL — BE 1040.653.711 — Boulevard Sainctelette 39, 7000 Mons
            </p>
          </div>
          <div className="footer__légal">
            <a href="/mentions-legales">{t('footer.legal')}</a>
            <a href="/cgv">{t('footer.terms')}</a>
            <a href="/confidentialite">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>

      {/* Lueur décorative */}
      <div className="footer__lueur" aria-hidden="true" />
    </footer>
  )
}
