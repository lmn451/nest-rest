import {
  MinLength,
  MaxLength,
  IsEmail,
  IsInt,
  validate,
} from 'class-validator';
export class EmployeeDto {
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
  constructor(email, firstName, lastName, salary) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    validate(this);
  }
}
