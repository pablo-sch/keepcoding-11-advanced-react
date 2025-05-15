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

#### Endpoints disponibles

- `/api/auth/signup`  
  - **POST**: Crea usuarios.

- `/api/auth/me`  
  - **GET**: Devuelve la información del usuario autenticado.

- `/api/auth/login`  
  - **POST**: Devuelve un token JWT con email y password correctos.

- `/api/v1/adverts`  
  - **GET**: Listado de anuncios, admite filtros por query string:
    - `name=coche`
    - `sale=true/false`
    - `price=0-25000`
    - `tags=motor,work`
  - **POST**: Crea un anuncio.

- `/api/v1/adverts/tags`  
  - **GET**: Devuelve los tags disponibles.

- `/api/v1/adverts/:id`  
  - **GET**: Devuelve un anuncio por su ID.
  - **DELETE**: Elimina un anuncio por ID.

**Notas**:

- Los endpoints bajo `/adverts` requieren token. Enviar en header:
- Header[‘Authorization’] = `Bearer ${token}`
- Los datos del backend son persistidos en una base de datos sqlite en el directorio **/data** (de ese modo no os teneís que preocupar de crear bases de datos). Las fotos subidas al backend son almacenadas en el directorio **/uploads** y servidas por el backend cómo contenido estático en /public (la ruta pública de cada foto es almacenada en la base de datos).

### Frontend (SPA con React)

#### Rutas

- Públicas
  - `/login`: LoginPage

- Protegidas (solo usuarios autenticados)
  - `/`: Redirecciona a `/adverts`
  - `/adverts`: AdvertsPage
  - `/adverts/:id`: AdvertPage
  - `/adverts/new`: NewAdvertPage
  - `*`: NotFoundPage (página 404)

#### Componentes

- **LoginPage**
  - Formulario: email + password.
  - Checkbox "Recordar sesión".
  - Guarda token tras login exitoso.

- **AdvertsPage**
  - Lista anuncios con:
    - Nombre
    - Precio
    - Compra/Venta
    - Tags
  - Enlaces a detalle (`/adverts/:id`)
  - Filtros:
    - Nombre (input texto)
    - Tipo (compra/venta/todos)
    - Rango de precio (inputs o slider)
    - Tags (checkboxes o select múltiple)
  - Mostrar mensaje si no hay anuncios.
  - Enlace a `/adverts/new`.

- **AdvertPage**
  - Muestra detalle del anuncio (incluye imagen).
  - Redirige a 404 si no existe.
  - Botón de borrar (con confirmación elaborada).
  - Redirige al listado tras borrar.
  
- **NewAdvertPage**
  - Formulario con:
    - Nombre
    - Tipo (compra/venta)
    - Tags
    - Precio
    - Foto (opcional)
  - Validaciones con React.
  - Redirige al detalle tras crear.

- **NotFoundPage**
  - Página 404 informativa.

- **LogoutButton**
  - Visible si el usuario está logueado.
  - Confirmación para cerrar sesión.

#### Filtros en AdvertsPage

Se deben implementar al menos dos filtros:

- Por nombre
- Por compra/venta
- Por precio
- Por tags

Opciones para aplicar los filtros:

1. Filtrado en frontend con todos los anuncios cargados.
2. Filtrado en backend enviando parámetros en la query (recomendado).

### Funcionalidades técnicas clave

- Autenticación con token JWT.
- Rutas protegidas y redirección automática al login.
- Persistencia de sesión con localStorage.
- Axios configurado con interceptor para añadir el token.
- Estilos con Tailwind CSS.
- React Router para navegación.
- Validación de formularios con React.

### Objetivos Opcionales

<!-- ------------------------------------------------------------------------------------------- -->
## Tecnologías

### Lenguajes

- **Typescript**:
- **HTML**: Para la estructuración del contenido y la creación de la estructura de la página web.
- **CSS**: Para el diseño y estilo visual de la página, asegurando una experiencia de usuario atractiva y coherente.
- **JavaScript**: Para agregar interactividad y características dinámicas al sitio web, mejorando la experiencia del usuario con funcionalidades como validación de formularios, animaciones y manejo de eventos.

### Dependencias

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
