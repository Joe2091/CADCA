
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid2,
} from '@mui/material';


import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* NAVIGATION BAR */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Info Management System
          </Typography>
          <Button color="inherit">Login</Button>
          {/* NEW: Link to the Records Page */}
          <Button component={Link} to="/records" color="inherit">
            Records
          </Button>
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT AREA */}
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Info Management System
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform helps you store and manage critical data efficiently. 
          Use the navigation bar above to log in or explore features. 
          Below, you’ll find a quick overview of what you can do with this system.
        </Typography>

        {/* FEATURE HIGHLIGHTS */}
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Secure Storage
                </Typography>
                <Typography variant="body2">
                  Your data is kept safe with robust encryption and secure backup solutions.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Real-time Access
                </Typography>
                <Typography variant="body2">
                  Access and manage information from anywhere, on any device, with instant updates.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Advanced Analytics
                </Typography>
                <Typography variant="body2">
                  Gain insights into your data with integrated analytics tools and dashboards.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}

export default HomePage;
