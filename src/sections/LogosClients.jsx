/* Section Logos Clients — Marquee d'outils intégrés — Airia */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LogosClients.css'

gsap.registerPlugin(ScrollTrigger)

/* Logos outils avec SVG inline */
const outilsIntégrés = [
  {
    nom: 'n8n',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
  {
    nom: 'Airtable',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.984 0L0 4.357v2.25l11.984 4.358L24 6.607V4.357L11.984 0zM0 9.536v8.928l10.93 3.973V13.51L0 9.536zm13.07 3.973v8.928L24 18.464V9.536l-10.93 3.973z"/>
      </svg>
    ),
  },
  {
    nom: 'Claude AI',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 4a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 10.5c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
      </svg>
    ),
  },
  {
    nom: 'Meta',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.195 0 11.65 0 14.09c0 1.47.289 2.73.94 3.64.62.88 1.503 1.338 2.555 1.338 1.087 0 1.856-.468 2.847-1.86l1.284-1.998c.871-1.355 1.708-2.517 2.88-2.517 1.07 0 1.977.86 2.88 2.517l1.284 1.999c.992 1.391 1.76 1.86 2.847 1.86 1.052 0 1.935-.458 2.555-1.338.651-.91.94-2.17.94-3.64 0-2.44-.704-4.895-2.044-6.947-1.188-1.832-2.903-3.113-4.871-3.113-1.539 0-2.57.659-3.577 1.957L12 7.42l-.432-.567C10.485 4.69 9.454 4.03 7.915 4.03h-1z"/>
      </svg>
    ),
  },
  {
    nom: 'Make',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.194.006C5.47-.171.012 5.018 0 11.743c-.013 6.726 5.425 12.24 12.15 12.253 3.149.006 6.005-1.196 8.142-3.147l-2.904-2.904A7.975 7.975 0 0112.15 20c-4.41-.008-7.978-3.59-7.97-8 .008-4.41 3.59-7.978 8-7.97 4.41.008 7.977 3.59 7.97 8a7.972 7.972 0 01-1.94 5.217l2.904 2.904A12.132 12.132 0 0024 11.987C23.987 5.262 18.92.183 12.194.006z"/>
      </svg>
    ),
  },
  {
    nom: 'Zapier',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14.786 9.214H24v5.572h-9.214V24H9.214v-9.214H0V9.214h9.214V0h5.572v9.214z"/>
      </svg>
    ),
  },
  {
    nom: 'HubSpot',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.175 11.078A4.308 4.308 0 0019.02 7.02V4.898a1.56 1.56 0 00.919-1.424 1.56 1.56 0 00-1.56-1.56 1.56 1.56 0 00-1.56 1.56 1.56 1.56 0 00.919 1.424v2.122a4.31 4.31 0 00-2.25 1.198L8.133 3.35a1.7 1.7 0 00.062-.437 1.718 1.718 0 10-1.718 1.719c.215 0 .421-.038.608-.107l7.22 4.757a4.284 4.284 0 00-.51 2.017 4.31 4.31 0 001.002 2.77l-2.19 2.19a1.47 1.47 0 00-.42-.064 1.496 1.496 0 101.496 1.496c0-.15-.021-.295-.062-.433l2.163-2.163a4.31 4.31 0 002.75.979 4.316 4.316 0 004.316-4.316 4.31 4.31 0 00-.665-2.278zm-3.65 4.162a1.885 1.885 0 110-3.77 1.885 1.885 0 010 3.77z"/>
      </svg>
    ),
  },
  {
    nom: 'Twilio',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20.4A8.4 8.4 0 113.6 12 8.41 8.41 0 0112 20.4zM9.6 10.8a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm4.8 0a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm-4.8 4.8a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zm4.8 0a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"/>
      </svg>
    ),
  },
]

export default function LogosClients() {
  const refSection = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.logos__titre',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.logos__titre', start: 'top 85%' },
        }
      )
    }, refSection)

    return () => ctx.revert()
  }, [])

  return (
    <section className="logos" ref={refSection} aria-label="Outils intégrés">
      <div className="conteneur">
        <p className="logos__titre">
          Connecté à vos outils préférés
        </p>
      </div>

      {/* Bande défilante (marquee) */}
      <div className="logos__piste" aria-hidden="true">
        <div className="logos__rail">
          {/* Dupliquer pour boucle infinie */}
          {[...outilsIntégrés, ...outilsIntégrés].map((outil, index) => (
            <div key={`${outil.nom}-${index}`} className="logos__item">
              <div className="logos__icône">{outil.svg}</div>
              <span className="logos__nom">{outil.nom}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
