import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, HomeOutlined, MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  onEditProfile?: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ onEditProfile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  const isProfilePage = location.pathname === '/profile';

  const menu = (
    <Menu>
      {isProfilePage && (
        <Menu.Item key="edit-profile" icon={<SettingOutlined />} onClick={onEditProfile}>
          Редагувати профіль
        </Menu.Item>
      )}
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Вийти
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]} className="navbar">
      <Menu.Item key="/home" icon={<HomeOutlined />} onClick={() => navigate('/home')}>
        Головна
      </Menu.Item>
      <Menu.Item key="/profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}>
        Профіль
      </Menu.Item>
      <Menu.Item key="more">
        <Dropdown overlay={menu} trigger={['click']}>
          <MoreOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
