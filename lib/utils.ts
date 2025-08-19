import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import mongoose from 'mongoose';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      const url = process.env.MONGO_URI ? process.env.MONGO_URI: "mongodb://localhost:27017/budgetbuddy" 
      await mongoose.connect(url);
      console.log('MongoDB connected');
    } else {
      console.log('MongoDB connection is already established');
    }
  } catch (error) {
    if(error instanceof Error){
    console.error('Error connecting to MongoDB:', error.message);
    throw new Error('Failed to connect to MongoDB');
    } else {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }
};

export default connectMongoDB;
