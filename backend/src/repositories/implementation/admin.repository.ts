import { BaseRepository } from "../base.repository";
import Admin, { IAdminModel } from "@/models/admin.model";
import { IAdminRepository } from "../interface/IAdminRepository";
import { toObjectId } from "@/utils";

export class AdminRepository extends BaseRepository<IAdminModel> implements IAdminRepository {
    constructor() {
        super(Admin);
    }

    async findByUsername(username: string): Promise<IAdminModel | null> {
        try {
            return await this.findOne({ username });
        } catch (error) {
            console.error(error);
            throw new Error("Error finding user by username");
        }
    }

    async findAdminById(id: string): Promise<IAdminModel | null> {
        try {
            return await this.findById(toObjectId(id));
        } catch (error) {
            console.error(error);
            throw new Error("Error finding user by ID");
        }
    }
}
