# React-Grundlagen Projektabgabe

`>` **KeepCoding Projekte - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Wähle deine Sprache:** [Englisch](README.md) 🔄 [Spanisch](README.es.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Projektziel

Um die in den Online-Kursen erworbenen Kenntnisse zu üben und zu demonstrieren, soll in diesem Projekt eine SPA (Single Page Application) mit React erstellt werden, die als grafische Benutzeroberfläche zur Verwaltung der Anzeigen-API mit dem Backend namens Nodepop dient.

<!-- ------------------------------------------------------------------------------------------- -->

## Erlernte und geübte Konzepte

### React-Grundlagen

- **React:** Deklarative Bibliothek zum Erstellen von Benutzeroberflächen.
- **Komponenten:** Wiederverwendbar, unabhängig, hierarchisch.

### Elemente

- `React.createElement(type, props, children)`
- `ReactDOM.render(element, container)`
- **JSX:**

  - Syntax ähnlich zu `HTML`.
  - **Attribute:** `className`, `htmlFor`, etc.
  - **Spread-Attribute:** `<Component {...props} />`
  - **children:** Inhalt zwischen Tags.

### Komponenten

- **Props:** Parameter, die eine Komponente erhält (`props.name`)
- Verschachtelte Komponenten
- **React.Fragment:** Gruppiert ohne zusätzliche Knoten.
- **Bedingte Darstellung:** `if`, `? :`, `&&`
- **Listen:** Verwendung von `.map()` und eindeutigen Schlüsseln (`key`)
- **Events:** `onClick`, `onChange`, etc.

### State

- `useState(initialValue)` zur lokalen Zustandsverwaltung.
- **Lifting state up:** Zustandsweitergabe zwischen Komponenten.

### Formulare

- **Kontrollierte Inputs:** gesteuert durch useState
- **Unkontrollierte Inputs:** Zugriff über useRef
- **Checkbox** / **Radio Buttons**
- **Formularübermittlung:** `onSubmit`, `event.preventDefault()`

### Effekte

Verwendung von `useEffect` mit Abhängigkeiten, Aufräumfunktionen und Verhalten unter `StrictMode`.

### Hooks

Benutzerdefinierte Hooks für wiederverwendbare Logik.

### Context

Erstellung von Contexts mit `React.createContext`, Bereitstellung mit `Context.Provider`, Nutzung mit `useContext`.

### Refs

- **useRef:** Zugriff auf DOM oder persistente Werte zwischen Rendern.
- **forwardRef:** Weiterleitung von Refs an Kindkomponenten.

### Performance-Optimierung

- **React.memo:** Verhindert unnötiges Rendern, wenn sich Props nicht ändern.
- **useCallback(fn, deps):** Memoisiert Funktionen.
- **useMemo(fn, deps):** Memoisiert aufwändig berechnete Werte.

### Ladeoptimierung

- Verwendung von `React.lazy` und `Suspense` für Lazy Loading von Komponenten und `Code splitting` zur Verringerung der Bundle-Größe.

<!-- ------------------------------------------------------------------------------------------- -->

## Projektdetails

### Öffentliche Routen

- `/login` —> LoginPage

  - Formular mit E-Mail, Passwort und „Session merken“ Checkbox. Speichert Token nach erfolgreichem Login.

### Geschützte Routen (nur für authentifizierte Nutzer)

- `/` —> Leitet zu `/adverts` weiter

  - Liste von Anzeigen mit Name, Preis, Kauf/Verkauf und Tags.
  - Filter für Name, Typ, Preis, Tags.
  - Links zu Anzeige-Details und Neuerstellung.
  - Anzeige einer Nachricht, falls keine Anzeigen vorhanden sind.

- `/adverts`, `/adverts/:id` —> AdvertPage

  - Zeigt Detail mit Bild oder Platzhalter.
  - Leitet zu 404, wenn nicht gefunden.
  - Löschen-Button mit Bestätigung. Leitet nach Löschen zurück zur Liste.

- `/adverts/new` —> NewAdvertPage

  - Formular mit Name, Typ, Tags, Preis und optionalem Foto.
  - React Validierungen. Leitet nach Erstellung zur Detailseite.

- Alle anderen Routen —> `NotFoundPage (404)`

**Filter auf der AdvertsPage:**

- Mindestens zwei Filter: Name, Kauf/Verkauf, Preis oder Tags.
- **Zwei Filter-Methoden:**
  1. Frontend-Filterung mit allen geladenen Anzeigen.
  2. Backend-Filterung durch Senden von Query-Parametern (empfohlen).

**Wichtige technische Features:**

- Authentifizierung mit JWT Token.
- Geschützte Routen und automatische Weiterleitung zum Login.
- Session-Persistenz mit localStorage.
- Axios-Interceptor zum Hinzufügen des Tokens.
- Styling mit Tailwind CSS.
- Navigation mit React Router.
- Formularvalidierung mit React.

<!-- ------------------------------------------------------------------------------------------- -->

## Verwendete Technologien

- **Sprachen:** HTML, CSS, JavaScript, TypeScript.
- **Wichtige Node.js-Abhängigkeiten:** React, Vite, Tailwind CSS, TypeScript, ESLint, Axios, clsx, Globals, Prettier.

<!-- ------------------------------------------------------------------------------------------- -->

## Installations- und Nutzungshinweise

### Hinweis

Dieses Projekt **ist abhängig** von der REST API `nodepop-api`. Um mit der simulierten Datenbank zu interagieren, muss der Server, der diese API bereitstellt, zuerst gestartet werden.

### 1. Softwareanforderungen

- **[Git](https://git-scm.com/downloads)** (getestet mit Version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (getestet mit Version **1.99.0**)
- **[Node.js](https://nodejs.org/en/download/)** (verwenden Sie die neueste verfügbare Version)
- **[nodepop-api (REST API)](https://github.com/davidjj76/nodepop-api)** (erstellt vom Dozenten **David Jiménez** - **KeepCoding**)

### 2. Repository klonen

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

`>` **VSCode Klon-Demo:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 4. Benutzer anlegen

Sobald die API läuft, erstellen Sie einen neuen Benutzer über Swagger unter `http://localhost:3001/swagger/`, um sich anmelden zu können.

### 3. Befehle

```sh
# Installiert die Projektabhängigkeiten.
npm install

# Startet den Entwicklungsserver.
npm run dev

# Baut die produktionsbereite Anwendung.
npm run build

# Prüft den Code auf Fehler.
npm run lint

# Zeigt den Produktions-Build lokal an.
npm run preview

# Formatiert den Code automatisch.
npm run format
```

<!-- ------------------------------------------------------------------------------------------- -->

## Ressourcen

`>` **Nodepop-API Endpunkte:** 📄 [Endpoints](api-doc.md)

`>` **Projektvorschau:** 👀 [Preview](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Beiträge und Lizenzen

Projekt unter MIT Lizenz. Freie Nutzung und Verbreitung mit Namensnennung. Externe Beiträge werden nicht angenommen, Vorschläge sind jedoch willkommen.
