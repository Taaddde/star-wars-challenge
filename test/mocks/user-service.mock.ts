import { User, UserRole } from "@app/db-mongoose/user/user.entity";

export class UserServiceMock {
    async create(user: User): Promise<User> {
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

    async update(userId: string, updateUserDto: Partial<User>): Promise<string> {
        return 'User successfully updated';
    }

    async remove(userId: string): Promise<string> {
        return 'User successfully removed'
    }
}