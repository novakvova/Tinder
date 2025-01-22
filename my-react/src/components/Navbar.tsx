import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Головна',
      onClick: () => navigate('/home'),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Профіль',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Вийти',
      onClick: handleLogout,
    },
  ];

  return <Menu mode="horizontal" selectable={false} items={items} />;
};

export default Navbar;
