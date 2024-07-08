# For starting project Please create a .env file in the root directory of your project with the following application settings:

# Database

DB_HOST=localhost                 # The host address of the database (localhost for local use)

DB_PORT=5432                     # The port on which the PostgreSQL database runs, default is 5432

DB_USERNAME=[YOUR_DB_USERNAME]   # The username for connecting to the database

DB_PASSWORD=[YOUR_DB_PASSWORD]   # The password for connecting to the database

DB_DATABASE=[YOUR_DB_NAME] # The name of the database you want to connect to

# JWT (JSON Web Token)

JWT_SECRET=[YOUR_JWT_SECRET]      # The secret key for signing JWT tokens

JWT_EXPIRATION=1d                 # The lifespan of the JWT token.

# Port

PORT = 5000                        # Port on which the application works

## Start server using the command

npm run start:dev
