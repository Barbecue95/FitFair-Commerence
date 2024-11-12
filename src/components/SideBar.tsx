import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AlignEndVertical, AlignStartVertical, Boxes } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: <SpaceDashboardIcon />,
    route: "/seller/dashboard",
    pathname: "dashboard",
  },
  {
    id: 2,
    label: "Order Management",
    icon: <Boxes />,
    route: "/seller/orders-management",
    pathname: "orders-management",
  },
  {
    id: 3,
    label: "Products Management",
    icon: <LocalMallIcon />,
    route: "/seller/products-management",
    pathname: "products-management",
  },
  {
    id: 4,
    label: "Analytics",
    icon: <DonutSmallIcon />,
    route: "/seller/analytics",
    pathname: "analytics",
  },
  {
    id: 5,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/seller/settings",
    pathname: "settings",
  },
  {
    id: 6,
    label: "Help & Center",
    icon: <ErrorOutlineIcon />,
    route: "/seller/help",
    pathname: "help",
  },
];

// Styled container for sidebar
const SidebarContainer = styled("div")<{ collapsed: boolean }>(
  ({ collapsed }) => ({
    width: collapsed ? "4rem" : "20rem", // Width of SideBar
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: collapsed ? "center" : "space-between",
    height: "100vh",
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "#4A5E71", // Background Color of SideBar
    color: "#ffff",
  })
);

export function SideBar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContainer collapsed={collapsed}>
      {/* Sidebar Header */}
      <div className="p-4">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <Link href={"/seller"} className="font-bold text-2xl">
              FitFair
            </Link>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{ color: "#ffff" }}
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
            className={`group flex flex-col textDecoration:none, cursor-pointer hover:bg-white rounded-lg hover:text-black text-white font-light ${!collapsed ? "mx-3" : 0}`}
          >
            <ListItem
              disablePadding
              sx={{
                bgcolor: pathname.includes(item.pathname) ? "#4A5E71" : null,
              }}
            >
              <ListItemButton>
                <div className="text-white group-hover:text-black pr-5">
                  {item.icon}
                </div>
                {!collapsed && <p className="font-md">{item.label}</p>}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      {/* Footer Section */}
      <div className="p-4">
        {!collapsed && (
          <Typography variant="body2" className="text-slate-300 font-medium">
            © 2024 All right Served By FitFair
          </Typography>
        )}
      </div>
    </SidebarContainer>
  );
}
