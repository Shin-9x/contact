# Contact SRL — sito istituzionale

Riproduzione in React + Vite + Tailwind CSS del design presente in
[`design-source/`](design-source), pensata per essere pubblicata come sito statico
(es. spazio hosting Aruba).

## Requisiti

Node.js 20+ e npm.

I caratteri tipografici (Schibsted Grotesk e JetBrains Mono) arrivano dai pacchetti
`@fontsource-variable/*` e vengono serviti dal dominio del sito: nessuna richiesta a
Google Fonts, quindi nessuna comunicazione dell'IP dei visitatori a terzi. Sono
dipendenze normali, `npm install` le installa insieme alle altre.

## Comandi

```bash
npm install     # installa le dipendenze
npm run dev     # sviluppo su http://localhost:5173
npm run dev:api # mock dell'endpoint del form su 127.0.0.1:8787
npm run build   # type-check + build di produzione in dist/
npm run preview # anteprima locale del contenuto di dist/
```

## Struttura

```
index.html            # shell HTML della home, meta SEO, dati strutturati JSON-LD
privacy.html          # shell HTML dell'informativa privacy (seconda pagina)
public/               # file copiati così come sono (favicon, robots, sitemap, .htaccess)
  api/contatti.php    # endpoint del form (PHP, nessuna dipendenza)
dev/                  # mock dell'endpoint per lo sviluppo in locale
src/
  assets/             # logo e fotografie ottimizzate
  components/         # elementi riutilizzabili (Button, Section, form, logo…)
  content/site.ts     # tutti i testi del sito, in italiano e inglese
  hooks/              # useReveal (animazione di ingresso delle sezioni)
  i18n/               # contesto lingua + hook useLanguage
  layouts/            # Header, Footer, SiteLayout
  pages/               # HomePage e PrivacyPage
  content/privacy.ts   # testo dell'informativa, in italiano e inglese
  sections/           # una sezione del design per file
  services/           # validazione condivisa e invio del form
  styles/index.css    # token Tailwind (colori, font, raggi) e stili base
                      # i font sono importati dagli entry point, non dall'HTML
design-source/        # materiale originale: design canvas, presentazione, screenshot
```

Il sito ha due pagine, ciascuna con il proprio entry point (`src/main.tsx` e
`src/privacy.tsx`) e il proprio file HTML in radice, dichiarate in
`build.rollupOptions.input`. Niente router: la home resta a navigazione ad ancore
come nel design, e `privacy.html` è un file servito direttamente da Apache, quindi
non serve alcuna regola di rewrite. Il layout è condiviso; `SiteLayout` accetta
`standalone` per far puntare le voci di menu alla home invece che alle ancore della
pagina corrente.

L'informativa privacy è un modello basato sugli articoli 13-14 del GDPR: prima della
pubblicazione va fatta verificare e vanno confermati la casella per le richieste
degli interessati, i tempi di conservazione (sezione 07) e l'eventuale nomina di un
DPO.

## Sistema visivo

**Pulsanti.** Tre ruoli, non cinque colori (`src/components/Button.tsx`):

| Variante         | Quando si usa                                            | Aspetto                                      |
|------------------|----------------------------------------------------------|----------------------------------------------|
| `primary`        | l'unica azione che la sezione sta chiedendo              | blu pieno, testo bianco, su qualsiasi sfondo |
| `secondary`      | l'alternativa accanto alla primaria, su superfici chiare | solo filetto, testo scuro                    |
| `secondaryOnInk` | la stessa alternativa dentro la card scura               | filetto chiaro, testo chiaro                 |
| `utility`        | non è una CTA: il pulsante telefono nella barra          | nero pieno, pallino lime                     |

In hover il colore non cambia mai tinta: si scurisce e basta (più il sollevamento di
1px condiviso da tutti). Il nero pieno resta riservato alla barra di navigazione e allo
stato selezionato dei tab del form, così non entra in competizione con le CTA blu.
Il lime è solo il segnale "linea attiva" del pulsante telefono, mai lo stato di un
pulsante.

