/* Section Démo — Choisissez votre secteur et testez Chat IA ou Voix IA */
import { useState, useRef } from 'react'
import './DemoSection.css'

/* Secteurs disponibles */
const SECTEURS = [
  { id: 'immobilier',  label: 'Immobilier',   icone: '🏠' },
  { id: 'dentaire',    label: 'Dentaire',      icone: '🦷' },
  { id: 'avocat',      label: 'Avocat',        icone: '⚖️' },
  { id: 'notaire',     label: 'Notaire',       icone: '📜' },
  { id: 'plombier',    label: 'Plombier',      icone: '🔧' },
  { id: 'electricien', label: 'Electricien',   icone: '⚡' },
  { id: 'comptable',   label: 'Comptable',     icone: '📊' },
  { id: 'web-agency',  label: 'Web Agency',    icone: '💻' },
]

/* ===== Interface Chat — placeholder prêt pour /api/demo.js ===== */
function InterfaceChat({ secteur }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      contenu: `Bonjour ! Je suis l'assistant IA pour le secteur ${secteur?.label ?? 'de votre choix'}. Comment puis-je vous aider ?`,
    },
  ])
  const [saisie, setSaisie] = useState('')
  const [enChargement, setEnChargement] = useState(false)
  const refMessages = useRef(null)

  const envoyerMessage = async (e) => {
    e.preventDefault()
    if (!saisie.trim() || enChargement) return

    const messageUtilisateur = { role: 'user', contenu: saisie }
    setMessages(prev => [...prev, messageUtilisateur])
    setSaisie('')
    setEnChargement(true)

    /* TODO : connecter à /api/demo.js avec secteur + messages */
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          contenu: '🚧 Démo en cours de connexion — revenez bientôt !',
        },
      ])
      setEnChargement(false)
    }, 800)
  }

  return (
    <div className="demo__chat">
      {/* Historique messages */}
      <div className="demo__chat-messages" ref={refMessages} aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`demo__message demo__message--${msg.role}`}
          >
            {msg.role === 'assistant' && (
              <span className="demo__message-avatar" aria-hidden="true">🤖</span>
            )}
            <p className="demo__message-texte">{msg.contenu}</p>
          </div>
        ))}
        {enChargement && (
          <div className="demo__message demo__message--assistant">
            <span className="demo__message-avatar" aria-hidden="true">🤖</span>
            <div className="demo__typing" aria-label="L'assistant écrit...">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      {/* Formulaire de saisie */}
      <form className="demo__chat-form" onSubmit={envoyerMessage}>
        <input
          type="text"
          className="demo__chat-input"
          placeholder="Posez une question à l'IA..."
          value={saisie}
          onChange={e => setSaisie(e.target.value)}
          disabled={enChargement}
          aria-label="Message"
        />
        <button
          type="submit"
          className="demo__chat-envoyer btn-primaire"
          disabled={!saisie.trim() || enChargement}
          aria-label="Envoyer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

/* ===== Interface Voix — placeholder Vapi.ai ===== */
function InterfaceVoix({ secteur }) {
  const [actif, setActif] = useState(false)

  const basculerAppel = () => {
    /* TODO : intégrer Vapi.ai SDK
       import Vapi from '@vapi-ai/web'
       const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY)
       vapi.start(ASSISTANT_ID_PAR_SECTEUR[secteur?.id]) */
    setActif(prev => !prev)
  }

  return (
    <div className="demo__voix">
      <div className={`demo__voix-cercle ${actif ? 'demo__voix-cercle--actif' : ''}`} aria-hidden="true">
        <div className="demo__voix-pulse" />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      </div>

      <p className="demo__voix-statut">
        {actif
          ? 'Appel en cours — parlez maintenant'
          : `Appelez l'IA ${secteur?.label ?? ''} en un clic`}
      </p>

      <button
        className={`demo__voix-btn ${actif ? 'demo__voix-btn--actif' : 'btn-primaire'}`}
        onClick={basculerAppel}
      >
        {actif ? 'Terminer l\'appel' : 'Démarrer l\'appel vocal'}
      </button>

      <p className="demo__voix-note">
        🚧 Intégration Vapi.ai — <code>VITE_VAPI_API_KEY</code> requis
      </p>
    </div>
  )
}

/* ===== Composant principal DemoSection ===== */
export default function DemoSection() {
  const [secteurActif, setSecteurActif] = useState(SECTEURS[0])
  const [modeActif, setModeActif] = useState('chat') // 'chat' | 'voix'

  return (
    <section id="demo" className="demo" aria-label="Section démo interactive">
      <div className="demo__contenu conteneur">

        {/* En-tête */}
        <div className="demo__entete">
          <span className="badge">Démo en direct</span>
          <h2 className="demo__titre">
            Essayez la démo —{' '}
            <span className="texte-dégradé">choisissez votre secteur</span>
          </h2>
          <p className="demo__sous-titre">
            Testez comment Airia répond à vos clients, qualifie les leads et prend
            les rendez-vous — sans configuration.
          </p>
        </div>

        {/* Boutons secteurs */}
        <div className="demo__secteurs" role="group" aria-label="Secteur d'activité">
          {SECTEURS.map(secteur => (
            <button
              key={secteur.id}
              className={`demo__secteur-btn ${secteurActif.id === secteur.id ? 'demo__secteur-btn--actif' : ''}`}
              onClick={() => setSecteurActif(secteur)}
              aria-pressed={secteurActif.id === secteur.id}
            >
              <span aria-hidden="true">{secteur.icone}</span>
              {secteur.label}
            </button>
          ))}
        </div>

        {/* Bascule mode Chat / Voix */}
        <div className="demo__modes" role="group" aria-label="Mode de démo">
          <button
            className={`demo__mode-btn ${modeActif === 'chat' ? 'demo__mode-btn--actif' : ''}`}
            onClick={() => setModeActif('chat')}
            aria-pressed={modeActif === 'chat'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat IA
          </button>
          <button
            className={`demo__mode-btn ${modeActif === 'voix' ? 'demo__mode-btn--actif' : ''}`}
            onClick={() => setModeActif('voix')}
            aria-pressed={modeActif === 'voix'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
            Voix IA
          </button>
        </div>

        {/* Interface active */}
        <div className="demo__interface">
          {modeActif === 'chat'
            ? <InterfaceChat secteur={secteurActif} />
            : <InterfaceVoix secteur={secteurActif} />
          }
        </div>

      </div>
    </section>
  )
}
