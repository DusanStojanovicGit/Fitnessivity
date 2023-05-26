import * as mongoose from 'mongoose';

export class User extends mongoose.Document{
  email: string;
  password: string;
  username: string;
  name: string;
  bio: string;
  type: string;
  link: string;
  trainings: Number;
  birthDate: Date;
  gender: string;
};

export const UserSchema = new mongoose.Schema({
  email: {type: String, select: false},
  password: {type: String, select: false},
  username: String,
  name: String,
  bio: {type: String, select: false},
  type: {type: String, select: false},
  link: String,
  trainings: {type: Number, select: false},
  birthDate: Date,
  gender: String
});