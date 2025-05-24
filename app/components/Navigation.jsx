"use client";

import { useEffect, useState } from "react";
import { signOut, useSession, getSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const pages = [
  { text: "Home", link: "/" },
  { text: "Fashion", link: "/" },
  { text: "Electronics", link: "/" },
  { text: "Hobbies", link: "/" },
  { text: "Toys", link: "/" },
  { text: "Appliances", link: "/" },
];

const settings = [
  { text: "Profile", link: "#" },
  { text: "Account", link: "#" },
  { text: "Post", link: "/post" },
  { text: "Logout" },
];

function Navigation() {
  const { data: session, status } = getSession();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const isLoggedIn = !!session?.user;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    async function fetchUserData() {
      if (!session?.user?.id) return;

      try {
        const response = await axios.get(`/api/users/user?userId=${session.user.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [session, isLoggedIn]);

  if (status === "loading") {
    return (
      <AppBar position="static" className="!bg-[#fff] !text-[var(--color-base-content)] !shadow-none">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              Loading...
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" className="!bg-[#fff] !text-[var(--color-base-content)] !shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "var(--color-primary-content)",
            }}
          >
            <Link href="/">NadaMart</Link>
          </Typography>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {isLoggedIn ? (
                pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Link href={page.link}>
                      <Typography textAlign="center" className="hover:!underline !text-[var(--color-base-content)]">
                        {page.text}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/register">
                      <Typography sx={{ fontWeight: "bold", color: "var(--color-primary-content)" }}>
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link href="/login">
                      <Typography sx={{ fontWeight: "bold", color: "var(--color-primary-content)" }}>
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <ShoppingBagIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "var(--color-primary-content)",
            }}
          >
            <Link href="/">NadaMart</Link>
          </Typography>

          {/* Desktop Pages */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn &&
              pages.map((page) => (
                <Link key={page.text} href={page.link} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "var(--color-base-content)",
                      display: "block",
                      fontWeight: "bold",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {page.text}
                  </Button>
                </Link>
              ))}
          </Box>

          {/* User Avatar or Login/Register Links */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn ? (
                <>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" src={userData?.avatar || undefined} />
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.text}
                        onClick={() => {
                          handleCloseUserMenu();
                          if (setting.text === "Logout") signOut();
                        }}
                      >
                        {setting.text === "Logout" ? (
                          <Typography textAlign="center" sx={{ width: "100%", cursor: "pointer" }}>
                            {setting.text}
                          </Typography>
                        ) : (
                          <Link href={setting.link}>
                            <Typography textAlign="center">{setting.text}</Typography>
                          </Link>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Link href="/register">
                    <Typography sx={{ fontWeight: "bold", color: "var(--color-primary-content)", cursor: "pointer" }}>
                      Register
                    </Typography>
                  </Link>
                  <Link href="/login">
                    <Typography sx={{ fontWeight: "bold", color: "var(--color-primary-content)", cursor: "pointer" }}>
                      Login
                    </Typography>
                  </Link>
                </Box>
              )}
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
