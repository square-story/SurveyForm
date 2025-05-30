import {
    Document,
    Model,
    FilterQuery,
    UpdateQuery,
    DeleteResult,
    Types,
    UpdateWriteOpResult,
} from "mongoose";

export abstract class BaseRepository<T extends Document> {
    constructor(protected model: Model<T>) {
    }

    async findById(id: Types.ObjectId): Promise<T | null> {
        return this.model.findById(id);
    }

    async findByIdAndUpdate(id: Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, update, { upsert: true, new: true });
    }

    async findAll(populate?: string[]): Promise<T[]> {
        let query = this.model.find()

        // Apply population if specified
        if (populate && populate.length > 0) {
            populate.forEach(field => {
                query = query.populate(field);
            });
        }

        return await query.exec();
    }

    async create(data: Partial<T>): Promise<T> {
        const document = new this.model(data);
        return document.save();
    }

    async update(id: Types.ObjectId, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async updateOne(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>
    ): Promise<UpdateWriteOpResult> {
        return this.model.updateOne(filter, update);
    }

    async delete(id: Types.ObjectId): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }

    async deleteOne(filter: FilterQuery<T>): Promise<DeleteResult> {
        return this.model.deleteOne(filter);
    }

    async find(filter: FilterQuery<T>, populate?: string[]): Promise<T[]> {
        let query = this.model.find(filter);


        if (populate && populate.length > 0) {
            populate.forEach(field => {
                query = query.populate(field);
            });
        }

        return await query.exec();
    }

    async findOne(filter: FilterQuery<T>, populate?: string[]): Promise<T | null> {
        let query = this.model.findOne(filter);

        // Apply population if specified
        if (populate && populate.length > 0) {
            populate.forEach(field => {
                query = query.populate(field);
            });
        }

        return await query.exec();
    }

    async findByUsernameOrEmail(value: string): Promise<T | null> {
        const filter: FilterQuery<T> = {
            $or: [{ email: value }, { username: value }]
        }

        return this.model.findOne(filter);
    }

    async findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
        return this.model.findOneAndUpdate(filter, update, { upsert: true, new: true });
    }

    async findOneAndDelete(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOneAndDelete(filter);
    }

    async addToSet(id: string, field: string, value: unknown): Promise<T | null> {

        const updatedDocument = await this.model.findByIdAndUpdate(
            id,
            { $addToSet: { [field]: value } } as UpdateQuery<T>,
            { new: true }
        );
        return updatedDocument as unknown as T | null;
    }

    async pull(id: string, field: string, value: unknown): Promise<T | null> {
        const updatedDocument = await this.model.findByIdAndUpdate(
            id,
            { $pull: { [field]: value } } as UpdateQuery<T>,
            { new: true }
        );
        return updatedDocument as unknown as T | null;
    }
}
