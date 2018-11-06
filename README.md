
# Esercizio di IS

  

## Problematiche iniziali

  

Il codice iniziale presentava alcuni problemi di Bad Smell e di codice strutturato male.

  

## Struttura

  

La struttura generale iniziale era sbagliata ed approssimativa,

la maggior parte del codice era scritta all'interno del file principale App.js.

Questo comportava una leggibilita' scarsa e un debug peggiore ancora.

Per questo e' stato svolto un lavoro di refactoring con una struttura ben precisa ad albero.

Lo scopo e' quella di minimizzare la grandezza delle classi rendendo facile un futuro Upgrade.

  

La cartella src (Source) contiene al suo interno vari file essenziali quali:

* index.js e' la pagina principale, questa si collega all'index.html presente nella cartella public.

* App.js e' il file figlio di index.js, una sorta di container per il body della pagina finale, qui saranno asseriti variabili e metodi utili a piu' componenti interni.

* Utils e' una cartella contenente i file statici come i Token per le API e i file JSON.

* Components e' una cartella contente i componenti interni alla pagina, divisi per categorie (Header, Body).

  

Questa struttura ci consente una gestione modulare del codice, consentendoci di rimpiazzare facilmente i file senza avere grossi problemi.

  

# Componenti

  

Ogni componente e' costituito da un Container che racchiude i vari componenti interni.

Nello specifico il Body e' composto da:

* BodyContainer.js e' un componente che racchiude i possibili frammenti di codice che saranno usati all'interno del body, questo contiene tutti i componenti in comune con i figli.

* Currency e' la cartella che contiene la parte della gestione delle cryptocurrency.

* Currency/CurrencyData.js e' il file in cui vengono ricavati dinamicamente i dati delle currency attraverso le api e il database.

  

L'header invece e' strutturato invece in maniera piu' semplice, contiene soltanto un file chiamato Header.js.

  

### BodyContainer.js

Nello specifico il file Body/BodyContainer.js ha le seguenti funzioni:

*  Applica lo stile all'interno body sfruttando Bootstrap e Css

*  Contiene dei dati generali utilizzati piu' volte:

    * this.state.total e' il valore totale delle valute
    
    * this.state.actual e' la valuta selezionata al momento
    
    * this.state.database e' un oggetto contenente tutte le informazioni relative alle valute in possesso
    
    * this.state.modify e' flag che determina lo stato di modifica di una specifica cryptovaluta

* Contiene delle funzioni generali utilizzati piu' volte:

    * setCrypto(string) cambia la valuta selezionata al momento

    *  applyModifies(number) modifica l'amount di una specifica valuta, impostandola localmente e in seguito inviandola al  database Firebase.

* Ogni volta che viene selezionata una valuta diversa il BodyContainer ri-genera dinamicamente i figli in base alla valuta selezionata.

* Le valute selezionabili sono ottenute dal database Firebase.

  

### CurrencyData.js

Nello specifico il file Body/Currency/CurrencyData.js ha le seguenti funzioni:

* Contiene le specifiche di ogni valuta posseduta

* Gestisce la modifica dell'amount di una valuta localmente per poi inviarla al padre ed applicare le modifiche

* Contiene delle funzioni generali utilizzati piu' volte:

    * setCrypto(string) cambia la valuta selezionata al momento

    * applyModifies(number) modifica l'amount di una specifica valuta, impostandola localmente e in seguito inviandola al database Firebase.

# Tecnologie

In questo progetto sono state usate le seguenti tecnologie:

- React.js, framework Front-end

- Firebase, cloud database

- Cryptonator, API per il fetch dei dati in real-time delle valute

- Bootstrap, toolkit per la gestione dello stile