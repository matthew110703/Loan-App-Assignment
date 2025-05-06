import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

const Error = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="body2" color="error.main" align="center">
        {children}
      </Typography>
    </Box>
  );
};

export default Error;
