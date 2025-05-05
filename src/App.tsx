import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, About, ExchangeRatesLive, Error } from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} />
        <Route path="/exchange-rates-live" element={<ExchangeRatesLive />} />
      </Routes>
    </Router>
  );
}
