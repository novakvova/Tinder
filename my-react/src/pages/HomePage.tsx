import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface SurveyData {
  id: number;
  age: number;
  gender: string;
  interests: string;
  photo: string;
  display_name: string; 
}

const HomePage: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get<SurveyData[]>("/api/survey/list/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        });
        setSurveys(response.data);
      } catch (error) {
        console.error("❌ Помилка завантаження анкет:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);


  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % surveys.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + surveys.length) % surveys.length);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-orange-500 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-white w-12 h-12" />
            <p className="text-white mt-2">Завантаження анкет...</p>
          </div>
        ) : surveys.length === 0 ? (
          <p className="text-white text-xl">Немає анкет для перегляду 😔</p>
        ) : (
          <div className="relative w-96 bg-white p-6 rounded-lg shadow-lg text-center">
            {}
            <img
              src={surveys[currentIndex].photo || "https://via.placeholder.com/150"}
              alt="Фото користувача"
              className="w-32 h-32 mx-auto rounded-full object-cover"
            />

            {}
            <h2 className="text-2xl font-semibold mt-4">
              {surveys[currentIndex].display_name || "Без імені"}
            </h2>
            <p className="text-gray-600">Вік: {surveys[currentIndex].age}</p>
            <p className="text-gray-600">
              Стать: {surveys[currentIndex].gender === "male" ? "Чоловік" : "Жінка"}
            </p>
            <p className="text-gray-600">
              Інтереси: {surveys[currentIndex].interests || "Не вказано"}
            </p>

            {}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
