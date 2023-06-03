export interface Plan {
    _id: string;

    name: string;

    creator: string;

    type: string;

    genre: string;

    workoutsCompleted: number;

    days: number;

    submissionDate: Date;

    picture: string;

    planLink: string;

    description: string;
}