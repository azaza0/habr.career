import psycopg2
from psycopg2 import pool
from dbConnection.config import settings

def connect_db():
    connection_pool = psycopg2.pool.SimpleConnectionPool(
        1, 20,
        user=settings.DB_USER,
        password=settings.DB_PASSWORD,
        host=settings.DB_HOST,
        port=settings.DB_PORT,
        database=settings.DB_NAME
    )
    return connection_pool

db_pool = connect_db()

def get_db_connection():
    conn = db_pool.getconn()
    if conn:
        return conn
    else:
        raise Exception("Failed to get connection from pool")

def release_db_connection(conn):
    db_pool.putconn(conn)
