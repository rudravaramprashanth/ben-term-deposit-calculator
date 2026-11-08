import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { calculateTermDeposit } from "../services/termDepositApi";

import type {
  InterestPaymentFrequency,
  TermDepositRequest,
  TermDepositResponse,
} from "../types/termDeposit";

type FormValues = {
  depositAmount: string;
  annualInterestRate: string;
  investmentDuration: string;
  interestPaymentFrequency: InterestPaymentFrequency;
};


const initialFormData: FormValues = {
  depositAmount: "10000",
  annualInterestRate: "5.25",
  investmentDuration: "2.5",
  interestPaymentFrequency: "monthly",
};

function TermDepositForm() {
  const [formData, setFormData] =
  useState<FormValues>(initialFormData);

  const [result, setResult] =
    useState<TermDepositResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value } = event.target;

  setResult(null);
  setError("");

  setFormData((previousData) => ({
    ...previousData,
    [name]: value,
  }));
}

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
        const request: TermDepositRequest = {
            depositAmount: Number(formData.depositAmount),
            annualInterestRate: Number(formData.annualInterestRate),
            investmentDuration: Number(formData.investmentDuration),
            interestPaymentFrequency: formData.interestPaymentFrequency,
            };

const response = await calculateTermDeposit(request);

      setResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="calculator">
      <h2>Term Deposit Calculator</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="depositAmount">Deposit Amount (AUD)</label>
          <input
            id="depositAmount"
            name="depositAmount"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.depositAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="annualInterestRate">
            Annual Interest Rate (%)
          </label>
          <input
            id="annualInterestRate"
            name="annualInterestRate"
            type="number"
            min="0"
            step="0.01"
            value={formData.annualInterestRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="investmentDuration">
            Investment Duration (Years)
          </label>
          <input
            id="investmentDuration"
            name="investmentDuration"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.investmentDuration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interestPaymentFrequency">
            Interest Payment Frequency
          </label>
          <select
            id="interestPaymentFrequency"
            name="interestPaymentFrequency"
            value={formData.interestPaymentFrequency}
            onChange={handleChange}
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
            <option value="at-maturity">At Maturity</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="result">
          <h3>Calculation Result</h3>
          <p>Principal: AUD {result.principal}</p>
          <p>Interest Earned: AUD {result.interestEarned}</p>
          <h2>Final Balance: AUD {result.finalBalance}</h2>
        </div>
      )}
    </section>
  );
}

export default TermDepositForm;
