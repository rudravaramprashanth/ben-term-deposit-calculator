# BEN Term Deposit Calculator

A full-stack term deposit calculator built using **React, TypeScript, Node.js, and Express**. The application allows users to calculate potential term deposit returns based on the deposit amount, annual interest rate, investment duration, and interest payment frequency.

## Features

- Calculate term deposit interest and final balance.
- Support monthly, quarterly, and annual compound interest.
- Support simple interest for deposits where interest is paid at maturity.
- Support fractional investment durations.
- Validate user inputs on the frontend and backend.
- Expose a REST API for term deposit calculations.
- Use decimal arithmetic for accurate financial calculations.
- Return monetary values as decimal strings, formatted to two decimal places.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express.js, TypeScript |
| Calculation | decimal.js |
| API | REST API, JSON |
| Testing | Node.js Test Runner, tsx |
| Code Quality | ESLint |
| Version Control | Git, GitHub |

## Architecture

The application follows a frontend-to-backend REST API architecture.

```text
React Frontend
      |
      | HTTP POST
      v
Express REST API
      |
      v
Input Validation
      |
      v
Term Deposit Calculation Service
      |
      v
JSON Response
      |
      v
React Results Display
```

The frontend collects investment details and sends them to the backend. The backend validates the request, performs the calculation, and returns the results.

## Project Structure

```text
ben-term-deposit-calculator/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── TermDepositForm.tsx
│       ├── services/
│       │   └── termDepositApi.ts
│       ├── types/
│       │   └── termDeposit.ts
│       ├── App.tsx
│       ├── App.css
│       ├── index.css
│       └── main.tsx
│
├── server/
│   └── src/
│       ├── middleware/
│       │   └── validateTermDeposit.ts
│       ├── routes/
│       │   └── termDepositRoutes.ts
│       ├── services/
│       │   ├── termDepositService.ts
│       │   └── termDepositService.test.ts
│       ├── types/
│       │   └── termDeposit.ts
│       └── index.ts
│
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

- Node.js 20.19+ (Node.js 24 is also supported by the project tooling).
- npm.
- Git.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rudravaramprashanth/ben-term-deposit-calculator.git
cd ben-term-deposit-calculator
```

### 2. Install dependencies

Run this command from the project root:

```bash
npm install
```

### 3. Start the backend

Open a terminal at the project root:

```bash
npm run dev --workspace=server
```

The backend runs at:

`http://localhost:3000`

Health check:

`http://localhost:3000/health`

### 4. Start the frontend

Open a second terminal at the project root:

```bash
npm run dev --workspace=client
```

The frontend runs at:

`http://localhost:5173`

Open the frontend URL in your browser to use the calculator.

## REST API

### Calculate Term Deposit

**Endpoint**

```http
POST /api/term-deposit/calculate
```

**Base URL**

```text
http://localhost:3000
```

**Request body**

```json
{
  "depositAmount": 10000,
  "annualInterestRate": 5.25,
  "investmentDuration": 2.5,
  "interestPaymentFrequency": "monthly"
}
```

**Supported interest payment frequencies**

| Frequency | Calculation method |
|---|---|
| `monthly` | Monthly compound interest |
| `quarterly` | Quarterly compound interest |
| `annually` | Annual compound interest |
| `at-maturity` | Simple interest on the original principal |

**Successful response**

```json
{
  "status": "success",
  "data": {
    "principal": "10000.00",
    "interestEarned": "1399.26",
    "finalBalance": "11399.26"
  }
}
```

Monetary values are returned as strings to avoid losing decimal precision when representing financial results.

## Calculation Rules

The calculator implements the following business rules:

1. Monthly, quarterly, and annual frequencies use compound interest, with interest reinvested at the selected frequency.
2. At maturity, interest is calculated using simple interest on the original principal.
3. Fractional investment durations are supported. Complete compounding periods are calculated first, followed by pro-rata simple interest for the remaining fraction.
4. Decimal arithmetic is used during calculations.
5. Final monetary amounts are rounded to two decimal places using half-up rounding.

## Validation

The backend validates incoming requests, including:

- Deposit amount must be greater than zero.
- Annual interest rate cannot be negative.
- Investment duration must be greater than zero.
- Interest payment frequency must be one of the supported values.

The frontend also provides input constraints and displays validation or API errors to the user.

## Testing

Run the backend unit tests:

```bash
npm test --workspace=server
```

Build the backend:

```bash
npm run build --workspace=server
```

Build the frontend:

```bash
npm run build --workspace=client
```

Run frontend linting:

```bash
npm run lint --workspace=client
```

## Design Considerations

- Separation of concerns between frontend, API routes, validation, and calculation logic.
- Reusable calculation service.
- Strong typing with TypeScript.
- No database or authentication is required for this calculator.
- Financial calculations use decimal arithmetic rather than relying on ordinary floating-point calculations.

## Author

Developed as a technical assessment project for a Bendigo Bank term deposit calculator.