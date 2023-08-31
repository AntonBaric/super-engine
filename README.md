# super-engine

Backend(FastAPI):

docker build -t super-engine-backend .
docker run --name backend -p 8080:8080 super-engine-backend

Frontend(React-Typescript):

docker build -t super-engine-frontend .
docker run --name frontend -p 3000:3000 super-engine-frontend
