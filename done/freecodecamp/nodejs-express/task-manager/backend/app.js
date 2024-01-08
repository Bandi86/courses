import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import tasks from "./routes/task.js";
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.static('./public'))
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasks);

app.use(notFound)
app.use(errorHandler)

/* app.get('api/v1/tasks') - get all the tasks
app.post('api/v1/tasks') - create the tasks
app.get('api/v1/tasks/:id') - get single task
app.patch('api/v1/tasks/:id') - patch a single task
app.delete('api/v1/tasks/:id') - delete task */

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
