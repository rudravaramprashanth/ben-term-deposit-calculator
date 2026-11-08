import Decimal from "decimal.js";

import {
  TermDepositRequest,
  TermDepositResponse,
} from "../types/termDeposit";

// Configure decimal precision for financial calculations
Decimal.set({
  precision: 40,
  rounding: Decimal.ROUND_HALF_UP,
});

// Calculate final term deposit balance
export function calculateTermDeposit(
  input: TermDepositRequest
): TermDepositResponse {
  const principal = new Decimal(input.depositAmount);

  // Convert percentage into decimal rate
  const annualRate = new Decimal(input.annualInterestRate).div(100);

  const duration = new Decimal(input.investmentDuration);

  let finalBalance: Decimal;

  // At maturity: simple interest on original principal
  if (input.interestPaymentFrequency === "at-maturity") {
    finalBalance = principal.mul(
      new Decimal(1).plus(annualRate.mul(duration))
    );
  } else {
    // Determine compounding frequency
    const frequencyMap = {
      monthly: 12,
      quarterly: 4,
      annually: 1,
    };

    const periodsPerYear =
      frequencyMap[input.interestPaymentFrequency];

    // Calculate complete compounding periods
    const totalPeriods = duration.mul(periodsPerYear);

    const completedPeriods = totalPeriods.floor();

    // Calculate remaining fractional period
    const remainingPeriod = totalPeriods.minus(completedPeriods);

    // Interest rate per compounding period
    const periodicRate = annualRate.div(periodsPerYear);

    // Calculate balance after complete periods
    const compoundFactor = new Decimal(1).plus(periodicRate);

    finalBalance = principal.mul(
      compoundFactor.pow(completedPeriods.toNumber())
    );

    // Apply pro-rata simple interest to the remaining period
    if (remainingPeriod.greaterThan(0)) {
      const remainingInterestFactor = new Decimal(1).plus(
        periodicRate.mul(remainingPeriod)
      );

      finalBalance = finalBalance.mul(remainingInterestFactor);
    }
  }

  // Calculate interest earned
  const interestEarned = finalBalance.minus(principal);

  // Round only final monetary values to two decimal places
  return {
    principal: principal.toFixed(2),
    interestEarned: interestEarned.toFixed(2),
    finalBalance: finalBalance.toFixed(2),
  };
}