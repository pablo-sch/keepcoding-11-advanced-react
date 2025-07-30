# Advanced React Project Submission

`>` **KeepCoding Projects - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Choose Your Language:** [Spanish](README.es.md) 🔄 [German](README.de.md)

## Project Objective

The purpose of this project is to build upon the base repository of React fundamentals [`keepcoding-08-react-fundamentals`](https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git), by integrating the following key features:

- Integration of **React Redux** for global state management.
- Configuration of **Redux DevTools** for state debugging and inspection.
- Implementation of **unit tests** for actions, reducers, and associated logic.
- Deepening understanding of **advanced React** through structured, hands-on practice.

This project aims to consolidate prior knowledge and take the next step towards building more scalable and maintainable React applications.

## Skills Learned and Practiced

- **Redux**:

  - Actions, reducers, selectors, hooks
  - Global state and store
  - Unidirectional data flow

- **Redux Data Flow**:

  1. Dispatch an action with `store.dispatch(action)`
  2. The store runs the reducer with the current state and the action
  3. The main reducer combines results and generates new state
  4. Redux stores the new state and notifies subscribed components

- **React-Redux**:

  - `useSelector` to access state
  - `useDispatch` to send actions
  - Use of selectors to extract specific data

- **Asynchronous Actions**:

  - Async action creators
  - Middleware `redux-thunk` for side-effect logic
  - Middleware configuration in Redux

- **Async Flow**:

  - Without middleware: synchronous flow
  - With middleware (`redux-thunk`): controlled async flow

- **Redux DevTools**:
  - Configuration for debugging and action tracking

## Practice Details

The goal of this practice is to set up a **Redux store** to manage the application’s state centrally. The store must handle at least the following:

- **Session management**: handle user authentication state.
- **Adverts management**:
  - Fetch adverts list from the API
  - Fetch specific advert details
  - Create new adverts
  - Delete existing adverts
- **Tags management**: fetch available tags from the API

### Technical Requirements

- Create the required **actions** and **reducers** for the above functionality
- Connect React components to the store using `useSelector` and `useDispatch`
- Set up **Redux DevTools** for easier debugging
- Write **unit tests** for actions, reducers, and thunks

## Technologies Used

- **Languages:** HTML, TypeScript
- **Main Dependencies:** React, Tailwind CSS, TypeScript, Axios, Styled-components, Redux-thunk, React-redux

## Installation and Usage Instructions

### Note

This project **depends** on the `nodepop-api` REST API. You must start the API server first to interact with the mock database.

### 1. Software Requirements

- **[Node.js](https://nodejs.org/en/download/)** (tested with **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (tested with **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (tested with **1.99.0**)
- **[nodepop-api (REST API)](https://github.com/davidjj76/nodepop-api)** (created by **David Jiménez – KeepCoding**)

### 2. Clone the Repository

```bash
git clone https://github.com/pablo-sch/keepcoding-11-advanced-react.git
```

`>` **Demo on cloning using VSCode:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 3. User Registration

Once the API is running, register a new user using Swagger at `http://localhost:3001/swagger/` to log in.

### 4. Commands

```sh
# Install project dependencies.
npm install

# Start the development server.
npm run dev

# Build the project for production (creates the dist folder).
npm run build

# Run ESLint to check for errors.
npm run lint

# Preview the production build locally.
npm run preview

# Run Prettier to format the code.
npm run format
```

## Project Resources

`>` **Nodepop-API Endpoints:** 📄 [Endpoints](api-doc.md)

`>` **Live Preview:** 👀 [Preview](preview.md)

## Contributions and Licensing

This project is released under the MIT license. Free to use and distribute with attribution. External contributions are not accepted, but suggestions are welcome.
