export class AuthenticateOption {
    jtwSecret: string;
    constructor(options: AuthenticateOption) {
        Object.assign(this, options);
    }
}