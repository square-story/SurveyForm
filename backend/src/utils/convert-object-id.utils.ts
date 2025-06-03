import { Types } from "mongoose";

export const toObjectId = (id: string) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid object id format");
    }
    return new Types.ObjectId(id);
}