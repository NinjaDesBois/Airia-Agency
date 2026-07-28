/* Page Mentions légales — identification de l'entité exploitant le site Airia */
import PageLegale from './PageLegale'
import { ENTREPRISE } from './infosLegales'

export default function MentionsLegales() {
  return (
    <PageLegale titre="Mentions légales" dateMaj="28 juillet 2026">
      <p>
        Le site <a href={ENTREPRISE.siteWeb}>airia.be</a> et la marque commerciale{' '}
        <strong>{ENTREPRISE.marque}</strong> sont exploités par la société suivante :
      </p>

      <dl className="page-legale__fiche">
        <dt>Raison sociale</dt>
        <dd>{ENTREPRISE.raisonSociale}</dd>

        <dt>Forme juridique</dt>
        <dd>{ENTREPRISE.formeJuridique}</dd>

        <dt>Numéro d'entreprise (BCE)</dt>
        <dd>{ENTREPRISE.numéroEntreprise}</dd>

        <dt>Numéro de TVA</dt>
        <dd>{ENTREPRISE.tva} — assujettie à la TVA en Belgique</dd>

        <dt>Siège social</dt>
        <dd>{ENTREPRISE.siègeSocial}</dd>

        <dt>Contact</dt>
        <dd>
          <a href={`mailto:${ENTREPRISE.email}`}>{ENTREPRISE.email}</a>
        </dd>
      </dl>

      <h2>Nom commercial</h2>
      <p>
        « {ENTREPRISE.marque} » est le nom commercial sous lequel {ENTREPRISE.raisonSociale} propose
        ses services d'automatisation et d'agents IA. Toute relation contractuelle liée au site ou
        aux services {ENTREPRISE.marque} est conclue avec {ENTREPRISE.raisonSociale}.
      </p>

      <h2>Directeur de la publication</h2>
      <p>
        La direction de la publication est assurée par le gérant de {ENTREPRISE.raisonSociale},
        joignable à l'adresse <a href={`mailto:${ENTREPRISE.email}`}>{ENTREPRISE.email}</a>.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
        (<a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus du site (textes, visuels, logos, code, éléments graphiques) est la
        propriété de {ENTREPRISE.raisonSociale} ou fait l'objet d'une autorisation d'utilisation.
        Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite.
      </p>

      <h2>Documents liés</h2>
      <ul>
        <li><a href="/cgv">Conditions Générales de Vente et d'Utilisation</a></li>
        <li><a href="/confidentialite">Politique de confidentialité</a></li>
      </ul>
    </PageLegale>
  )
}
