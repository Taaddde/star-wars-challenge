export const AppConfig = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/star-wars-challenge',
    swapiBaseUrl: process.env.SWAPI_BASE_URL || 'https://swapi.dev/api/',
};
  