from django.db import connection

def drop_all_tables():
    with connection.cursor() as cursor:
        cursor.execute("DROP SCHEMA public CASCADE;")
        cursor.execute("CREATE SCHEMA public;")
        cursor.execute("GRANT ALL ON SCHEMA public TO postgres;")
        cursor.execute("GRANT ALL ON SCHEMA public TO public;")
        print("Всі таблиці успішно видалено!")

if __name__ == "__main__":
    drop_all_tables()
