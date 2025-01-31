import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Navbar from "../components/Navbar";
import { PencilIcon, UploadIcon } from "lucide-react";

interface SurveyData {
  age: number;
  gender: string;
  interests: string;
  photo: string;
}

const SurveyPage: React.FC = () => {
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [editableSurvey, setEditableSurvey] = useState<SurveyData>({
    age: 18,
    gender: "male",
    interests: "",
    photo: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSurvey = async () => {
        try {
          const response = await axios.get<SurveyData>("/api/survey/", {
            headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
          });
          setSurvey(response.data);
        } catch (error) {
          console.error("❌ Помилка завантаження анкети:", error);
        }
      };
      
  
    fetchSurvey();
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setEditableSurvey((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
  };

  const handleEditSurvey = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("age", editableSurvey.age.toString());
      formData.append("gender", editableSurvey.gender);
      formData.append("interests", editableSurvey.interests);

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      const response = await axios.put<SurveyData>("/survey/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      setSurvey(response.data);
      setEditableSurvey(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Помилка при оновленні анкети:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
      <Navbar />
      <div className="flex justify-center mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {/* Фото анкети */}
          <div className="flex justify-center relative">
            <label htmlFor="photo-upload" className="cursor-pointer">
              <img
                src={editableSurvey.photo || "https://via.placeholder.com/120"}
                alt="Анкета"
                className="w-24 h-24 rounded-full object-cover"
              />
              <input type="file" id="photo-upload" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>

          {/* Дані анкети */}
          {!isEditing ? (
            <>
              <h2 className="text-center text-xl font-bold mt-4">Анкета</h2>
              <p className="text-center text-gray-600">Вік: {survey?.age || "Не вказано"}</p>
              <p className="text-center text-gray-600">Стать: {survey?.gender === "male" ? "Чоловік" : "Жінка"}</p>
              <p className="text-center text-gray-600">Інтереси: {survey?.interests || "Не вказано"}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 mt-4 w-full rounded transition"
              >
                <PencilIcon size={18} /> Редагувати анкету
              </button>
            </>
          ) : (
            <>
              <input
                type="number"
                value={editableSurvey.age}
                onChange={(e) => setEditableSurvey({ ...editableSurvey, age: parseInt(e.target.value) })}
                className="border rounded w-full p-2 mt-2"
                placeholder="Вік"
              />
              <select
                value={editableSurvey.gender}
                onChange={(e) => setEditableSurvey({ ...editableSurvey, gender: e.target.value })}
                className="border rounded w-full p-2 mt-2"
              >
                <option value="male">Чоловік</option>
                <option value="female">Жінка</option>
              </select>
              <input
                type="text"
                value={editableSurvey.interests}
                onChange={(e) => setEditableSurvey({ ...editableSurvey, interests: e.target.value })}
                className="border rounded w-full p-2 mt-2"
                placeholder="Інтереси"
              />
              <button
                onClick={handleEditSurvey}
                className="bg-blue-500 text-white px-4 py-2 mt-4 w-full rounded hover:bg-blue-600 transition"
              >
                {loading ? "Збереження..." : "Зберегти зміни"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
