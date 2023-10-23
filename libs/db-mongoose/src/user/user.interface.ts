import { User } from "./user.entity"

export interface IListOptions {
    page?: string,
    limit?: string
}

export interface UserList {
    data: Array<User>,
    page: number,
    limit: number
}