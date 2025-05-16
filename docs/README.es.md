# Entrega Proyecto de Fundamentos de REACT

**Proyectos KeepCoding - Web 18**  
Consulta la lista completa de repositorios y descripciones en [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

## Selecciona tu Idioma

- 🇺🇸 [Inglés](README.md)
- 🇩🇪 [Alemán](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->
## Objetivo del Proyecto

Con el fin de ejercitar y demostrar los conocimientos adquiridos en clases virtuales, en este proyecto se debe crear una aplicación de tipo SPA (Single Page Application) que será la interfaz gráfica desde la que podremos gestionar el API de anuncios con el backend llamado Nodepop.

<!-- ------------------------------------------------------------------------------------------- -->
## Conocimientos Aprendidos y Trabajados

- **Fundamentos de React:**
  - React: Biblioteca declarativa para construir interfaces de usuario.
  - Componentes: Reutilizables, independientes, jerárquicos.

- **Elementos:**
  - `React.createElement(type, props, children)`
  - `ReactDOM.render(element, container)`
  - *JSX:*
    - Sintaxis similar a `HTML`.
    - *Atributos:* `className`, `htmlFor`, etc.
    - *Atributos spread:* <Component {...props} />
    - *children:* Contenido interno entre etiquetas.

- **Componentes:**
  - *Props:* Parámetros que recibe un componente (`props.nombre`)
  - Componentes anidados
  - *React.Fragment:* Agrupa sin añadir nodos extra.
  - *Renderizado condicional:* `if`, `? :`, `&&`
  - *Listas:* Uso de `.map()` y claves únicas (`key`)
  - *Eventos:* `onClick`, `onChange`, etc.

- **Estado:**
  - `useState(valorInicial)` para manejar estado local.
  - *Lifting state up:* compartir estado entre componentes.

- **Formularios:**
  - *Inputs controlados:* manejados por useState
  - *Inputs no controlados:* acceso mediante useRef
  - Checkbox / Radio Buttons
  - *Envío de formularios:* `onSubmit`, `event.preventDefault()`

- **Efectos:**
  - Uso de `useEffect` y su anatomía (dependencias, limpieza) y su comportamiento en `StrictMode`.

- **Hooks:**
  - Hooks personalizados para lógica reutilizable.

- **Context:**
  - Creación de contextos con `React.createContext`, proveer contextos con `Context.Provider` y consumir contextos con `useContext`.

- **Refs:**
  - *useRef:* acceso al DOM o valores persistentes entre renders.
  - *forwardRef:* reenviar referencias a componentes hijos.

- **Optimización de rendimiento:**
  - *React.memo:* evita renders innecesarios si las props no cambian.
  - *useCallback(fn, deps):* memoriza funciones.
  - *useMemo(fn, deps):* memoriza valores computados costosos.

- **Optimización de carga:**
- Uso de `React.lazy` y `Suspense` para carga diferida de componentes y `Code splitting` para reducir el tamaño del bundle inicial.

<!-- ------------------------------------------------------------------------------------------- -->

## Detalles del Proyecto

### Backend (API Nodepop)

**Endpoints disponibles:**

- `/api/auth/signup`  
  - **POST**: Crea usuarios.

- `/api/auth/me`  
  - **GET**: Devuelve la información del usuario autenticado.

- `/api/auth/login`  
  - **POST**: Devuelve un token JWT con email y password correctos.

- `/api/v1/adverts`  
  - **GET**: Listado de anuncios, admite filtros por query string: `name=coche`, `sale=true/false`, `price=0-25000`, `tags=motor,work`  
  - **POST**: Crea un anuncio.

- `/api/v1/adverts/tags`  
  - **GET**: Devuelve los tags disponibles.

- `/api/v1/adverts/:id`  
  - **GET**: Devuelve un anuncio por su ID.  
  - **DELETE**: Elimina un anuncio por ID.

**Notas importantes:**

- Los endpoints bajo `/adverts` requieren token. Enviar en header: `Header['Authorization'] = Bearer ${token}`.
- Los datos se almacenan en base de datos SQLite en `/data`.  
- Fotos subidas se guardan en `/uploads` y se sirven estáticamente desde `/public`.  

### Frontend (SPA con React)

**Rutas públicas:**

- `/login` —> LoginPage

**Rutas protegidas (solo usuarios autenticados):**

- `/` —> Redirecciona a `/adverts`  
- `/adverts` —> AdvertsPage  
- `/adverts/:id` —> AdvertPage  
- `/adverts/new` —> NewAdvertPage  
- Cualquier otra ruta —> `NotFoundPage (404)`

**Componentes principales:**

- **LoginPage**  
  Formulario con email, password y checkbox “Recordar sesión”. Guarda token tras login exitoso.
- **AdvertsPage**  
  Lista anuncios mostrando nombre, precio, compra/venta y tags.  
  Incluye filtros (nombre, tipo, precio, tags).  
  Enlace a detalle del anuncio y a crear nuevo anuncio.  
  Muestra mensaje si no hay anuncios.
- **AdvertPage**  
  Muestra detalle con imagen o placeholder.  
  Redirige a 404 si no existe.  
  Botón para borrar con confirmación. Redirige al listado tras borrar.
- **NewAdvertPage**  
  Formulario con nombre, tipo, tags, precio y foto (opcional).  
  Validaciones React. Redirige a detalle tras creación.
- **NotFoundPage**  
  Página 404 informativa.
- **LogoutButton**  
  Visible si el usuario está logueado.  
  Confirmación para cerrar sesión.

**Filtros en AdvertsPage:**

- Al menos dos filtros: nombre, compra/venta, precio o tags.  
- *Dos formas de aplicar filtros:*
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

### Lenguajes

- **HTML:** Para la estructuración del contenido y la creación de la estructura de la página web.
- **CSS:** Para el diseño y estilo visual de la página, asegurando una experiencia de usuario atractiva y coherente.
- **JavaScript:** Para agregar interactividad y características dinámicas al sitio web, mejorando la experiencia del usuario con funcionalidades como validación de formularios, animaciones y manejo de eventos.
- **TypeScript:** Lenguaje de programación con tipado estático que se compila a JavaScript, mejorando la calidad y mantenibilidad del código.

- **Pseudolenguaje JSX:** Utilizado en React, es una extensión de sintaxis de JavaScript que permite escribir estructuras similares a HTML dentro del código JavaScript.

### Dependencias

- **React:** Librería para construir interfaces de usuario basadas en componentes reutilizables.
- **Vite:** Herramienta de construcción y servidor de desarrollo rápido para proyectos frontend modernos.
- **Tailwind CSS:** Framework CSS basado en utilidades para un diseño rápido y personalizado.
- **TypeScript:** Superset de JavaScript que añade tipado estático, facilitando el desarrollo escalable y con menos errores.
- **ESLint:** Herramienta para analizar y encontrar problemas en el código JavaScript/TypeScript, asegurando calidad y consistencia.
- **Axios:** Cliente HTTP para realizar peticiones a APIs de manera sencilla y eficiente.
- **clsx:** Utilidad para combinar clases CSS condicionalmente de forma limpia y sencilla.
- **Globals:** Definiciones de variables globales para facilitar el soporte y compatibilidad en el código.
- **Prettier:** Formateador de código automático que ayuda a mantener un estilo consistente en el proyecto.

<!-- ------------------------------------------------------------------------------------------- -->
## Instrucciones de Instalación y Uso

### Requisitos de Software

- **[Git](https://git-scm.com/downloads)** (testeado en la versión **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (testeado en la versión **1.99.0**)
- **[nodepop-api (API REST)](https://github.com/davidjj76/nodepop-api)** (creada por el docente **David Jiménez** - **KeepCoding**)
- **Live Server** (Addon de Visual Studio Code, *opcional*)

### Clonación del Repositorio

API REST Nodepop-API

```bash
git clone https://github.com/davidjj76/nodepop-api.git
```

Poyecto

```bash
git clone https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git
```

![Demo](https://github.com/pablo-sch/pablo-sch/blob/main/etc/clone-tutorial.gif)

### Notas

- Una vez clonado el repositorio puedes abrir los archivos `.html` con **Live Server** para previsualizarlos en el navegador.
- Se debe de levantar el servidor para poner en funcionamiento la API REST para que puedas interactuar con la base de datos simulada.

<!-- ------------------------------------------------------------------------------------------- -->
## Vista Previa del Proyecto

...

<!-- ------------------------------------------------------------------------------------------- -->
## Contribuciones y Licencias

Este proyecto no cuenta con contribuciones externas ni licencias.
