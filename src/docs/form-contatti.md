# Form Contatti — Configurazione FormSubmit

## Come funziona

Il form di contatto usa il servizio gratuito [FormSubmit.co](https://formsubmit.co) per ricevere le email senza bisogno di un backend.
Quando un utente invia il form, FormSubmit inoltra i dati all'indirizzo email configurato.

## Email attualmente configurata

```
gianluca8491@gmail.com
```

Questa email si trova in **`src/pages/index.astro`** alla riga 301:

```astro
<ContactForm
  email="gianluca8491@gmail.com"
  ...
/>
```

## Come cambiare l'email di destinazione

1. Apri il file `src/pages/index.astro`
2. Cerca la prop `email` nel componente `<ContactForm>`
3. Sostituisci il valore con la nuova email:

```astro
<ContactForm
  email="nuova-email@esempio.com"
  ...
/>
```

> **Importante:** al primo invio verso una nuova email, FormSubmit manda una mail di conferma a quell'indirizzo. Bisogna cliccare il link di attivazione prima che i messaggi vengano consegnati.

## Opzioni avanzate FormSubmit

Le opzioni sono configurate come campi hidden nel componente `src/components/widgets/ContactForm.astro`:

| Campo hidden | Valore | Descrizione |
|---|---|---|
| `_subject` | `Nuova richiesta dal sito web` | Oggetto dell'email ricevuta |
| `_captcha` | `false` | Captcha disabilitato (il form usa honeypot) |
| `_template` | `table` | Email formattata come tabella |
| `_honey` | *(campo nascosto vuoto)* | Honeypot anti-spam |

Per modificare queste opzioni, apri `src/components/widgets/ContactForm.astro` e modifica i valori degli `<input type="hidden">`.

### Esempio: cambiare l'oggetto dell'email

```astro
<input type="hidden" name="_subject" value="Nuovo messaggio dal sito" />
```

## Attivazione account FormSubmit

Se si cambia email per la prima volta:

1. Pubblicare il sito con la nuova email configurata
2. Inviare un messaggio di prova dal form
3. Controllare la casella della nuova email (anche spam)
4. Cliccare il link **"Activate Form"** nella mail di FormSubmit
5. Da quel momento i messaggi arriveranno normalmente

## Riepilogo file coinvolti

| File | Cosa contiene |
|---|---|
| `src/pages/index.astro` | Email di destinazione (prop `email`) |
| `src/components/widgets/ContactForm.astro` | Struttura del form e opzioni FormSubmit |
