export class CurrentUser {
    constructor(
        public userId: number,
        public fullname:string,
        public address?:string,
        public email?:string,
        public phone?:string,
        public IsAdmin?:boolean,
    ) {

    }
}