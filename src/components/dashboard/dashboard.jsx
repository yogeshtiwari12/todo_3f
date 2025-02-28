import React, { useState } from "react";
import {
  ListTodo,
  PlusCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  Settings,
} from "lucide-react";
import { useAuth } from "../context";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Paper,
  Container,
  Divider,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme as useAppTheme } from "../../themeprovider";
// Styled Components
const StyledDrawer = styled(Drawer)(({ theme, isdark }) => ({
  width: 280,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 280,
    boxSizing: "border-box",
    backgroundColor: isdark === "true" ? "#1F2937" : "#FFFFFF",
    borderRight: "none",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "width 0.3s ease",
  },
}));

const StyledNavItem = styled(ListItem)(({ theme, isdark, active }) => ({
  borderRadius: "0.5rem",
  marginBottom: "0.5rem",
  backgroundColor: active
    ? isdark === "true"
      ? "rgba(59, 130, 246, 0.1)"
      : "#EBF5FF"
    : "transparent",
  color: active
    ? isdark === "true"
      ? "#60A5FA"
      : "#2563EB"
    : isdark === "true"
    ? "#D1D5DB"
    : "#4B5563",
  "&:hover": {
    backgroundColor: isdark === "true" ? "rgba(55, 65, 81, 0.7)" : "#F3F4F6",
  },
}));

const MainContent = styled(Box)(({ theme, isdark }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: isdark === "true" ? "#111827" : "#F3F4F6",
  minHeight: "100vh",
  transition: "margin-left 0.3s ease",
}));

const ProfileCard = styled(Box)(({ theme, isdark }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  "& .MuiAvatar-root": {
    width: 80,
    height: 80,
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    backgroundColor: isdark === "true" ? "#3B82F6" : "#2563EB",
    fontSize: "2rem",
    fontWeight: "bold",
  },
}));

const StyledCard = styled(Card)(({ theme, isdark }) => ({
  backgroundColor: isdark === "true" ? "#1F2937" : "#FFFFFF",
  borderRadius: "1rem",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 12px -1px rgba(0, 0, 0, 0.15)",
  },
}));

function Dashboard() {
  const { todos, profile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();
  const { theme } = useAppTheme();

  const handleAddTodo = () => {
    // Todo: Implement add todo functionality
    setNewTodo("");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "add-todo":
        return (
          <StyledCard isdark={theme === "dark" ? "true" : "false"}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: theme === "dark" ? "#60A5FA" : "#2563EB",
                  textAlign: "center",
                  fontWeight: "bold",
                  mb: 3,
                }}
              >
                Create New Todo
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTodo();
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Enter Todo title"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: theme === "dark" ? "#374151" : "#FFFFFF",
                      "& fieldset": {
                        borderColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
                      },
                      "&:hover fieldset": {
                        borderColor: theme === "dark" ? "#6B7280" : "#60A5FA",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme === "dark" ? "#60A5FA" : "#2563EB",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: theme === "dark" ? "#FFFFFF" : "inherit",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<PlusCircle size={20} />}
                  sx={{
                    backgroundColor: theme === "dark" ? "#3B82F6" : "#2563EB",
                    "&:hover": {
                      backgroundColor: theme === "dark" ? "#2563EB" : "#1D4ED8",
                    },
                    textTransform: "none",
                    py: 1.5,
                  }}
                >
                  Add Todo
                </Button>
              </Box>
            </CardContent>
          </StyledCard>
        );
      default:
        return (
          <StyledCard isdark={theme === "dark" ? "true" : "false"}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: theme === "dark" ? "#60A5FA" : "#2563EB",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Welcome, {profile?.name || "User"}
              </Typography>
              <Typography
                sx={{
                  color: theme === "dark" ? "#D1D5DB" : "#4B5563",
                  textAlign: "center",
                }}
              >
                Select an option from the sidebar to get started
              </Typography>
            </CardContent>
          </StyledCard>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer
        variant="permanent"
        isdark={theme === "dark" ? "true" : "false"}
        sx={{
          width: isSidebarOpen ? 280 : 80,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? 280 : 80,
          },
        }}
      >
        {/* Drawer content */}
        <Box sx={{ p: 3 }}>
          {/* Logo */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            {isSidebarOpen ? (
              <Typography
                variant="h6"
                sx={{ color: theme === "dark" ? "#60A5FA" : "#2563EB" }}
              >
                Todo App
              </Typography>
            ) : (
              <ListTodo
                size={24}
                color={theme === "dark" ? "#60A5FA" : "#2563EB"}
              />
            )}
          </Box>

          {/* Profile Section */}
          <ProfileCard isdark={theme === "dark" ? "true" : "false"}>
            <Avatar>{profile?.name?.charAt(0).toUpperCase()}</Avatar>
            {isSidebarOpen && (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme === "dark" ? "#FFFFFF" : "#111827",
                    fontWeight: "bold",
                  }}
                >
                  {profile?.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme === "dark" ? "#D1D5DB" : "#4B5563" }}
                >
                  {profile?.email}
                </Typography>
              </>
            )}
          </ProfileCard>

          <Divider sx={{ my: 2 }} />

          {/* Navigation */}
          <List>
            <StyledNavItem
              button
              onClick={() => setActiveTab("dashboard")}
              active={activeTab === "dashboard" ? 1 : 0}
              isdark={theme === "dark" ? "true" : "false"}
            >
              <ListItemIcon>
                <Home
                  size={20}
                  color={
                    activeTab === "dashboard"
                      ? theme === "dark"
                        ? "#60A5FA"
                        : "#2563EB"
                      : theme === "dark"
                      ? "#D1D5DB"
                      : "#4B5563"
                  }
                />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Dashboard" />}
            </StyledNavItem>

            <StyledNavItem
              button
              component={Link}
              to="/allusers"
              isdark={theme === "dark" ? "true" : "false"}
            >
              <ListItemIcon>
                <Users
                  size={20}
                  color={theme === "dark" ? "#D1D5DB" : "#4B5563"}
                />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Users" />}
            </StyledNavItem>
          </List>

          {/* Logout Button */}
          <Box sx={{ mt: "auto" }}>
            <Button
              fullWidth
              startIcon={<LogOut size={20} />}
              onClick={() => navigate("/")}
              sx={{
                justifyContent: isSidebarOpen ? "flex-start" : "center",
                color: theme === "dark" ? "#EF4444" : "#DC2626",
                "&:hover": {
                  backgroundColor: theme === "dark"
                    ? "rgba(239, 68, 68, 0.1)"
                    : "rgba(220, 38, 38, 0.1)",
                },
                textTransform: "none",
              }}
            >
              {isSidebarOpen && "Logout"}
            </Button>
          </Box>
        </Box>

        {/* Sidebar Toggle */}
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{
            position: "absolute",
            right: -20,
            top: 80,
            backgroundColor: theme === "dark" ? "#374151" : "#FFFFFF",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#4B5563" : "#F3F4F6",
            },
          }}
        >
          {isSidebarOpen ? (
            <ChevronLeft color={theme === "dark" ? "#FFFFFF" : "#111827"} />
          ) : (
            <ChevronRight color={theme === "dark" ? "#FFFFFF" : "#111827"} />
          )}
        </IconButton>
      </StyledDrawer>

      {/* Main Content */}
      <MainContent
        isdark={theme === "dark" ? "true" : "false"}
        sx={{
          marginLeft: isSidebarOpen ? "280px" : "80px",
          padding: 4,
        }}
      >
        <Container maxWidth="lg">{renderContent()}</Container>
      </MainContent>
    </Box>
  );
}

export default Dashboard;