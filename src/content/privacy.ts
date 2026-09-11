import type { Localized } from '../i18n/types'
import { company } from './site'

/**
 * Text of the privacy notice, in both site languages.
 *
 * Template based on articles 13-14 GDPR: before publishing, have it checked and
 * confirm the values that depend on how the company actually works — the mailbox
 * for data-subject requests, the retention periods in section 7, and whether a DPO
 * has been appointed.
 */

export type PrivacyBlock =
  | { kind: 'paragraph'; text: Localized }
  | { kind: 'list'; items: Localized[] }

export interface PrivacySection {
  number: string
  heading: Localized
  blocks: PrivacyBlock[]
}

const contactEmail = 'privacy@contactsrl.net'

function paragraph(it: string, en: string): PrivacyBlock {
  return { kind: 'paragraph', text: { it, en } }
}

function list(items: [string, string][]): PrivacyBlock {
  return { kind: 'list', items: items.map(([it, en]) => ({ it, en })) }
}

export const privacy = {
  eyebrow: { it: 'Informativa', en: 'Privacy notice' } satisfies Localized,
  title: {
    it: 'Informativa sul trattamento dei dati personali',
    en: 'Personal data processing notice',
  } satisfies Localized,
  updated: {
    it: 'Ultimo aggiornamento: 11 settembre 2026',
    en: 'Last updated: 11 September 2026',
  } satisfies Localized,
  intro: {
    it: `Ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR), ${company.name} descrive di seguito come tratta i dati personali raccolti attraverso questo sito, in particolare quelli inviati con il modulo di contatto.`,
    en: `Under articles 13 and 14 of Regulation (EU) 2016/679 (GDPR), ${company.name} describes below how it processes the personal data collected through this site, in particular the data sent through the contact form.`,
  } satisfies Localized,
  backToSite: { it: 'Torna al sito', en: 'Back to the site' } satisfies Localized,
  sections: [
    {
      number: '01',
      heading: { it: 'Titolare del trattamento', en: 'Data controller' },
      blocks: [
        paragraph(
          `${company.name}, ${company.address[0]}, ${company.address[1]} — ${company.vat}. Telefono ${company.phone}.`,
          `${company.name}, ${company.address[0]}, ${company.address[1]} — ${company.vat}. Phone ${company.phone}.`,
        ),
        paragraph(
          `Per qualsiasi questione relativa ai dati personali puoi scrivere a ${contactEmail}.`,
          `For any matter concerning personal data you can write to ${contactEmail}.`,
        ),
      ],
    },
    {
      number: '02',
      heading: { it: 'Dati trattati', en: 'Data processed' },
      blocks: [
        list([
          [
            'I dati che inserisci nel modulo: nome e cognome, indirizzo email, numero di telefono (facoltativo) e il contenuto del messaggio.',
            'The data you enter in the form: name and surname, email address, phone number (optional) and the content of your message.',
          ],
          [
            "Alcuni dati tecnici raccolti al momento dell'invio: indirizzo IP, tipo di browser, data e ora, tempo impiegato a compilare il modulo.",
            'Some technical data collected when you submit: IP address, browser type, date and time, and how long you took to fill in the form.',
          ],
          [
            'I dati di navigazione registrati nei log del server web dal fornitore di hosting (indirizzo IP, pagine richieste, data e ora).',
            'Browsing data recorded in the web server logs by the hosting provider (IP address, pages requested, date and time).',
          ],
        ]),
        paragraph(
          "Ti chiediamo di non inserire nel messaggio dati appartenenti alle categorie particolari dell'articolo 9 del GDPR (per esempio dati relativi alla salute) né dati riferiti a terze persone senza il loro consenso.",
          'Please do not include in your message any data belonging to the special categories of article 9 GDPR (health data, for example) or data about other people without their consent.',
        ),
      ],
    },
    {
      number: '03',
      heading: { it: 'Finalità e base giuridica', en: 'Purposes and legal basis' },
      blocks: [
        list([
          [
            "Rispondere alla tua richiesta e, se si tratta di una candidatura, valutare il profilo in vista di un eventuale rapporto di lavoro: esecuzione di misure precontrattuali (art. 6.1.b) e consenso espresso con la spunta nel modulo (art. 6.1.a).",
            'Replying to your request and, for an application, assessing your profile with a view to a possible employment relationship: pre-contractual measures (art. 6.1.b) and the consent you give by ticking the box in the form (art. 6.1.a).',
          ],
          [
            'Impedire invii automatici e abusi del modulo, attraverso il controllo sui dati tecnici e un limite al numero di invii: legittimo interesse del Titolare a proteggere il servizio (art. 6.1.f).',
            'Preventing automated submissions and abuse of the form, through checks on technical data and a limit on the number of submissions: the controller’s legitimate interest in protecting the service (art. 6.1.f).',
          ],
          [
            'Garantire la sicurezza e il corretto funzionamento del sito attraverso i log del server: legittimo interesse del Titolare (art. 6.1.f).',
            'Ensuring the security and correct operation of the site through server logs: the controller’s legitimate interest (art. 6.1.f).',
          ],
        ]),
        paragraph(
          'I dati non sono usati per invii commerciali né per attività di profilazione.',
          'Your data is not used for marketing messages or for profiling.',
        ),
      ],
    },
    {
      number: '04',
      heading: { it: 'Natura del conferimento', en: 'Whether providing data is required' },
      blocks: [
        paragraph(
          "Nome, indirizzo email e consenso sono necessari per inviare il modulo; il numero di telefono è facoltativo. Se preferisci non fornirli puoi sempre contattarci per telefono: non potrai soltanto usare il modulo.",
          'Your name, email address and consent are needed to submit the form; the phone number is optional. If you prefer not to provide them you can always call us instead: the only consequence is that you cannot use the form.',
        ),
      ],
    },
    {
      number: '05',
      heading: { it: 'Destinatari dei dati', en: 'Who receives the data' },
      blocks: [
        paragraph(
          'I dati sono trattati dal personale autorizzato del Titolare, istruito sul trattamento.',
          'The data is handled by the controller’s authorised staff, instructed on how to process it.',
        ),
        paragraph(
          "Il sito e le caselle di posta sono ospitati sui server di Aruba S.p.A., che agisce come Responsabile del trattamento ai sensi dell'articolo 28 del GDPR.",
          'The site and the mailboxes are hosted on the servers of Aruba S.p.A., acting as data processor under article 28 GDPR.',
        ),
        paragraph(
          'I dati non sono diffusi né ceduti a terzi per finalità commerciali.',
          'Your data is never published or sold to third parties for commercial purposes.',
        ),
      ],
    },
    {
      number: '06',
      heading: { it: "Trasferimento fuori dall'Unione Europea", en: 'Transfers outside the European Union' },
      blocks: [
        paragraph(
          "I dati del modulo sono conservati su server situati nell'Unione Europea e non sono trasferiti verso Paesi terzi.",
          'Form data is stored on servers located in the European Union and is not transferred to third countries.',
        ),
        paragraph(
          'I caratteri tipografici sono ospitati sullo stesso dominio del sito: la navigazione non comporta richieste verso servizi di terze parti.',
          'The typefaces are hosted on the same domain as the site: browsing it triggers no requests to third-party services.',
        ),
      ],
    },
    {
      number: '07',
      heading: { it: 'Periodo di conservazione', en: 'How long data is kept' },
      blocks: [
        list([
          [
            'Richieste inviate da aziende: 24 mesi dall’ultimo contatto.',
            'Requests sent by companies: 24 months from the last contact.',
          ],
          [
            'Candidature: 12 mesi dalla ricezione, salvo tua diversa richiesta.',
            'Job applications: 12 months from receipt, unless you ask otherwise.',
          ],
          [
            'Log tecnici del server: secondo i tempi del fornitore di hosting, di norma non oltre 12 mesi.',
            'Technical server logs: according to the hosting provider’s schedule, as a rule no longer than 12 months.',
          ],
        ]),
        paragraph(
          'Scaduti questi termini i dati sono cancellati o resi anonimi.',
          'Once those periods expire the data is deleted or anonymised.',
        ),
      ],
    },
    {
      number: '08',
      heading: { it: 'I tuoi diritti', en: 'Your rights' },
      blocks: [
        paragraph(
          "Puoi esercitare in qualsiasi momento i diritti previsti dagli articoli 15-22 del GDPR: accesso ai tuoi dati, rettifica, cancellazione, limitazione del trattamento, portabilità e opposizione.",
          'At any time you can exercise the rights set out in articles 15-22 GDPR: access to your data, rectification, erasure, restriction of processing, portability and objection.',
        ),
        paragraph(
          "Puoi inoltre revocare il consenso in qualsiasi momento, senza che ciò pregiudichi la liceità del trattamento svolto prima della revoca.",
          'You can also withdraw your consent at any time, without affecting the lawfulness of processing carried out before the withdrawal.',
        ),
        paragraph(
          `Per esercitare questi diritti scrivi a ${contactEmail}: riceverai risposta entro un mese dalla richiesta.`,
          `To exercise these rights write to ${contactEmail}: you will receive a reply within one month of your request.`,
        ),
        paragraph(
          'Se ritieni che il trattamento violi la normativa, hai diritto di proporre reclamo al Garante per la protezione dei dati personali (garanteprivacy.it).',
          'If you believe the processing infringes the law, you have the right to lodge a complaint with the Italian data protection authority, the Garante per la protezione dei dati personali (garanteprivacy.it).',
        ),
      ],
    },
    {
      number: '09',
      heading: { it: 'Cookie e tecnologie simili', en: 'Cookies and similar technologies' },
      blocks: [
        paragraph(
          'Questo sito non utilizza cookie di profilazione né strumenti di statistica di terze parti.',
          'This site uses no profiling cookies and no third-party analytics tools.',
        ),
        paragraph(
          "Per ricordare la lingua che hai scelto viene usata la memoria locale del browser (localStorage): è una preferenza tecnica, resta sul tuo dispositivo, non ci viene trasmessa e non richiede consenso.",
          'To remember the language you chose, the site uses the browser’s local storage: that is a technical preference, it stays on your device, it is never sent to us and it requires no consent.',
        ),
      ],
    },
    {
      number: '10',
      heading: { it: "Modifiche all'informativa", en: 'Changes to this notice' },
      blocks: [
        paragraph(
          "Il Titolare può aggiornare questa informativa: la versione vigente è sempre pubblicata su questa pagina, con la data dell'ultimo aggiornamento in cima.",
          'The controller may update this notice: the version in force is always published on this page, with the date of the last update at the top.',
        ),
      ],
    },
  ] satisfies PrivacySection[],
}
