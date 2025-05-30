import { IAdminModel } from "@/models/admin.model"

export interface IAdminRepository {
    findByUsername(username: string): Promise<IAdminModel | null>;
    findAdminById(id: string): Promise<IAdminModel | null>;
}