/* Page Politique de confidentialité — conformité RGPD */
import PageLegale from './PageLegale'
import { ENTREPRISE } from './infosLegales'

export default function Confidentialite() {
  return (
    <PageLegale titre="Politique de confidentialité" dateMaj="28 juillet 2026">
      <h2>1. Responsable du traitement</h2>
      <dl className="page-legale__fiche">
        <dt>Responsable du traitement</dt>
        <dd>{ENTREPRISE.raisonSociale}</dd>

        <dt>Numéro d'entreprise (BCE)</dt>
        <dd>{ENTREPRISE.numéroEntreprise}</dd>

        <dt>Siège social</dt>
        <dd>{ENTREPRISE.siègeSocial}</dd>

        <dt>Contact vie privée</dt>
        <dd>
          <a href={`mailto:${ENTREPRISE.email}`}>{ENTREPRISE.email}</a>
        </dd>
      </dl>
      <p>
        {ENTREPRISE.raisonSociale}, exploitant du site{' '}
        <a href={ENTREPRISE.siteWeb}>airia.be</a> sous la marque {ENTREPRISE.marque}, est
        responsable du traitement des données personnelles collectées via ce site, au sens du
        Règlement (UE) 2016/679 (« RGPD ») et de la loi belge du 30 juillet 2018.
      </p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>
          <strong>Données de contact</strong> : nom, adresse email, numéro de téléphone, société,
          transmis via les formulaires de contact, la prise de rendez-vous ou WhatsApp.
        </li>
        <li>
          <strong>Échanges avec l'assistant IA</strong> : contenu des messages envoyés au chat du
          site, utilisé pour générer les réponses.
        </li>
        <li>
          <strong>Données de facturation</strong> : coordonnées et références de paiement des
          clients, traitées via nos prestataires de paiement (Stripe, Mollie).
        </li>
        <li>
          <strong>Données techniques</strong> : préférence de langue (stockée localement dans le
          navigateur) et données de fonctionnement strictement nécessaires au site.
        </li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>
          répondre aux demandes de contact et de démonstration — <em>mesures précontractuelles</em>{' '}
          (art. 6.1.b RGPD) ;
        </li>
        <li>
          fournir et facturer les services souscrits — <em>exécution du contrat</em> (art. 6.1.b) et{' '}
          <em>obligations légales</em> comptables et fiscales (art. 6.1.c) ;
        </li>
        <li>
          faire fonctionner l'assistant conversationnel du site — <em>intérêt légitime</em> à
          renseigner les visiteurs (art. 6.1.f) ;
        </li>
        <li>
          prospection B2B et communication commerciale — <em>intérêt légitime</em> (art. 6.1.f) ou{' '}
          <em>consentement</em> lorsque requis (art. 6.1.a), avec possibilité de s'opposer à tout
          moment.
        </li>
      </ul>

      <h2>4. Durées de conservation</h2>
      <ul>
        <li>demandes de contact et prospects : 3 ans après le dernier contact ;</li>
        <li>données contractuelles et de facturation : 7 ans (obligations comptables et fiscales belges) ;</li>
        <li>conversations avec l'assistant IA : durée nécessaire au traitement de la demande, 12 mois maximum ;</li>
        <li>préférence de langue : conservée localement dans votre navigateur jusqu'à suppression par vos soins.</li>
      </ul>

      <h2>5. Destinataires et transferts</h2>
      <p>
        Les données sont traitées par le personnel habilité de {ENTREPRISE.raisonSociale} et par des
        sous-traitants techniques strictement nécessaires : hébergement (Vercel), IA conversationnelle
        (Anthropic), téléphonie IA (Vapi), automatisation (n8n), CRM (Airtable), paiement (Stripe,
        Mollie), prise de rendez-vous (Calendly). Certains de ces prestataires sont situés hors de
        l'Union européenne ; dans ce cas, les transferts sont encadrés par des garanties appropriées
        (clauses contractuelles types de la Commission européenne ou décision d'adéquation, tel le
        EU-US Data Privacy Framework). Les données ne sont jamais vendues à des tiers.
      </p>

      <h2>6. Vos droits</h2>
      <p>Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>droit d'accès à vos données ;</li>
        <li>droit de rectification des données inexactes ;</li>
        <li>droit à l'effacement (« droit à l'oubli ») ;</li>
        <li>droit à la limitation du traitement ;</li>
        <li>droit à la portabilité de vos données ;</li>
        <li>droit d'opposition, notamment à la prospection ;</li>
        <li>droit de retirer votre consentement à tout moment, sans effet rétroactif.</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à{' '}
        <a href={`mailto:${ENTREPRISE.email}`}>{ENTREPRISE.email}</a>. Une réponse vous sera
        apportée dans un délai d'un mois. Vous pouvez également introduire une réclamation auprès de
        l'Autorité de protection des données belge (APD) : Rue de la Presse 35, 1000 Bruxelles —{' '}
        <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer">
          autoriteprotectiondonnees.be
        </a>.
      </p>

      <h2>7. Cookies et stockage local</h2>
      <p>
        Le site n'utilise pas de cookies publicitaires ni de traceurs de suivi tiers. Seul un
        stockage local technique est utilisé : la mémorisation de votre langue préférée
        (localStorage), strictement nécessaire au fonctionnement du site et exemptée de
        consentement. Si des cookies de mesure d'audience ou marketing venaient à être introduits,
        un bandeau de consentement conforme serait mis en place au préalable.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        {ENTREPRISE.raisonSociale} met en œuvre des mesures techniques et organisationnelles
        appropriées (chiffrement TLS, contrôle d'accès, minimisation des données, clés API côté
        serveur) pour protéger vos données contre l'accès non autorisé, la perte ou l'altération.
      </p>

      <h2>9. Modifications</h2>
      <p>
        La présente politique peut être mise à jour pour refléter l'évolution de nos services ou de
        la réglementation. La date de dernière mise à jour figure en haut de cette page.
      </p>
    </PageLegale>
  )
}
