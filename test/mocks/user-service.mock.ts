import { User, UserRole } from "@app/db-mongoose/user/user.entity";
import { UserGenericResponseDto } from "src/dtos/user.dto";

export class UserServiceMock {
    async create(user: User): Promise<UserGenericResponseDto> {
        return {message: 'User successfully created'}
    }

    async findAll(): Promise<User[]> {
        return [
            {
                "username": "superman",
                "email": "klark_kent@hotmail.com",
                "password": "$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq",
                "isActive": true,
                "lastLogin": null,
                "role": UserRole.Admin,
                "profileImage": null,
                "createdAt": new Date("2023-10-22T05:34:43.800Z"),
                "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
            },
            {
                "username": "batman",
                "email": "bruce_wayne@hotmail.com",
                "password": "$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq",
                "isActive": true,
                "lastLogin": null,
                "role": UserRole.Admin,
                "profileImage": null,
                "createdAt": new Date("2023-10-22T05:34:43.800Z"),
                "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
            }
        ]
    }

    async findOneById(userId: string): Promise<User | null> {
        return {
            "username": "superman",
            "email": "klark_kent@hotmail.com",
            "password": "$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq",
            "isActive": true,
            "lastLogin": null,
            "role": UserRole.Admin,
            "profileImage": null,
            "createdAt": new Date("2023-10-22T05:34:43.800Z"),
            "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
        }
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return {
            "username": "superman",
            "email": "klark_kent@hotmail.com",
            "password": "$2b$10$2lrOj7o4VoYEBkzGGLs9D.5sJqITyBd7tEnNYqQUYErFP7PLJHebq",
            "isActive": true,
            "lastLogin": null,
            "role": UserRole.Admin,
            "profileImage": null,
            "createdAt": new Date("2023-10-22T05:34:43.800Z"),
            "updatedAt": new Date("2023-10-22T05:34:43.800Z"),
        }
    }

    async update(userId: string, updateUserDto: Partial<User>): Promise<UserGenericResponseDto> {
        return {message: 'User successfully updated'};
    }

    async remove(userId: string): Promise<UserGenericResponseDto> {
        return {message: 'User successfully removed'}
    }
}