import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { calculateTermDeposit } from "./termDepositService";

describe("Term Deposit Calculator", () => {
  it("should calculate monthly compound interest", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 5.25,
      investmentDuration: 2.5,
      interestPaymentFrequency: "monthly",
    });

    assert.equal(result.finalBalance, "11399.26");
    assert.equal(result.interestEarned, "1399.26");
  });

  it("should calculate quarterly compound interest", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 5.25,
      investmentDuration: 2.5,
      interestPaymentFrequency: "quarterly",
    });

    assert.equal(result.finalBalance, "11392.80");
  });

  it("should calculate annual compound interest", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 5.25,
      investmentDuration: 2.5,
      interestPaymentFrequency: "annually",
    });

    assert.equal(result.finalBalance, "11368.35");
  });

  it("should calculate simple interest at maturity", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 5.25,
      investmentDuration: 2.5,
      interestPaymentFrequency: "at-maturity",
    });

    assert.equal(result.finalBalance, "11312.50");
  });

  it("should support fractional investment durations", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 5.25,
      investmentDuration: 2.55,
      interestPaymentFrequency: "monthly",
    });

    assert.equal(result.finalBalance, "11429.19");
  });

  it("should return principal when interest rate is zero", () => {
    const result = calculateTermDeposit({
      depositAmount: 10000,
      annualInterestRate: 0,
      investmentDuration: 2.5,
      interestPaymentFrequency: "monthly",
    });

    assert.equal(result.finalBalance, "10000.00");
    assert.equal(result.interestEarned, "0.00");
  });
});