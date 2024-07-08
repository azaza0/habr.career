from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import search, search_by_schedule, skill
from dbConnection.db import get_db_connection, release_db_connection
import uvicorn
import asyncio

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Вы можете указать конкретные домены, если хотите ограничить доступ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)
app.include_router(search_by_schedule.router)
app.include_router(skill.router)

# Функция для очистки базы данных
async def clear_db_periodically():
    while True:
        await asyncio.sleep(3 * 60 * 60)  # каждые 3 часа
        conn = get_db_connection()
        with conn.cursor() as cur:
            cur.execute("DELETE FROM vacancies;")
            conn.commit()
        release_db_connection(conn)

# Запуск фоновой задачи
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(clear_db_periodically())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
