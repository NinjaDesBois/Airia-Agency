/* Section Démo — Choisissez votre secteur et testez Chat IA ou Voix IA */
import { useState, useRef, useEffect } from 'react'
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

/* Message d'accueil par secteur */
const MESSAGE_ACCUEIL = {
  immobilier:   "Bonjour ! Je suis la réceptionniste IA de votre agence immobilière. Vous cherchez à acheter, vendre ou louer un bien ? Je peux qualifier votre projet et fixer un rendez-vous avec un conseiller.",
  dentaire:     "Bonjour ! Je suis l'assistante IA du cabinet dentaire. Quel type de soin recherchez-vous ? Je peux vérifier vos disponibilités et réserver un rendez-vous.",
  avocat:       "Bonjour ! Je suis la secrétaire IA du cabinet d'avocats. Quelle est la nature de votre demande — civil, pénal ou commercial ? Je vais évaluer l'urgence et vous proposer un créneau.",
  notaire:      "Bonjour ! Je suis l'assistante IA de l'étude notariale. Vous avez besoin d'un acte immobilier, d'une succession ou d'un contrat de mariage ? Je vous guide.",
  plombier:     "Bonjour ! Je suis la réceptionniste IA du plombier. Décrivez votre problème — fuite, panne, installation — je qualifie l'urgence et planifie l'intervention.",
  electricien:  "Bonjour ! Je suis la réceptionniste IA de l'électricien. Panne, installation ou mise aux normes ? Décrivez la situation et je planifie l'intervention.",
  comptable:    "Bonjour ! Je suis l'assistante IA du cabinet comptable. TVA, bilan annuel ou création de société ? Je qualifie votre besoin et fixe une consultation.",
  'web-agency': "Bonjour ! Je suis la réceptionniste IA de la web agency. Vous avez un projet de site, d'application ou de SEO ? Parlez-moi de votre projet et je planifie un appel découverte.",
}

/* ===== Interface Chat connectée à /api/demo ===== */
function InterfaceChat({ secteur }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      contenu: MESSAGE_ACCUEIL[secteur?.id] ?? `Bonjour ! Je suis l'assistant IA pour le secteur ${secteur?.label ?? 'de votre choix'}. Comment puis-je vous aider ?`,
    },
  ])
  const [saisie, setSaisie] = useState('')
  const [enChargement, setEnChargement] = useState(false)
  const [erreur, setErreur] = useState(null)
  const refMessages = useRef(null)

  /* Réinitialiser le chat quand le secteur change */
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      contenu: MESSAGE_ACCUEIL[secteur?.id] ?? `Bonjour ! Je suis l'assistant IA pour le secteur ${secteur?.label ?? 'de votre choix'}. Comment puis-je vous aider ?`,
    }])
    setErreur(null)
  }, [secteur?.id])

  /* Scroll automatique vers le bas */
  useEffect(() => {
    if (refMessages.current) {
      refMessages.current.scrollTop = refMessages.current.scrollHeight
    }
  }, [messages, enChargement])

  const envoyerMessage = async (e) => {
    e.preventDefault()
    if (!saisie.trim() || enChargement) return

    const messageUtilisateur = { role: 'user', contenu: saisie }
    const nouveauxMessages = [...messages, messageUtilisateur]
    setMessages(nouveauxMessages)
    setSaisie('')
    setEnChargement(true)
    setErreur(null)

    try {
      const réponse = await fetch('/api/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-airia-token': 'airia2024',
        },
        body: JSON.stringify({
          secteur: secteur.id,
          messages: nouveauxMessages,
        }),
      })

      const données = await réponse.json()

      if (!réponse.ok) {
        throw new Error(données.error ?? 'Erreur serveur')
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', contenu: données.content },
      ])
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnChargement(false)
    }
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
        {erreur && (
          <div className="demo__erreur" role="alert">
            ⚠️ {erreur}
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

/* ===== Interface Voix — Bientôt disponible ===== */
function InterfaceVoix({ secteur }) {
  return (
    <div className="demo__voix">
      <div className="demo__voix-cercle" aria-hidden="true">
        <div className="demo__voix-pulse" />
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      </div>

      <div className="demo__voix-badge" role="status">
        🎙️ Appel vocal — Bientôt disponible
      </div>

      <p className="demo__voix-statut">
        Appelez l&apos;IA {secteur?.label ?? ''} directement depuis votre navigateur
      </p>

      <button
        className="demo__voix-btn"
        disabled
        aria-disabled="true"
        title="Disponible prochainement"
      >
        Démarrer l&apos;appel vocal
      </button>

      <p className="demo__voix-note">
        Intégration Vapi.ai — disponible dans la prochaine version
      </p>
    </div>
  )
}

/* ===== CTA après démo ===== */
function CTAApresDemo() {
  return (
    <div className="demo__apres-cta">
      <p className="demo__apres-texte">
        Installer cette IA dans votre business ?
      </p>
      <a
        href="https://calendly.com/airia-be"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primaire demo__apres-btn"
      >
        Réserver un appel
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
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

        {/* CTA après démo */}
        <CTAApresDemo />

      </div>
    </section>
  )
}
