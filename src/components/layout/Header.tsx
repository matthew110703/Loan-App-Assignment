import { useState, useContext } from "react";
import { ThemeContext } from "../../lib/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import {
  AppBar,
  Typography,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Switch,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Exchange Rates (Live)", path: "/exchange-rates-live" },
  { label: "Error Page", path: "/error" },
];

export default function DrawerAppBar(props: Props) {
  const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);
  const location: Location = useLocation();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Loan Calculator</Typography>
        <Switch checked={isDarkMode} onClick={() => toggleDarkMode()} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              sx={{ textAlign: "start" }}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block" }}
          >
            Loan Calculator
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                sx={{
                  color: "#fff",
                  mr: 4,
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(255, 255, 255, 0.133)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255, 255, 255, 0.133)"
                        : isDarkMode
                        ? "rgba(146, 146, 146, 0.13)"
                        : "rgba(85, 85, 85, 0.13)",
                  },
                }}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
            <Switch checked={isDarkMode} onClick={() => toggleDarkMode()} />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
