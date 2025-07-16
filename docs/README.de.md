# React-Grundlagen Projektabgabe

`>` **KeepCoding Projekte - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Wähle deine Sprache:** [Englisch](README.md) 🔄 [Spanisch](README.es.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Projektziel

Zum Zweck der Übung und Demonstration der in den Online-Kursen erworbenen Kenntnisse soll in diesem Projekt eine SPA (Single Page Application) mit React entwickelt werden. Diese Anwendung stellt die grafische Oberfläche dar, über die die Anzeigen-API des Backends namens Nodepop verwaltet wird.

<!-- ------------------------------------------------------------------------------------------- -->

## Erlernte und angewandte Kenntnisse

### Grundlagen von React

- **React:** Deklarative Bibliothek zur Erstellung von Benutzeroberflächen.
- **Komponenten:** Wiederverwendbar, unabhängig, hierarchisch.

### Elemente

- `React.createElement(type, props, children)`
- `ReactDOM.render(element, container)`
- **JSX:**

  - HTML-ähnliche Syntax.
  - **Attribute:** `className`, `htmlFor`, etc.
  - **Spread-Attribute:** <Component {...props} />
  - **children:** Inhalt zwischen den Tags.

### Komponenten

- **Props:** Parameter, die eine Komponente erhält (`props.name`)
- Verschachtelte Komponenten
- **React.Fragment:** Gruppiert ohne zusätzliche DOM-Knoten.
- **Bedingtes Rendern:** `if`, `? :`, `&&`
- **Listen:** Verwendung von `.map()` und eindeutige Schlüssel (`key`)
- **Events:** `onClick`, `onChange`, etc.

### Zustand

- `useState(anfangsWert)` zur Verwaltung des lokalen Zustands.
- **Lifting state up:** Zustand zwischen Komponenten teilen.

### Formulare

- **Kontrollierte Inputs:** mit useState verwaltet.
- **Unkontrollierte Inputs:** Zugriff über useRef.
- **Checkboxen** / **Radio Buttons**
- **Formularübermittlung:** `onSubmit`, `event.preventDefault()`

### Effekte

Verwendung von `useEffect`, inklusive Abhängigkeiten, Aufräumfunktionen und Verhalten im `StrictMode`.

### Hooks

Eigene Hooks für wiederverwendbare Logik.

### Context

Erstellen von Contexten mit `React.createContext`, bereitstellen mit `Context.Provider` und verwenden mit `useContext`.

### Refs

- **useRef:** Zugriff auf DOM oder persistente Werte zwischen Renders.
- **forwardRef:** Referenzen an Kindkomponenten weiterleiten.

### Leistungsoptimierung

- **React.memo:** Verhindert unnötige Renders, wenn Props sich nicht ändern.
- **useCallback(fn, deps):** Merkt sich Funktionen.
- **useMemo(fn, deps):** Merkt sich teure berechnete Werte.

### Ladeoptimierung

- Verwendung von `React.lazy` und `Suspense` für Lazy Loading.
- Code Splitting zur Reduzierung der anfänglichen Bundle-Größe.

<!-- ------------------------------------------------------------------------------------------- -->

## Projektdetails

### Öffentliche Routen

- `/login` —> LoginPage

  - Formular mit E-Mail, Passwort und Checkbox „Session merken“. Speichert Token nach erfolgreichem Login.

### Geschützte Routen (nur für authentifizierte Nutzer)

- `/` —> Weiterleitung zu `/adverts`

  - Anzeigenliste mit Name, Preis, Kauf/Verkauf und Tags.
  - Filtermöglichkeiten (Name, Typ, Preis, Tags).
  - Links zur Detailansicht und zur Erstellung neuer Anzeigen.
  - Anzeige einer Nachricht, wenn keine Anzeigen vorhanden sind.

- `/adverts`, `/adverts/:id` —> AdvertPage

  - Detailansicht mit Bild oder Platzhalter.
  - Weiterleitung zu 404, wenn nicht vorhanden.
  - Löschen-Button mit Bestätigung. Nach dem Löschen Weiterleitung zur Liste.

- `/adverts/new` —> NewAdvertPage

  - Formular mit Name, Typ, Tags, Preis und Foto (optional).
  - Validierungen mit React. Nach Erstellung Weiterleitung zur Detailansicht.

- Alle anderen Routen —> `NotFoundPage (404)`

**Filter in AdvertsPage:**

- Mindestens zwei Filter: Name, Kauf/Verkauf, Preis oder Tags.
- **Zwei Methoden zur Filteranwendung:**
  1. Frontend-Filterung mit allen geladenen Anzeigen.
  2. Backend-Filterung über Query-Parameter (empfohlen).

**Wichtige technische Funktionen:**

- Authentifizierung mit JWT-Token.
- Geschützte Routen mit automatischer Weiterleitung zum Login.
- Sitzungsspeicherung mit localStorage.
- Axios-Interceptor zur Token-Übertragung.
- Styling mit Tailwind CSS.
- Navigation mit React Router.
- Formularvalidierung mit React.

<!-- ------------------------------------------------------------------------------------------- -->

## Verwendete Technologien

- **Sprachen:** HTML, CSS, JavaScript, TypeScript.
- **Wichtige Abhängigkeiten (Node.js):** React, Vite, Tailwind CSS, TypeScript, ESLint, Axios, clsx, Globals, Prettier.

<!-- ------------------------------------------------------------------------------------------- -->

## Installations- und Nutzungshinweise

### Hinweis

Dieses Projekt **benötigt** die REST-API `nodepop-api`. Um mit der simulierten Datenbank zu interagieren, muss der Server dieser API zuerst gestartet werden.

### 1. Software-Voraussetzungen

- **[Node.js](https://nodejs.org/en/download/)** (getestet mit Version **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (getestet mit Version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (getestet mit Version **1.99.0**)
- **[nodepop-api (REST-API)](https://github.com/davidjj76/nodepop-api)** (erstellt von Dozent **David Jiménez** - **KeepCoding**)

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