**I due blu.** `--color-accent` (#0b8ecf) è il blu dei segni decorativi: filetti,
barra di avanzamento, numeri delle soluzioni, anello di focus. `--color-accent-deep`
(#0978ae) è il blu che porta testo: riempimento dei pulsanti primari, link attivi e
hover, stati del form. Serve per il contrasto — bianco sul blu pieno 4,9:1 e blu su
carta 4,7:1, entrambi oltre la soglia WCAG AA di 4,5:1, che il blu chiaro non
raggiungeva. `--color-accent-deeper` è solo l'hover del riempimento.

**Movimento.** Le animazioni di ingresso stanno in `components/Reveal.tsx` +
`hooks/useReveal.ts`; parallasse, barra di avanzamento e voce di menu corrente hanno un
hook ciascuno in `src/hooks/`. Tutto passa da `prefers-reduced-motion`: la garanzia è
in `styles/index.css`, dove un unico blocco azzera durate e ritardi.

## Form contatti

Il form (scheda *Azienda* / *Candidatura*) è completo: validazione lato client e lato
server con gli stessi messaggi, consenso privacy obbligatorio, stati di invio,
errore, limite di invii e protezioni anti-spam.

La scheda attiva è tenuta in `src/enquiry/`, sopra il form, così le call to action
della pagina possono preselezionarla mentre il browser scorre fino ai contatti. Le due
ancore sono anche link condivisibili: `contactsrl.net/#contatti` apre la scheda
*Azienda*, `contactsrl.net/#candidatura` la scheda *Candidatura* — utile da mettere in
un annuncio di lavoro.

Il flusso è: `ContactForm` → `src/services/contactService.ts` → `POST` JSON verso
`VITE_CONTACT_ENDPOINT` → `public/api/contatti.php` → email alle caselle configurate.

```json
{ "type": "business|candidate", "name": "", "email": "", "phone": "",
  "message": "", "consent": true, "language": "it", "website": "", "elapsedMs": 4200 }
```

L'email parte come `multipart/alternative`: una parte HTML (layout a tabelle e stili
inline, gli unici che i client email interpretano in modo affidabile) e una parte
testuale per chi disattiva l'HTML. Le due sono generate da `renderHtml()` e
`renderText()` in `contatti.php`; con `dryRun` attivo nel log finisce la parte
testuale, più leggibile. Il `Reply-To` è l'indirizzo del visitatore, quindi il tasto
"Rispondi" del client scrive direttamente a lui.

Risposte dell'endpoint: `200 {"ok":true}`, `422` con `errors` per campo (gli stessi
codici usati dal client), `429` se il limite per IP è superato, `500` se l'invio
fallisce.

Le regole di validazione stanno in `src/services/enquiryValidation.ts` e sono
replicate in PHP: modificando le une vanno aggiornate le altre.

Anti-spam, senza servizi esterni:

- **honeypot** — il campo `website`, invisibile e fuori dal tab order: se arriva
  compilato la richiesta viene scartata rispondendo comunque `ok`;
- **tempo di compilazione** — sotto `minElapsedMs` la mail viene comunque inviata ma
  con oggetto `[possibile spam]`, così nessuna richiesta vera va persa;
- **limite per IP** — 5 invii accettati all'ora (`rateLimit` in `config.php`), contati
  su un file nella cartella temporanea di sistema: nessun database richiesto.

### Configurazione dell'endpoint

Tutto quello che serve cambiare sta in `public/api/config.php`:

| Chiave              | A cosa serve                                                                 |
|---------------------|------------------------------------------------------------------------------|
| `recipients`        | caselle che ricevono le richieste                                            |
| `sender`            | mittente: **deve** essere una casella del dominio ospitato                   |
| `subjectPrefix`     | prefisso dell'oggetto, utile per i filtri in posta                           |
| `useEnvelopeSender` | passa il mittente a `mail()`; da disattivare se l'host lo rifiuta            |
| `minElapsedMs`      | soglia del controllo sul tempo di compilazione                               |
| `rateLimit`         | invii massimi per IP nella finestra indicata                                 |
| `logFile`           | log scritto quando l'invio fallisce, e a ogni messaggio se `dryRun` è attivo |
| `dryRun`            | `true` scrive la mail nel log invece di inviarla (test in locale)            |

L'endpoint è `api/contatti.php` (percorso relativo, in `.env.production`): funziona
sia in radice sia in sottocartella. Per usare un servizio esterno al posto del PHP
basta cambiare `VITE_CONTACT_ENDPOINT`, senza toccare i componenti.

## Test in locale

Il dev server inoltra `/api` a `127.0.0.1:8787`: lì risponde il mock Node oppure il
vero endpoint PHP.

**Con il mock (nessun PHP, nessun server di posta):**

```bash
npm install
npm run dev:api   # terminale 1 — stampa a video le richieste ricevute
npm run dev       # terminale 2 — http://localhost:5173
```

Per provare gli stati di errore, aggiungi il parametro all'endpoint in
`.env.development` e riavvia `npm run dev`:

