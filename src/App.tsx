import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, About, ExchangeRatesLive, Error, NotFound } from "./pages";
import { Divider, Container } from "@mui/material";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <Router>
      <Header />
      <Divider sx={{ my: "2.5rem" }} />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="/exchange-rates-live" element={<ExchangeRatesLive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
}
