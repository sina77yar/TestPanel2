export class RegisterUserDTO {
    constructor(
        public email: string,
        public firstname: string,
        public lastname: string,
        public password: string,
        public confirmPassword: string,
        public address: string,
        public phone: string,
    ) {

    }
}