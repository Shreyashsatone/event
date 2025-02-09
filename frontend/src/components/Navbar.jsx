import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Clear cookies
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/create-event">+ Add Event</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
