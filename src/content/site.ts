import type { Localized } from '../i18n/types'

export const company = {
  name: 'Contact SRL',
  tagline: {
    it: 'Agenzia promozionale',
    en: 'Promotional agency',
  } satisfies Localized,
  phone: '+39 091 8433088',
  phoneHref: 'tel:+390918433088',
  mobile: '+39 320 368 4436',
  mobileHref: 'tel:+393203684436',
  address: ['Via Pio la Torre snc', '90044 Carini (Palermo)'],
  website: { label: 'contactsrl.net', href: 'https://contactsrl.net' },
  email: 'agenzia.contactdifazio@bofrost.it',
  pec: 'contactsrl@cgn.legalmail.it',
  facebook: {
    href: 'https://www.facebook.com/people/Contact-SRL/61554599708239/',
  },
  whatsapp: '+39 320 368 4436',
  whatsappHref: 'https://wa.me/+393203684436',
  vat: 'P. IVA 06017960821',
  copyright: '© 2026 Contact SRL — Via Pio la Torre snc, 90044 Carini (Palermo)',
}

export const navigation: { href: string; label: Localized }[] = [
  { href: '#azienda', label: { it: 'Azienda', en: 'Company' } },
  { href: '#soluzioni', label: { it: 'Soluzioni', en: 'Solutions' } },
  { href: '#metodo', label: { it: 'Metodo', en: 'Method' } },
  { href: '#percorsi', label: { it: 'Lavora con noi', en: 'Work with us' } },
  { href: '#contatti', label: { it: 'Contatti', en: 'Contact' } },
]

export const hero = {
  eyebrow: {
    it: 'Call center outbound — Carini, Palermo — dal 2010',
    en: 'Outbound call center — Carini, Palermo — since 2010',
  } satisfies Localized,
  title: {
    it: 'Ogni chiamata è una relazione. Noi la curiamo.',
    en: 'Every call is a relationship. We take care of it.',
  } satisfies Localized,
  body: {
    it: "Contact srl è un'azienda che nasce nel 2010, offrendo un servizio specializzato nel telemarketing. Costruiamo la voce che parla ai tuoi clienti: persone formate, processi chiari, risultati misurabili.",
    en: 'Contact srl was founded in 2010, offering a service specialised in telemarketing. We build the voice that speaks to your customers: trained people, clear processes, measurable results.',
  } satisfies Localized,
  primaryCta: { it: "Sei un'azienda?", en: "I'm a company" } satisfies Localized,
  secondaryCta: { it: 'Lavora con noi', en: 'Work with us' } satisfies Localized,
  facts: [
    {
      term: { it: 'Fondata', en: 'Founded' } satisfies Localized,
      value: '2010',
      lead: true,
    },
    {
      term: { it: 'Specializzazione', en: 'Specialisation' } satisfies Localized,
      value: 'Telemarketing',
      lead: false,
    },
    {
      term: { it: 'Sede', en: 'Headquarters' } satisfies Localized,
      value: 'Carini (PA)',
      lead: false,
    },
  ],
}

export const bannerAlt = {
  it: 'Sala riunioni della sede Contact SRL',
  en: 'Meeting room at the Contact SRL office',
} satisfies Localized

export const companySection = {
  index: { it: '01 — Azienda', en: '01 — Company' } satisfies Localized,
  quote: {
    it: 'Il team è formato da supervisor e team leader che ogni giorno vivono con passione e costanza il nostro lavoro.',
    en: 'The team is made up of supervisors and team leaders who live our work with passion and consistency every day.',
  } satisfies Localized,
  points: [
    {
      it: 'Sempre attenti ai nostri clienti: ogni campagna ha un supervisor dedicato e uno standard di qualità condiviso.',
      en: 'Always attentive to our clients: each campaign has a dedicated supervisor and a shared quality standard.',
    },
    {
      it: 'Sempre aggiornati sulle richieste del mercato, con una formazione che segue il prodotto e il pubblico.',
      en: 'Always up to date on market demands, with training that follows the product and the audience.',
    },
    {
      it: 'Sempre competitivi: tecnologia, script e liste riviste campagna dopo campagna.',
      en: 'Always competitive: technology, scripts and lists reviewed campaign after campaign.',
    },
  ] satisfies Localized[],
}

