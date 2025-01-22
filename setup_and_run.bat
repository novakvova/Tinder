
echo === Створення віртуального середовища ===
cd my-react\backend
python -m venv venv
call venv\Scripts\activate

echo === Встановлюємо залежності Python ===
pip install --upgrade pip
pip install -r requirements.txt





echo === Встановлюємо npm залежності ===
cd ..\..
npm install




echo === Проєкт успішно запущено! ===
pause
