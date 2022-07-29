import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AuthContext from "../../context/user-context";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

interface Link {
  title: string;
  path: string;
}

interface Links {
  guest: Link[];
  user: Link[];
}

const navItems: Links = {
  guest: [
    { title: "LOGIN", path: "/" },
    { title: "SIGN UP", path: "/register" },
  ],
  user: [
    { title: "JOURNALS", path: "/" },
    { title: "LOGOUT", path: "/logout" },
  ],
};

export default function Navigation(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const navLinks: Link[] = isLoggedIn ? navItems.user : navItems.guest;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const returnActiveLink = (path: string) => {
    return location.pathname === path ? "rgba(243, 229, 245, 0.3)" : "none";
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              sx={[
                {
                  textAlign: "center",
                },
              ]}
              onClick={() => navigate(item.path)}
            >
              <ListItemText primary={item.title} />
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
      <AppBar component="nav" color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Journal App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                sx={[
                  {
                    color: "#fff",
                    backgroundColor: returnActiveLink(item.path),
                  },
                  {
                    "&:hover": {
                      backgroundColor: "rgba(243, 229, 245, 0.3)",
                    },
                  },
                ]}
                onClick={() => navigate(item.path)}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      </Box>
    </Box>
  );
}
