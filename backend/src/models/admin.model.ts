import { IAdmin } from "shared/types";
import { Document, model, Schema } from "mongoose";


export interface IAdminModel extends Document, Omit<IAdmin, "_id"> { }

const AdminSchema = new Schema<IAdminModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        timestamps: true,
    }
);

const Admin = model<IAdminModel>("Admin", AdminSchema);
export default Admin;

