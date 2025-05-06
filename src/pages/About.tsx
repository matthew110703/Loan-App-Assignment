import { Box, Typography, Divider } from "@mui/material";

const About = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About the App
      </Typography>
      <Typography variant="body1">
        This Loan Calculator App is a modern, single-page web application built
        using <strong>React JS</strong> and <strong>Material UI</strong>. It
        allows users to calculate loan EMIs (Equated Monthly Installments), view
        a detailed amortization schedule, and see real-time currency conversions
        of their EMI using live exchange rates.
      </Typography>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        🔧 Features
      </Typography>
      <ul>
        <li>Loan EMI calculation using standard financial formulas</li>
        <li>Dynamic amortization schedule table with monthly breakdown</li>
        <li>
          Real-time currency conversion of EMI using a live exchange rate API
        </li>
        <li>Paginated exchange rate table for 160+ currencies</li>
        <li>Dark/Light mode toggle for a customizable experience</li>
        <li>Collapsible header navigation on mobile screens</li>
        <li>Fully responsive UI built with Material UI</li>
      </ul>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        📚 Technologies Used
      </Typography>
      <ul>
        <li>
          <strong>React</strong> (Hooks, Routing, Context API)
        </li>
        <li>
          <strong>Material UI</strong> for styling and responsive components
        </li>
        <li>
          <strong>Axios</strong> for API calls
        </li>
        <li>
          <strong>Exchange Rate API</strong> for real-time currency conversion
        </li>
      </ul>
      <Divider sx={{ my: 4 }} />
      <Typography>Developed by Mathew</Typography>
    </Box>
  );
};

export default About;
