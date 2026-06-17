export class DsahboardDTO {
    constructor(
        public brokersCount: number,
        public companiesCount: number,
        public successCount: number,
        public productsCount: number,
        public topBrokers: DashboardBrokersData[],
        public last10: DashboardBrokersData[],
        public byContry: any[],

    ) {

    }
}
export class DashboardBrokersData {
    constructor(
        public fullName: string,
        public createDate: Date,
        public successCount: number
    ) { }
}
