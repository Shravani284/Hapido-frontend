import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { Error404Image } from 'berlin-common';
import React, { useEffect, useState } from 'react';
import AnimateButton from '../../components/@extended/AnimateButton';

const containerStyles: any = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: 'white',
};

const fadeInStyles: any = {
  opacity: 0,
  animation: 'fadeIn 1s ease-in-out forwards',
  height: '80vh',
  maxWidth: '100%',
};

const contentStyle: any = {
  position: 'absolute',
  top: '90%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const NotFoundPage = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <Grid container style={containerStyles}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <img
          src={Error404Image}
          alt="NotFoundPageLogo"
          style={{
            ...fadeInStyles,
            height: isSmallScreen ? '40vh' : fadeInStyles.height,
          }}
        />
        <div
          style={{
            ...contentStyle,
            top: isSmallScreen ? '70%' : contentStyle.top,
          }}
        >
          <AnimateButton>
            <Button variant="contained" color="primary" href="/">
              Go to Home
            </Button>
          </AnimateButton>
        </div>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
