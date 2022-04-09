export class Address {
  constructor(props) {
    this.street = props.street;
    this.city = props.city;
    this.province = props.province;
    this.zipCode = props.zipCode;
    this.fullAddress = this.street + ", " + this.city + ", " + this.province + " " + this.zipCode;
  }
}