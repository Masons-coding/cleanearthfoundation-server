
# Clean Earth

Clean Earth Foundation is a non-for-profit organization whose goal is to have a clean earth, one clean up at a time. Clean Earth is an organization that will allow people to rally together to run cleanups, fund environmental initiatives, and help increase environmental education.

This is the server side for Clean Earth. Using Node.js, Knex.js, a MySQL DB, and Express.

## Authors

- [@Mason Clarke](https://github.com/Masons-coding)


## Deployment

To deploy this project run

```bash
  npm i - Installs all npm packages in package.json

  npm run migrate:up - Runs migrations for tables
  npm run migrate:down - Deletes migrations for tables
  npm run seed - Runs the seed files for data 

  npm run dev - Starts the nodemon server

```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

  `DB_LOCAL_USER`

  `DB_LOCAL_PASSWORD`

  `DB_LOCAL_DBNAME`

  `DB_LOCAL_PORT`
  
  `SECRET_KEY`

