import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Employee } from './entities/Employee';
import { EmployeeDto } from './dto/EmployeeDto';

@Controller('/employee')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all')
  getAll(): Employee[] {
    return this.appService.getAll();
  }

  @Post('/')
  addEmployee(@Body() employee: Employee): HttpStatus {
    const emp = this.appService.getEmployee(employee.id);
    if (emp)
      throw new HttpException(
        `The user with the id: ${employee.id} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    return this.appService.addEmployee(employee)
      ? HttpStatus.CREATED
      : HttpStatus.EXPECTATION_FAILED;
  }

  @Get('/:id')
  getEmployee(@Param('id') id: string): Employee {
    const employee = this.appService.getEmployee(id);
    if (!employee)
      throw new HttpException(
        `The user with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST,
      );
    return employee;
  }

  @Delete('/:id')
  removeEmployee(@Param('id') id: string): HttpStatus {
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );
    const employee = this.appService.getEmployee(id);
    if (!employee)
      throw new HttpException(
        `The user with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST,
      );
    return this.appService.removeEmployee(id)
      ? HttpStatus.OK
      : HttpStatus.BAD_REQUEST;
  }

  @Put('/:id')
  updateEmployee(
    @Param('id') id: string,
    @Body() employee: EmployeeDto,
  ): HttpStatus {
    if (!id)
      throw new HttpException(
        'ID parameter is missing',
        HttpStatus.BAD_REQUEST,
      );
    const emp = this.appService.getEmployee(id);
    if (!emp)
      throw new HttpException(
        `The user with the id: ${id} does not exists`,
        HttpStatus.BAD_REQUEST,
      );
    return this.appService.updateEmployee(
      new Employee(
        id,
        employee.email,
        employee.firstName,
        employee.lastName,
        employee.salary,
      ),
    )
      ? HttpStatus.OK
      : HttpStatus.BAD_REQUEST;
  }
}
