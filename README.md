# README для запуску проєкту Tinder

## Вступ
Цей проєкт є копією соціальної мережі Tinder, розробленою за допомогою **Django** на бекенді та **React + TypeScript** на фронтенді. У цьому документі детально описані всі команди для запуску серверної та клієнтської частин, а також корисні команди для управління проєктом.

---

## Вимоги

Перед початком роботи переконайтеся, що у вас встановлено:

- **Python 3.10+**
- **Node.js 18+**
- **npm** або **yarn**
- **Git**

---

## Інструкція з встановлення

### 1. Клонування репозиторію
Якщо проєкт ще не завантажений:
```bash
git clone https://github.com/novakvova/Tinder.git
cd Tinder
```

### 2. Налаштування бекенду
1. Перейдіть до папки бекенду:
   ```bash
   cd my-react/backend
   ```
2. Створіть віртуальне середовище:
   ```bash
   python -m venv venv
   ```
3. Активуйте віртуальне середовище:
   - Для Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Для macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
4. Встановіть залежності Python:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. Запустіть сервер Django:
   ```bash
   python manage.py runserver
   ```
   Сервер буде доступний за адресою: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 3. Налаштування фронтенду
1. Перейдіть до папки з фронтендом:
   ```bash
   cd my-react
   ```
2. Встановіть залежності:
   ```bash
   npm install
   ```
3. Запустіть фронтенд-сервер:
   ```bash
   npm run dev
   ```
   Фронтенд буде доступний за адресою: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## Корисні команди

### Для бекенду (Django)

- **Міграції бази даних:**
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

- **Створення суперкористувача:**
  ```bash
  python manage.py createsuperuser
  ```

- **Очистка бази даних (необов'язково):**
  ```bash
  python manage.py flush
  ```

- **Запуск тестів:**
  ```bash
  python manage.py test
  ```

- **Завершення роботи з віртуальним середовищем:**
  ```bash
  deactivate
  ```

### Для фронтенду (React + Vite)

- **Збірка проєкту для продакшену:**
  ```bash
  npm run build
  ```

- **Попередній перегляд зібраного додатку:**
  ```bash
  npm run preview
  ```

- **Перевірка та форматування коду ESLint:**
  ```bash
  npm run lint
  ```

- **Оновлення залежностей:**
  ```bash
  npm update
  ```

---

## Як оновити файл requirements.txt

1. Активуйте віртуальне середовище:
   - Для Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Для macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

2. Оновіть всі пакети:
   ```bash
   pip install --upgrade -r requirements.txt
   ```

3. Збережіть оновлення у `requirements.txt`:
   ```bash
   pip freeze > requirements.txt
   ```

---

## Додаткова інформація

- **Стилі:** Проєкт використовує TailwindCSS для стилізації.
- **HTTP-запити:** Налаштований `axiosInstance` для роботи з API.
- **Маршрутизація:** Використовується `react-router-dom` для маршрутизації сторінок.

---

### Контакти
Якщо у вас виникли питання, звертайтеся до розробників команди.

