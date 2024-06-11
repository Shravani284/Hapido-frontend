// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import useConfig from '../../../../hooks/useConfig';

// types
import { MenuOrientation } from '../../../../types/config';
import { useSelector } from 'react-redux';
import { authBgLogo, authLogo } from 'berlin-common';

// ==============================|| DRAWER HEADER ||============================== //

// interface Props {
//   open: boolean;
// }

const DrawerHeader = ({ open }: any) => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const isDrawerOpen = useSelector((state: any) => state.menu.drawerOpen);

  const { menuOrientation } = useConfig();
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        minHeight: isHorizontal ? 'unset' : '60px',
        width: isHorizontal ? { xs: '100%', lg: '424px' } : 'inherit',
        paddingTop: isHorizontal ? { xs: '10px', lg: '0' } : '8px',
        paddingBottom: isHorizontal ? { xs: '18px', lg: '0' } : '8px',
        paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0,
      }}
    >
      {isDrawerOpen ? (
        <img src={authLogo} alt="Hapido-logo" />
      ) : (
        <img src={authBgLogo} alt="Hapido-logo" width="35px" />
      )}
    </DrawerHeaderStyled>
  );
};

export default DrawerHeader;
