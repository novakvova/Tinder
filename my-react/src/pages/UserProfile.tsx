import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { Avatar, Button, Card, Input, Upload, message } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
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
    const file = info.file.originFileObj || info.file; // Переконуємося, що це дійсно File
  
    if (!file) {
      console.error("⚠️ Файл не передано!", info.file);
      return;
    }
  
    setAvatarFile(file);
    setEditableUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) })); // Оновлюємо preview
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
        console.log("📂 Файл додається у FormData:", avatarFile);
      } else {
        console.warn("⚠️ Файл не вибрано!");
      }
  
      console.log("📤 Відправка FormData:", formData);
  
      const response = await axios.put('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("access")}` // Додаємо токен
        },
      });
  
      console.log("✅ Відповідь від сервера:", response.data);
  
      message.success('Профіль оновлено успішно!');
      setUser(response.data as UserProfileData);
      setEditableUser(response.data as UserProfileData);
    } catch (error) {
      console.error('❌ Помилка при оновленні профілю:', error);
      message.error('Помилка при оновленні профілю.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  if (!user) {
    return <div>Завантаження профілю...</div>;
  }

  return (
    <div className="user-profile">
      <Navbar />
      <div className="profile-container">
        <Card>
        <Upload accept="image/*" showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
  <Avatar 
    src={avatarFile 
      ? URL.createObjectURL(avatarFile) 
      : user.avatar.startsWith("http") 
        ? user.avatar 
        : `https://tinderphoto.blob.core.windows.net/media/${user.avatar}`
    } 
    size={100} 
  />
  <Button type="link" icon={<UploadOutlined />}>
    Завантажити аватар
  </Button>
</Upload>

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
          <Button type="primary" onClick={handleEditProfile} icon={<SaveOutlined />} loading={loading}>
            Зберегти зміни
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
