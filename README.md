# Haufe challenge
This application is a challenge for Haufe interview.

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