import { ISurvey, IGender } from "shared/types";
import { Document, model, Schema } from "mongoose";

export interface ISurveyModel extends Document, Omit<ISurvey, "_id"> { }

const SurveySchema = new Schema<ISurveyModel>({
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'], required: true },
    nationality: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: false },
    status: { type: String, enum: ['new', 'reviewed', 'archived'], default: 'new', required: true }
}, {
    timestamps: true,
});

export const Survey = model<ISurveyModel>("Survey", SurveySchema);