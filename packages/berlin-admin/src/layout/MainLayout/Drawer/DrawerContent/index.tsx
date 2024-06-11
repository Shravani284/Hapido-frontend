// material-ui
import { useTheme } from '@mui/material';

import Navigation from './Navigation';
import { Box } from '@mui/material';
// import { useSelector } from 'store';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Navigation />
    </Box>
  );
};

export default DrawerContent;
