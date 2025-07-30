# Entrega Proyecto de REACT Avanzado

`>` **Proyectos KeepCoding - Web 18:** 📁 [repos-kc-web-18.md](https://github.com/pablo-sch/pablo-sch/blob/main/docs/repos-kc-web-18.md)

`>` **Selecciona tu Idioma:** [Inglés](README.md) 🔄 [Alemán](README.de.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Objetivo del Proyecto

El propósito de este proyecto es ampliar el repositorio base de fundamentos de React [`keepcoding-08-react-fundamentals`](https://github.com/pablo-sch/keepcoding-08-react-fundamentals.git), incorporando las siguientes funcionalidades clave:

- Integración de **React Redux** para la gestión global del estado de la aplicación.
- Configuración de **Redux DevTools** para facilitar el seguimiento y depuración del estado.
- Implementación de **tests unitarios** para acciones, reducers y lógica asociada.
- Profundización en conceptos de **React avanzado** mediante prácticas reales y estructuradas.

Este proyecto permite afianzar conocimientos previos y dar el siguiente paso en la construcción de aplicaciones React más escalables y mantenibles.

<!-- ------------------------------------------------------------------------------------------- -->

## Conocimientos Aprendidos y Trabajados

- **Redux**:

  - Acciones, reducers, selectors, hooks
  - Estado global y store
  - Flujo de datos unidireccional

- **Flujo de datos en Redux**:

  1. Se despacha una acción: `store.dispatch(action)`
  2. El store ejecuta el reducer con el estado actual y la acción
  3. El reducer combina los resultados y genera un nuevo estado
  4. Redux almacena el nuevo estado y notifica a los componentes suscritos

- **React-Redux**:

  - `useSelector` para acceder al estado
  - `useDispatch` para enviar acciones
  - Uso de selectores para obtener datos específicos

- **Acciones Asíncronas**:

  - Action creators asíncronos
  - Middleware `redux-thunk` para lógica de efectos
  - Configuración de middleware en Redux

- **Flujo Asíncrono**:

  - Sin middleware: flujo síncrono
  - Con middleware (`redux-thunk`): flujo controlado y asíncrono

- **Redux DevTools**:
  - Configuración para depuración y seguimiento de acciones

<!-- ------------------------------------------------------------------------------------------- -->

## Detalles de la Práctica

El objetivo de esta práctica es configurar un **store de Redux** que gestione de forma centralizada el estado de la aplicación. El store deberá incluir, al menos, la siguiente funcionalidad:

- **Gestión de sesión**: manejar el estado de autenticación del usuario.
- **Gestión de anuncios**:
  - Obtener el listado de anuncios desde la API.
  - Obtener el detalle de un anuncio específico.
  - Crear nuevos anuncios.
  - Eliminar anuncios existentes.
- **Gestión de etiquetas**: obtener la lista de _tags_ disponibles desde la API.

### Requisitos técnicos

- Crear las **acciones** y **reducers** necesarios para cubrir los casos de uso anteriores.
- Conectar los componentes de React con el store mediante hooks como `useSelector` y `useDispatch`.
- Configurar **Redux DevTools** para facilitar el debugging.
- Implementar **tests unitarios** para las acciones, reducers y thunks.

<!-- ------------------------------------------------------------------------------------------- -->

## Tecnologías Utilizadas

- **Lenguajes:** HTML, TypeScript.
- **Dependencias a destacar (Node.js):** React, Tailwind CSS, TypeScript, Axios, Styled-components, Redux-thunk, React-redux.

<!-- ------------------------------------------------------------------------------------------- -->

## Instrucciones de Instalación y Uso

### Nota

Este proyecto **depende** de la API REST `nodepop-api`. Para poder interactuar con la base de datos simulada, es necesario levantar primero el servidor que pone en funcionamiento dicha API.

### 1. Requisitos de Software

- **[Node.js](https://nodejs.org/en/download/)** (testeado en la versión **v22.15.1**)
- **[Git](https://git-scm.com/downloads)** (testeado en la versión **2.47.1.windows.1**)
- **[Visual Studio Code](https://code.visualstudio.com/)** (testeado en la versión **1.99.0**)
- **[nodepop-api (API REST)](https://github.com/davidjj76/nodepop-api)** (creada por el docente **David Jiménez** - **KeepCoding**)

### 2. Clonación del Repositorio

```bash
git clone https://github.com/pablo-sch/keepcoding-11-advanced-react.git
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

# Genera la carpeta dist para producción.
npm run build

# Corre Eslint en busca de errores.
npm run lint

# Previsualiza la compilación de producción localmente.
npm run preview

# Corre Prettier para que el código sea formateado.
npm run format
```

<!-- ------------------------------------------------------------------------------------------- -->

## Recursos del Proyecto

`>` **Endpoints Nodepop-API:** 📄 [Endpoints](api-doc.md)

`>` **Vista Previa del Proyecto:** 👀 [Vista Previa](preview.md)

<!-- ------------------------------------------------------------------------------------------- -->

## Contribuciones y Licencias

Proyecto bajo licencia MIT. Uso y distribución libres con atribución. No se aceptan contribuciones externas, pero las sugerencias son bienvenidas.
