# Nodepop-API Endpoints

[◀️ **Go Back**](README.md)

## Auth

- `/api/auth/signup`

  - **POST**: Creates a new user.

- `/api/auth/me`

  - **GET**: Returns the authenticated user's information.

- `/api/auth/login`

  - **POST**: Returns a JWT token when provided with a correct email and password.

## Adverts

- `/api/v1/adverts`

  - **GET**: Returns a list of adverts. Supports query string filters: `name=car`, `sale=true/false`, `price=0-25000`, `tags=motor,work`
  - **POST**: Creates a new advert.

- `/api/v1/adverts/tags`

  - **GET**: Returns the available tags.

- `/api/v1/adverts/:id`
  - **GET**: Returns an advert by its ID.
  - **DELETE**: Deletes an advert by ID.

**Important Notes:**

- Endpoints under `/adverts` require a token. Send it using the header: `Header['Authorization'] = Bearer ${token}`.
- Data is stored in a SQLite database located in `/data`.
- Uploaded images are saved in `/uploads` and served statically from `/public`.
