# React Fundamentals Project Submission

**KeepCoding Projects - Web 18**  
Check the full list of repositories and descriptions in [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

## Select Your Language

- 🇪🇸 [Spanish](README.es.md)
- 🇩🇪 [German](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Project Objective

To practice and demonstrate the knowledge acquired in virtual classes, this project requires creating a Single Page Application (SPA) that serves as a graphical interface to manage the ads API using the backend called Nodepop.

<!-- ------------------------------------------------------------------------------------------- -->

## Skills Learned and Applied

- **React Fundamentals:**

  - React: Declarative library for building user interfaces.
  - Components: Reusable, independent, hierarchical.

- **Elements:**

  - `React.createElement(type, props, children)`
  - `ReactDOM.render(element, container)`
  - _JSX:_
    - Syntax similar to `HTML`.
    - _Attributes:_ `className`, `htmlFor`, etc.
    - _Spread attributes:_ <Component {...props} />
    - _children:_ Inner content between tags.

- **Components:**

  - _Props:_ Parameters received by a component (`props.name`)
  - Nested components
  - _React.Fragment:_ Groups elements without adding extra nodes.
  - _Conditional rendering:_ `if`, `? :`, `&&`
  - _Lists:_ Using `.map()` and unique keys (`key`)
  - _Events:_ `onClick`, `onChange`, etc.

- **State:**

  - `useState(initialValue)` for managing local state.
  - _Lifting state up:_ sharing state between components.

- **Forms:**

  - _Controlled inputs:_ managed by useState
  - _Uncontrolled inputs:_ accessed via useRef
  - Checkbox / Radio Buttons
  - _Form submission:_ `onSubmit`, `event.preventDefault()`

- **Effects:**

  - Using `useEffect` and its anatomy (dependencies, cleanup), and behavior in `StrictMode`.

- **Hooks:**

  - Custom hooks for reusable logic.

- **Context:**

  - Creating contexts with `React.createContext`, providing with `Context.Provider`, and consuming with `useContext`.

- **Refs:**

  - _useRef:_ access the DOM or persist values between renders.
  - _forwardRef:_ forward references to child components.

- **Performance Optimization:**

  - _React.memo:_ avoids unnecessary renders if props don't change.
  - _useCallback(fn, deps):_ memoizes functions.
  - _useMemo(fn, deps):_ memoizes expensive computed values.

- **Load Optimization:**
  - Use `React.lazy` and `Suspense` for lazy loading components.
  - `Code splitting` to reduce initial bundle size.

<!-- ------------------------------------------------------------------------------------------- -->

## Project Details

### Backend (Nodepop API)

**Available endpoints:**

- `/api/auth/signup`

  - **POST**: Creates users.

- `/api/auth/me`

  - **GET**: Returns authenticated user's info.

- `/api/auth/login`

  - **POST**: Returns a JWT token with correct email and password.

- `/api/v1/adverts`

  - **GET**: Lists ads, supports query filters: `name=car`, `sale=true/false`, `price=0-25000`, `tags=motor,work`
  - **POST**: Creates a new ad.

- `/api/v1/adverts/tags`

  - **GET**: Returns available tags.

- `/api/v1/adverts/:id`
  - **GET**: Returns ad by ID.
  - **DELETE**: Deletes ad by ID.

**Important notes:**

- Endpoints under `/adverts` require a token. Send via header: `Header['Authorization'] = Bearer ${token}`.
- Data is stored in an SQLite database under `/data`.
- Uploaded images are saved in `/uploads` and served statically from `/public`.

### Frontend (SPA with React)

**Public routes:**

- `/login` —> LoginPage

**Protected routes (authenticated users only):**

- `/` —> Redirects to `/adverts`
- `/adverts` —> AdvertsPage
- `/adverts/:id` —> AdvertPage
- `/adverts/new` —> NewAdvertPage
- Any other route —> `NotFoundPage (404)`

**Main components:**

- **LoginPage**  
  Form with email, password, and "Remember me" checkbox. Saves token after successful login.

- **AdvertsPage**  
  Lists ads showing name, price, buy/sell status, and tags.  
  Includes filters (name, type, price, tags).  
  Link to ad details and to create new ad.  
  Shows a message if no ads are available.

- **AdvertPage**  
  Shows ad details with image or placeholder.  
  Redirects to 404 if not found.  
  Delete button with confirmation. Redirects to list after deletion.

- **NewAdvertPage**  
  Form with name, type, tags, price, and optional photo.  
  React validations. Redirects to details after creation.

- **NotFoundPage**  
  Informative 404 page.

- **LogoutButton**  
  Visible if user is logged in.  
  Confirmation before logging out.

**Filters on AdvertsPage:**

- At least two filters: name, buy/sell, price, or tags.
- _Two ways to apply filters:_
  1. Frontend filtering after loading all ads.
  2. Backend filtering by sending query parameters (recommended).

**Key technical features:**

- Authentication with JWT token.
- Protected routes and automatic redirection to login.
- Session persistence with localStorage.
- Axios with token-injecting interceptor.
- Styling with Tailwind CSS.
- Navigation using React Router.
- Form validation using React.

<!-- ------------------------------------------------------------------------------------------- -->

## Technologies Used

### Languages

- **HTML:** For content structuring and creating the layout of the webpage.
- **CSS:** For visual design and styling, ensuring a cohesive and appealing user experience.
- **JavaScript:** For adding interactivity and dynamic features, improving the user experience with things like form validation, animations, and event handling.
- **TypeScript:** A statically typed language that compiles to JavaScript, improving code quality and maintainability.

- **JSX Pseudolanguage:** Used in React, it's a JavaScript syntax extension that allows writing HTML-like structures within JavaScript code.

### Dependencies

- **React:** Library for building user interfaces using reusable components.
- **Vite:** Build tool and fast development server for modern frontend projects.
- **TypeScript:** A superset of JavaScript that adds static typing, making development more scalable and less error-prone.
- **Tailwind CSS:** Utility-first CSS framework for rapid, customizable design.
- **ESLint:** Tool to analyze and identify problems in JavaScript/TypeScript code, ensuring quality and consistency.
- **Axios:** HTTP client for making API requests easily and efficiently.
- **clsx:** Utility to conditionally combine CSS classes in a clean and simple way.
- **Globals:** Global variable definitions to support and maintain compatibility in the codebase.
- **Prettier:** Automatic code formatter that helps maintain a consistent style throughout the project.

<!-- ------------------------------------------------------------------------------------------- -->

## Installation and Usage Instructions

### Software Requirements

- **[Git](https://git-scm.com/downloads)** (tested with version **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (tested with version **1.99.0**)
- **[nodepop-api (REST API)](https://github.com/davidjj76/nodepop-api)** (created by instructor **David Jiménez** - **KeepCoding**)
- **Live Server** (VS Code addon, _optional_)

### Clone the Repositories

Nodepop API

```bash
git clone https://github.com/davidjj76/nodepop-api.git
```

Project

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

![Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### Notes

- Once the repository is cloned, you can open the `.html` files with **Live Server** to preview them in the browser.
- You must run the backend server to make the REST API operational and interact with the simulated database.

<!-- ------------------------------------------------------------------------------------------- -->

## Project Preview

...

<!-- ------------------------------------------------------------------------------------------- -->

## Contributions and Licenses

This project has no external contributions or licenses.
