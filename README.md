# Loan Calculator Application

#### [🔗 Click here for Live Demo](https://loan-app-assignment.vercel.app/)

## Overview

This repository houses a modern Loan Calculator App designed as a single-page web application. The app empowers users to calculate Loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and convert EMIs into real-time currency equivalents using live exchange rates. It is built with a robust stack of modern web technologies to deliver an intuitive and responsive user experience.

---

## Features

### Key Functionalities
- **Loan EMI Calculation**: Computes EMIs using standard financial formulas.
- **Amortization Schedule**: Displays a dynamic table with a month-by-month breakdown of loan repayment.
- **Real-Time Currency Conversion**: Converts EMI amounts into different currencies using live exchange rates from an external API.
- **Responsive Design**: Fully responsive user interface optimized for desktop and mobile devices.
- **Dark/Light Mode**: Toggles between dark and light themes for a customizable experience.
- **Collapsible Header Navigation**: Enhances usability on mobile screens with collapsible navigation.

### Technologies Used
- **React**: Utilized for building the dynamic user interface with features like Hooks, Context API, and Routing.
- **Material UI**: Implements a modern, responsive design with pre-built UI components.
- **Axios**: Manages API calls to fetch live exchange rates.
- **Exchange Rate API**: Provides real-time currency conversion data.
- **Vite**: A fast, modern build tool for front-end development.
- **TypeScript**: Enhances type safety and developer productivity.

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/matthew110703/Loan-App-Assignment.git
   cd Loan-App-Assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
3. **Add an Environment variable. Create `.env` file**
   ```bash
   VITE_API_KEY=your_api_key
   ```
   - Get API Key from [ExchangeRate API](https://www.exchangerate-api.com/) for free.

3. **Run the Application**
   ```bash
   npm run dev
   ```

4. **Access the App**
   Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

- **`src` Folder**: Contains the source code of the application.
  - **`components`**: Reusable UI components and custom hooks.
  - **`pages`**: Different pages of the application, such as `About` and `ExchangeRatesLive`.
  - **`lib`**: Shared utilities like `ThemeContext` for managing dark/light mode.
  - **`index.css`**: Global styles for the app.
  - **`main.tsx`**: Entry point of the application.
  - **`.env`**: Environment variables
- **`public` Folder**: Static assets such as the favicon.
- **`vite.config.ts`**: Configuration file for Vite.
- **`eslint.config.js`**: ESLint configuration for maintaining code quality.

---

## Development Notes

### ESLint Configuration
The project uses ESLint with TypeScript and React-specific rules to ensure code quality. Additional plugins include:
- **eslint-plugin-react-hooks**: Enforces rules of Hooks.
- **eslint-plugin-react-refresh**: Supports fast refresh during development.

### Key Customizations
- **Theme Context**: Implements dark and light mode toggling via React Context API.
- **Error Boundary**: Enhances error handling for a better user experience.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Developed by [Matthew110703](https://github.com/matthew110703).
