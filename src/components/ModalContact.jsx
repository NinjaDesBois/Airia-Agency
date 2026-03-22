/* Modal de contact — WhatsApp + Calendly — Airia */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ModalContact.css'

const WHATSAPP_URL = 'https://wa.me/32495924243'
const CALENDLY_URL = 'CALENDLY_LINK_HERE'

/* Dispatch cet événement depuis n'importe quel CTA pour ouvrir le modal */
export function ouvrirModalContact() {
  window.dispatchEvent(new CustomEvent('airia:ouvrir-modal-contact'))
}

export default function ModalContact() {
  const [ouvert, setOuvert] = useState(false)

  /* Écoute l'événement global */
  useEffect(() => {
    const ouvrir = () => setOuvert(true)
    window.addEventListener('airia:ouvrir-modal-contact', ouvrir)
    return () => window.removeEventListener('airia:ouvrir-modal-contact', ouvrir)
  }, [])

  /* Fermeture via Escape + blocage du scroll */
  useEffect(() => {
    if (!ouvert) return
    const handleKey = (e) => { if (e.key === 'Escape') setOuvert(false) }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [ouvert])

  const fermer = () => setOuvert(false)

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          className="modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={fermer}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titre"
        >
          <motion.div
            className="modal__carte"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button className="modal__fermer" onClick={fermer} aria-label="Fermer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* En-tête */}
            <div className="modal__en-tête">
              <h2 id="modal-titre" className="modal__titre">
                Comment voulez-vous nous contacter ?
              </h2>
              <p className="modal__sous-titre">
                Choisissez l'option qui vous convient le mieux.
              </p>
            </div>

            {/* Options */}
            <div className="modal__options">
              {/* WhatsApp */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="modal__option modal__option--whatsapp"
                onClick={fermer}
              >
                <div className="modal__option-icône modal__option-icône--wa">
                  {/* Logo WhatsApp officiel */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="modal__option-texte">
                  <span className="modal__option-titre">Continuer sur WhatsApp</span>
                  <span className="modal__option-desc">Réponse rapide · Disponible maintenant</span>
                </div>
                <svg className="modal__option-flèche" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>

              {/* Calendly */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="modal__option modal__option--calendly"
                onClick={fermer}
              >
                <div className="modal__option-icône modal__option-icône--cal">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <circle cx="8" cy="14" r="0.5" fill="currentColor"/>
                    <circle cx="12" cy="14" r="0.5" fill="currentColor"/>
                    <circle cx="16" cy="14" r="0.5" fill="currentColor"/>
                    <circle cx="8" cy="18" r="0.5" fill="currentColor"/>
                    <circle cx="12" cy="18" r="0.5" fill="currentColor"/>
                  </svg>
                </div>
                <div className="modal__option-texte">
                  <span className="modal__option-titre">Réserver un créneau</span>
                  <span className="modal__option-desc">Appel 30 min · Choisissez votre horaire</span>
                </div>
                <svg className="modal__option-flèche" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
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
