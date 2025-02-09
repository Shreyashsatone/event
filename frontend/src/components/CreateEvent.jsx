import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events', { title, description, date });
      navigate('/');
    } catch (error) {
      alert('Failed to create event!');
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
          <Typography variant="h4" align="center">Create Event</Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Event Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField fullWidth multiline rows={3} label="Description" margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <TextField fullWidth type="datetime-local" margin="normal" value={date} onChange={(e) => setDate(e.target.value)} required />
            <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Create Event</Button>
          </form>
        </Box>
      {/* </Container> */}
    </Container>
    </Box>
  );
};

export default CreateEvent;
