import { Box, List } from '@mui/material';
import { ListItemButton, ListItemText } from '@mui/material';
import { HomeOutlined } from '@ant-design/icons';
import { ListItemIcon } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from '../../../../../types/config';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import RedeemIcon from '@mui/icons-material/Redeem';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { openDrawer } from '../../../../../store/menu/menu';
import { useWindowSize } from 'berlin-common';

function Navigation() {
  const dispatch = useDispatch();
  const menu: any = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: <HomeOutlined />,
      breadcrumbs: false,
    },
    {
      id: 'deals',
      title: 'Deals',
      type: 'item',
      url: '/deals',
      icon: <DiscountOutlinedIcon />,
      breadcrumbs: false,
    },
    {
      id: 'purchasesVoucher',
      title: 'Purchases Voucher',
      type: 'item',
      url: '/purchases-voucher',
      icon: <LocalOfferOutlinedIcon />,
      breadcrumbs: false,
    },
    {
      id: 'redeemedVoucher',
      title: 'Redeemed Voucher',
      type: 'item',
      url: '/redeemed-voucher',
      icon: <RedeemIcon />,
      breadcrumbs: false,
    },
    {
      id: 'voucherRedemption',
      title: 'Voucher Redemption',
      type: 'item',
      url: '/voucher-redemption',
      icon: <QrCodeScannerIcon />,
    },
    {
      id: 'inventoryAssignment',
      title: 'Inventory Assignment',
      type: 'item',
      url: '/manualbooking',
      icon: <InventoryOutlinedIcon />,
      breadcrumbs: false,
    },
  ];

  const theme = useTheme();
  const drawerOpen = useSelector((state: any) => state.menu.drawerOpen);
  const level = 1;
  const navigate = useNavigate();
  const textColor =
    theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor =
    theme.palette.mode === ThemeMode.DARK && drawerOpen
      ? 'text.primary'
      : 'primary.main';
  const location = useLocation();
  const { size } = useWindowSize();

  // Function to determine if a link is active
  const isLinkActive = (linkPath: string) => {
    if (linkPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(linkPath);
  };

  const merchantRouts = (item: { url: string }) => {
    if (size > 768) {
      return item?.url;
    }
  };

  return (
    <Box>
      <List>
        {menu?.map((item: any, index) => (
          <Link to={merchantRouts(item)} key={index}>
            <ListItemButton
              key={item.id}
              onClick={() => {
                if (size < 768) {
                  dispatch(openDrawer(false));
                  setTimeout(() => {
                    navigate(item?.url);
                  }, 500);
                }
              }}
              sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === ThemeMode.DARK
                        ? 'divider'
                        : 'primary.lighter',
                  },
                  '&.Mui-selected': {
                    bgcolor:
                      theme.palette.mode === ThemeMode.DARK
                        ? 'divider'
                        : 'primary.lighter',
                    borderRight: `2px solid ${theme.palette.primary.main}`,
                    color: iconSelectedColor,
                    '&:hover': {
                      color: iconSelectedColor,
                      bgcolor:
                        theme.palette.mode === ThemeMode.DARK
                          ? 'divider'
                          : 'primary.lighter',
                    },
                  },
                }),
                ...(!drawerOpen && {
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                  '&.Mui-selected': {
                    '&:hover': {
                      bgcolor: 'transparent',
                    },
                    bgcolor: 'transparent',
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isLinkActive(item.url) ? iconSelectedColor : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor:
                        theme.palette.mode === ThemeMode.DARK
                          ? 'secondary.light'
                          : 'secondary.lighter',
                    },
                  }),
                  ...(!drawerOpen &&
                    isLinkActive(item.url) && {
                      bgcolor:
                        theme.palette.mode === ThemeMode.DARK
                          ? 'primary.900'
                          : 'primary.lighter',
                      '&:hover': {
                        bgcolor:
                          theme.palette.mode === ThemeMode.DARK
                            ? 'primary.darker'
                            : 'primary.lighter',
                      },
                    }),
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    stroke: '1.5',
                    color: isLinkActive(item.url)
                      ? theme.palette.primary.main
                      : theme.palette.secondary.dark,
                  }}
                >
                  {item.icon}
                </span>
              </ListItemIcon>
              {drawerOpen && (
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{
                        color: isLinkActive(item.url)
                          ? iconSelectedColor
                          : textColor,
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}

export default Navigation;
