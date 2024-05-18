import mongoose from "mongoose";

const connect = async () => {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(
        `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}?authSource=admin`,
        {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: process.env.DATABASE_NAME,
        }
    );
};

try {
    connect();
    console.log("Database connected succesfully");
} catch (error) {
    console.log("Database cannot be connected: " + error);
}