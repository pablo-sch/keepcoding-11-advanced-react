# React Fundamentals Project Submission

`>` **KeepCoding Projects - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Choose Your Language:** [Spanish](README.es.md) 🔄 [German](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Project Objective

To practice and demonstrate the knowledge acquired during virtual classes, this project consists of creating a Single Page Application (SPA) using React, which will serve as the graphical interface to manage the ads API through a backend called Nodepop.

## Learned and Practiced Concepts

### React Fundamentals

- **React:** Declarative library for building user interfaces.
- **Components:** Reusable, independent, hierarchical.

### Elements

- `React.createElement(type, props, children)`
- `ReactDOM.render(element, container)`
- **JSX:**
  - HTML-like syntax.
  - **Attributes:** `className`, `htmlFor`, etc.
  - **Spread attributes:** `<Component {...props} />`
  - **children:** Inner content between tags.

### Components

- **Props:** Parameters received by a component (`props.name`)
- Nested components
- **React.Fragment:** Groups without adding extra nodes.
- **Conditional rendering:** `if`, `? :`, `&&`
- **Lists:** Using `.map()` and unique `key`s
- **Events:** `onClick`, `onChange`, etc.

### State

- `useState(initialValue)` to manage local state.
- **Lifting state up:** Sharing state between components.

### Forms

- **Controlled inputs:** Managed with `useState`
- **Uncontrolled inputs:** Accessed using `useRef`
- **Checkboxes** / **Radio Buttons**
- **Form submission:** `onSubmit`, `event.preventDefault()`

### Effects

Using `useEffect`, its anatomy (dependencies, cleanup), and its behavior in `StrictMode`.

### Hooks

Custom hooks for reusable logic.

### Context

Creating contexts with `React.createContext`, providing them with `Context.Provider`, and consuming them using `useContext`.

### Refs

- **useRef:** Access DOM or persistent values between renders.
- **forwardRef:** Forward refs to child components.

### Performance Optimization

- **React.memo:** Avoids unnecessary re-renders if props haven't changed.
- **useCallback(fn, deps):** Memoizes functions.
- **useMemo(fn, deps):** Memoizes expensive computed values.

### Load Optimization

Using `React.lazy` and `Suspense` for lazy loading of components and `Code splitting` to reduce initial bundle size.

## Project Details

### Public Routes

- `/login` —> LoginPage
  - Form with email, password, and “Remember session” checkbox. Saves token after successful login.

### Protected Routes (authenticated users only)

- `/` —> Redirects to `/adverts`

  - List of ads showing name, price, buy/sell status, and tags.
  - Includes filters (name, type, price, tags).
  - Link to ad detail and create new ad.
  - Displays message if there are no ads.

- `/adverts`, `/adverts/:id` —> AdvertPage

  - Shows details with image or placeholder.
  - Redirects to 404 if not found.
  - Delete button with confirmation. Redirects to list after deletion.

- `/adverts/new` —> NewAdvertPage

  - Form with name, type, tags, price, and optional photo.
  - React validations. Redirects to detail after creation.

- Any other route —> `NotFoundPage (404)`

**Filters in AdvertsPage:**

- At least two filters: name, buy/sell, price, or tags.
- **Two ways to apply filters:**
  1. Frontend filtering with all ads loaded.
  2. Backend filtering by sending query parameters (recommended).

**Key Technical Features:**

- Authentication with JWT token.
- Protected routes and automatic redirection to login.
- Session persistence using localStorage.
- Axios with token interceptor.
- Tailwind CSS for styling.
- React Router for navigation.
- Form validation using React.

## Technologies Used

- **Languages:** HTML, CSS, JavaScript, TypeScript.
- **Key dependencies (Node.js):** React, Vite, Tailwind CSS, TypeScript, ESLint, Axios, clsx, Globals, Prettier.

## Installation and Usage Instructions

### Note

This project **depends** on the `nodepop-api` REST API. To interact with the mock database, you must first start the server that runs the API.

### 1. Software Requirements

- **[Node.js](https://nodejs.org/en/download/)** (tested on version **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (tested on version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (tested on version **1.99.0**)
- **[nodepop-api (REST API)](https://github.com/davidjj76/nodepop-api)** (created by instructor **David Jiménez** - **KeepCoding**)

### 2. Clone the Repository

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

`>` **VSCode Clone Demo:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 4. Create Users

Once the API is running, create a new user using Swagger at `http://localhost:3001/swagger/` to be able to log in.

### 3. Commands

```sh
# Installs project dependencies.
npm install

# Starts development server.
npm run dev

# Builds production-ready app.
npm run build

# Checks code for errors.
npm run lint

# Previews production build locally.
npm run preview

# Formats code automatically
npm run format
```

<!-- ------------------------------------------------------------------------------------------- -->

## Resources

`>` **Nodepop-API Endpoints:** 📄 [Endpoints](api-doc.md)

`>` **Project Preview:** 👀 [Preview](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Contributions and Licenses

Project under MIT license. Free use and distribution with attribution. External contributions not accepted, but suggestions welcome.
