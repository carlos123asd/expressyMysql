import {Schema} from 'mongoose';
import Employee from '../interfaces/Employee';
import bcrypt from 'bcrypt'


export const employeeSchema = new Schema<Employee>({
    photo: {type: String, required: false},
    name: {type: String, required: true},
    email: {type: String,unique: true, required: true},
    password: {type: String, required: true},
    startdate: {type: Date, required: true},
    description: {type: String, required: true},
    phone: {type: String, required: false},
    status: {type: String, required: true}
})

employeeSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password') || !user.isNew) {
      return next();
    }
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.error(err)
    }
});