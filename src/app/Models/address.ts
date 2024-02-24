import { Order } from "./order";

export class Address{
    constructor(
        public firstName:string,
        public lastName:string,
        public address1:string,
        public address2:string,
        public city:string,
        public state:string,
        public country:string,
        public postalCode:string,
        public orders:any
    ){}
}