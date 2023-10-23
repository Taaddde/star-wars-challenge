
![Logo](https://i.ibb.co/N3svbrW/Futuristic-Modern-Black-and-White-Logo-1000-x-500-px.png)


# Film Challenge

Is a powerful and scalable RESTful API built using Nest js. It provides endpoints for authentication using JWT and fetching detailed information about films or series.
## Tech Stack
**Server:** Node (>=18.16.0), Express, Mongoose


## Run Locally

Clone the project

```bash
git clone https://github.com/Taaddde/star-wars-challenge.git
```

Go to the project directory

```bash
cd star-wars-challenge
```

Install dependencies

```bash
npm install
```

(Optional) You can start a local database quickly with docker, otherwise clarify the database to be used in environment variables
```bash
npm run database
```

Start the server
```bash
npm run start:dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, there is an .env.example file to use as a guideline.

`PORT`
`DATABASE_URL`
`SWAPI_BASE_URL`
`JWT_SECRET`

## API Reference

### Swapi

#### Populate the database of swapi info
```http
  POST /swapi
```

##### Response
```json
  Films successfully created
```

### User

#### Create user
```http
  POST /user
```

##### Body
```json
  {
      "username": "im_batman",
      "password": "im batman",
      "email": "bruce_wayne@hotmail.com",
      "role": "regular"
  }
```

##### Response
```json
  {
      "message": "User successfully created"
  }
```

#### Login (get Token)

```http
  POST /user/login
```
##### Body
```json
  {
      "username": "im_batman",
      "password": "im batman",
  }
```

##### Response
```json
  {
      "username": "im_batman",
      "email": "bruce_wayne@hotmail.com",
      "role": "regular",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRhZGUiLCJlbWFpbCI6InRhZGVAaG90bWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTgwMjE3MzEsImV4cCI6MTY5ODAzMjUzMX0.yhhY2KaU3e2r8O0elkPYFMhjUhV6MEeZR1z-pWTU1KQ"
  }
```

#### Get list of users
```http
  GET /user
```

##### Response
```json
  [
    {
        "username": "im_batman",
        "email": "bruce_wayne@hotmail.com",
        "password": "im batman",
        "isActive": true,
        "lastLogin": null,
        "role": "regular",
        "profileImage": null,
        "_id": "6531a506a7385fb7f228d56e",
    },
    {
        "username": "im_superman",
        "email": "klarc_kent@hotmail.com",
        "password": "im superman",
        "isActive": true,
        "lastLogin": null,
        "role": "regular",
        "profileImage": null,
        "_id": "6531a506a7385fb7f228d56e",
    }
  ]
```

#### Get user detail
```http
  GET /user/:id
```

##### Response
```json
  {
      "username": "im_batman",
      "email": "bruce_wayne@hotmail.com",
      "password": "im batman",
      "isActive": true,
      "lastLogin": null,
      "role": "regular",
      "profileImage": null,
      "_id": "6531a506a7385fb7f228d56e",
  }
```

### Films
#### Create a media document (only for admin users)
```http
  POST /media
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authentication` | `string` | **Required**. Your JWT token |

##### Body
```json
  {
      "characters": [
          "Batman",
          "Guason"
      ],
      "producer": "Matt Reeves Dylan Clark",
      "director": "Matt Reeves",
      "releaseDate": "2023/03/28",
      "description": "Es una historia muy conmovedora",
      "title": "Batman"
  }
```

##### Response
```json
  {
    "message": "Media successfully created"
  }
```

#### Update a media document (only for admin users)
```http
  PATCH /media/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authentication` | `string` | **Required**. Your JWT token |
| `id` | `string` | ID of the media |

##### Body
```json
  {
      "characters": [
          "Batman",
          "Guason"
      ],
      "producer": "Matt Reeves Dylan Clark",
      "director": "Matt Reeves",
      "releaseDate": "2023/03/28",
      "description": "Es una historia muy conmovedora",
      "title": "Batman"
  }
```

##### Response
```json
  {
    "message": "Media successfully updated"
  }
```

#### Get list of films (only for regular users)
```http
  GET /media
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authentication` | `string` | **Required**. Your JWT token |

##### Response
```json
  [
    {
        "_id": "6535c16f4589307d4e874656",
        "title": "Batman",
        "description": "Es una historia muy conmovedora",
        "releaseDate": "2023-03-28T03:00:00.000Z"
    },
    {
        "_id": "6535d96485f9469d27c2a33a",
        "title": "Batman 2",
        "description": "Es una historia muy conmovedora",
        "releaseDate": "2023-03-28T03:00:00.000Z"
    }
  ]
```

#### Get film detail (only for regular users)
```http
  GET /media/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authentication` | `string` | **Required**. Your JWT token |
| `id` | `string` | ID of the media |

##### Response
```json
  {
      "_id": "6535c16f4589307d4e874656",
      "title": "Batman",
      "description": "Es una historia muy conmovedora",
      "releaseDate": "2023-03-28T03:00:00.000Z",
      "director": "Tadeo",
      "producer": "Tadeo",
      "characters": [
          "Batman",
          "Guason"
      ]
  }
```

## Running Tests

To run tests, run the following command

```bash
npm run test
```


## Deployment

To build this project run

```bash
npm run build
```

Then, start the productive server with

```bash
npm start
```
## Authors

- [@Taaddde](https://github.com/Taaddde)

