/* Footer — Airia */
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const annéeActuelle = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="conteneur footer__conteneur">
        {/* Haut du footer */}
        <div className="footer__haut">
          <div className="footer__marque">
            <div className="footer__logo">
              <img
                src="/logo-airia.png"
                alt=""
                className="footer__logo-image"
                aria-hidden="true"
                width="28"
                height="28"
              />
              <span>AIRIA</span>
              <span className="footer__logo-point" aria-hidden="true" />
            </div>
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
                <li><a href="#roi">{t('footer.pricing')}</a></li>
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
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="footer__séparateur" />

        {/* Bas du footer */}
        <div className="footer__bas">
          <p className="footer__copyright">
            © {annéeActuelle} Airia SRL — {t('footer.rights')}
          </p>
          <div className="footer__légal">
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.legal')}</a>
          </div>
        </div>
      </div>

      {/* Lueur décorative */}
      <div className="footer__lueur" aria-hidden="true" />
    </footer>
  )
}
