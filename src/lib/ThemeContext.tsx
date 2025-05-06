import { createContext, useState, type PropsWithChildren } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext({
  toggleDarkMode: () => {},
  isDarkMode: false,
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
