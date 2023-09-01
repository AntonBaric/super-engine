# super-engine
Fullstack app to read with a json file as a database

## Backend (Python FastAPI):

### Run on local machine

```
cd backend

python3 -m venv .env
source .env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

uvicorn app.main:app
```

### Run Docker container

```
docker build -t super-engine/backend ./backend
docker run -p 8000:8000 super-engine/backend
```

## Frontend(React-Typescript):

### Run on local machine

```
cd frontend

npm install
npm run dev
```

### Run Docker container

```
docker build -t super-engine/frontend ./frontend
docker run -p 3000:3000 super-engine/frontend
```

## Run using Docker Compose

```
docker-compose build
docker-compose up
```
