import express from "express";
import cors from "cors";

import termDepositRoutes from "./routes/termDepositRoutes";

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "BEN Term Deposit Calculator API is running",
  });
});

// Term deposit calculation routes
app.use("/api/term-deposit", termDepositRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});