import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{ fontSize: "5rem", fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        Page Not Found
      </Typography>
      <Button variant="outlined" color="primary" href="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
