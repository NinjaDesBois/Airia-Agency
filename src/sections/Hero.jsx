/* Section Hero — Scène 3D + headline + CTAs — Airia */
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ouvrirModalContact } from '../components/ModalContact'
import './Hero.css'

/* ===== Shader personnalisé pour la sphère cyan ===== */
const MatériauSphère = shaderMaterial(
  {
    uTemps: 0,
    uCouleur: new THREE.Color('#00F5FF'),
  },
  /* Vertex shader */
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* Fragment shader — effet fresnel + grille animée */
  `
    uniform float uTemps;
    uniform vec3 uCouleur;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 directionVue = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - max(dot(vNormal, directionVue), 0.0), 2.5);

      float ligneU = step(0.96, fract(vUv.x * 14.0 + uTemps * 0.04));
      float ligneV = step(0.96, fract(vUv.y * 14.0));
      float grille = max(ligneU, ligneV);

      vec3 couleurBase = vec3(0.02, 0.05, 0.12);
      vec3 couleur = mix(couleurBase, uCouleur, fresnel * 0.9 + grille * 0.5);

      float alpha = fresnel * 0.85 + grille * 0.4 + 0.05;
      gl_FragColor = vec4(couleur, alpha);
    }
  `
)
extend({ MatériauSphère })

/* ===== Composant sphère animée ===== */
function SphèreIA() {
  const refMatériau = useRef()
  const refSphère = useRef()

  useFrame((état, delta) => {
    if (refMatériau.current) {
      refMatériau.current.uTemps += delta
    }
    if (refSphère.current) {
      refSphère.current.rotation.y += delta * 0.12
      refSphère.current.rotation.x += delta * 0.04
    }
  })

  return (
    <mesh ref={refSphère} position={[0, 0, 0]}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <matériauSphère
        ref={refMatériau}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ===== Composant particules flottantes ===== */
function Particules() {
  const refParticules = useRef()
  const nbParticules = 2000

  const positions = useMemo(() => {
    const pos = new Float32Array(nbParticules * 3)
    for (let i = 0; i < nbParticules; i++) {
      const rayon = Math.random() * 3.5 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      pos[i * 3] = rayon * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = rayon * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = rayon * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((état, delta) => {
    if (refParticules.current) {
      refParticules.current.rotation.y += delta * 0.05
      refParticules.current.rotation.x += delta * 0.02
    }
  })

  return (
    <points ref={refParticules}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={nbParticules}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#00F5FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ===== Lueur ambiante centrale ===== */
function LueurAmbiante() {
  const refLueur = useRef()

  useFrame((état, delta) => {
    if (refLueur.current) {
      refLueur.current.intensity = 1.5 + Math.sin(état.clock.elapsedTime * 0.8) * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight ref={refLueur} position={[0, 0, 3]} color="#00F5FF" intensity={1.5} distance={10} />
      <pointLight position={[3, 2, 0]} color="#00C4CC" intensity={0.8} distance={8} />
    </>
  )
}

/* ===== Composant principal Hero ===== */
export default function Hero() {
  const refContenu = useRef(null)

  // Animation d'entrée GSAP pour le contenu
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero__badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.hero__titre',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
      )
      gsap.fromTo(
        '.hero__sous-titre',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.9 }
      )
      gsap.fromTo(
        '.hero__actions',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.1 }
      )
      gsap.fromTo(
        '.hero__confiance',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.3 }
      )
    }, refContenu)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero" aria-label="Section principale">
      {/* Scène Three.js en arrière-plan */}
      <div className="hero__canvas-wrapper" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <LueurAmbiante />
          <SphèreIA />
          <Particules />
        </Canvas>
      </div>

      {/* Gradient de fond */}
      <div className="hero__fond" aria-hidden="true" />

      {/* Contenu principal */}
      <div className="hero__contenu conteneur" ref={refContenu}>
        {/* Badge */}
        <div className="hero__badge badge">
          Nouveau · Déployé en 48h
        </div>

        {/* Titre principal */}
        <h1 className="hero__titre">
          Votre agence tourne
          <br />
          <span className="texte-dégradé">toute seule.</span>
          <br />
          Vous fermez les deals.
        </h1>

        {/* Sous-titre */}
        <p className="hero__sous-titre">
          Airia automatise la prospection, les appels et les campagnes
          <br className="hero__saut-ligne" />
          de vos clients PME. Vous récoltez les abonnements.
        </p>

        {/* Boutons CTA */}
        <div className="hero__actions">
          <BoutonMagnétique
            className="btn-primaire hero__btn-principal"
            onClick={ouvrirModalContact}
          >
            Réserver un appel stratégique
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </BoutonMagnétique>

          <a href="#fonctionnalites" className="btn-secondaire hero__btn-secondaire">
            Voir la démo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10,8 16,12 10,16 10,8"/>
            </svg>
          </a>
        </div>

        {/* Barre de confiance */}
        <div className="hero__confiance">
          <div className="hero__confiance-séparateur" aria-hidden="true" />
          <p className="hero__confiance-texte">
            <span className="hero__confiance-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
              12 agences déjà testées
            </span>
            <span className="hero__confiance-point" aria-hidden="true">·</span>
            <span className="hero__confiance-item">Déployé en 48h</span>
            <span className="hero__confiance-point" aria-hidden="true">·</span>
            <span className="hero__confiance-item">Sans engagement</span>
          </p>
          <div className="hero__confiance-séparateur" aria-hidden="true" />
        </div>
      </div>

      {/* Indicateur de défilement */}
      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="1" width="18" height="30" rx="9" />
          <circle cx="10" cy="8" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  )
}

/* ===== Bouton magnétique — effet de suivi curseur ===== */
function BoutonMagnétique({ children, className, href, onClick }) {
  const refBouton = useRef(null)

  const handleMouseMove = (e) => {
    const rect = refBouton.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(refBouton.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(refBouton.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const propsCommuns = {
    ref: refBouton,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }

  /* Rendu <button> si onClick fourni, <a> si href fourni */
  if (onClick) {
    return (
      <button {...propsCommuns} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <a {...propsCommuns} href={href}>
      {children}
    </a>
  )
}
