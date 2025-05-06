import React from "react";
import type { ReactNode, ErrorInfo } from "react";

// UI
import { Box, Typography, Button } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            mt: 4,

            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Something went wrong.
          </Typography>
          <Typography variant="body1">
            Please try refreshing the page or come back later.
          </Typography>
          <Box
            sx={{
              mt: 6,
              display: "flex",
              gap: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="outlined" color="primary" href="/">
              Go Home
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
