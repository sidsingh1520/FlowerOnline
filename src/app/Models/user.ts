export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public city:string,
    public country:string,
    public phone:string,
    public role:string,
    public createdAt: Date,
  ) {}
}
