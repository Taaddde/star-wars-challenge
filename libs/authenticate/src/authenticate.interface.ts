export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: 'regular' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}
  