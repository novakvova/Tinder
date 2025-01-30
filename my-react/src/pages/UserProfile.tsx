import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { Avatar, Button, Card, Input, Upload, message, Spin } from 'antd';
import { UploadOutlined, SettingOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import '../styles/UserProfile.css';

interface UserProfileData {
  avatar: string;
  display_name: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [editableUser, setEditableUser] = useState<UserProfileData>({
    avatar: '',
    display_name: '',
    bio: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/profile/');
        setUser(response.data as UserProfileData);
        setEditableUser(response.data as UserProfileData);
      } catch (error) {
        console.error('Помилка завантаження профілю:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    if (!file) {
      console.error("⚠️ Файл не передано!", info.file);
      return;
    }
    setAvatarFile(file);
    setEditableUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
    message.success('Аватар успішно завантажено!');
  };

  const handleEditProfile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('display_name', editableUser.display_name);
      formData.append('bio', editableUser.bio);

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await axios.put('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
      });

      message.success('Профіль оновлено успішно!');
      setUser(response.data as UserProfileData);
      setEditableUser(response.data as UserProfileData);
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Помилка при оновленні профілю:', error);
      message.error('Помилка при оновленні профілю.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-loading-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="user-profile">
      <Navbar />
      <div className="profile-container">
        <Card className="profile-card">
          <Upload accept="image/*" showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
            <Avatar 
              src={avatarFile 
                ? URL.createObjectURL(avatarFile) 
                : user?.avatar?.startsWith("http") 
                  ? user.avatar 
                  : user?.avatar 
                    ? `https://tinderphoto.blob.core.windows.net/media/${user.avatar}` 
                    : undefined
              } 
              size={120} 
              className="profile-avatar"
              onClick={() => setIsEditing(true)}
            />
          </Upload>

          {!isEditing ? (
            <>
              <h2 className="profile-display-name">{user?.display_name || "Немає імені"}</h2>
              <p className="profile-bio">{user?.bio || "Опис відсутній"}</p>
              <Button 
                type="text" 
                icon={<SettingOutlined />} 
                onClick={() => setIsEditing(true)} 
                className="settings-btn" 
              />
            </>
          ) : (
            <>
              <Input
                name="display_name"
                value={editableUser.display_name}
                onChange={(e) => setEditableUser({ ...editableUser, display_name: e.target.value })}
                placeholder="Ім'я користувача"
                className="profile-input"
              />
              <Input.TextArea
                name="bio"
                value={editableUser.bio}
                onChange={(e) => setEditableUser({ ...editableUser, bio: e.target.value })}
                placeholder="Про себе"
                rows={4}
                className="profile-input"
              />
              <Button type="primary" onClick={handleEditProfile} loading={loading}>
                Зберегти зміни
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
