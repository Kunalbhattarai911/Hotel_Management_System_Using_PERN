import express from "express";
import dotenv from "dotenv";
import serverRoute from "./routes/server.route.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Middleware 
app.use(express.json());

// Route to check the server
app.get("/", (req, res) => {
  res.json("Hello");
});

// Routes
app.use("/api", serverRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
