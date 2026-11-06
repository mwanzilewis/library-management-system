# Library Management System

## Schema Decisions

Why Book references Genre rather than embedding it:

We used a relation (Book.genreId -> Genre.id) instead of storing genre name inside Book because:

1. Normalization: If we rename "Sci-Fi" to "Science Fiction", we update 1 row in Genre, not 500 Books.
2. No duplication / typos: Prevents "Fiction", "fiction", "Ficton" existing as different genres.
3. Querying: We can list all Genres, count Books per Genre, and filter Books by Genre efficiently with an index on genreId.
4. Extensibility: Later we can add description, icon to Genre without touching Book.

Prisma vs Document DB: In MongoDB we would embed genre as a string or sub-document inside Book for speed. In Prisma/Postgres we model relations explicitly, so the database enforces referential integrity - you cannot create a Book with a genreId that doesn't exist.

## Setup
```bash
cd api
cp .env.example .env
# edit .env with your real DATABASE_URL
npm install
npx prisma migrate dev --name init
npx prisma db seed
