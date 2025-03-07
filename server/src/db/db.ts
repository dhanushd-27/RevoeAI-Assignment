import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const server = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`);
  
    console.log(`Server Connection Successful, ${server.connection.host}`)
  } catch (error) {
    console.log('Server Connection Failed')
  }
}