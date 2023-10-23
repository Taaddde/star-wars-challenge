import { Media } from "@app/db-mongoose/media/media.entity";
import { MediaGenericResponseDto } from "src/dtos/media.dto";


export class MediaServiceMock {
    async create(createMediaDto: Partial<Media>): Promise<Media> {
        return {
            "_id": null,
            "title": "Batman",
            "description": "Es una historia muy conmovedora",
            "releaseDate": new Date("2023-10-22T05:34:43.800Z"),
            "director": "Tadeo",
            "producer": "Tadeo",
            "characters": [
                "Batman",
                "Guason"
            ],
            "createdAt": new Date("2023-10-22T05:34:43.800Z"),
            "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
        }
    }
    
      async createAll(medias): Promise<string> {
        return 'Films successfully created';
      }
    
      async findAll(): Promise<Media[]> {
        return [
            {
                "_id": null,
                "title": "Batman",
                "description": "Es una historia muy conmovedora",
                "releaseDate": new Date("2023-10-22T05:34:43.800Z"),
                "director": "Tadeo",
                "producer": "Tadeo",
                "characters": [
                    "Batman",
                    "Guason"
                ],
                "createdAt": new Date("2023-10-22T05:34:43.800Z"),
                "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
            },
            {
                "_id": null,
                "title": "Superman",
                "description": "Es una historia muy conmovedora",
                "releaseDate": new Date("2023-10-22T05:34:43.800Z"),
                "director": "Tadeo",
                "producer": "Tadeo",
                "characters": [
                    "Superman",
                    "Superwoman"
                ],
                "createdAt": new Date("2023-10-22T05:34:43.800Z"),
                "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
            }
        ]
      }
    
      async findOneById(id: string): Promise<Media | null> {
        return {
            "_id": null,
            "title": "Batman",
            "description": "Es una historia muy conmovedora",
            "releaseDate": new Date("2023-10-22T05:34:43.800Z"),
            "director": "Tadeo",
            "producer": "Tadeo",
            "characters": [
                "Batman",
                "Guason"
            ],
            "createdAt": new Date("2023-10-22T05:34:43.800Z"),
            "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
        }
      }
    
      async update(id: string, updateMediaDto: Partial<Media>): Promise<MediaGenericResponseDto | null> {
          return {message: 'Media successfully updated'}
      }
    
      async remove(id: string): Promise<MediaGenericResponseDto | null> {
          return {message: 'Media successfully removed'}
      }
}