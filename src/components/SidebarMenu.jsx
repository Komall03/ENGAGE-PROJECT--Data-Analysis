import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { SIDEBAR_MENUS } from '../const/SidebarMenu';

const style = {
  '&:hover': {
    color: (theme) => theme.palette.common.sapphire,
    bgcolor: (theme) => theme.palette.common.hawkesBlue,
    borderRadius: 2,
  },
  display: 'flex',
  gap: 2,
  color: (theme) => theme.palette.common.white,
  borderRadius: 2,
  padding: (theme) => theme.spacing(2),
  marginTop: (theme) => theme.spacing(2),
};

const hasChildren = (item) => {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }
  if (children.constructor !== Array) {
    return false;
  }
  if (children.length === 0) {
    return false;
  }
  return true;
};

const SingleLevel = ({ item, navigate }) => {
  const location = useLocation();
  const [sideIcon, setIcon] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();
  return (
  <ListItemButton
    sx={style}
    onClick={() => {
      navigate(item?.route);
      setSelectedIndex(item?.route);
    }}
    onMouseEnter={() => {
      setIcon(true);
    }}
    onMouseLeave={() => {
      setIcon(false);
    }}
    selected={selectedIndex === location?.pathname}

  >
    <Avatar variant="square" src={sideIcon === true || selectedIndex === location?.pathname ? item.iconActive : item.icon} sx={{ width: 22, height: 22 }} />
    <ListItemText primary={item.name} />
  </ListItemButton>
);
};

const MultiLevel = ({ item, navigate }) => {
  const { items: children } = item;
  const [sideIcon, setIcon] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <ListItemButton
      sx={style}
      onClick={handleClick}
      onMouseEnter={() => {
      setIcon(true);
    }}
    onMouseLeave={() => {
      setIcon(false);
    }}>
        <Avatar
          variant="square"
          src={sideIcon === true ? item.iconActive : item.icon}
          sx={{ width: 22, height: 22 }}
        />
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 4 }}>
          {children.map((child, key) => (
            <MenuItem key={key.id} item={child} navigate={navigate} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
const MenuItem = React.memo(({ item, navigate }) => {
  const MenuComponent = hasChildren(item) ? MultiLevel : SingleLevel;
  return <MenuComponent item={item} navigate={navigate} />;
});

export default function SidebarMenu() {
  const navigate = useNavigate();
  return SIDEBAR_MENUS.map((item, key) => (
    <MenuItem key={key.id} item={item} navigate={navigate} />
  ));
}

SingleLevel.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigate: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
MultiLevel.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigate: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
MenuItem.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object]).isRequired,
  navigate: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
