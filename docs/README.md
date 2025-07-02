# React Fundamentals Project Submission

`>` **KeepCoding Projects - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Choose Your Language:** [Spanish](README.es.md) 🔄 [German](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Project Objective

To practice and demonstrate the knowledge acquired in virtual classes, this project requires creating a SPA (Single Page Application) using React that will serve as the graphical interface to manage the adverts API with the backend called Nodepop.

<!-- ------------------------------------------------------------------------------------------- -->

## Learned and Practiced Concepts

### React Fundamentals

- **React:** Declarative library for building user interfaces.
- **Components:** Reusable, independent, hierarchical.

### Elements

- `React.createElement(type, props, children)`
- `ReactDOM.render(element, container)`
- **JSX:**

  - Syntax similar to `HTML`.
  - **Attributes:** `className`, `htmlFor`, etc.
  - **Spread attributes:** `<Component {...props} />`
  - **children:** Content inside tags.

### Components

- **Props:** Parameters received by a component (`props.name`)
- Nested components
- **React.Fragment:** Groups without adding extra nodes.
- **Conditional rendering:** `if`, `? :`, `&&`
- **Lists:** Use of `.map()` and unique keys (`key`)
- **Events:** `onClick`, `onChange`, etc.

### State

- `useState(initialValue)` to manage local state.
- **Lifting state up:** sharing state among components.

### Forms

- **Controlled inputs:** managed by useState
- **Uncontrolled inputs:** accessed via useRef
- **Checkbox** / **Radio Buttons**
- **Form submission:** `onSubmit`, `event.preventDefault()`

### Effects

Use of `useEffect` with dependencies, cleanup, and behavior under `StrictMode`.

### Hooks

Custom hooks for reusable logic.

### Context

Creating contexts with `React.createContext`, providing with `Context.Provider`, consuming with `useContext`.

### Refs

- **useRef:** access to DOM or persistent values between renders.
- **forwardRef:** forwarding refs to child components.

### Performance Optimization

- **React.memo:** prevents unnecessary renders if props don't change.
- **useCallback(fn, deps):** memoizes functions.
- **useMemo(fn, deps):** memoizes expensive computed values.

### Load Optimization

- Use of `React.lazy` and `Suspense` for lazy loading components and `Code splitting` to reduce initial bundle size.

<!-- ------------------------------------------------------------------------------------------- -->

## Project Details

### Public Routes

- `/login` —> LoginPage

  - Form with email, password, and "Remember me" checkbox. Stores token after successful login.

### Protected Routes (authenticated users only)

- `/` —> Redirects to `/adverts`

  - List of adverts showing name, price, buy/sell, and tags.
  - Includes filters (name, type, price, tags).
  - Links to advert details and creating new adverts.
  - Shows message if no adverts.

- `/adverts`, `/adverts/:id` —> AdvertPage

  - Shows detail with image or placeholder.
  - Redirects to 404 if not found.
  - Delete button with confirmation. Redirects to list after delete.

- `/adverts/new` —> NewAdvertPage

  - Form with name, type, tags, price, and optional photo.
  - React validations. Redirects to detail after creation.

- Any other route —> `NotFoundPage (404)`

**Filters on AdvertsPage:**

- At least two filters: name, buy/sell, price, or tags.
- **Two ways to apply filters:**
  1. Frontend filtering with all adverts loaded.
  2. Backend filtering by sending query parameters (recommended).

**Key technical features:**

- Authentication with JWT token.
- Protected routes and automatic login redirect.
- Session persistence with localStorage.
- Axios interceptor to add token.
- Styles with Tailwind CSS.
- React Router for navigation.
- Form validation with React.

<!-- ------------------------------------------------------------------------------------------- -->

## Technologies Used

- **Languages:** HTML, CSS, JavaScript, TypeScript.
- **Notable Node.js dependencies:** React, Vite, Tailwind CSS, TypeScript, ESLint, Axios, clsx, Globals, Prettier.

<!-- ------------------------------------------------------------------------------------------- -->

## Installation and Usage Instructions

### Note

This project **depends** on the REST API `nodepop-api`. To interact with the simulated database, you must first start the server that runs this API.

### 1. Software Requirements

- **[Git](https://git-scm.com/downloads)** (tested on version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (tested on version **1.99.0**)
- **[Node.js](https://nodejs.org/en/download/)** (use latest available version)
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
