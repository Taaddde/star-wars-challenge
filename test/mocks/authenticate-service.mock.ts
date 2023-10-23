import { User } from "@app/db-mongoose/user/user.entity";


export class AuthenticateServiceMock {
    async authenticate(user: User, username: string, password: string): Promise<string> {
        if (username === "valid-user") {
            return "valid-token";
        } else {
            return "invalid-token"
        }
    }
}