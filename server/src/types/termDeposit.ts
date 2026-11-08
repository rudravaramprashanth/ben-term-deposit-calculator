// Supported interest payment frequencies
export type InterestPaymentFrequency =
  | "monthly"
  | "quarterly"
  | "annually"
  | "at-maturity";

// Input received from the frontend
export interface TermDepositRequest {
  depositAmount: number;
  annualInterestRate: number;
  investmentDuration: number;
  interestPaymentFrequency: InterestPaymentFrequency;
}

// Calculation result returned by the backend
export interface TermDepositResponse {
  principal: string;
  interestEarned: string;
  finalBalance: string;
}