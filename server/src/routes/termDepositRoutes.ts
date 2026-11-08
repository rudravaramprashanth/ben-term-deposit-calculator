import { Router, Request, Response } from "express";

import { validateTermDeposit } from "../middleware/validateTermDeposit";
import { calculateTermDeposit } from "../services/termDepositService";
import { TermDepositRequest } from "../types/termDeposit";

const router = Router();

// POST /api/term-deposit/calculate
router.post(
  "/calculate",
  validateTermDeposit,
  (req: Request, res: Response) => {
    try {
      const input = req.body as TermDepositRequest;

      const result = calculateTermDeposit(input);

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      console.error("Term deposit calculation failed:", error);

      res.status(500).json({
        status: "error",
        message: "Unable to calculate term deposit.",
      });
    }
  }
);

export default router;