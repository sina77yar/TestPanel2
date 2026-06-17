export class changePassDTO {
    constructor(
        public Id: number,
        public oldpassword: string,
        public password: string,
    ) {

    }
}