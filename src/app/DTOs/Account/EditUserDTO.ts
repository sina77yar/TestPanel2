export class EditUserDTO {
    constructor(
        public Id: number,
        public email: string,
        public firstname: string,
        public lastname: string,
        public address: string,
        public phone: string,
    ) {

    }
}