import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // No need to provide useNewUrlParser or useUnifiedTopology separately in Mongoose 6+
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);

        console.log(`\n✅ MongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("❌ MongoDB connection FAILED: ", error);
        // It is useless to keep the server running if the connection fails, so it is better to exit the process.
        process.exit(1);
    }
};

export default connectDB;