export const solutions = {
  index: { it: '02 — Soluzioni', en: '02 — Solutions' } satisfies Localized,
  title: {
    it: 'Quattro modi per arrivare al tuo cliente.',
    en: 'Four ways to reach your customer.',
  } satisfies Localized,
  items: [
    {
      number: '01',
      title: {
        it: 'Telemarketing outbound',
        en: 'Outbound telemarketing',
      } satisfies Localized,
      body: {
        it: 'Liste qualificate, script testati, operatori formati sul tuo prodotto. Reportistica quotidiana su contatti ed esiti.',
        en: 'Qualified lists, tested scripts, operators trained on your product. Daily reporting on contacts and outcomes.',
      } satisfies Localized,
    },
    {
      number: '02',
      title: {
        it: 'Teleselling e appuntamenti',
        en: 'Teleselling & appointments',
      } satisfies Localized,
      body: {
        it: "Dal primo contatto all'ordine firmato o all'appuntamento in agenda per la tua rete vendita.",
        en: 'From first contact to signed order or an appointment in the diary of your sales network.',
      } satisfies Localized,
    },
    {
      number: '03',
      title: { it: 'Customer care', en: 'Customer care' } satisfies Localized,
      body: {
        it: 'Assistenza inbound, welcome call e indagini di soddisfazione, con il tuo tono di voce.',
        en: 'Inbound assistance, welcome calls and satisfaction surveys, with your tone of voice.',
      } satisfies Localized,
    },
    {
      number: '04',
      title: {
        it: 'Campagne promozionali',
        en: 'Promotional campaigns',
      } satisfies Localized,
      body: {
        it: 'Lanci, attivazioni e programmi fedeltà coordinati con il tuo calendario marketing.',
        en: 'Launches, activations and loyalty programmes coordinated with your marketing calendar.',
      } satisfies Localized,
    },
  ],
}

export const method = {
  index: { it: '03 — Metodo', en: '03 — Method' } satisfies Localized,
  steps: [
    {
      letter: 'A.',
      title: { it: 'Briefing', en: 'Briefing' } satisfies Localized,
      body: {
        it: 'Studiamo prodotto, target e obiettivo. Concordiamo i KPI prima della prima chiamata.',
        en: 'We study the product, the target and the objective. We agree on the KPIs before the first call.',
      } satisfies Localized,
    },
    {
      letter: 'B.',
      title: { it: 'Formazione', en: 'Training' } satisfies Localized,
      body: {
        it: 'Operatori e supervisor vengono formati su script e obiezioni, poi testati su un lotto pilota.',
        en: 'Operators and supervisors are trained on the script and on objections, then tested on a pilot batch.',
      } satisfies Localized,
    },
    {
      letter: 'C.',
      title: { it: 'Campagna', en: 'Campaign' } satisfies Localized,
      body: {
        it: 'Monitoraggio quotidiano, ascolto delle chiamate e correzioni allo script a campagna in corso.',
        en: 'Daily monitoring, call listening and script corrections while the campaign is running.',
      } satisfies Localized,
    },
    {
      letter: 'D.',
      title: { it: 'Rendiconto', en: 'Reporting' } satisfies Localized,
      body: {
        it: 'Contatti, conversioni e qualità in un report leggibile, con le azioni successive.',
        en: 'Contacts, conversions and quality shared in a readable report, with next steps.',
      } satisfies Localized,
    },
  ],
}

