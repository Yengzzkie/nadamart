"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
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
import Loader from "./ui/Loader";

const pages = [
  { text: "Home", link: "/" },
  { text: "Fashion", link: "/" },
  { text: "Electronics", link: "/" },
  { text: "Hobbies", link: "/" },
  { text: "Toys", link: "/" },
  { text: "Appliances", link: "/" },
];


function Navigation() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  const settings = [
    { text: "Profile", link: "/profile" },
    { text: "Account", link: "/account" },
    { text: "Post", link: `/post/${session?.user?.id}` },
    { text: "Logout" },
  ];


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

  async function fetchUserData() {
    console.log(session)
    const id = session?.user?.id;

    try {
      const response = await axios.get(`/api/users/user?userId=${id}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  return (
    <AppBar
      position="static"
      className="!bg-[#fff] !text-[var(--color-base-content)] !shadow-none"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
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
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>NadaMart</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#1976d2"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {isLoggedIn ? (
                pages.map((page) => (
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Link href={page.link}>
                      <Typography
                        textAlign="center"
                        className="hover:!underline !text-[var(--color-base-content)]"
                      >
                        {page.text}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))
              ) : (
                <div className="flex flex-col gap-4 p-4">
                  <Link href={"/register"}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--color-primary-content)",
                      }}
                    >
                      Register
                    </Typography>
                  </Link>
                  <Link href={"/login"}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--color-primary-content)",
                      }}
                    >
                      Login
                    </Typography>
                  </Link>
                </div>
              )}
            </Menu>
          </Box>
          <ShoppingBagIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
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
              textDecoration: "none",
            }}
          >
            <Link href={"/"}>NadaMart</Link>
          </Typography>
          <Box
            className="px-6"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {isLoggedIn &&
              pages.map((page) => (
                <Link key={page.text} href={page.link}>
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
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {status === "loading" ? (
                <Loader />) : isLoggedIn ? 
                (<div>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={userData?.avatar || null}
                    />
                  </IconButton>
                </div>
              ) : (
                <div className="flex gap-8 items-baseline">
                  <Link href={"/register"}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--color-primary-content)",
                      }}
                    >
                      Register
                    </Typography>
                  </Link>
                  <Link href={"/login"}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "var(--color-primary-content)",
                      }}
                    >
                      Login
                    </Typography>
                  </Link>
                </div>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                  {setting.text === "Logout" ? (
                    <button onClick={() => signOut()}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.text}
                      </Typography>
                    </button>
                  ) : (
                    <Link href={setting.link}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.text}
                      </Typography>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
