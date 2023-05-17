import * as mongoose from 'mongoose';

export class User extends mongoose.Document{
  email: string;
  password: string;
  name: string;
  bio: string;
  type: string;
  trainings: Number;
  lastName: string;
  birthDate: Date;
  gender: string;
};

export const UserSchema = new mongoose.Schema({
  email: String,
  password: {type: String, select: false},
  name: String,
  bio: String,
  type: String,
  trainings: Number,
  lastName: String,
  birthDate: Date,
  gender: String
});