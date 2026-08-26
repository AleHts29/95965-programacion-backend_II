export default class StudentsDto {
    constructor(data) {
        this.name = data.first_name;
        this.lastName = data.last_name;
        this.fullName = `${this.name} ${this.lastName}`;
        this.age = data.age;
        this.email = data.email;
        this.password = data.password
    }
}