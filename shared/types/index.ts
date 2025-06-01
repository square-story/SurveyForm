export interface IAdmin {
    _id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IGender = "male" | "female" | "other" | "prefer-not-to-say"

export interface ISurvey {
    _id: string;
    name: string;
    gender: IGender;
    nationality: string;
    email: string;
    phone: string;
    address: string;
    message?: string | undefined;
    createdAt: Date;
    updatedAt: Date;
}