export class CompanyDTO {
    constructor(
        public id: number,
        public  name :string,
        public  isActive :boolean
    ) {

    }

}
export class NewCompanyDTO {
    constructor(
        public  name :string,
        public  isActive :boolean
    ) {

    }

}