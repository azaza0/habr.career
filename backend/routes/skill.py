from fastapi import APIRouter, HTTPException
from typing import List, Dict
from pydantic import BaseModel
from dbConnection.db import get_db_connection

router = APIRouter()

class Vacancy(BaseModel):
    company: str
    vacancy: str
    location: str
    salary: str
    skills: str
    link: str

class SkillSearchResult(BaseModel):
    total: int
    vacancies: List[Vacancy]

@router.get("/skill", response_model=SkillSearchResult)
def search_by_skill(skill: str):
    conn = get_db_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM vacancies WHERE skills ILIKE %s;", (f"%{skill}%",))
        total_count = cur.fetchone()[0]

        cur.execute("SELECT company, vacancy, location, salary, skills, link FROM vacancies WHERE skills ILIKE %s ORDER BY RANDOM() LIMIT 5;", (f"%{skill}%",))
        rows = cur.fetchall()
    conn.close()

    if not rows:
        raise HTTPException(status_code=404, detail=f"Вакансии с навыком {skill} не найдены")

    vacancies = [Vacancy(company=row[0], vacancy=row[1], location=row[2], salary=row[3], skills=row[4], link=row[5]) for row in rows]
    return SkillSearchResult(total=total_count, vacancies=vacancies)
