import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Alert, Skeleton, Button, Box } from '@mui/material';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError('');

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const response = await api.get('/events');

        setEvents(response.data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token
    navigate('/login');
  };

  return (
    <Container
      sx={{
        mt: 4,
        backgroundImage: 'linear-gradient(to right,rgb(201, 109, 250), #FFFFFF)', // Soft blue-white gradient
        borderRadius: 2,
        p: 3,
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#2C3E50", fontWeight: "bold", flexGrow: 1, mb: { xs: 2, sm: 0 } }}
        >
          📅 Upcoming Events
        </Typography>
        <Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3498DB",
            color: "white",
            "&:hover": { backgroundColor: "#2980B9" },
            fontSize: { xs: '12px', sm: '14px' },
            zIndex: 10, // Ensure buttons are above the overlay
          }}
          onClick={() => navigate('/create-event')}
        >
          + Add Event
        </Button>

          <Button
            variant="outlined"
            sx={{
              color: "#D35400",
              borderColor: "#D35400",
              "&:hover": { backgroundColor: "#D35400", color: "#FFF" },
              fontSize: { xs: '12px', sm: '14px' },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && !error ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {[1, 2, 3, 4].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {/* Event List */}
      {!loading && !error ? (
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {events.length > 0 ? (
            events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card
                  sx={{
                    backgroundImage: 'linear-gradient(to bottom right, #EAF2F8, #D5DBDB)', // Subtle gray-blue gradient
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.03)", boxShadow: "5px 5px 15px rgba(0,0,0,0.2)" },
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#1C2833" }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#566573" }}>
                      {event.description}
                    </Typography>
                    <Typography variant="caption" sx={{ display: "block", mt: 1, color: "#7F8C8D" }}>
                      📆 {new Date(event.date).toLocaleString()}
                    </Typography>
                    {/* Edit Button */}
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 2,
                        color: "#C0392B",
                        borderColor: "#C0392B",
                        "&:hover": { backgroundColor: "#C0392B", color: "white" },
                      }}
                      onClick={() => navigate(`/edit-event/${event._id}`)}
                    >
                      ✏ Edit
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center" sx={{ width: '100%', mt: 3, fontSize: "18px", color: "#7F8C8D" }}>
              No events available.
            </Typography>
          )}
        </Grid>
      ) : null}
    </Container>
  );
};

export default Dashboard;
