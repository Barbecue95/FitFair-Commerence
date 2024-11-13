/* import { Box, Container, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BellIcon, CircleUser, Search } from "lucide-react";

// Custom styles for the search bar
const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "500px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: "1px solid #f1f1f1",
  padding: theme.spacing(0.5, 2),
}));

const IconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export function TopBar() {
  return (
    <header
      style={{
        backgroundColor: "background.default",
        position: "sticky",
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" height={68} px={2} gap={2}>
          <Box flex={1}>
            <SearchContainer>
              <IconWrapper>
                <Search fontSize="16px" />
              </IconWrapper>
              <InputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  pl: 4,
                  width: "100%",
                  color: "black",
                  fontFamily: "sans-serif",
                }}
              />
            </SearchContainer>
          </Box>
          <div className="flex items-center gap-2 max-sm:hidden">
            <IconButton aria-label="notifications">
              <BellIcon className="text-black" />
            </IconButton>
            <IconButton>
              <CircleUser className="text-black" />
            </IconButton>
          </div>
        </Box>
      </Container>
    </header>
  );
} */

"use client";

import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
} from "@mui/material";
import { Bell, Menu, User, X } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Box sx={{ position: "sticky" }}>
        <Toolbar className="max-w-7xl m-0 w-full p-0">
          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 2,
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "white",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "#c2c3c4",
                width: "500px",
                borderRadius: 2,
                maxHeight: 40,
              }}
            >
              <SearchIcon
                sx={{
                  position: "absolute",
                  left: 8,
                  color: "#c2c3c4",
                }}
              />
              <InputBase
                placeholder="Search..."
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  pl: 6,
                  pr: 1,
                  py: 1,
                  borderRadius: 1,
                  width: { xs: "100%", sm: 200 },
                  color: "#111",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <IconButton aria-label="notifications" color="inherit">
                <Bell size={25} />
              </IconButton>
              <IconButton aria-label="account" color="inherit">
                <User size={25} />
              </IconButton>
            </Box>
          </Box>

          {/* Mobile menu button */}
          <Box
            sx={{
              display: {
                xs: "flex",
                width: "100%",
                justifyContent: "flex-end",
                md: "none",
              },
            }}
          >
            <IconButton
              color="inherit"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </IconButton>
          </Box>
        </Toolbar>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <Box sx={{ position: "relative", padding: 2, mb: 1 }}>
            <SearchIcon
              sx={{ position: "absolute", left: 16, color: "gray" }}
            />
            <InputBase
              placeholder="Search..."
              sx={{
                pl: 4,
                pr: 1,
                py: 1,
                width: "100%",
                borderRadius: 1,
                backgroundColor: "#f1f1f1",
              }}
            />
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
                <ListItemIcon>
                  <Bell />
                </ListItemIcon>
                Notifications
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setIsMobileMenuOpen(false)}>
                <ListItemIcon>
                  <User />
                </ListItemIcon>
                Account
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
