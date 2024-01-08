import express from 'express';
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import mainRouter from './routes/main.js'

const app = express()
dotenv.config();

app.use(express.static('./public'))
app.use(express.json())

app.use('./api/v1', mainRouter)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 8080;

// ha van adatbázisunk csak akkor inditjuk a 8000 portot
const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();