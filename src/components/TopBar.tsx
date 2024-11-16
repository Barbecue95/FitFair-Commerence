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
          <div className="hidden md:flex ml-2 w-full justify-between items-center bg-white">
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
          </div>

          {/* Mobile menu button */}
          <div className="hidden max-sm:flex w-full justify-end">
            <IconButton
              color="inherit"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </IconButton>
          </div>
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
