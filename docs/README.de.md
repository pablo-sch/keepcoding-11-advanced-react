# React Fortgeschritten Projektabgabe

`>` **KeepCoding Projekte - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Wähle deine Sprache:** [Englisch](README.md) 🔄 [Spanisch](README.es.md)

## Projektziel

Ziel dieses Projekts ist es, auf dem Basis-Repository für React-Grundlagen [`keepcoding-08-react-fundamentals`](https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git) aufzubauen und folgende Kernfunktionen zu integrieren:

- Integration von **React Redux** zur globalen Zustandsverwaltung
- Einrichtung von **Redux DevTools** zur besseren Debugging-Unterstützung
- Implementierung von **Unit Tests** für Actions, Reducer und zugehörige Logik
- Vertiefung fortgeschrittener **React-Konzepte** durch praxisorientiertes Arbeiten

Dieses Projekt dient der Festigung vorhandener Kenntnisse und dem Einstieg in skalierbare und wartbare React-Anwendungen.

## Erlernte und Angewandte Konzepte

- **Redux**:

  - Actions, Reducer, Selector, Hooks
  - Globaler Zustand und Store
  - Unidirektionaler Datenfluss

- **Ablauf des Redux-Datenflusses**:

  1. Eine Aktion wird mit `store.dispatch(action)` ausgelöst
  2. Der Store führt den Reducer mit aktuellem Zustand und Aktion aus
  3. Der Hauptreducer kombiniert die Ergebnisse und erzeugt den neuen Zustand
  4. Redux speichert den neuen Zustand und informiert abonnierte Komponenten

- **React-Redux**:

  - `useSelector` zum Abrufen des Zustands
  - `useDispatch` zum Auslösen von Aktionen
  - Verwendung von Selektoren zur gezielten Datenerfassung

- **Asynchrone Aktionen**:

  - Asynchrone Action Creators
  - Middleware `redux-thunk` für Seiteneffekte
  - Konfiguration des Middleware-Setups

- **Asynchroner Ablauf**:

  - Ohne Middleware: synchroner Ablauf
  - Mit Middleware (`redux-thunk`): kontrollierter asynchroner Ablauf

- **Redux DevTools**:
  - Konfiguration zur Fehlerbehebung und Aktionsverfolgung

## Übungsdetails

Ziel ist es, einen **Redux Store** einzurichten, der den Zustand der Anwendung zentral verwaltet. Mindestens folgende Funktionalitäten sollen enthalten sein:

- **Sitzungsverwaltung**: Authentifizierungsstatus des Benutzers verwalten
- **Verwaltung von Anzeigen**:
  - Abrufen der Anzeigenliste über die API
  - Abrufen von Detailinformationen einer Anzeige
  - Erstellen neuer Anzeigen
  - Löschen bestehender Anzeigen
- **Verwaltung von Tags**: Abrufen der verfügbaren Tags über die API

### Technische Anforderungen

- Erstellung der notwendigen **Actions** und **Reducer**
- Verbindung der React-Komponenten mit dem Store über `useSelector` und `useDispatch`
- Konfiguration von **Redux DevTools** zur Fehlerdiagnose
- Implementierung von **Unit Tests** für Actions, Reducer und Thunks

## Verwendete Technologien

- **Sprachen:** HTML, TypeScript
- **Hauptabhängigkeiten:** React, Tailwind CSS, TypeScript, Axios, Styled-components, Redux-thunk, React-redux

## Installations- und Nutzungshinweise

### Hinweis

Dieses Projekt ist **abhängig** von der REST-API `nodepop-api`. Diese muss vor der Nutzung gestartet werden, um auf die simulierte Datenbank zugreifen zu können.

### 1. Software-Voraussetzungen

- **[Node.js](https://nodejs.org/en/download/)** (getestet mit **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (getestet mit **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (getestet mit **1.99.0**)
- **[nodepop-api (REST API)](https://github.com/davidjj76/nodepop-api)** (entwickelt von **David Jiménez – KeepCoding**)

### 2. Repository klonen

```bash
git clone https://github.com/pablo-sch/keepcoding-11-advanced-react.git
```

`>` **Demo zum Klonen in VSCode:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 3. Benutzer anlegen

Nachdem die API läuft, kannst du unter `http://localhost:3001/swagger/` einen neuen Benutzer erstellen, um dich anzumelden.

### 4. Befehle

```sh
# Installiere die Projektabhängigkeiten.
npm install

# Starte den Entwicklungsserver.
npm run dev

# Erstelle das Projekt für die Produktion (generiert den dist-Ordner).
npm run build

# Führe ESLint aus, um nach Fehlern zu suchen.
npm run lint

# Zeige den Produktions-Build lokal an.
npm run preview

# Führe Prettier aus, um den Code zu formatieren.
npm run format
```

## Projektressourcen

`>` **Nodepop-API Endpunkte:** 📄 [Endpoints](api-doc.md)

`>` **Vorschau:** 👀 [Preview](preview.md)

## Beiträge und Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Freie Nutzung und Weitergabe mit Quellenangabe erlaubt. Externe Beiträge sind nicht vorgesehen, Anregungen sind jedoch willkommen.
