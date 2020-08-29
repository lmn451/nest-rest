import { readFileSync, writeFileSync } from 'fs';
import { Employee } from './entities/Employee';

export const getData = (): Employee[] => {
  try {
    const employees = JSON.parse(readFileSync(process.env.DB, 'utf8'));
    return employees;
  } catch (error) {
    return [];
  }
};
export const saveData = (data: Employee[]): void => {
  writeFileSync(process.env.DB, JSON.stringify(data));
};
