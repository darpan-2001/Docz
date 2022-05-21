import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.DB_URL)
        console.log(`MongoDB connected ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB