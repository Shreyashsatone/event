import { Box } from '@mui/material';

const Layout = ({ children }) => {
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
      {/* Background Image */}
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

      {/* Dark Overlay (Ensure it's Click-Through) */}
      <Box 
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for all pages
          pointerEvents: "none", // This makes sure buttons can be clicked
        }}
      />

      {/* Main Content (Ensure Buttons Work) */}
      <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
        {children} {/* Render the actual page inside this layout */}
      </Box>
    </Box>
  );
};

export default Layout;
