import { Request, Response, NextFunction } from "express";

import { InterestPaymentFrequency } from "../types/termDeposit";

const supportedFrequencies: InterestPaymentFrequency[] = [
  "monthly",
  "quarterly",
  "annually",
  "at-maturity",
];

export function validateTermDeposit(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const {
    depositAmount,
    annualInterestRate,
    investmentDuration,
    interestPaymentFrequency,
  } = req.body ?? {};

  const errors: string[] = [];

  if (
    typeof depositAmount !== "number" ||
    !Number.isFinite(depositAmount) ||
    depositAmount <= 0
  ) {
    errors.push("Deposit amount must be a positive number.");
  }

  if (
    typeof annualInterestRate !== "number" ||
    !Number.isFinite(annualInterestRate) ||
    annualInterestRate < 0
  ) {
    errors.push("Annual interest rate must be a non-negative number.");
  }

  if (
    typeof investmentDuration !== "number" ||
    !Number.isFinite(investmentDuration) ||
    investmentDuration <= 0
  ) {
    errors.push("Investment duration must be a positive number.");
  }

  if (!supportedFrequencies.includes(interestPaymentFrequency)) {
    errors.push("Invalid interest payment frequency.");
  }

  if (errors.length > 0) {
    res.status(400).json({
      status: "error",
      errors,
    });

    return;
  }

  next();
}