import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mainurl } from "./commonfile";
import { useTheme as useAppTheme } from "../themeprovider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  IconButton, 
  Container, 
  Fade, 
  Divider
} from "@mui/material";
import { styled } from "styled-components";

const Logo = styled(Typography)`
  font-weight: 700;
  color: ${props => props.theme === "dark" ? "white" : "#1E3A8A"};
  font-size: 1.5rem;
  letter-spacing: -0.025em;
`;

const LogoSpan = styled.span`
  color: #2563EB;
`;

const NavLink = styled(Link)`
  font-weight: 600;
  color: ${props => props.theme === "dark" ? "white" : "#1E40AF"};
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  
  &:hover {
    color: ${props => props.theme === "dark" ? "#D1D5DB" : "#2563EB"};
    background-color: ${props => props.theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(37, 99, 235, 0.05)"};
  }
`;

const ThemeButton = styled(IconButton)`
  background-color: ${props => props.theme === "dark" ? "#374151" : "#E5E7EB"};
  border-radius: 9999px;
  padding: 0.5rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme === "dark" ? "#4B5563" : "#D1D5DB"};
  }
`;

const MobileMenuButton = styled(IconButton)`
  color: ${props => props.theme === "dark" ? "white" : "#1E40AF"};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(37, 99, 235, 0.05)"};
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: ${props => props.theme === "dark" ? "white" : "#1E40AF"};
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: center;
  
  &:hover {
    background-color: ${props => props.theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(59, 130, 246, 0.05)"};
  }
`;

const ActionButton = styled(Button)`
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
  border-radius: 6px;
`;

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile } = useAuth();
  const { theme, toggleTheme } = useAppTheme();
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${mainurl}/userroute21/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Logout Successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Logout failed, please try again.");
    }
  };
  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: theme === "dark" ? "#111827" : "white",
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo theme={theme} variant="h6">
                Task<LogoSpan>Box</LogoSpan>
              </Logo>
            </Link>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              <NavLink to="/" theme={theme}>Home</NavLink>
              <NavLink to="/addtodo" theme={theme}>Add Todo</NavLink>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {profile?.role === "admin" && (
                <ActionButton
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/dashboard"
                  sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
                >
                  Dashboard
                </ActionButton>
              )}
              
              {profile ? (
                <ActionButton
                  variant="contained"
                  onClick={logout}
                  sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' } }}
                >
                  Logout
                </ActionButton>
              ) : (
                <ActionButton
                  variant="contained"
                  component={Link}
                  to="/login"
                  sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
                >
                  Login
                </ActionButton>
              )}
              
              <ThemeButton
                theme={theme}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                size="small"
              >
                {theme === "dark" ? (
                  <Sun size={20} color="#9CA3AF" />
                ) : (
                  <Moon size={20} color="#1E40AF" />
                )}
              </ThemeButton>
            </Box>

            <MobileMenuButton
              theme={theme}
              edge="end"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ display: { md: 'none' } }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </MobileMenuButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        ref={mobileMenuRef}
        anchor="top"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        transitionComponent={Fade}
        PaperProps={{
          sx: {
            width: '100%',
            bgcolor: theme === 'dark' ? '#1F2937' : 'white',
            color: theme === 'dark' ? 'white' : '#1E3A8A',
            pb: 2,
            mt: '64px',
          }
        }}
      >
        <List>
          <ListItem>
            <MobileNavLink to="/" theme={theme} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
          </ListItem>
          <ListItem>
            <MobileNavLink to="/addtodo" theme={theme} onClick={() => setIsMobileMenuOpen(false)}>
              Add Todo
            </MobileNavLink>
          </ListItem>
          
          <Divider sx={{ my: 1, bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
          
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {profile?.role === "admin" && (
              <ActionButton
                fullWidth
                variant="contained"
                component={Link}
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
              >
                Dashboard
              </ActionButton>
            )}
            
            {profile ? (
              <ActionButton
                fullWidth
                variant="contained"
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' } }}
              >
                Logout
              </ActionButton>
            ) : (
              <ActionButton
                fullWidth
                variant="contained"
                component={Link}
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
              >
                Login
              </ActionButton>
            )}
            
            <ActionButton
              fullWidth
              variant="outlined"
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              startIcon={theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              sx={{ 
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
                color: theme === 'dark' ? 'white' : '#1E40AF',
                '&:hover': { 
                  bgcolor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(37, 99, 235, 0.05)',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
                }
              }}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </ActionButton>
          </Box>
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;