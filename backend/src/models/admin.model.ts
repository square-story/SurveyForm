import { hashPassword } from "@/utils";
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

AdminSchema.pre<IAdminModel>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
    next();
});

const Admin = model<IAdminModel>("Admin", AdminSchema);
export default Admin;

