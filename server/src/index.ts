import express from "express";
import cors from "cors";

import termDepositRoutes from "./routes/termDepositRoutes";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
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

// Global error handling middleware
app.use(
  (
    err: Error & { status?: number; body?: unknown },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("API error:", err);

    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({
        status: "error",
        message: "Invalid JSON request body.",
      });
      return;
    }

    res.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});