export const partner = {
  index: {
    it: 'In collaborazione con',
    en: 'In collaboration with',
  } satisfies Localized,
  name: 'bofrost*',
  href: 'https://www.bofrost.it/',
  body: {
    it: "Un marchio europeo sinonimo di qualità e fedeltà. Da oltre 30 anni la più grande realtà nella vendita diretta di specialità surgelate con consegna a domicilio, una realtà internazionale che condivide l'impegno dell'eccellenza qualitativa del prodotto e del servizio.",
    en: 'A European brand synonymous with quality and loyalty. For over 30 years the largest player in home delivery of frozen specialities, and an international operation that shares our commitment to courteous, professional and responsible service.',
  } satisfies Localized,
}

export const paths = {
  business: {
    eyebrow: { it: 'Per le aziende', en: 'For companies' } satisfies Localized,
    title: {
      it: "Raccontaci l'obiettivo, la voce la portiamo noi.",
      en: "Tell us the objective, we'll bring the voice.",
    } satisfies Localized,
    body: {
      it: 'Inviaci il brief: entro 48 ore ricevi una proposta con volumi, tempi e risultati attesi.',
      en: 'Send us the brief: within 48 hours you receive a proposal with volumes, timing and expected results.',
    } satisfies Localized,
    cta: {
      it: 'Richiedi una proposta',
      en: 'Request a proposal',
    } satisfies Localized,
  },
  careers: {
    eyebrow: { it: 'Lavora con noi', en: 'Careers' } satisfies Localized,
    title: {
      it: 'Cerchiamo persone a cui piace ascoltare.',
      en: 'We hire people who like to listen.',
    } satisfies Localized,
    body: {
      it: 'Formazione retribuita, turni fissi, un team di supervisor accanto a te dal primo giorno. Nessuna esperienza richiesta.',
      en: 'Paid training, fixed shifts, a team of supervisors alongside you from day one. No experience required.',
    } satisfies Localized,
    cta: { it: 'Invia la candidatura', en: 'Send your CV' } satisfies Localized,
  },
}

export const contact = {
  title: {
    it: 'Parliamone.\nAl telefono, ovviamente.',
    en: "Let's talk.\nOn the phone, obviously.",
  } satisfies Localized,
  labels: {
    phone: { it: 'Telefono', en: 'Phone' } satisfies Localized,
    mobile: { it: 'Cellulare', en: 'Mobile' } satisfies Localized,
    office: { it: 'Sede', en: 'Office' } satisfies Localized,
    online: { it: 'Online', en: 'Online' } satisfies Localized,
  },
  online: {
    website: { it: 'Sito web', en: 'Website' } satisfies Localized,
    email: { it: 'Email', en: 'Email' } satisfies Localized,
    pec: { it: 'PEC', en: 'PEC' } satisfies Localized,
    whatsapp: { it: 'Scrivici su Whatsapp', en: 'Send a Whatsapp' } satisfies Localized,
    facebook: { it: 'Seguici su Facebook', en: 'Follow us on Facebook' } satisfies Localized,
    newTab: { it: '(si apre in una nuova scheda)', en: '(opens in a new tab)' } satisfies Localized,
  },
}

