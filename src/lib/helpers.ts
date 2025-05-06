export function calculateEMI(
  pricipal: number,
  rate: number,
  term: number
): number {
  const r = rate / (12 * 100); // monthly interest
  const n = term * 12; // number of months
  const emi = (pricipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

export function generateAmortizationSchedule(
  principal: number,
  rate: number,
  term: number,
  calculatedEmi: number
) {
  const schedule = [];
  const monthlyRate = rate / 100 / 12;
  let balance = principal;
  for (let month = 1; month <= term * 12; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = calculatedEmi - interest;
    balance -= principalPayment;
    schedule.push({
      month,
      principal: principalPayment.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance.toFixed(2),
    });
  }

  return schedule;
}

import type { Currency } from "../pages/Home";
export const getCurrencySymbol = (currency: Currency) => {
  const symbol = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value;
  return symbol || currency;
};
