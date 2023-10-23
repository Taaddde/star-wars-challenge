import { Media } from "./media.entity"

export interface IListOptions {
    page?: string,
    limit?: string
}

export interface MediaList {
    data: Array<Media>,
    page: number,
    limit: number
}