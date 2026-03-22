/* Footer — Airia */
import './Footer.css'

export default function Footer() {
  const annéeActuelle = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="conteneur footer__conteneur">
        {/* Haut du footer */}
        <div className="footer__haut">
          <div className="footer__marque">
            <div className="footer__logo">
              <span>AIRIA</span>
              <span className="footer__logo-point" aria-hidden="true" />
            </div>
            <p className="footer__slogan">
              L'agence qui s'automatise toute seule.
            </p>
            <p className="footer__localisation">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              Belgique — Bruxelles, Liège, Gand
            </p>
          </div>

          <div className="footer__liens-grille">
            <div className="footer__colonne">
              <h3 className="footer__titre-col">Services</h3>
              <ul role="list">
                <li><a href="#fonctionnalites">Voice IA</a></li>
                <li><a href="#fonctionnalites">Lead Generation</a></li>
                <li><a href="#fonctionnalites">Pub Meta IA</a></li>
                <li><a href="#fonctionnalites">Dashboard</a></li>
              </ul>
            </div>

            <div className="footer__colonne">
              <h3 className="footer__titre-col">Entreprise</h3>
              <ul role="list">
                <li><a href="#comment-ca-marche">Comment ça marche</a></li>
                <li><a href="#temoignages">Témoignages</a></li>
                <li><a href="#roi">Tarifs</a></li>
                <li><a href="mailto:hello@airia.be">Contact</a></li>
              </ul>
            </div>

            <div className="footer__colonne">
              <h3 className="footer__titre-col">Contact</h3>
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
            © {annéeActuelle} Airia SRL — Tous droits réservés
          </p>
          <div className="footer__légal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Mentions légales</a>
          </div>
        </div>
      </div>

      {/* Lueur décorative */}
      <div className="footer__lueur" aria-hidden="true" />
    </footer>
  )
}
