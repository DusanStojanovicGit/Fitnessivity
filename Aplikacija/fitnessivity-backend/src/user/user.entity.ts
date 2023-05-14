import * as mongoose from 'mongoose';

export class User extends mongoose.Document{
  email: string;
  password: string;
  name: string;
  lastName: string;
  birthDate: string;
  gender: string;
};

export const UserSchema = new mongoose.Schema({
  email: String,
  password: {type: String, select: false},
  name: String,
  lastName: String,
  birthDate: Date,
  gender: String
});