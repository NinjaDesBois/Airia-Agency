/* Contenu SEO crawlable — texte visible dans le DOM pour Google */
export default function SeoContent() {
  return (
    <section
      style={{
        background: 'transparent',
        color: '#555',
        fontSize: '0.8rem',
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
        lineHeight: '1.6',
      }}
    >
      <h2 style={{ fontSize: '0.95rem', color: '#666', marginBottom: '0.5rem' }}>
        Automatisation IA pour PME en Belgique
      </h2>
      <p>
        Airia conçoit des systèmes d'automatisation sur mesure pour les PME belges.
        Nos agents IA prennent en charge les tâches répétitives — réponse aux appels,
        qualification de leads, envoi d'emails, gestion des rendez-vous — pour que vous
        puissiez vous concentrer sur votre cœur de métier.
      </p>

      <h3 style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem', marginBottom: '0.5rem' }}>
        Secteurs que nous servons
      </h3>
      <p>
        Nous travaillons avec les agences immobilières, cabinets dentaires, avocats,
        notaires, comptables, plombiers et artisans, web agencies, et PME en général
        à travers Bruxelles, Charleroi, Liège, Namur, Brabant Wallon et toute la Belgique.
      </p>

      <h3 style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem', marginBottom: '0.5rem' }}>
        Nos systèmes IA
      </h3>
      <p>
        Voice IA — réceptionniste vocale disponible 24h/24 et 7j/7. Lead Generation
        automatisée par email et SMS. Pub Meta IA pour vos campagnes Facebook et Instagram.
        Agents multilingues en français, néerlandais, anglais et allemand. Dashboard
        client en temps réel. Intégrations avec plus de 50 outils : n8n, Airtable,
        HubSpot, Twilio, et bien d'autres.
      </p>

      <h3 style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem', marginBottom: '0.5rem' }}>
        Pourquoi choisir Airia
      </h3>
      <p>
        Agence belge, livraison en 48h, sans frais de setup, à partir de 500€ par mois.
        Nos systèmes sont conçus pour fonctionner à 99% de manière autonome.
        Contactez-nous à hello@airia.be ou réservez un appel sur Calendly.
      </p>
    </section>
  )
}
