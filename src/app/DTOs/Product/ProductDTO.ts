export class ProductDTO {
    constructor(
        public id: number,
        public  name :string,
        public  isActive :boolean
    ) {

    }

}
export class NewProductDTO {
    constructor(
        public  name :string,
        public  isActive :boolean
    ) {

    }

}