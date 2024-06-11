import { Box, Collapse, List } from '@mui/material';
import { ListItemButton, ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from '../../../../../types/config';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { menu } from './Menu';
import { filterRemoveHandler } from '../../../../../store/slice/Filter';
import {
  pageRemoveValueHandler,
  rowPageRemoveValueHandler,
} from '../../../../../store/slice/Pagination';

function Navigation() {
  const [sidebarMenu, setSidebarmenu] = useState([]);
  const navigate = useNavigate();
  const { roles } = useSelector((store: any) => store.login);

  useEffect(() => {
    const index = roles?.findIndex((e) => e.module === 'SUPER_ADMINISTRATOR');
    if (index !== -1) {
      // if (location.pathname === '/') {
      setSidebarmenu(menu);
      // navigate(menu[0]?.url);
      // }
    } else {
      function filterMenu(menu, roles) {
        return menu.filter((menuItem) => {
          if (menuItem.module) {
            return roles?.some((role) => role?.module === menuItem?.module);
          }
          if (menuItem?.children) {
            menuItem.children = filterMenu(menuItem.children, roles);
            return menuItem.children.length > 0;
          }
          return false;
        });
      }

      const permission = filterMenu(menu, roles);
      setSidebarmenu(permission);
    }
  }, [roles]);

  useEffect(() => {
    if (location.pathname === '/') {
      if (sidebarMenu.length > 0) navigate(sidebarMenu[0]?.url);
    }
  }, [sidebarMenu]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Box>
      <List>
        {sidebarMenu.map((item: any, index: number) => (
          <ExpandMenu
            key={index}
            item={item}
            index={index}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
        ))}
      </List>
    </Box>
  );
}

export default Navigation;

function ExpandMenu({ item, index, setSelectedIndex, selectedIndex }: any) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const drawerOpen = useSelector((state: any) => state.menu.drawerOpen);
  const level = 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textColor =
    theme.palette.mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor =
    theme.palette.mode === ThemeMode.DARK && drawerOpen
      ? 'text.primary'
      : 'primary.main';
  const location = useLocation();

  // Function to determine if a link is active
  const isLinkActive = (linkPath: string) => {
    if (linkPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(linkPath);
  };

  useEffect(() => {
    if (selectedIndex === index) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedIndex]);

  return (
    <>
      <ListItemButton
        // {...listItemProps}
        // disabled={item.disabled}
        // selected={isSelected}
        key={index}
        onClick={() => {
          if (item.url) {
            navigate(item.url);
            dispatch(filterRemoveHandler(null));
            dispatch(pageRemoveValueHandler(0));
            dispatch(rowPageRemoveValueHandler(10));
            if (open) {
              setSelectedIndex();
            } else {
              setSelectedIndex(index);
            }
          } else {
            if (open) {
              setSelectedIndex();
            } else {
              setSelectedIndex(index);
            }
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
            color:
              isLinkActive(item.url) || open ? iconSelectedColor : textColor,
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
              (isLinkActive(item.url) || open) && {
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
              color:
                isLinkActive(item.url) || open
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
                  color:
                    isLinkActive(item.url) || open
                      ? iconSelectedColor
                      : textColor,
                }}
              >
                {item.title}
              </Typography>
            }
          />
        )}
        {item?.children?.length > 0 && drawerOpen && (
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItemButton>
      {open && drawerOpen && (
        <Collapse in={true} timeout="auto" unmountOnExit>
          <List sx={{ ml: 2 }} component="div" disablePadding>
            {item?.children?.map((e: any, index: number) => (
              //TODO temp disabled
              // <Link to={`${e.url}`}>
              <ListItemButton
                key={index}
                onClick={() => {
                  navigate(e.url);
                  dispatch(filterRemoveHandler(null));
                  dispatch(pageRemoveValueHandler(0));
                  dispatch(rowPageRemoveValueHandler(10));
                }} // Add onClick event handler
                // onClick={() => navigate(e.url)} // Add onClick event handler
                selected={isLinkActive(e.url)}
                sx={{ pl: 4 }}
                // disabled={
                //   item.id == 'flashsale' && e?.url === '/flashsale/bogfg'
                // }
                // disabled={e.url === '/manualbooking/inventoryassignment'}
              >
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText style={{ marginLeft: '5px' }} primary={e.title} />
              </ListItemButton>
              // </Link>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
