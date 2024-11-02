import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";

const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <SpaceDashboardIcon />,
    route: "/seller/dashboard",
  },
  {
    id: 2,
    label: "Orders",
    icon: <ShoppingBagIcon />,
    route: "/seller/orders",
  },
  {
    id: 3,
    label: "Products",
    icon: <LocalMallIcon />,
    route: "/seller/products",
  },
  {
    id: 4,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/seller/settings",
  },
];

// Styled container for sidebar
const SidebarContainer = styled("div")<{ collapsed: boolean }>(
  ({ collapsed }) => ({
    width: collapsed ? "4rem" : "16rem",
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa", // Customize as needed
  })
);

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <SidebarContainer collapsed={collapsed}>
      {/* Sidebar Header */}
      <div className="p-4">
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <Typography variant="h6" className="font-semibold">
              Menu
            </Typography>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="flex-grow space-y-2 overflow-y-auto mt-4">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            startIcon={item.icon}
            fullWidth
            onClick={() => router.push(item.route)}
            className="justify-start"
          >
            {!collapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </div>

      {/* Footer Section */}
      <div className="p-4">
        {!collapsed && (
          <Typography variant="body2" className="text-xs text-gray-500">
            © 2024 Your Company
          </Typography>
        )}
      </div>
    </SidebarContainer>
  );
}