export const form = {
  typeLegend: { it: 'Tipo di richiesta', en: 'Type of enquiry' } satisfies Localized,
  tabs: {
    business: { it: 'Azienda', en: 'Company' } satisfies Localized,
    candidate: { it: 'Candidatura', en: 'Application' } satisfies Localized,
  },
  fields: {
    name: { it: 'Nome e cognome', en: 'Name and surname' } satisfies Localized,
    email: { it: 'Email', en: 'Email' } satisfies Localized,
    phone: { it: 'Telefono', en: 'Phone' } satisfies Localized,
    messageBusiness: {
      it: 'Il tuo obiettivo',
      en: 'Your objective',
    } satisfies Localized,
    messageCandidate: {
      it: 'Disponibilità e note',
      en: 'Availability and notes',
    } satisfies Localized,
  },
  optional: { it: 'facoltativo', en: 'optional' } satisfies Localized,
  consent: {
    it: 'Acconsento al trattamento dei miei dati personali per ricevere una risposta a questa richiesta.',
    en: 'I agree to my personal data being processed in order to receive a reply to this request.',
  } satisfies Localized,
  submitBusiness: { it: 'Invia il brief', en: 'Send the brief' } satisfies Localized,
  submitCandidate: {
    it: 'Invia candidatura',
    en: 'Send application',
  } satisfies Localized,
  privacy: {
    it: 'Trattiamo i dati solo per rispondere alla tua richiesta e non li cediamo a terzi.',
    en: 'We use your data only to reply to your request and never share it with third parties.',
  } satisfies Localized,
  privacyLink: {
    it: "Leggi l'informativa privacy.",
    en: 'Read the privacy notice.',
  } satisfies Localized,
  sending: { it: 'Invio in corso…', en: 'Sending…' } satisfies Localized,
  success: {
    it: 'Grazie, abbiamo ricevuto la tua richiesta. Ti ricontattiamo al più presto.',
    en: 'Thank you, we have received your request. We will get back to you shortly.',
  } satisfies Localized,
  /** One message per validation code; the codes are shared with the PHP endpoint. */
  issues: {
    required: { it: 'Campo obbligatorio.', en: 'Required field.' } satisfies Localized,
    invalidEmail: { it: 'Email non valida.', en: 'Invalid email address.' } satisfies Localized,
    invalidPhone: { it: 'Numero non valido.', en: 'Invalid phone number.' } satisfies Localized,
    tooLong: { it: 'Testo troppo lungo.', en: 'Text is too long.' } satisfies Localized,
    consent: {
      it: 'Consenso obbligatorio.',
      en: 'Consent is required.',
    } satisfies Localized,
  },
  invalid: {
    it: 'Controlla i campi segnalati e riprova.',
    en: 'Please check the highlighted fields and try again.',
  } satisfies Localized,
  rateLimited: {
    it: 'Hai già inviato una richiesta da poco. Riprova più tardi o chiamaci allo ' + company.phone + '.',
    en: 'You have just sent a request. Please try again later or call us on ' + company.phone + '.',
  } satisfies Localized,
  error: {
    it: "Non siamo riusciti a inviare la richiesta. Riprova o chiamaci allo " + company.phone + '.',
    en: 'We could not send your request. Please try again or call us on ' + company.phone + '.',
  } satisfies Localized,
  unconfigured: {
    it: "L'invio online non è ancora attivo: chiamaci allo " + company.phone + '.',
    en: 'Online sending is not active yet: please call us on ' + company.phone + '.',
  } satisfies Localized,
}

export const footer = {
  backToTop: { it: 'Torna su ↑', en: 'Back to top ↑' } satisfies Localized,
  privacy: { it: 'Informativa privacy', en: 'Privacy notice' } satisfies Localized,
}

/** Document metadata kept in sync with the active language. */
export const meta = {
  siteName: company.name,
  title: {
    it: 'Contact SRL — Call center outbound e telemarketing a Carini (Palermo)',
    en: 'Contact SRL — Outbound call center and telemarketing in Carini (Palermo)',
  } satisfies Localized,
  description: {
    it: 'Contact SRL, agenzia promozionale nata nel 2010 a Carini (Palermo): telemarketing outbound, teleselling e appuntamenti, customer care e campagne promozionali.',
    en: 'Contact SRL, a promotional agency founded in 2010 in Carini (Palermo): outbound telemarketing, teleselling and appointments, customer care and promotional campaigns.',
  } satisfies Localized,
}

export const ui = {
  mainMenu: { it: 'Menu principale', en: 'Main menu' } satisfies Localized,
  mobileMenu: { it: 'Menu', en: 'Menu' } satisfies Localized,
  openMenu: { it: 'Apri il menu', en: 'Open menu' } satisfies Localized,
  closeMenu: { it: 'Chiudi il menu', en: 'Close menu' } satisfies Localized,
  switchLanguage: {
    it: 'Switch to English',
    en: 'Passa alla versione italiana',
  } satisfies Localized,
  skipToContent: {
    it: 'Vai al contenuto',
    en: 'Skip to content',
  } satisfies Localized,
}
