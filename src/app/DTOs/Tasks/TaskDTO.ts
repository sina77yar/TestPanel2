export class TaskDTO {
    constructor(
        public id: number,
        public CompanyId: number,
        public UserId: number,
        public BrokerDetailStatusTypes: number,
        public Description: string
    ) {

    }
}
export class NewTaskDTO {
    constructor(
        public CompanyId: number | null,
        public ProductId: number,
        public UserId: number,
        public BrokerDetailStatusTypes: number,
        public Description: string,

        public IsNewCompany: boolean | false,
        public CompanyPhone: string | null = null,
        public ContactPerson: string | null = null,
        public CompanyName: string | null = null
    ) {

    }
}