```bash
VITE_CONTACT_ENDPOINT=/api/contatti.php?simulate=error        # 500
VITE_CONTACT_ENDPOINT=/api/contatti.php?simulate=rate-limit   # 429
VITE_CONTACT_ENDPOINT=/api/contatti.php?simulate=slow         # risposta lenta
```

**Con il PHP vero** (serve `php` installato; su Arch/CachyOS `sudo pacman -S php`).
Metti `'dryRun' => true` in `public/api/config.php`, poi:

```bash
npm run dev:php   # terminale 1 — php -S 127.0.0.1:8787 -t public
npm run dev       # terminale 2
```

La mail finisce in `public/api/storage/contact.log`. **Rimetti `dryRun` a
`false` prima della build di produzione.**

### Ricevere davvero l'email in locale

`mail()` di PHP non parla SMTP: consegna il messaggio a un binario `sendmail` che su
un desktop non esiste, per questo in locale l'invio fallisce. Per una prova reale
serve un relay SMTP; su Arch/CachyOS:

```bash
sudo pacman -S msmtp msmtp-mta
```

`~/.msmtprc` (poi `chmod 600 ~/.msmtprc`):

```
defaults
auth on
tls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt

account predefinito
host smtps.aruba.it
port 465
tls_starttls off
from sito@contactsrl.net
user sito@contactsrl.net
password LA_PASSWORD
account default : predefinito
```

Poi, con `'dryRun' => false` e `'useEnvelopeSender' => false` in `config.php`:

```bash
php -d sendmail_path="/usr/bin/msmtp -t" -S 127.0.0.1:8787 -t public
```

Qualsiasi account SMTP va bene per la prova; su Aruba `mail()` funziona da sé e
msmtp non serve.

**Prova del sito compilato**, identica alla produzione (Apache esegue il PHP come il
server integrato):

```bash
npm run build
php -S 127.0.0.1:8080 -t dist
```

Con `dryRun` a `false` l'invio richiede un server di posta locale: in genere `mail()`
fallisce, l'endpoint risponde `500` e scrive la richiesta nel log — il comportamento
corretto in caso di guasto.

## Deploy su Aruba (hosting statico)

Il piano **Hosting Linux Basic** è sufficiente: servono solo spazio web con PHP e le
caselle email incluse. Nessun database.

1. **Pannello Aruba** — crea le caselle (`info@` per ricevere, `sito@` come mittente),
   imposta la versione PHP su 8.x e attiva il certificato SSL sul dominio.
2. **`public/api/config.php`** — valori di produzione:

   ```php
   'recipients'        => ['info@contactsrl.net'],
   'sender'            => ['email' => 'sito@contactsrl.net', 'name' => 'Sito Contact SRL'],
   'useEnvelopeSender' => true,
   'dryRun'            => false,
   ```

   Il mittente deve appartenere al dominio ospitato: con un indirizzo esterno
   (gmail.com e simili) la mail viene rifiutata o finisce in spam.
3. **HTTPS** — quando il certificato è attivo, togli il commento al blocco
   `mod_rewrite` in `public/.htaccess`. Il form raccoglie dati personali: senza
   HTTPS viaggiano in chiaro.
4. `npm install && npm run build`
5. Carica via FTP **il contenuto** di `dist/` (non la cartella) nella `www/` (o
   `htdocs/`) dello spazio web, inclusi i file nascosti `.htaccess` e la cartella
   `api/` con dentro `storage/`.
6. Prova un invio reale dal sito online e controlla la casella.

Note utili:

- Modifica `config.php` **nel progetto**, non sul server: il deploy successivo
  sovrascrive quello caricato.
- La build usa percorsi relativi (`base: './'` in `vite.config.ts`): funziona sia in
  radice sia in una sottocartella, senza modifiche.
- `api/storage/` deve restare scrivibile: è dove finiscono le richieste se l'invio
  fallisce. Il suo `.htaccess` ne blocca la lettura via HTTP, perché il log può
  contenere dati personali.
- Se `mail()` restituisce sempre `false`, prova `'useEnvelopeSender' => false`:
  alcuni host rifiutano il parametro `-f`.
- `.htaccess` in radice attiva compressione, cache dei soli asset con hash nel nome e
  qualche header di sicurezza; ogni direttiva è protetta da `<IfModule>`, quindi il
  file è innocuo anche se un modulo non è disponibile.
- Aggiornando il sito basta ricaricare `dist/`: i nomi dei file con hash evitano
  problemi di cache. `index.html` è servito con `no-cache`.
