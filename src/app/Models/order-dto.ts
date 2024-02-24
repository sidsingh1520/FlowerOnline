export class OrderDto{

    constructor(
        public email:string,
        public name:string,
        public quantity:number,
        public description:string,
        public size:string,
        public price:number,
        public imageUrl:string,
    ){
    }

}