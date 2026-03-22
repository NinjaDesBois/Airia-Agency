/* Dashboard Airia — Page protégée client
   Route : /dashboard
   TODO : connecter à l'API de données réelles (calls, leads, MRR) */
import { useState } from 'react'
import './Dashboard.css'

/* KPIs placeholder */
const KPI_PLACEHOLDER = [
  {
    id: 'appels',
    label: 'Appels traités',
    valeur: '—',
    unite: '',
    tendance: null,
    icone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.4a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 8.72a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'leads',
    label: 'Leads qualifiés',
    valeur: '—',
    unite: '',
    tendance: null,
    icone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'roi',
    label: 'ROI estimé',
    valeur: '—',
    unite: 'x',
    tendance: null,
    icone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    id: 'mrr',
    label: 'MRR',
    valeur: '—',
    unite: '€',
    tendance: null,
    icone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
]

/* ===== Guard d'authentification — placeholder ===== */
function GardeAuth({ children }) {
  /* TODO : vérifier le token JWT / session
     const { user, loading } = useAuth()
     if (loading) return <Chargement />
     if (!user) return <Navigate to="/login" /> */

  const [deVerrouille] = useState(false) // toujours false en placeholder

  if (!deVerrouille) {
    return (
      <div className="dashboard-garde">
        <div className="dashboard-garde__boite">
          <div className="dashboard-garde__icone" aria-hidden="true">🔐</div>
          <h2 className="dashboard-garde__titre">Accès sécurisé</h2>
          <p className="dashboard-garde__texte">
            Authentification requise pour accéder au tableau de bord.
          </p>
          <p className="dashboard-garde__note">
            🚧 Système d'auth à connecter — JWT / session à implémenter
          </p>
          <a href="/" className="btn-primaire dashboard-garde__retour">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  return children
}

/* ===== Composant KPI Card ===== */
function CarteKPI({ kpi }) {
  return (
    <div className="dashboard__kpi">
      <div className="dashboard__kpi-icone">{kpi.icone}</div>
      <div className="dashboard__kpi-corps">
        <p className="dashboard__kpi-label">{kpi.label}</p>
        <p className="dashboard__kpi-valeur">
          {kpi.valeur}
          {kpi.unite && (
            <span className="dashboard__kpi-unite">{kpi.unite}</span>
          )}
        </p>
        {kpi.tendance !== null && (
          <p className="dashboard__kpi-tendance">
            {kpi.tendance >= 0 ? '↑' : '↓'} {Math.abs(kpi.tendance)}% ce mois
          </p>
        )}
      </div>
    </div>
  )
}

/* ===== Dashboard principal ===== */
export default function Dashboard() {
  return (
    <GardeAuth>
      <div className="dashboard" role="main">
        {/* En-tête */}
        <header className="dashboard__header">
          <div className="dashboard__header-contenu">
            <a href="/" className="dashboard__logo" aria-label="Retour à l'accueil">
              <span className="dashboard__logo-texte">Airia</span>
            </a>
            <h1 className="dashboard__titre">Tableau de bord</h1>
            <button className="dashboard__deconnexion" aria-label="Se déconnecter">
              {/* TODO : implémenter la déconnexion */}
              Déconnexion
            </button>
          </div>
        </header>

        {/* Contenu */}
        <div className="dashboard__corps conteneur">

          {/* Bandeau "en construction" */}
          <div className="dashboard__bandeau" role="status">
            🚧 Dashboard en cours de développement — données réelles à connecter
          </div>

          {/* Grille KPIs */}
          <section className="dashboard__section" aria-label="KPIs clés">
            <h2 className="dashboard__section-titre">Vue d'ensemble</h2>
            <div className="dashboard__kpis">
              {KPI_PLACEHOLDER.map(kpi => (
                <CarteKPI key={kpi.id} kpi={kpi} />
              ))}
            </div>
          </section>

          {/* Graphiques placeholder */}
          <section className="dashboard__section" aria-label="Graphiques">
            <h2 className="dashboard__section-titre">Activité</h2>
            <div className="dashboard__graphiques">
              <div className="dashboard__graphique-placeholder">
                <p>📈 Graphique appels / leads — à connecter</p>
              </div>
              <div className="dashboard__graphique-placeholder">
                <p>💰 Évolution MRR — à connecter</p>
              </div>
            </div>
          </section>

          {/* Historique appels placeholder */}
          <section className="dashboard__section" aria-label="Historique des appels">
            <h2 className="dashboard__section-titre">Derniers appels</h2>
            <div className="dashboard__tableau-placeholder">
              <p>📞 Historique des appels Vapi.ai — à connecter</p>
            </div>
          </section>

        </div>
      </div>
    </GardeAuth>
  )
}
