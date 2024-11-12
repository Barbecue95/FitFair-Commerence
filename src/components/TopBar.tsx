import { Avatar, Box, Container, IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Bell, Search } from "lucide-react";

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
        borderBottom: "1px solid",
        backgroundColor: "background.default",
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
                sx={{ pl: 4, width: "100%", color: "black" }}
              />
            </SearchContainer>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton aria-label="notifications">
              <Bell fontSize="small" />
            </IconButton>
            <Avatar
              alt="User avatar"
              src="/placeholder.svg"
              sx={{ width: 32, height: 32 }}
            >
              U
            </Avatar>
          </Box>
        </Box>
      </Container>
    </header>
  );
}
