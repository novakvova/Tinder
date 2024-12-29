@echo off
:: Клонування репозиторію
echo === Клонуємо репозиторій ===
if not exist Tinder (
    git clone https://github.com/novakvova/Tinder
)

cd Tinder

:: Віртуальне середовище Python
echo === Створення віртуального середовища ===
cd my-react\backend
python -m venv venv
call venv\Scripts\activate

:: Встановлення Python-залежностей
echo === Встановлюємо залежності Python ===
pip install --upgrade pip
pip install -r requirements.txt

:: Запуск Django-сервера
echo === Запуск Django сервера ===
start cmd /k "cd backend && python manage.py runserver"

:: Встановлення npm-залежностей
echo === Встановлюємо npm залежності ===
cd ..\..
npm install

:: Запуск фронтенду
echo === Запуск фронтенду ===
npm run dev

:: Готово!
echo === Проєкт успішно запущено! ===
pause
