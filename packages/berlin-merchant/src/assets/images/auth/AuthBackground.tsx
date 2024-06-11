// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// types
import { ThemeDirection, ThemeMode } from '../../../types/config';
import { authBgLogo } from 'berlin-common';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: '30%',
        left: '-7%',
        transform:
          theme.direction === ThemeDirection.RTL ? 'rotate(180deg)' : 'inherit',
      }}
    >
      <img height="calc(100vh - 175px)" src={authBgLogo} alt="Hapido-logo" />
    </Box>
  );
};

export default AuthBackground;
