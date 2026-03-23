/* Modal Démo — Layout fixe : Header | Chat area | Footer CTA
   Ouvrir via : ouvrirModalDemo() depuis n'importe quel CTA */
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './DemoSection.css'

export function ouvrirModalDemo() {
  window.dispatchEvent(new CustomEvent('airia:ouvrir-modal-demo'))
}

const SECTEURS = [
  { id: 'immobilier',  label: 'Immobilier' },
  { id: 'dentaire',    label: 'Dentaire' },
  { id: 'avocat',      label: 'Avocat' },
  { id: 'notaire',     label: 'Notaire' },
  { id: 'plombier',    label: 'Plombier' },
  { id: 'electricien', label: 'Electricien' },
  { id: 'comptable',   label: 'Comptable' },
  { id: 'web-agency',  label: 'Web Agency' },
]

const MESSAGE_ACCUEIL = {
  immobilier:   "Bonjour ! Je suis la réceptionniste IA de votre agence immobilière. Vous cherchez à acheter, vendre ou louer un bien ? Je peux qualifier votre projet et fixer un rendez-vous.",
  dentaire:     "Bonjour ! Je suis l'assistante IA du cabinet dentaire. Quel type de soin recherchez-vous ? Je peux vérifier vos disponibilités et réserver un rendez-vous.",
  avocat:       "Bonjour ! Je suis la secrétaire IA du cabinet d'avocats. Quelle est la nature de votre demande — civil, pénal ou commercial ? Je vais évaluer l'urgence et vous proposer un créneau.",
  notaire:      "Bonjour ! Je suis l'assistante IA de l'étude notariale. Acte immobilier, succession ou contrat de mariage ? Je vous guide et planifie votre rendez-vous.",
  plombier:     "Bonjour ! Je suis la réceptionniste IA du plombier. Fuite, panne ou installation ? Je qualifie l'urgence et planifie l'intervention.",
  electricien:  "Bonjour ! Je suis la réceptionniste IA de l'électricien. Panne, installation ou mise aux normes ? Décrivez la situation et je planifie l'intervention.",
  comptable:    "Bonjour ! Je suis l'assistante IA du cabinet comptable. TVA, bilan annuel ou création de société ? Je qualifie votre besoin et fixe une consultation.",
  'web-agency': "Bonjour ! Je suis la réceptionniste IA de la web agency. Projet de site, application ou SEO ? Parlez-moi de votre projet et je planifie un appel découverte.",
}

/* Compteur global — clés uniques entre secteurs et réinitialisations */
let _msgId = 0
const nouvelId = () => ++_msgId

const msgAccueil = (secteurId) => ({
  id: nouvelId(),
  role: 'assistant',
  contenu: MESSAGE_ACCUEIL[secteurId] ?? 'Bonjour ! Comment puis-je vous aider ?',
})

/* ===== Zone chat scrollable ===== */
function ZoneChat({ secteurId }) {
  const [messages, setMessages] = useState(() => [msgAccueil(secteurId)])
  const [saisie, setSaisie] = useState('')
  const [enChargement, setEnChargement] = useState(false)
  const [erreur, setErreur] = useState(null)
  const refZone = useRef(null)
  const refInput = useRef(null)

  /* Reset + scroll quand le secteur change */
  useEffect(() => {
    setMessages([msgAccueil(secteurId)])
    setErreur(null)
    setSaisie('')
  }, [secteurId])

  /* Scroll au bas à chaque nouveau message */
  useEffect(() => {
    if (refZone.current) {
      refZone.current.scrollTop = refZone.current.scrollHeight
    }
  }, [messages, enChargement])

  const envoyer = async (e) => {
    e.preventDefault()
    const texte = saisie.trim()
    if (!texte || enChargement) return

    const msgUser = { id: nouvelId(), role: 'user', contenu: texte }
    const liste = [...messages, msgUser]
    setMessages(liste)
    setSaisie('')
    setEnChargement(true)
    setErreur(null)

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-airia-token': 'airia2024' },
        body: JSON.stringify({ secteur: secteurId, messages: liste }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur serveur')
      setMessages(prev => [...prev, { id: nouvelId(), role: 'assistant', contenu: data.content }])
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnChargement(false)
    }
  }

  return (
    /* Cette div EST la chat-area : flex:1, overflow-y:auto (défini en CSS) */
    <div className="demo__chat-area" ref={refZone} aria-live="polite">

      {/* Messages */}
      <div className="demo__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`demo__msg demo__msg--${msg.role}`}>
            {msg.role === 'assistant' && (
              <span className="demo__msg-avatar" aria-hidden="true">🤖</span>
            )}
            <p className="demo__msg-bulle">{msg.contenu}</p>
          </div>
        ))}

        {enChargement && (
          <div className="demo__msg demo__msg--assistant">
            <span className="demo__msg-avatar" aria-hidden="true">🤖</span>
            <div className="demo__typing" aria-label="L'assistant écrit...">
              <span /><span /><span />
            </div>
          </div>
        )}

        {erreur && (
          <div className="demo__erreur" role="alert">⚠️ {erreur}</div>
        )}
      </div>

      {/* Input — collé en bas de la zone scroll */}
      <form className="demo__input-form" onSubmit={envoyer}>
        <input
          ref={refInput}
          type="text"
          className="demo__input"
          placeholder="Posez une question à l'IA..."
          value={saisie}
          onChange={e => setSaisie(e.target.value)}
          disabled={enChargement}
          aria-label="Message"
        />
        <button
          type="submit"
          className="demo__input-envoyer"
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

