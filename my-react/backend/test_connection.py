import psycopg2

try:
    conn = psycopg2.connect(
        dbname="railway",
        user="postgres",
        password="eZCWHTtBDjpTXbtgedhnoJYaSgZyOdIx",
        host="autorack.proxy.rlwy.net",
        port="58394"
    )
    print("Підключення успішне!")
    conn.close()
except Exception as e:
    print(f"Помилка підключення: {e}")
