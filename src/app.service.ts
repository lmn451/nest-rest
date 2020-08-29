import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Employee } from './entities/Employee';
import { getData, saveData } from './io.service';

@Injectable()
export class AppService implements OnApplicationShutdown {
  employees: Employee[];
  constructor() {
    this.employees = getData();
  }
  onApplicationShutdown(signal?: string): void {
    saveData(this.employees);
  }

  getEmployee(id: string): Employee | null {
    return this.employees.filter(employee => employee.id === id)[0];
  }

  addEmployee(employee: Employee): boolean {
    if (this.getEmployee(employee.id)) return false;
    this.employees.push(employee);
    return true;
  }

  removeEmployee(id: string): boolean {
    if (!this.getEmployee(id)) return false;
    this.employees = this.employees.filter(employee => employee.id !== id);
    return true;
  }

  updateEmployee(employee: Employee): boolean {
    return this.removeEmployee(employee.id) && this.addEmployee(employee);
  }

  getAll(): Employee[] {
    return this.employees;
  }
}
