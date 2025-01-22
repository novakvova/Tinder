cd backend
python -m venv venv
call venv\Scripts\activate

pip install --upgrade pip
pip install -r requirements.txt

cd ..\my-react
npm install

pause
