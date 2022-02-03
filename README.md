# Haufe challenge
This application is a challenge for Haufe interview.

## Running the full application
Before running the application, you must create environment files for backend and db. More info about creating them can be found below.

To run the application, use the following command:

`docker-compose up -d`

## Backend service
To be able to run the backend service, you must create a `.env` file in the root of the `backend` folder, with the following structure:
```
POSTGRES_USER=postgres-user
POSTGRES_PASSWORD=postgres-pass
POSTGRES_DB=postgres-db
POSTGRES_HOST=postgres-host
JWT_SECRET=jwt-secret
```

## Postgres service
In the `db` folder you must create a file `database.env` with the following structure:

```
POSTGRES_USER=postgres-user
POSTGRES_PASSWORD=postgres-user-pass
POSTGRES_DB=database
```

To run bash inside postgres container, run the following:

`docker-compose run database bash`

Connect to the postgres server, by running the following:

`psql --host=database --username=username --dbname=dbname`
