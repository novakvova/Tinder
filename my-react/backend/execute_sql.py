import psycopg2

try:
    conn = psycopg2.connect(
        dbname="railway",
        user="postgres",
        password="eZCWHTtBDjpTXbtgedhnoJYaSgZyOdIx",
        host="autorack.proxy.rlwy.net",
        port="58394"
    )
    cursor = conn.cursor()

    # Виконати SQL запит
    cursor.execute("INSERT INTO django_content_type (name, app_label, model) VALUES ('logentry', 'admin', 'logentry');")
    conn.commit()  # Застосувати зміни

    print("Запит виконано успішно!")
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Помилка підключення: {e}")
