import {
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
  validate,
} from 'class-validator';
export class Employee {
  id: string;
  @IsEmail()
  email: string;
  @MinLength(3)
  @MaxLength(50)
  firstName: string;
  @MinLength(3)
  @MaxLength(50)
  lastName: string;
  @IsInt()
  salary: number;
  constructor(id, email, firstName, lastName, salary) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    validate(this).then(err => {
      if (err) console.log(err);
    });
  }
}
