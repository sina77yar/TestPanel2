export class TaskDTO {
    constructor(
        public id: number,
        public  CompanyId :number,
        public  UserId :number,
        public  Status :number,
        public  Description :string
    ) {

    }
}
export class NewTaskDTO {
    constructor(
        public  CompanyId :number,
        public  UserId :number,
        public  Status :number,
        public  Description :string
    ) {

    }
}