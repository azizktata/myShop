import * as React from 'react';
import login from "../../images/Login.png"
import fill from "../../images/Bill.png"
import error from "../../images/Error.png"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'black',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

const userData = localStorage.getItem('user');

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'white', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          // src={}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 13}}>
          How to post item for sell
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={login}
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Sign in first to be able to sell your article
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={fill}
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  fill out the form, and share your ad
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={error}
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  you can report an ad if there is something wrong with it 
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          sx={{ mt: 8 }}
        >
          <Link style={{textDecoration:"none", color:"white"}} to={userData ? "/sell/step1" : "/account"}>Sell product</Link>
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;