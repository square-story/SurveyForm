import { appConfig } from '@/configs';
import Admin from '@/models/admin.model';
import { hashPassword } from '@/utils';
import mongoose from 'mongoose';


const seedAdmin = async () => {
    try {
        await mongoose.connect(appConfig.mongoUri);
        const count = await Admin.countDocuments();
        if (count > 0) {
            console.log('Admin already exists. Skipping seeding.');
            await mongoose.disconnect();
            return;
        }

        const adminData = {
            username: "Admin",
            password: await hashPassword("Admin@123"),
        };

        const admin = new Admin(adminData);
        await admin.save();

        console.log('Admin added:', admin);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
    }
}

seedAdmin()
    .then(() => console.log('Admin seeding completed successfully.'))
    .catch((error) => console.error('Error during admin seeding:', error));
