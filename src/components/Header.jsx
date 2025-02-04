import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Badge,
  IconButton,
  Drawer,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCart } from "../contexts/CartContext";
import Cart from "./Cart";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { cart = [] } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const CLIENT_ID = "137057944664-huju4ri8knuqpj7lgs957gijj9sq3l2u.apps.googleusercontent.com";

 
  const userName = localStorage.getItem("GoogleName");
  const userEmail = localStorage.getItem("GoogleEmail");
  const userPicture = localStorage.getItem("Googlepicture");

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
    });

    /* Render the Google Sign-In button */
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );

    /* Enable auto sign-in */
    window.google.accounts.id.prompt();
  }, []);

   
  const handleCredentialResponse = (response) => {
    console.log("Google ID Token:", response.credential);

   
    const userObject = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("User Info:", userObject);

    alert(`Welcome, ${userObject.name}!`);
    localStorage.setItem("GoogleEmail", userObject.email);
    localStorage.setItem("GoogleName", userObject.name);
    localStorage.setItem("Googlepicture", userObject.picture);
    window.location.reload(); // Reload to reflect login
  };

 
  const handleLogout = () => {
    localStorage.removeItem("GoogleEmail");
    localStorage.removeItem("GoogleName");
    localStorage.removeItem("Googlepicture");
    setAnchorEl(null);
    window.location.reload(); // Reload to reflect logout
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Commerce
          </Typography>

          {/* User Dropdown */}
          {userName ? (
            <>
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ textTransform: "none", display: "flex", alignItems: "center" }}
              >
                <Avatar
                  alt={userName}
                  src={userPicture}
                  sx={{ width: 40, height: 40, mr: 1, border: "2px solid #ddd" }}
                />
                <Typography variant="h6" sx={{ color: "white" }}>
                  {userName}
                </Typography>
              </Button>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                sx={{ mt: 1 }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="h6">{userName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userEmail}
                  </Typography>
                </Box>

                <Divider />

                {/* Logout Button */}
                <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div id="googleSignInButton"></div>
          )}

          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />

          {/* Shopping Cart Icon */}
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Shopping Cart Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 300,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ padding: 2, overflowY: "auto" }}>
          <Cart />
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Header;
