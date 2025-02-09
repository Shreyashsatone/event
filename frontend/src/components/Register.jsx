import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      alert('Registration failed!');
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
    {/* <Container maxWidth="sm"> */}
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal"  value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register</Button>
          
          {/* Button to go to the Login Page */}
          <Button fullWidth variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate('/login')} >Go to Login</Button>
        </form>
      </Box>
    {/* </Container> */}
    </Container>
    </Box>
  );
};

export default Register;
