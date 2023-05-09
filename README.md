# solution

## Поднятие стенда для разработки


### Поднятие контейнера БД:  
1) В терминале из под виртуального окружения прописать команду:    
```docker run --rm --name postgres-fastapi -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -v /путь/к/папке/на/хосте:/var/lib/postgresql/data -d postgres:14.5```  

Или через docker-compose (из папки c docker-compose.yml):
```docker-compose build database``` (сборка если нужно)
```docker-compose up -d database```
При использовании docker-compose БД создается в папке database-data-backend в текущей папке с docker-compose.yml

Для входа в БД можно использовать:  
```docker exec -it postgres-fastapi psql -U postgres```   
или через утилиту на хосте:  
```psql -h localhost -p 5432 -U postgres```

### Поднятие backend приложение (FastApi - в конфигурации стенда логично запускать в режиме приложения, а не контейнера)
1) Установить виртуальное окружение:  
В директории /src/backend   
```python3.10 -m venv venv```  
```source venv/bin/activate```  
```pip install -r requirements```

2) Проведение миграций:  
В директории /src/backend  
```alembic upgrade head```  

3) Запуск сервера в режиме разработки:  
В директории /src/backend    
```uvicorn main:app --reload```

!!! Для подключения к Keycloak параметры задаваемые чере переменные окружения. Если их нет, то переменные по умолчанию:
KEYCLOAK_URL: "http://localhost:3080/"
KEYCLOAK_CLIENT_ID: "sovkombank"
KEYCLOAK_REAL_NAME: "sovkombank"

### Фронтенд (в конфигурации стенда логично запускать стенд в режиме приложения, а не контейнера)
1) В директории /src/frontend
```npm install```  
- Сборка React app:  
2) В директории /src/frontend  
```npm run build```
- Запуск React:  
3) В директории /src/frontend  
```npm start```

!!! Для подключения к Keycloak используется конфиг файл: ./src/Keycloak.tsx
(Для продуктива необходимо изменить параметры подключения на корректные)


### Keycloak (запуск в контейнере)
1) Сборка и запуск контейнера - Базы данных Keycloak - из папки c docker-compose.yml
```docker-compose build db_keycloak```(сборка если нужно)
```docker-compose up -d db_keycloak```
БД создается в папке database-data-keycloak в текущей папке с docker-compose.yml
2) Сборка и запуск приложения Keycloak - из папки c docker-compose.yml
```docker-compose build app_keycloak```(сборка если нужно)
```docker-compose up -d app_keycloak```
При запуске контейнера предусмотрен импорт настроек realm sovkombank. Настройки Realm прокидываются через volumes: ./src/keycloak/import
Если импорт не нужен, то комментим строчку с entrypoint в docker-compose.yml (он подменяет штатный в Dockerfile).
3) Создать пользователей в Keycloak: http://localhost:3080, admin/admin
Создаем пользователей и через Role maping назначаем им роли из clien sovkombank (сейчас импортируются две роли: user_sovkombank и admin_sovkombank)
(позже автоматизируем)

!!! Для запуска в продуктиве сменить режим запуска и адрес хоста


### Camunda
```docker pull camunda/camunda-bpm-platform:latest```  
```docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:latest```   

http://localhost:8080/camunda-welcome/index.html  

### Приложение:  

http://localhost:3000  

### Документация API:  

http://localhost:8000/api/openapi  

## Prod Deploy:  

- В файле /src/backend/.env раскомментировать переменные <u>#Production</u> и закомментировать переменные <u>#Develop</u>  

- Выполнить:  
```docker-compose build```   
```docker-compose up```