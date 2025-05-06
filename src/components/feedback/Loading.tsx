import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box sx={{ mt: 16 }}>
      <CircularProgress
        size={24}
        sx={{
          display: "block",
          margin: "0 auto",
          color: "primary.main",
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mt: 1 }}
      >
        Loading exchange rates...
      </Typography>
    </Box>
  );
};

export default Loading;
