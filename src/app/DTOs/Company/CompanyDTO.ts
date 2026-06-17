export class CompanyDTO {
    constructor(
        public id: number,
        public name: string,
        public isActive: boolean,
        public isAddByBroker: boolean,
        public AddedById: number
        // public isAddByBroker: boolean,
        // public contactPerson: string,
        // public companyPhone: string
    ) {

    }

}
export class NewCompanyDTO {
    constructor(
        public name: string,
        public isActive: boolean,
        public isAddByBroker: boolean,
        public AddedById: number
    ) {

    }

}