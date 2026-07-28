/* Page CGV/CGU — conditions générales de vente et d'utilisation des services Airia */
import PageLegale from './PageLegale'
import { ENTREPRISE } from './infosLegales'

export default function CGV() {
  return (
    <PageLegale titre="Conditions Générales de Vente et d'Utilisation" dateMaj="28 juillet 2026">
      <h2>1. Identification du vendeur</h2>
      <dl className="page-legale__fiche">
        <dt>Raison sociale</dt>
        <dd>{ENTREPRISE.raisonSociale}</dd>

        <dt>Forme juridique</dt>
        <dd>{ENTREPRISE.formeJuridique}</dd>

        <dt>Numéro d'entreprise (BCE)</dt>
        <dd>{ENTREPRISE.numéroEntreprise}</dd>

        <dt>Numéro de TVA</dt>
        <dd>{ENTREPRISE.tva}</dd>

        <dt>Siège social</dt>
        <dd>{ENTREPRISE.siègeSocial}</dd>

        <dt>Contact</dt>
        <dd>
          <a href={`mailto:${ENTREPRISE.email}`}>{ENTREPRISE.email}</a>
        </dd>
      </dl>
      <p>
        {ENTREPRISE.raisonSociale} (ci-après « le Prestataire ») commercialise ses services sous le
        nom commercial « {ENTREPRISE.marque} ».
      </p>

      <h2>2. Champ d'application</h2>
      <p>
        Les présentes Conditions Générales de Vente et d'Utilisation (ci-après « CGV/CGU »)
        s'appliquent à toute prestation de services conclue entre le Prestataire et un client
        professionnel (ci-après « le Client »). Les services du Prestataire s'adressent
        exclusivement à des professionnels (B2B) : entreprises, indépendants et professions
        libérales. Toute commande implique l'acceptation sans réserve des présentes CGV/CGU, qui
        prévalent sur tout autre document du Client, sauf accord écrit contraire.
      </p>

      <h2>3. Objet du contrat</h2>
      <p>
        Le Prestataire fournit des services de mise en place, de configuration et d'exploitation
        d'agents d'intelligence artificielle et d'automatisations pour PME, notamment :
      </p>
      <ul>
        <li>réceptionniste vocale IA (accueil téléphonique automatisé 24/7) ;</li>
        <li>génération de leads automatisée (prospection email/SMS) ;</li>
        <li>campagnes publicitaires Meta pilotées par IA ;</li>
        <li>agents conversationnels multilingues (FR/NL/EN/DE) ;</li>
        <li>tableaux de bord et reporting ;</li>
        <li>intégrations avec les outils du Client (CRM, téléphonie, calendriers, etc.).</li>
      </ul>
      <p>
        Le périmètre exact des services souscrits est défini dans l'offre ou le bon de commande
        accepté par le Client.
      </p>

      <h2>4. Prix et modalités de paiement</h2>
      <p>
        Les services sont facturés sous forme d'abonnement mensuel récurrent, selon le tarif indiqué
        dans l'offre acceptée par le Client. Sauf mention contraire, les prix s'entendent hors TVA.
        Les factures sont payables à réception, par domiciliation, carte bancaire ou virement.
      </p>
      <p>
        Tout retard de paiement entraîne de plein droit et sans mise en demeure préalable,
        conformément à la loi belge du 2 août 2002 concernant la lutte contre le retard de paiement
        dans les transactions commerciales, des intérêts de retard au taux légal applicable ainsi
        qu'une indemnité forfaitaire de recouvrement de 40 €. Le Prestataire peut suspendre les
        services en cas d'impayé persistant après notification.
      </p>

      <h2>5. Durée, renouvellement et résiliation</h2>
      <p>
        Sauf stipulation contraire dans l'offre, l'abonnement est conclu pour une durée initiale
        d'un mois, renouvelable tacitement par périodes successives d'un mois. Chaque partie peut
        résilier l'abonnement par écrit (email accepté) moyennant un préavis de 30 jours avant la
        fin de la période en cours.
      </p>
      <p>
        En cas de manquement grave d'une partie à ses obligations, non réparé dans les 15 jours
        d'une mise en demeure écrite, l'autre partie peut résilier le contrat immédiatement, sans
        préjudice de tous dommages et intérêts. À la fin du contrat, le Prestataire restitue au
        Client les données lui appartenant sur demande formulée dans les 30 jours, puis les supprime.
      </p>

      <h2>6. Obligations du Prestataire</h2>
      <p>
        Le Prestataire s'engage à exécuter les services avec soin et diligence, conformément aux
        règles de l'art. Sauf engagement écrit contraire, ses obligations sont des obligations de
        moyens. Les services reposant sur des plateformes tierces (téléphonie, IA, publicité,
        hébergement), le Prestataire ne garantit pas une disponibilité ininterrompue de ceux-ci.
      </p>

      <h2>7. Obligations du Client</h2>
      <ul>
        <li>fournir des informations exactes et à jour nécessaires à la mise en place des services ;</li>
        <li>disposer des droits et autorisations requis sur les données, contenus et comptes confiés au Prestataire ;</li>
        <li>utiliser les services conformément à la loi, notamment en matière de prospection électronique et de protection des données ;</li>
        <li>informer ses propres clients et prospects, lorsque requis, de l'utilisation d'agents automatisés.</li>
      </ul>

      <h2>8. Responsabilité</h2>
      <p>
        La responsabilité totale du Prestataire, toutes causes confondues, est limitée au montant
        des sommes effectivement payées par le Client au titre des 12 derniers mois précédant le
        fait générateur. Le Prestataire ne répond pas des dommages indirects (perte de chiffre
        d'affaires, de clientèle, de données, atteinte à l'image), ni des contenus générés par les
        systèmes d'IA lorsque le Client les a validés ou diffusés, ni des défaillances imputables
        aux plateformes tierces ou au Client. Rien dans les présentes n'exclut la responsabilité
        pour dol ou faute intentionnelle.
      </p>

      <h2>9. Propriété intellectuelle</h2>
      <p>
        Les configurations, prompts, workflows et développements réalisés par le Prestataire restent
        sa propriété. Le Client bénéficie d'un droit d'utilisation non exclusif pendant la durée du
        contrat. Les données, marques et contenus fournis par le Client restent la propriété du
        Client.
      </p>

      <h2>10. Données personnelles</h2>
      <p>
        Le traitement des données personnelles est décrit dans la{' '}
        <a href="/confidentialite">Politique de confidentialité</a>. Lorsque le Prestataire traite
        des données personnelles pour le compte du Client dans le cadre des services, il agit en
        qualité de sous-traitant au sens du RGPD et les parties concluent, si nécessaire, un accord
        de traitement des données.
      </p>

      <h2>11. Force majeure</h2>
      <p>
        Aucune partie ne peut être tenue responsable d'un manquement dû à un événement de force
        majeure au sens du droit belge. La partie affectée en informe l'autre sans délai ; si
        l'événement perdure plus de 60 jours, chaque partie peut résilier le contrat sans indemnité.
      </p>

      <h2>12. Droit applicable et juridiction compétente</h2>
      <p>
        Les présentes CGV/CGU et toute relation contractuelle entre le Prestataire et le Client sont
        régies par le <strong>droit belge</strong>. Tout litige relatif à leur formation, leur
        exécution ou leur interprétation relève de la compétence exclusive des{' '}
        <strong>tribunaux de l'arrondissement judiciaire du Hainaut, division Mons</strong>, sans
        préjudice des règles impératives de compétence.
      </p>

      <h2>13. Divers</h2>
      <p>
        Si une clause des présentes est déclarée nulle ou inapplicable, les autres clauses restent
        en vigueur. Le Prestataire peut modifier les présentes CGV/CGU ; la version applicable est
        celle en vigueur au jour de la commande ou du renouvellement de l'abonnement.
      </p>
    </PageLegale>
  )
}
