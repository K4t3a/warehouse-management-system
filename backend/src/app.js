import express from "express";
import cors from "cors";
import routes from "./routes.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", routes);


app.post("/api/init-admin", async (req, res) => {
  try {
 
    res.json({
      success: true,
      message: "Admin endpoint would be implemented here",
      data: {
        email: "admin@warehouse.com",
        password: "admin123"
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default app;