/* Widget Chat IA flottant — proxy via /api/chat — Airia
   Inclut : bouton démo flottant + tooltip animé */
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ouvrirModalDemo } from './DemoSection'
import './ChatWidget.css'

export default function ChatWidget() {
  const { t } = useTranslation()
  const [ouvert, setOuvert] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [enChargement, setEnChargement] = useState(false)
  const [erreur, setErreur] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const refMessages = useRef(null)
  const refInput = useRef(null)
  const abortRef = useRef(null)
  const timerTooltip = useRef(null)
  const timerRepeat = useRef(null)

  /* === Logique tooltip ===
     Apparaît 3s après le chargement.
     Disparaît au clic sur le chat.
     Réapparaît 30s après fermeture si le chat n'a pas été ouvert. */
  useEffect(() => {
    timerTooltip.current = setTimeout(() => setTooltipVisible(true), 3000)
    return () => {
      clearTimeout(timerTooltip.current)
      clearTimeout(timerRepeat.current)
    }
  }, [])

  const cacherTooltip = useCallback(() => {
    setTooltipVisible(false)
    clearTimeout(timerRepeat.current)
    timerRepeat.current = setTimeout(() => {
      if (!ouvert) setTooltipVisible(true)
    }, 30_000)
  }, [ouvert])

  /* Message de bienvenue à l'ouverture */
  useEffect(() => {
    if (ouvert && messages.length === 0) {
      setMessages([{ rôle: 'assistant', contenu: t('chat.welcome'), id: Date.now() }])
    }
  }, [ouvert, messages.length, t])

  /* Scroll automatique vers le bas */
  useEffect(() => {
    if (refMessages.current) {
      refMessages.current.scrollTop = refMessages.current.scrollHeight
    }
  }, [messages])

  /* Focus sur l'input à l'ouverture */
  useEffect(() => {
    if (ouvert && refInput.current) {
      setTimeout(() => refInput.current?.focus(), 300)
    }
  }, [ouvert])

  /* Annulation à la fermeture */
  useEffect(() => {
    if (!ouvert && abortRef.current) {
      abortRef.current.abort()
    }
  }, [ouvert])

  const ouvrirChat = useCallback(() => {
    cacherTooltip()
    setOuvert(prev => !prev)
  }, [cacherTooltip])

  const envoyerMessage = useCallback(async () => {
    const texte = inputValue.trim()
    if (!texte || enChargement) return

    setErreur(null)
    const idUtilisateur = Date.now()
    const idAssistant = idUtilisateur + 1

    const nouveauxMessages = [
      ...messages,
      { rôle: 'user', contenu: texte, id: idUtilisateur },
    ]

    setMessages([
      ...nouveauxMessages,
      { rôle: 'assistant', contenu: '', id: idAssistant, enChargement: true },
    ])
    setInputValue('')
    setEnChargement(true)

    const historiqueAnthropic = nouveauxMessages
      .filter(m => m.rôle === 'user' || m.rôle === 'assistant')
      .map(m => ({ role: m.rôle, content: m.contenu }))

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-airia-token': 'airia2024'
        },
        body: JSON.stringify({ messages: historiqueAnthropic }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()

      setMessages(prev =>
        prev.map(m =>
          m.id === idAssistant
            ? { ...m, contenu: data.content, enChargement: false }
            : m
        )
      )
    } catch (err) {
      if (err.name !== 'AbortError') {
        setErreur(t('chat.error'))
        setMessages(prev => prev.filter(m => m.id !== idAssistant))
      }
    } finally {
      setEnChargement(false)
    }
  }, [inputValue, enChargement, messages, t])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      envoyerMessage()
    }
  }

  return (
    <>
      {/* Panneau de chat */}
      <AnimatePresence>
        {ouvert && (
          <motion.div
            className="chat__panneau"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={t('chat.title')}
            aria-modal="true"
          >
            {/* En-tête */}
            <div className="chat__en-tête">
              <div className="chat__en-tête-info">
                <div className="chat__avatar-ia">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 2a10 10 0 0110 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
                    <path d="M8 12s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </div>
                <div>
                  <div className="chat__titre">{t('chat.title')}</div>
                  <div className="chat__sous-titre">
                    <span className="chat__point-vert" aria-hidden="true" />
                    {t('chat.subtitle')}
                  </div>
                </div>
              </div>
              <button
                className="chat__fermer"
                onClick={() => setOuvert(false)}
                aria-label={t('chat.close')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Zone de messages */}
            <div className="chat__messages" ref={refMessages} role="log" aria-live="polite">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat__message chat__message--${msg.rôle}`}
                >
                  {msg.rôle === 'assistant' && (
                    <div className="chat__icône-message" aria-hidden="true">A</div>
                  )}
                  <div className="chat__bulle">
                    {msg.enChargement ? (
                      <span className="chat__typing" aria-label={t('chat.thinking')}>
                        <span /><span /><span />
                      </span>
                    ) : (
                      msg.contenu
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message d'erreur */}
            {erreur && (
              <div className="chat__erreur" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {erreur}
              </div>
            )}

            {/* Zone de saisie */}
            <div className="chat__saisie">
              <textarea
                ref={refInput}
                className="chat__input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder')}
                rows={1}
                disabled={enChargement}
                aria-label={t('chat.placeholder')}
              />
              <button
                className="chat__envoyer"
                onClick={envoyerMessage}
                disabled={!inputValue.trim() || enChargement}
                aria-label={t('chat.send')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton démo flottant — juste au-dessus du chat */}
      <motion.button
        className="demo__btn-flottant"
        onClick={ouvrirModalDemo}
        aria-label={t('chat.demoBtnAriaLabel')}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {t('chat.demoBtn')}
      </motion.button>

      {/* Bouton flottant chat + tooltip */}
      <div className="chat__zone-flottante">
        {/* Tooltip */}
        <AnimatePresence>
          {tooltipVisible && !ouvert && (
            <motion.div
              className="chat__tooltip"
              role="tooltip"
              initial={{ opacity: 0, x: 10, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {t('chat.tooltip')}
              {/* Flèche pointant vers le chat */}
              <span className="chat__tooltip-flèche" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton flottant */}
        <motion.button
          className={`chat__bouton-flottant ${ouvert ? 'chat__bouton-flottant--ouvert' : ''}`}
          onClick={ouvrirChat}
          aria-label={ouvert ? t('chat.close') : t('chat.open')}
          aria-expanded={ouvert}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {ouvert ? (
              <motion.span
                key="fermer"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>

          {/* Indicateur en ligne */}
          {!ouvert && (
            <span className="chat__badge-en-ligne" aria-hidden="true" />
          )}
        </motion.button>
      </div>
    </>
  )
}
