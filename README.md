# Contact SRL — sito istituzionale

Riproduzione in React + Vite + Tailwind CSS del design presente in
[`design-source/`](design-source), pensata per essere pubblicata come sito statico
(es. spazio hosting Aruba).

## Requisiti

Node.js 20+ e npm.

## Comandi

```bash
npm install     # installa le dipendenze
npm run dev     # sviluppo su http://localhost:5173
npm run build   # type-check + build di produzione in dist/
npm run preview # anteprima locale del contenuto di dist/
```

## Struttura

```
index.html            # shell HTML, meta SEO, dati strutturati JSON-LD
public/               # file copiati così come sono (favicon, robots, sitemap, .htaccess)
src/
  assets/             # logo e fotografie ottimizzate
  components/         # elementi riutilizzabili (Button, Section, form, logo…)
  content/site.ts     # tutti i testi del sito, in italiano e inglese
  hooks/              # useReveal (animazione di ingresso delle sezioni)
  i18n/               # contesto lingua + hook useLanguage
  layouts/            # Header, Footer, SiteLayout
  pages/HomePage.tsx  # composizione della home
  sections/           # una sezione del design per file
  services/           # invio del form verso un endpoint esterno
  styles/index.css    # token Tailwind (colori, font, raggi) e stili base
design-source/        # materiale originale: design canvas, presentazione, screenshot
```

Il sito è composto da una sola pagina con navigazione ad ancore, come il design di
partenza: per questo non è stato introdotto un router. Se in futuro servissero più
pagine, `react-router-dom` va aggiunto insieme a una regola di rewrite lato server.

## Form contatti

Il form (scheda *Azienda* / *Candidatura*) è completo lato frontend e invia i dati in
JSON via `POST` all'endpoint indicato da `VITE_CONTACT_ENDPOINT`:

```bash
cp .env.example .env
# VITE_CONTACT_ENDPOINT=/api/contatti.php
```

Payload inviato:

```json
{ "type": "business|candidate", "name": "", "email": "", "phone": "", "message": "", "language": "it" }
```

Finché la variabile non è valorizzata, l'invio online resta disattivato e il form
invita a telefonare. La variabile viene letta al momento della build: dopo averla
impostata è necessario rieseguire `npm run build`.

## Deploy su Aruba (hosting statico)

1. `npm install && npm run build`
2. Caricare via FTP **il contenuto** di `dist/` (non la cartella) nella `www/` (o
   `htdocs/`) dello spazio web, inclusi i file nascosti `.htaccess`.
3. Nessun Node.js è richiesto in produzione.

Note utili:

- La build usa percorsi relativi (`base: './'` in `vite.config.ts`): funziona sia in
  radice sia in una sottocartella, senza modifiche.
- `.htaccess` attiva compressione e cache dei soli asset con hash nel nome; ogni
  direttiva è protetta da `<IfModule>`, quindi il file è innocuo anche se un modulo
  non è disponibile.
- Aggiornando il sito basta ricaricare `dist/`: i nomi dei file con hash evitano
  problemi di cache. `index.html` è servito con `no-cache`.
