import { ReactNode, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, AppBarProps } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import IconButton from '../../../components/@extended/IconButton';

import useConfig from '../../../hooks/useConfig';
// import { dispatch, useSelector } from 'store';
// import { openDrawer } from 'store/reducers/menu';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// types
import { MenuOrientation, ThemeMode } from '../../../types/config';
import { useSelector, useDispatch } from 'react-redux';
import { openDrawer } from '../../../store/menu/menu';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { menuOrientation } = useConfig();

  const menu = useSelector((state: any) => state.menu.drawerOpen);

  const dispatch = useDispatch();

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor =
    theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  // common header
  const mainHeader: ReactNode = (
    <Toolbar>
      {!isHorizontal ? (
        <IconButton
          aria-label="open drawer"
          onClick={() => dispatch(openDrawer(!menu))}
          edge="start"
          color="secondary"
          variant="light"
          sx={{
            color: 'text.primary',
            bgcolor: menu ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: -2 },
          }}
        >
          {!menu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
      ) : null}
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: isHorizontal
        ? '100%'
        : menu
        ? 'calc(100% - 260px)'
        : { xs: '100%', lg: 'calc(100% - 60px)' },
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={menu} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default Header;
