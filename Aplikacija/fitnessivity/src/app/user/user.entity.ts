export interface User {
    _id: string;
    email: string;
    password: string;
    username: string;
    isAdmin: boolean;
    name: string;
    bio: string;
    type: string;
    link: string;
    trainings: Number;
    birthDate: Date;
    gender: string;
};