import { Category } from "@mui/icons-material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AlignEndVertical,
  AlignStartVertical,
  Boxes,
  BriefcaseBusiness,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
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
    icon: <Boxes />,
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
    label: "Product Categories",
    icon: <Category />,
    route: "/seller/product-categories",
  },
  {
    id: 5,
    label: "Brands",
    icon: <BriefcaseBusiness />,
    route: "/seller/brands",
  },
  {
    id: 6,
    label: "Account",
    icon: <CircleUserRound />,
    route: "/seller/account",
  },
  {
    id: 7,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/seller/settings",
  },
];

// Styled container for sidebar
const SidebarContainer = styled("div")<{ collapsed: boolean }>(
  ({ collapsed }) => ({
    width: collapsed ? "4rem" : "16rem", // Width of SideBar
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100vh",
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#f8f9fa", // Background Color of SideBar
  })
);

export function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContainer collapsed={collapsed}>
      {/* Sidebar Header */}
      <div className="p-4">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <Typography variant="h6" className="font-semibold">
              FitFair
            </Typography>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: "#7c3aed" }}
          >
            {collapsed ? <AlignStartVertical /> : <AlignEndVertical />}
          </IconButton>
        </div>
      </div>

      {/* Sidebar Items */}
      <List className="flex-grow space-y-2  mt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            className="flex flex-col textDecoration:none, cursor-pointer"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#7c3aed" }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText>{item.label}</ListItemText>}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Footer Section */}
      <div className="p-4">
        {!collapsed && (
          <Typography variant="body2" className="text-xs text-slate-500">
            © 2024 All right Served By FitFair
          </Typography>
        )}
      </div>
    </SidebarContainer>
  );
}
