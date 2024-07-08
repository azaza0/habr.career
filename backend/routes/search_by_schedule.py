from fastapi import APIRouter, HTTPException
from dbConnection.db import get_db_connection, release_db_connection
from typing import List, Dict

router = APIRouter()

@router.get("/full_time", response_model=Dict)
def search_full_time():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM vacancies WHERE location ILIKE '%Полный рабочий день%';")
        total_full_time = cur.fetchone()[0]
        cur.execute("SELECT * FROM vacancies WHERE location ILIKE '%Полный рабочий день%' ORDER BY RANDOM() LIMIT 5;")
        rows = cur.fetchall()
    release_db_connection(conn)

    if not rows:
        raise HTTPException(status_code=404, detail="Full-time vacancies not found")

    results = [{"company": row[1], "vacancy": row[2], "location": row[3], "salary": row[4], "skills": row[5], "link": row[6]} for row in rows]
    return {"total": total_full_time, "vacancies": results}

@router.get("/part_time", response_model=Dict)
def search_part_time():
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM vacancies WHERE location ILIKE '%Неполный рабочий день%';")
        total_part_time = cur.fetchone()[0]
        cur.execute("SELECT * FROM vacancies WHERE location ILIKE '%Неполный рабочий день%' ORDER BY RANDOM() LIMIT 5;")
        rows = cur.fetchall()
    release_db_connection(conn)

    if not rows:
        raise HTTPException(status_code=404, detail="Part-time vacancies not found")

    results = [{"company": row[1], "vacancy": row[2], "location": row[3], "salary": row[4], "skills": row[5], "link": row[6]} for row in rows]
    return {"total": total_part_time, "vacancies": results}
