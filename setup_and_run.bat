:: Створення віртуального середовища Python
echo === Створення віртуального середовища ===
cd my-react\backend
python -m venv venv
call venv\Scripts\activate

:: Встановлення Python-залежностей
echo === Встановлюємо залежності Python ===
pip install --upgrade pip
pip install -r requirements.txt

:: Встановлення npm-залежностей
echo === Встановлюємо npm залежності ===
cd ..\..
npm install

:: Готово
echo === Всі залежності успішно встановлені! ===
pause
