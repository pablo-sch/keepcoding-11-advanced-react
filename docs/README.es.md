# Entrega Proyecto de Fundamentos de REACT

`>` **Proyectos KeepCoding - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Selecciona tu Idioma:** [Inglés](README.md) 🔄 [Alemán](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Objetivo del Proyecto

Con el fin de ejercitar y demostrar los conocimientos adquiridos en clases virtuales, en este proyecto se debe crear una aplicación de tipo SPA (Single Page Application) con React que será la interfaz gráfica desde la que podremos gestionar el API de anuncios con el backend llamado Nodepop.

<!-- ------------------------------------------------------------------------------------------- -->

## Conocimientos Aprendidos y Trabajados

### Fundamentos de React

- **React:** Biblioteca declarativa para construir interfaces de usuario.
- **Componentes:** Reutilizables, independientes, jerárquicos.

### Elementos

- `React.createElement(type, props, children)`
- `ReactDOM.render(element, container)`
- **JSX:**

  - Sintaxis similar a `HTML`.
  - **Atributos:** `className`, `htmlFor`, etc.
  - **Atributos spread:** <Component {...props} />
  - **children:** Contenido interno entre etiquetas.

### Componentes

- **Props:** Parámetros que recibe un componente (`props.nombre`)
- Componentes anidados
- **React.Fragment:** Agrupa sin añadir nodos extra.
- **Renderizado condicional:** `if`, `? :`, `&&`
- **Listas:** Uso de `.map()` y claves únicas (`key`)
- **Eventos:** `onClick`, `onChange`, etc.

### Estado

- `useState(valorInicial)` para manejar estado local.
- **Lifting state up:** compartir estado entre componentes.

### Formularios

- **Inputs controlados:** manejados por useState
- **Inputs no controlados:** acceso mediante useRef
- **Checkbox** / **Radio Buttons**
- **Envío de formularios:** `onSubmit`, `event.preventDefault()`

### Efectos

Uso de `useEffect` y su anatomía (dependencias, limpieza) y su comportamiento en `StrictMode`.

### Hooks

Hooks personalizados para lógica reutilizable.

### Context

Creación de contextos con `React.createContext`, proveer contextos con `Context.Provider` y consumir contextos con `useContext`.

### Refs

- **useRef:** acceso al DOM o valores persistentes entre renders.
- **forwardRef:** reenviar referencias a componentes hijos.

### Optimización de rendimiento

- **React.memo:** evita renders innecesarios si las props no cambian.
- **useCallback(fn, deps):** memoriza funciones.
- **useMemo(fn, deps):** memoriza valores computados costosos.

### Optimización de carga

- Uso de `React.lazy` y `Suspense` para carga diferida de componentes y `Code splitting` para reducir el tamaño del bundle inicial.

<!-- ------------------------------------------------------------------------------------------- -->

## Detalles del Proyecto

### Rutas públicas

- `/login` —> LoginPage

  - Formulario con email, password y checkbox “Recordar sesión”. Guarda token tras login exitoso.

### Rutas protegidas (solo usuarios autenticados)

- `/` —> Redirecciona a `/adverts`

  - Lista anuncios mostrando nombre, precio, compra/venta y tags.
  - Incluye filtros (nombre, tipo, precio, tags).
  - Enlace a detalle del anuncio y a crear nuevo anuncio.
  - Muestra mensaje si no hay anuncios.

- `/adverts`, `/adverts/:id` —> AdvertPage

  - Muestra detalle con imagen o placeholder.
  - Redirige a 404 si no existe.
  - Botón para borrar con confirmación. Redirige al listado tras borrar

- `/adverts/new` —> NewAdvertPage

  - Formulario con nombre, tipo, tags, precio y foto (opcional).
  - Validaciones React. Redirige a detalle tras creación.

- Cualquier otra ruta —> `NotFoundPage (404)`

**Filtros en AdvertsPage:**

- Al menos dos filtros: nombre, compra/venta, precio o tags.
- **Dos formas de aplicar filtros:**
  1. Filtrado en frontend con todos los anuncios cargados.
  2. Filtrado en backend enviando parámetros en la query (recomendado).

**Funcionalidades técnicas clave:**

- Autenticación con token JWT.
- Rutas protegidas y redirección automática al login.
- Persistencia de sesión con localStorage.
- Axios con interceptor para añadir token.
- Estilos con Tailwind CSS.
- React Router para navegación.
- Validación de formularios con React.

<!-- ------------------------------------------------------------------------------------------- -->

## Tecnologías Utilizadas

- **Lenguajes:** HTML, CSS, JavaScript, TypeScript.
- **Dependencias a destacar (Node.js):** React, Vite, Tailwind CSS, TypeScript, ESLint, Axios, clsx, Globals, Prettier.

<!-- ------------------------------------------------------------------------------------------- -->

## Instrucciones de Instalación y Uso

### Nota

Este proyecto **depende** de la API REST `nodepop-api`. Para poder interactuar con la base de datos simulada, es necesario levantar primero el servidor que pone en funcionamiento dicha API.

### 1. Requisitos de Software

- **[Git](https://git-scm.com/downloads)** (testeado en la versión **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (testeado en la versión **1.99.0**)
- **[Node.js](https://nodejs.org/en/download/)** (utilizar última versión disponible)
- **[nodepop-api (API REST)](https://github.com/davidjj76/nodepop-api)** (creada por el docente **David Jiménez** - **KeepCoding**)

### 2. Clonación del Repositorio

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

`>` **Ver Demo de Clonanción en VSCode:** 🎥 [Gif Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### 4. Creación de Usuarios

Una vez que la API esté levantada, deberás crear un nuevo usuario usando Swagger en `http://localhost:3001/swagger/` para poder iniciar sesión.

### 3. Comandos

```sh
# Instala las dependencias del proyecto.
npm install

# Inicia el servidor de desarrollo.
npm run dev

# Construye la aplicación lista para producción.
npm run build

# Revisa el código en busca de errores.
npm run lint

# Previsualiza la compilación de producción localmente.
npm run preview

# Formatea el código automáticamente.
npm run format
```

<!-- ------------------------------------------------------------------------------------------- -->

## Recursos

`>` **Endpoints Nodepop-API:** 📄 [Endpoints](api-doc.md)

`>` **Vista Previa del Proyecto:** 👀 [Vista Previa](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Contribuciones y Licencias

Proyecto bajo licencia MIT. Uso y distribución libres con atribución. No se aceptan contribuciones externas, pero las sugerencias son bienvenidas.
