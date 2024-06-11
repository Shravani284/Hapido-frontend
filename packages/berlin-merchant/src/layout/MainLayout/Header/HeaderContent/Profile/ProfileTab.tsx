import { useState } from 'react';

// material-ui
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

// assets
import { EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../../../../store/slice/LoginSlice';
import { useNavigate } from 'react-router-dom';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

const ProfileTab = ({ setOpen }: any) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index);
  };
  const handleLogout = () => {
    dispatch(logoutHandler());
    navigate('./');
  };

  const handleEditProfile = () => {
    navigate('/profile');
    setOpen((prevOpen: boolean) => !prevOpen);
  };
  return (
    <List
      component="nav"
      sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 0)
        }
      >
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" onClick={handleEditProfile} />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 1)
        }
      >
        {/* <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 3)
        }
      >
        <ListItemIcon>
          <ProfileOutlined />
        </ListItemIcon>
        <ListItemText primary="Social Profile" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          handleListItemClick(event, 4)
        }
      >
        <ListItemIcon>
          <WalletOutlined />
        </ListItemIcon> */}
        {/* <ListItemText primary="Billing" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon> */}
        <ListItemText primary="Logout" onClick={handleLogout} />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
