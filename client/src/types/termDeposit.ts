export type InterestPaymentFrequency =
  | "monthly"
  | "quarterly"
  | "annually"
  | "at-maturity";

export interface TermDepositRequest {
  depositAmount: number;
  annualInterestRate: number;
  investmentDuration: number;
  interestPaymentFrequency: InterestPaymentFrequency;
}

export interface TermDepositResponse {
  principal: string;
  interestEarned: string;
  finalBalance: string;
}

export interface TermDepositApiResponse {
  status: "success";
  data: TermDepositResponse;
}
