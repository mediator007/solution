# solution

## Поднятие стенда для разработки

- Установить виртуальное окружение:  
В директории /src/backend   
```python3.10 -m venv venv```  
```pip install -r requirements```   
```source venv/bin/activate```  
- Поднятие контенера БД:  
 В терминале из под виртуального окружения прописать команду:    
```docker run --rm --name postgres-fastapi -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -v /путь/к/папке/на/хосте:/var/lib/postgresql/data -d postgres:14.5```  
Для входа в БД можно использовать:  
```docker exec -it postgres-fastapi psql -U postgres```   
- Проведение миграций:  
В директории /src/backend  
```alembic upgrade head```  
- Запуск сервера в режиме разработки:  
В директории /src/backend    
```uvicorn main:app --reload```
- Установка зависимостей React:  
В директории /src/frontend  
```npm install```  
- Запуск React:  
В директории /src/frontend  
```npm start```  

### Приложение:  

```http://localhost:3000```

### Документация API:  

```http://localhost:8000/api/openapi```

## Prod Deploy:  

```docker-compose build```   
```docker-compose up```