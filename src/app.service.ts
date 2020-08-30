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
    return this.employees.find(employee => employee.id === id);
  }

  addEmployee(employee: Employee): boolean {
    this.employees.push(employee);
    return true;
  }

  removeEmployee(id: string): boolean {
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
