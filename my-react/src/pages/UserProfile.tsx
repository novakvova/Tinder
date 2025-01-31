import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Navbar from "../components/Navbar";
import { PencilIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UserProfileData {
  avatar: string;
  display_name: string;
  bio: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [editableUser, setEditableUser] = useState<UserProfileData>({
    avatar: "",
    display_name: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      const token = localStorage.getItem("access");

      if (!token) {
        console.warn("⚠️ Токен не знайдено. Очікуємо його появи...");
        setTimeout(checkAuthAndFetchProfile, 500);
        return;
      }

      try {
        const response = await axios.get<UserProfileData>("/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setUser(response.data);
          setEditableUser(response.data);
        }
      } catch (error) {
        console.error("❌ Помилка завантаження профілю:", error);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuthAndFetchProfile();
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-500 to-orange-500">
        <motion.div
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 to-orange-500 flex flex-col">
      <Navbar />

      {loading ? (
        <div className="flex flex-1 justify-center items-center">
          <motion.div
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
          />
        </div>
      ) : (
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex justify-center relative">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <motion.img
                  src={editableUser.avatar || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-pink-500 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
                <input type="file" id="avatar-upload" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAvatarFile(file);
                  setEditableUser((prev) => ({ ...prev, avatar: URL.createObjectURL(file) }));
                }} />
              </label>
            </div>

            {!isEditing ? (
              <>
                <h2 className="text-center text-xl font-bold mt-4 text-gray-800">{user?.display_name || "Немає імені"}</h2>
                <p className="text-center text-gray-500">{user?.bio || "Опис відсутній"}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 mt-4 w-full rounded-lg transition shadow-lg"
                >
                  <PencilIcon size={18} /> Редагувати профіль
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={editableUser.display_name}
                  onChange={(e) => setEditableUser({ ...editableUser, display_name: e.target.value })}
                  className="border rounded w-full p-2 mt-2"
                  placeholder="Ім'я"
                />
                <textarea
                  value={editableUser.bio}
                  onChange={(e) => setEditableUser({ ...editableUser, bio: e.target.value })}
                  className="border rounded w-full p-2 mt-2"
                  placeholder="Про себе"
                />
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const formData = new FormData();
                      formData.append("display_name", editableUser.display_name);
                      formData.append("bio", editableUser.bio);
                      if (avatarFile) formData.append("avatar", avatarFile);
                      
                      const response = await axios.put<UserProfileData>("/profile/", formData, {
                        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${localStorage.getItem("access")}` },
                      });

                      if (response.data) {
                        setUser(response.data);
                        setEditableUser(response.data);
                        setIsEditing(false);
                      }
                    } catch (error) {
                      console.error("❌ Помилка при оновленні профілю:", error);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 mt-4 w-full rounded-lg hover:bg-red-600 transition shadow-lg"
                >
                  {loading ? "Збереження..." : "Зберегти зміни"}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
