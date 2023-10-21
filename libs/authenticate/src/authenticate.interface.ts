export interface User {
    username: string;
    email: string;
    password: string;
    role: 'regular' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}
  