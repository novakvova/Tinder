
echo === Створення віртуального середовища ===
cd backend
python -m venv venv
call venv\Scripts\activate
echo === Встановлюємо залежності Python ===
pip install --upgrade pip
pip install -r requirements.txt


echo === Встановлюємо залежності фронтенду ===
cd ..\my-react
npm install


echo === Всі залежності успішно встановлені! ===
pause
