import { useEffect, useState } from "react";
import axios from "axios";

export interface ExchangeRate {
  base_code: string;
  conversion_rates: Record<string, number>;
}

export interface CurrencyCode {
  code: string;
  name: string;
}

const apiKey = import.meta.env.VITE_API_KEY;

export default function useFetchExchangeRates(currency: string) {
  const exchangeRatesUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;
  const currencyCodesUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const currencyCodesResponse = await axios.get(currencyCodesUrl);
        const { supported_codes } = currencyCodesResponse.data as {
          supported_codes: string[][];
        };
        const response = await axios.get<ExchangeRate>(exchangeRatesUrl);
        const { base_code, conversion_rates } = response.data;

        setCurrencies(
          supported_codes.map((code: string[]) => ({
            code: code[0],
            name: code[1],
          }))
        );
        setExchangeRates({
          base_code,
          conversion_rates,
        });
      } catch (err) {
        setError("Failed to fetch exchange rates" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [currencyCodesUrl, exchangeRatesUrl]);

  return {
    conversionRates: exchangeRates?.conversion_rates, // Exchange rates data
    currencyCodes: currencies, // Currency codes data -- List of currency codes and names
    baseCode: exchangeRates?.base_code, // Base currency code
    count: Object.keys(exchangeRates?.conversion_rates || {}).length, // Count of conversion rates
    loading,
    error,
  };
}