/* ===== Zone voix ===== */
function ZoneVoix({ secteurLabel }) {
  return (
    <div className="demo__chat-area demo__voix-area">
      <div className="demo__voix-cercle" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      </div>
      <span className="demo__voix-badge">🎙️ Appel vocal — Bientôt disponible</span>
      <p className="demo__voix-label">
        Appelez l&apos;IA {secteurLabel} directement depuis votre navigateur
      </p>
      <button className="demo__voix-btn" disabled aria-disabled="true">
        Démarrer l&apos;appel vocal
      </button>
    </div>
  )
}

/* ===== Modal principal ===== */
export default function ModalDemo() {
  const [ouvert, setOuvert] = useState(false)
  const [secteurId, setSecteurId] = useState('immobilier')
  const [mode, setMode] = useState('chat') /* 'chat' | 'voix' */

  const secteurLabel = SECTEURS.find(s => s.id === secteurId)?.label ?? ''

  /* Écoute l'événement global */
  useEffect(() => {
    const ouvrir = () => setOuvert(true)
    window.addEventListener('airia:ouvrir-modal-demo', ouvrir)
    return () => window.removeEventListener('airia:ouvrir-modal-demo', ouvrir)
  }, [])

  /* ESC + blocage scroll body */
  useEffect(() => {
    if (!ouvert) return
    const onKey = (e) => { if (e.key === 'Escape') setOuvert(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [ouvert])

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className="demo__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOuvert(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Démo interactive Airia"
        >
          <motion.div
            className="demo__card"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* ── HEADER ── */}
            <div className="demo__header">
              <div className="demo__header-top">
                <div className="demo__header-titre">
                  <span className="badge">Démo en direct</span>
                  <h2 className="demo__titre">Essayez la démo</h2>
                </div>
                <button
                  className="demo__fermer"
                  onClick={() => setOuvert(false)}
                  aria-label="Fermer la démo"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="demo__header-controls">
                {/* Dropdown secteur */}
                <div className="demo__select-wrap">
                  <select
                    className="demo__select"
                    value={secteurId}
                    onChange={e => setSecteurId(e.target.value)}
                    aria-label="Choisissez votre secteur"
                  >
                    {SECTEURS.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                  <svg className="demo__select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>

                {/* Toggle Chat / Voix */}
                <div className="demo__toggle" role="group" aria-label="Mode">
                  <button
                    className={`demo__toggle-btn ${mode === 'chat' ? 'demo__toggle-btn--actif' : ''}`}
                    onClick={() => setMode('chat')}
                    aria-pressed={mode === 'chat'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Chat IA
                  </button>
                  <button
                    className={`demo__toggle-btn ${mode === 'voix' ? 'demo__toggle-btn--actif' : ''}`}
                    onClick={() => setMode('voix')}
                    aria-pressed={mode === 'voix'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    </svg>
                    Voix IA
                  </button>
                </div>
              </div>
            </div>

            {/* ── CHAT AREA (flex:1, scroll) ── */}
            {mode === 'chat'
              ? <ZoneChat key={secteurId} secteurId={secteurId} />
              : <ZoneVoix secteurLabel={secteurLabel} />
            }

            {/* ── FOOTER CTA ── */}
            <div className="demo__footer">
              <p className="demo__footer-texte">Installer cette IA dans votre business ?</p>
              <a
                href="https://calendly.com/airia-be"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primaire demo__footer-btn"
              >
                Réserver un appel
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
