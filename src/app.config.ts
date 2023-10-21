import { config } from 'dotenv';
config();

export const AppConfig = {
    port: process.env.PORT || 3000,
    database: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/star-wars-challenge'
    },
    swapi: {
        baseUrl: process.env.SWAPI_BASE_URL || 'https://swapi.dev/api/',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'Im-Batman'
    }
};
  