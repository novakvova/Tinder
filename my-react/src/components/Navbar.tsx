import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, MoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Вийти',
      onClick: handleLogout,
    },
  ];

  const navbarItems = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      label: 'Головна',
      onClick: () => navigate('/home'),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Профіль',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'more',
      label: (
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
          <MoreOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        </Dropdown>
      ),
    },
  ];

  return <Menu mode="horizontal" selectedKeys={[location.pathname]} className="navbar" items={navbarItems} />;
};

export default Navbar;
