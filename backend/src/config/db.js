import mongoose from "mongoose";

const DBconnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connection Established ${conn.connection.host}`);
    } catch (error) {
        console.error(`Failed to establish connetion with the database ${error.message}`);
        process.exit(1);
    }
}

export default DBconnect;