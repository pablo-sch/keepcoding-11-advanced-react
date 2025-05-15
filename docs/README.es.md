# Entrega Proyecto de Fundamentos de REACT

## Selecciona tu lenguaje

- 🇺🇸 [Inglés](README.md)
- 🇩🇪 [Alemán](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->
## Conocimientos aprendidos y trabajados

- **React:** Declarativo y basado en componentes.
- **Elementos:** `createElement`, `render()`, JSX: atributos, atributos spread, `children`.
- **Componentes:** Uso de propiedades (`props`), Componentes anidados, `React.Fragment`, Renderizado condicional, Listas con `key`, Manejo de eventos.
- **Estado:** `useState`, Compartición del estado entre componentes.
- **Formularios:** Inputs controlados y no controlados, Checkbox y radio buttons, Envío de formularios (`onSubmit`).
- **Efectos:** `useEffect` y su anatomía (dependencias, limpieza), Comportamiento en `StrictMode`.
- **Hooks:** Personalización de lógica reutilizable.
- **Context:** Crear contextos con `React.createContext`, Proveer contextos con `Context.Provider`, Consumir contextos con `useContext`.
- **Refs:** Acceso al DOM con `useRef`, Referencias reenviadas con `forwardRef`.
- **Rendimiento en React:** `React.memo` para evitar renders innecesarios, `useCallback` para memorizar funciones, `useMemo` para memorizar valores computados.
- **Optimización de carga:** `React.lazy` y `Suspense` para carga diferida de componentes, Code splitting para reducir el tamaño del bundle inicial.

<!-- ------------------------------------------------------------------------------------------- -->
## Objetivo del Proyecto

Con el fin de ejercitar y demostrar los conocimientos adquiridos en clases virtuales, en este proyecto se debe crear una aplicación de tipo dashboard que será la interfaz gráfica desde la que podremos gestionar el API de anuncios con el backend llamado Nodepop.

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
  - **GET**: Listado de anuncios, admite filtros por query string:  
    `name=coche`, `sale=true/false`, `price=0-25000`, `tags=motor,work`  
  - **POST**: Crea un anuncio.

- `/api/v1/adverts/tags`  
  - **GET**: Devuelve los tags disponibles.

- `/api/v1/adverts/:id`  
  - **GET**: Devuelve un anuncio por su ID.  
  - **DELETE**: Elimina un anuncio por ID.

**Notas importantes:**

- Los endpoints bajo `/adverts` requieren token. Enviar en header:
  `Header['Authorization'] = Bearer ${token}`  
- Los datos se almacenan en base de datos SQLite en `/data`.  
- Fotos subidas se guardan en `/uploads` y se sirven estáticamente desde `/public`.  

### Frontend (SPA con React)

**Rutas públicas:**

- `/login` — LoginPage

**Rutas protegidas (solo usuarios autenticados):**

- `/` — Redirecciona a `/adverts`  
- `/adverts` — AdvertsPage  
- `/adverts/:id` — AdvertPage  
- `/adverts/new` — NewAdvertPage  
- Cualquier otra ruta — NotFoundPage (404)

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
- Dos formas de aplicar filtros:  
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

### Objetivos Opcionales

<!-- ------------------------------------------------------------------------------------------- -->
## Tecnologías Utilizadas

### Lenguajes

- **HTML:** Para la estructuración del contenido y la creación de la estructura de la página web.
- **CSS:** Para el diseño y estilo visual de la página, asegurando una experiencia de usuario atractiva y coherente.
- **JavaScript:** Para agregar interactividad y características dinámicas al sitio web, mejorando la experiencia del usuario con funcionalidades como validación de formularios, animaciones y manejo de eventos.
- **TypeScript:** Lenguaje de programación con tipado estático que se compila a JavaScript, mejorando la calidad y mantenibilidad del código.

### Dependencias

- **React:** Librería para construir interfaces de usuario basadas en componentes reutilizables.
- **Vite:** Herramienta de construcción y servidor de desarrollo rápido para proyectos frontend modernos.
- **Tailwind CSS:** Framework CSS basado en utilidades para un diseño rápido y personalizado.
- **ESLint:** Herramienta para analizar y encontrar problemas en el código JavaScript/TypeScript, asegurando calidad y consistencia.
- **Axios:** Cliente HTTP para realizar peticiones a APIs de manera sencilla y eficiente.
- **clsx:** Utilidad para combinar clases CSS condicionalmente de forma limpia y sencilla.
- **Globals:** Definiciones de variables globales para facilitar el soporte y compatibilidad en el código.
- **Prettier:** Formateador de código automático que ayuda a mantener un estilo consistente en el proyecto.

<!-- ------------------------------------------------------------------------------------------- -->
## Instrucciones de Instalación y Uso

### Requisitos de Software

### Descripción de los Programas

### Clonando el Repositorio

### Notas

<!-- ------------------------------------------------------------------------------------------- -->
## Vista Previa del Proyecto

<!-- ------------------------------------------------------------------------------------------- -->

## Contribuciones y Licencias
