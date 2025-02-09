import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Fetch event data when the component loads
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(response.data.date);
      } catch (error) {
        console.error('Failed to load event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/events/${id}`, { title, description, date });
      navigate('/'); // Redirect to dashboard after update
    } catch (error) {
      console.error('Failed to update event:', error);
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
        }}>
            {/* <Container maxWidth="sm"> */}
              <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h4" align="center">Edit Event</Typography>
                <form onSubmit={handleUpdate}>
                  <TextField fullWidth label="Event Title" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} required />
                  <TextField fullWidth multiline rows={3} label="Description" margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} required />
                  <TextField fullWidth type="datetime-local" margin="normal" value={date} onChange={(e) => setDate(e.target.value)} required />
                  <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Update Event</Button>
                </form>
              </Box>
            {/* </Container> */}
        </Container>
    </Box>
  );
};

export default EditEvent;
