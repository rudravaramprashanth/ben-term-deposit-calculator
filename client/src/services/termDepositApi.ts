
import type {
  TermDepositApiResponse,
  TermDepositRequest,
} from "../types/termDeposit";

const API_BASE_URL = "http://localhost:3000";

export async function calculateTermDeposit(
  request: TermDepositRequest
): Promise<TermDepositApiResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/term-deposit/calculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.errors?.join(" ") ||
      errorData.message ||
      "Unable to calculate term deposit."
    );
  }

  return response.json();
}
