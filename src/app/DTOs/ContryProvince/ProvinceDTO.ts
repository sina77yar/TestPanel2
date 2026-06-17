import { SideOfContryTypes } from "./SideOfContryTypes";

export class ProvinceDTO {
    constructor(
        public id: number,
        public provinceName: string,
        public ContryId: number,
        public isActive: boolean,
        public SideOfContryTypes: SideOfContryTypes
    ) { }
}

export class NewProvinceDTO {
    constructor(
        public provinceName: string,
        public ContryId: number,
        public isActive: boolean,
        public SideOfContryTypes: SideOfContryTypes
    ) { }
}