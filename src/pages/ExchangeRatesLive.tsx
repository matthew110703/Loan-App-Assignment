import React, { useMemo, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  Toolbar,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFetchExchangeRates } from "../components/hooks";
import { Loading, Error } from "../components/feedback";

const thead = [
  { id: "currency", label: "Currency" },
  { id: "rate", label: "Exchange Rate" },
];

const ExchangeRatesLive = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currency, setCurrency] = useState("USD");
  const {
    conversionRates,
    currencyCodes,
    baseCode,
    count: totalCount,
    loading,
    error,
  } = useFetchExchangeRates(currency);

  const handleSetPage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Memoize the displayed rates to avoid unnecessary re-renders
  // and to ensure that the displayed rates are updated only when the conversionRates, page, or rowsPerPage change
  const displayedRates = useMemo(
    () =>
      Object.entries(conversionRates || {}).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [conversionRates, page, rowsPerPage]
  );

  return (
    <main>
      <Typography variant="h4" component="h1" gutterBottom>
        Exchange Rates (Live)
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: { xs: "100%", lg: "70%" } }}
        gutterBottom
      >
        Check out the latest exchange rates for various currencies. You can find
        the most up-to-date information on currency conversion rates here.
      </Typography>

      {/* Loading state */}
      {loading && <Loading />}

      {/* Error state */}
      {error && <Error>{error}</Error>}

      {/* Conversion Table */}
      {/* Hide the table if loading or error is true */}
      {!loading && (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            marginTop: "2rem",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              marginBottom: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ flex: "1 1 100%" }}
              >
                Conversion Rates for {baseCode}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {loading
                  ? "Loading..."
                  : error
                  ? error
                  : `${totalCount} results`}
              </Typography>
            </Box>

            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="base-currency-select-label">
                Base Currency
              </InputLabel>
              <Select
                labelId="base-currency-select-label"
                id="base-currency-select"
                label="Base Currency"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value as string);
                  setPage(0); // Reset page to 0 when changing currency
                }}
              >
                {currencyCodes.map((currency) => (
                  <MenuItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>

          <TableContainer
            sx={{
              maxHeight: 440,
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            <Table stickyHeader aria-label="conversion table">
              <TableHead>
                <TableRow>
                  {thead.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align="left"
                      style={{ minWidth: 150, fontWeight: 600 }}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ padding: 10 }}>
                {/* Map through conversion rates and display them in the table */}
                {displayedRates.map(([currencyCode, rate]) => (
                  <TableRow key={currencyCode}>
                    {/* Display currency code and name */}
                    <TableCell component="th" scope="row">
                      {currencyCode} (
                      <span style={{ fontSize: "0.8rem" }}>
                        {
                          currencyCodes.find((c) => c.code === currencyCode)
                            ?.name
                        }
                      </span>
                      )
                    </TableCell>
                    <TableCell align="left">{rate}</TableCell>
                  </TableRow>
                ))}
                {/* Empty state */}
                {rowsPerPage > 0 &&
                  conversionRates &&
                  Object.keys(conversionRates).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ maxWidth: "100%" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleSetPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={
              <Typography
                color="text.secondary"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem" } }}
              >
                Rows per page:
              </Typography>
            }
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} of ${count}`
            }
          />
        </Paper>
      )}
    </main>
  );
};

export default ExchangeRatesLive;
