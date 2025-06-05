# Abgabeprojekt Grundlagen von REACT

**KeepCoding Projekte - Web 18**  
Die vollständige Liste der Repositories und Beschreibungen findest du in 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

## Wähle deine Sprache

- 🇺🇸 [Englisch](README.md)
- 🇪🇸 [Spanisch](README.es.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Projektziel

Ziel dieses Projekts ist es, eine Single Page Application (SPA) zu erstellen, um die im Online-Unterricht erworbenen Kenntnisse zu üben und zu demonstrieren. Diese SPA dient als grafische Oberfläche zur Verwaltung der Anzeigen-API mit dem Backend namens Nodepop.

<!-- ------------------------------------------------------------------------------------------- -->

## Erlernte und angewandte Kenntnisse

- **Grundlagen von React:**

  - React: Deklarative Bibliothek zum Erstellen von Benutzeroberflächen.
  - Komponenten: Wiederverwendbar, unabhängig, hierarchisch.

- **Elemente:**

  - `React.createElement(type, props, children)`
  - `ReactDOM.render(element, container)`
  - _JSX:_
    - HTML-ähnliche Syntax.
    - _Attribute:_ `className`, `htmlFor`, usw.
    - _Spread-Attribute:_ <Component {...props} />
    - _children:_ Inhalt zwischen Tags.

- **Komponenten:**

  - _Props:_ Parameter, die eine Komponente empfängt (`props.name`)
  - Verschachtelte Komponenten
  - _React.Fragment:_ Gruppiert Elemente ohne zusätzliche Knoten.
  - _Bedingtes Rendern:_ `if`, `? :`, `&&`
  - _Listen:_ Verwendung von `.map()` mit eindeutigen Schlüsseln (`key`)
  - _Events:_ `onClick`, `onChange`, usw.

- **State (Zustand):**

  - `useState(initialValue)` zur Verwaltung von lokalem Zustand.
  - _Lifting state up:_ Zustandsweitergabe zwischen Komponenten.

- **Formulare:**

  - _Kontrollierte Eingaben:_ über useState gesteuert.
  - _Unkontrollierte Eingaben:_ Zugriff über useRef.
  - Checkboxen / Radiobuttons
  - _Formularübermittlung:_ `onSubmit`, `event.preventDefault()`

- **Effekte:**

  - Verwendung von `useEffect` mit Abhängigkeiten und Cleanup. Verhalten in `StrictMode`.

- **Hooks:**

  - Benutzerdefinierte Hooks für wiederverwendbare Logik.

- **Context:**

  - Erstellen von Context mit `React.createContext`, Bereitstellen mit `Context.Provider` und Verwenden mit `useContext`.

- **Refs:**

  - _useRef:_ Zugriff auf das DOM oder persistente Werte zwischen Rendern.
  - _forwardRef:_ Referenzweitergabe an Kindkomponenten.

- **Leistungsoptimierung:**

  - _React.memo:_ Vermeidet unnötige Renders, wenn Props sich nicht ändern.
  - _useCallback(fn, deps):_ Merkt sich Funktionen.
  - _useMemo(fn, deps):_ Merkt sich teure berechnete Werte.

- **Ladeoptimierung:**
  - Verwendung von `React.lazy` und `Suspense` für Lazy Loading.
  - `Code Splitting`, um die Bundle-Größe zu reduzieren.

<!-- ------------------------------------------------------------------------------------------- -->

## Projektdetails

### Backend (Nodepop API)

**Verfügbare Endpunkte:**

- `/api/auth/signup`

  - **POST**: Erstellt Benutzer.

- `/api/auth/me`

  - **GET**: Gibt Informationen des authentifizierten Benutzers zurück.

- `/api/auth/login`

  - **POST**: Gibt ein JWT-Token bei korrekter E-Mail und Passwort zurück.

- `/api/v1/adverts`

  - **GET**: Listet Anzeigen mit optionalen Filtern: `name=auto`, `sale=true/false`, `price=0-25000`, `tags=motor,work`
  - **POST**: Erstellt eine neue Anzeige.

- `/api/v1/adverts/tags`

  - **GET**: Gibt verfügbare Tags zurück.

- `/api/v1/adverts/:id`
  - **GET**: Gibt Anzeige per ID zurück.
  - **DELETE**: Löscht Anzeige per ID.

**Wichtige Hinweise:**

- Endpunkte unter `/adverts` erfordern ein Token. Im Header senden: `Header['Authorization'] = Bearer ${token}`.
- Daten werden in einer SQLite-Datenbank unter `/data` gespeichert.
- Hochgeladene Bilder werden unter `/uploads` gespeichert und über `/public` statisch bereitgestellt.

### Frontend (SPA mit React)

**Öffentliche Routen:**

- `/login` —> LoginPage

**Geschützte Routen (nur authentifizierte Benutzer):**

- `/` —> Weiterleitung zu `/adverts`
- `/adverts` —> AdvertsPage
- `/adverts/:id` —> AdvertPage
- `/adverts/new` —> NewAdvertPage
- Alle anderen Routen —> `NotFoundPage (404)`

**Hauptkomponenten:**

- **LoginPage**  
  Formular mit E-Mail, Passwort und Checkbox „Session merken“. Speichert Token nach erfolgreichem Login.

- **AdvertsPage**  
  Zeigt Anzeigen mit Name, Preis, Kauf/Verkauf und Tags.  
  Filter (Name, Typ, Preis, Tags) verfügbar.  
  Links zur Detailseite oder zur Erstellung neuer Anzeige.  
  Nachricht bei fehlenden Anzeigen.

- **AdvertPage**  
  Zeigt Anzeigedetails mit Bild oder Platzhalter.  
  Leitet zu 404 weiter, wenn nicht gefunden.  
  Löschen mit Bestätigung. Weiterleitung zur Liste nach dem Löschen.

- **NewAdvertPage**  
  Formular mit Name, Typ, Tags, Preis und optionalem Foto.  
  Validierung mit React. Weiterleitung zur Detailseite nach Erstellung.

- **NotFoundPage**  
  Informationsseite für 404-Fehler.

- **LogoutButton**  
  Sichtbar bei eingeloggtem Benutzer.  
  Bestätigung vor dem Logout.

**Filter auf der AdvertsPage:**

- Mindestens zwei Filter: Name, Kauf/Verkauf, Preis oder Tags.
- _Zwei Arten der Filteranwendung:_
  1. Frontend-Filterung nach dem Laden aller Anzeigen.
  2. Backend-Filterung durch Übergabe von Query-Parametern (empfohlen).

**Wichtige technische Features:**

- Authentifizierung mit JWT-Token.
- Geschützte Routen mit automatischer Weiterleitung zum Login.
- Sitzungspersistenz mit localStorage.
- Axios mit Token-Interceptor.
- Styling mit Tailwind CSS.
- Navigation mit React Router.
- Formularvalidierung mit React.

<!-- ------------------------------------------------------------------------------------------- -->

## Verwendete Technologien

### Sprachen

- **HTML:** Strukturierung von Inhalten und Aufbau der Webseite.
- **CSS:** Visuelles Design und Styling für ein ansprechendes Nutzererlebnis.
- **JavaScript:** Interaktivität und dynamische Funktionen, z. B. Formularvalidierung, Animationen und Event-Handling.
- **TypeScript:** Statisch typisierte Programmiersprache, die nach JavaScript kompiliert wird und Codequalität sowie Wartbarkeit verbessert.

- **JSX-Pseudosprachsyntax:** In React verwendet, erlaubt HTML-ähnliche Syntax innerhalb von JavaScript-Code.

### Abhängigkeiten

- **React:** Bibliothek für die Entwicklung von Benutzeroberflächen mit wiederverwendbaren Komponenten.
- **Vite:** Build-Tool und schneller Entwicklungsserver für moderne Frontend-Projekte.
- **TypeScript:** Eine Obermenge von JavaScript, die statische Typisierung hinzufügt und so eine skalierbarere und fehlerärmere Entwicklung ermöglicht.
- **Tailwind CSS:** Utility-First CSS-Framework für schnelles, individuelles Design.
- **ESLint:** Analysewerkzeug zur Qualitätssicherung von JavaScript-/TypeScript-Code.
- **Axios:** HTTP-Client zur einfachen Kommunikation mit APIs.
- **clsx:** Hilfsbibliothek zum bedingten Kombinieren von CSS-Klassen.
- **Globals:** Definition globaler Variablen zur Unterstützung und Kompatibilität im Code.
- **Prettier:** Automatischer Code-Formatter für einheitlichen Stil im Projekt.

<!-- ------------------------------------------------------------------------------------------- -->

## Installations- und Nutzungshinweise

### Softwareanforderungen

- **[Git](https://git-scm.com/downloads)** (getestet mit Version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (getestet mit Version **1.99.0**)
- **[nodepop-api (REST-API)](https://github.com/davidjj76/nodepop-api)** (entwickelt von **David Jiménez** – **KeepCoding**)
- **Live Server** (VS Code Addon, _optional_)

### Repositories klonen

Nodepop API

```bash
git clone https://github.com/davidjj76/nodepop-api.git
```

Projekt

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

Demo

![Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### Hinweise

- Sobald das Repository geklont wurde, kannst du die `.html`-Dateien mit **Live Server** öffnen, um sie im Browser vorzuschauen.
- Der Backend-Server muss gestartet werden, damit die REST-API funktionsfähig ist und auf die simulierte Datenbank zugegriffen werden kann.

<!-- ------------------------------------------------------------------------------------------- -->

## Projektvorschau

...

<!-- ------------------------------------------------------------------------------------------- -->

## Beiträge und Lizenzen

Dieses Projekt enthält keine externen Beiträge oder Lizenzen.
