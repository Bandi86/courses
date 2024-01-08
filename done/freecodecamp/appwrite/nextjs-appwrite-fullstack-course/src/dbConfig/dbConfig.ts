import mongoose from 'mongoose';
import dotenv from 'dotenv'

export async function connect() {
  
  dotenv.config()

  try {
    
    const url = process.env.MONGO_URI    
    
    if (url === undefined) {     
      throw new Error('The MONGO_URI environment variable undefined');
    }

    mongoose.connect(url!);
    const con = mongoose.connection;

    con.on('connected', () => {
      console.log(`Connected to Mongoose: ${con.collection.name}`);
    });

    con.on('error', (err) => {
      console.log(
        `MongoDB connection error. Please make sure MongoDB is running. + ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.log('Somthing goes wrong');
    console.log(error);
  }
}
