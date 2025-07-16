# ⚽ StonksBall – Frontend

Questo è il repository **Frontend** del progetto _StonksBall_, un'applicazione web sviluppata come progetto finale del corso Full Stack Developer EPICODE.  
L’app consente agli utenti di organizzare partite di calcetto, partecipare, gestire la propria disponibilità e interagire con gli altri membri.

🔗 **Backend repository**:  
[https://github.com/nellocas01/Capstone-Project-FS0123-](https://github.com/nellocas01/Capstone-Project-FS0123-)

---

## 🎯 Obiettivi del progetto

- Fornire un’interfaccia utente chiara, dinamica e responsive per la gestione delle partite.
- Interagire con il backend tramite API REST per autenticazione, partite e profilo utente.
- Offrire una UX moderna e fluida grazie a React e Bootstrap.

---

## ✅ Funzionalità implementate

- **Registrazione e login utente** con JWT
- **Visualizzazione e partecipazione a partite**
- **Creazione di una nuova partita** con data, ora, luogo
- **Gestione profilo personale**
- **UI responsive** e mobile-friendly
- **Integrazione Stripe (mock)** per gestione pagamenti
- **Gestione stato globale e navigazione sicura**

---

## 🛠️ Tecnologie & Dipendenze

| Libreria / Tool                     | Descrizione                                  |
|------------------------------------|----------------------------------------------|
| **React 18**                       | Framework per la UI                          |
| **React Router DOM**               | Routing SPA                                  |
| **React Bootstrap / Bootstrap 5**  | Componenti UI responsive                     |
| **Bootstrap Icons**                | Icone leggere e accessibili                  |
| **Axios**                          | Richieste HTTP verso il backend              |
| **Date-fns**                       | Gestione e formattazione date                |
| **React Datepicker / Time Picker** | Selezione data e ora partita                 |
| **Stripe / React Stripe JS**       | Integrazione mock per pagamento              |
| **FontAwesome / Bootstrap Icons** | Icone per UI                                 |
| **Testing Library + Jest**         | Test dei componenti                          |

---

## ⚙️ Setup e avvio del progetto

### 1. Clona il repository

```bash
git clone https://github.com/nellocas01/Capstone-Project-FS0123-FrontEnd.git
cd Capstone-Project-FS0123-FrontEnd
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura l’ambiente

Crea un file .env nella root con:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
Assicurati che l’URL punti al tuo backend locale.
```

### 4. Avvia l’app in modalità sviluppo
```bash
npm start
```

L’app sarà disponibile su http://localhost:3000

Assicurati che il backend (porta 8080) sia già avviato per evitare errori CORS o di rete.

---

## 👨‍💻 Autore
**Aniello Casolla**
- 📧 nellocasolla446@gmail.com
- 📆 Ultimo aggiornamento: Luglio 2023
