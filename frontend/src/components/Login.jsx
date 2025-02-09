import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/login', { email, password });
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box 
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Layer */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: 'url("https://source.unsplash.com/1600x900/?events,conference")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay */}
      <Box 
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
        }}
      />

      {/* Login Form */}
      <Container 
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 2,
          background: "rgba(255, 255, 255, 0.9)", // Slightly transparent white box
          borderRadius: 3,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 2, color: "#2C3E50", fontWeight: "bold" }}>
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Email" 
            margin="normal"
            variant="outlined"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <TextField 
            fullWidth 
            label="Password" 
            type="password" 
            margin="normal"
            variant="outlined"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ mt: 2, backgroundColor: "#2980B9", "&:hover": { backgroundColor: "#21618C" } }}
          >
            LOGIN
          </Button>

          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
              mt: 2, 
              backgroundColor: "#9B59B6", 
              "&:hover": { backgroundColor: "#8E44AD" }
            }} 
            onClick={() => navigate('/register')}
          >
            GO TO REGISTER
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
