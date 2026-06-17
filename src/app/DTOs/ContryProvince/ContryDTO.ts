export class ContryDTO {
    constructor(
        public id: number,
        public  name :string,
        public  isActive :boolean
    ) {

    }

}
export class NewContryDTO {
    constructor(
        public  name :string,
        public  isActive :boolean
    ) {

    }

}