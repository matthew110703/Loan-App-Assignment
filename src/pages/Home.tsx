import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
} from "@mui/material";
import {
  calculateEMI,
  generateAmortizationSchedule,
  getCurrencySymbol,
} from "../lib/helpers";

const thead = [
  { id: "month", label: "Month" },
  { id: "principal", label: "Principal" },
  { id: "interest", label: "Interest" },
  { id: "balance", label: "Remaining Balance" },
];

interface AmortizationSchedule {
  month: number;
  principal: string;
  interest: string;
  balance: string;
}

const currencies = [
  { label: "USD", value: "USD" },
  { label: "INR", value: "INR" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "JPY", value: "JPY" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
];
export type Currency = "USD" | "INR" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD";

const Home = () => {
  const [form, setForm] = useState({
    loanAmount: 100000,
    interestRate: 8.5,
    term: 5,
  });
  const [currency, setCurrency] = useState<Currency>("USD");
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([] as AmortizationSchedule[]);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Calculate EMI
    const principal = parseFloat(form.loanAmount.toString());
    const rate = parseFloat(form.interestRate.toString());
    const term = parseFloat(form.term.toString());
    const calculatedEmi = calculateEMI(principal, rate, term);
    setEmi(calculatedEmi);

    // Generate amortization schedule
    const schedule = generateAmortizationSchedule(
      principal,
      rate,
      term,
      calculatedEmi
    );
    setSchedule(schedule);
    setShowResults(true);
  };

  return (
    <main>
      {/* Loan Calculator Input form */}
      <Box
        component={"form"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "1rem",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4">Loan Calculator Dashboard</Typography>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <TextField
            label="Loan Amount"
            name="loanAmount"
            onChange={handleChange}
            value={form.loanAmount}
            type="number"
          />
          <TextField
            label="Interest Rate (%)"
            name="interestRate"
            onChange={handleChange}
            value={form.interestRate}
            type="number"
          />
          <TextField
            label="Term (Years)"
            name="term"
            onChange={handleChange}
            value={form.term}
            type="number"
          />
        </Box>
        <Button type="submit" variant="contained">
          Calculate
        </Button>
      </Box>

      {/* Result Container */}
      {showResults && (
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Typography variant="h5">
            Monthly EMI:{" "}
            <span>
              {getCurrencySymbol(currency)}
              {emi.toFixed(2)}
            </span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="currency-select-label">Currency</InputLabel>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                defaultValue={currency}
                label="Currency"
                name="currency"
                onChange={(e) => {
                  setCurrency(e.target.value as Currency);
                }}
                value={currency}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.value} value={currency.label}>
                    {currency.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => setShowResults(false)}>
              Reset Table
            </Button>
          </Box>

          {/* Amortization Schedule Table */}
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Toolbar>
              <Typography variant="h6">
                Amortization Schedule ({currency})
              </Typography>
            </Toolbar>
            <Table
              sx={{
                minWidth: {
                  xs: 300,
                  sm: 400,
                  md: 600,
                  lg: 800,
                  xl: 1000,
                },
              }}
              aria-label="table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  {thead.map((item) => (
                    <TableCell
                      key={item.id}
                      align="center"
                      sx={{ fontWeight: "600" }}
                    >
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
                {schedule.length > 0 &&
                  schedule.map((row) => (
                    <TableRow
                      key={row.month}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.month}</TableCell>
                      <TableCell align="center">
                        {getCurrencySymbol(currency)}
                        {row.principal}
                      </TableCell>
                      <TableCell align="center">
                        {getCurrencySymbol(currency)}
                        {row.interest}
                      </TableCell>
                      <TableCell align="center">
                        {getCurrencySymbol(currency)}
                        {row.balance}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </main>
  );
};

export default Home;
