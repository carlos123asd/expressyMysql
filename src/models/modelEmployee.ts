import {model} from 'mongoose'
import Employee from '../interfaces/Employee';
import { employeeSchema } from '../schema/schemaEmployee';

export const Users = model<Employee>('User', employeeSchema);
