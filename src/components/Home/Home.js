
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import shop from "../../images/shop.jpg"
import HomeLayout from './HomeLayout';

import { NavLink } from 'react-router-dom';



export default function ProductHero() {
  return (
    <HomeLayout>
      
      <img
        style={{  position: 'absolute',
        left: "0.3rem",
        width:"100%",
        right: 0,
        top: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height:"100vh",
        zIndex: -1, }}
        src={shop}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center" >
        Welcome MyShop
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Look for what you want here, click to view ads
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200 }}
      >
        <NavLink to="/ads" style={{textDecoration:"none", color:"white"}}>View ads</NavLink>
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </HomeLayout>
  );
}