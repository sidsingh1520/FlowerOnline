export class Order{

    constructor(
        public id:number,
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