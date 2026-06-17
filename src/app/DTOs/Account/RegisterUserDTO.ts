export class RegisterUserDTO {
    constructor(
        public email: string,
        public fullname: string,
        public password: string,
        public contryId: number,
        public provinceId: number,
        public productId: number,
    ) {

    }
}