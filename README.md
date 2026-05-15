# Todo App - Full Stack with CI/CD

A full-stack Todo application with React frontend, Express backend, MongoDB database, containerized with Docker, orchestrated with Kubernetes, and automated CI/CD using GitHub Actions.

## Features

- **Frontend**: React + Vite
- **Backend**: Express.js + Mongoose
- **Database**: MongoDB
- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
  - Automated build and test
  - Docker image building and pushing to Docker Hub
  - Kubernetes deployment automation

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose
- Kubernetes cluster (Docker Desktop, Minikube, or cloud provider)
- kubectl CLI tool
- MongoDB (for local development)

## Running with Docker Compose

Build and start all services (MongoDB, backend, frontend):

```powershell
docker-compose up --build
```

Access the app at `http://localhost:3000`

To stop:

```powershell
docker-compose down
```

To stop and remove volumes:

```powershell
docker-compose down -v
```

## Running with Kubernetes

### Prerequisites

- Kubernetes cluster running (Docker Desktop, Minikube, or other)
- kubectl configured
- Docker images built locally

### Build Docker Images

```powershell
docker build -t todo-backend:latest ./backend
docker build -t todo-frontend:latest ./client
```

### Deploy to Kubernetes

```powershell
kubectl apply -f k8s/
```

### Check Deployment Status

```powershell
kubectl get pods
kubectl get services
```

### Access the App

- **Docker Desktop Kubernetes**: `http://localhost:30080`
- **Minikube**: Run `minikube service frontend --url` to get the URL

### Cleanup

```powershell
kubectl delete -f k8s/
```

## Running Locally (without Docker)

### Backend

```powershell
cd backend
npm install
npm run dev
```

> **Note**: Backend expects local MongoDB at `mongodb://127.0.0.1:27017/todoapp`

### Frontend

```powershell
cd client
npm install
npm run dev
```

Open the frontend URL printed by `npm run dev` (usually `http://localhost:5173`)

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
NODE_ENV=development
```

### Frontend

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

## Running Tests

### Backend Tests

```powershell
cd backend
npm test
```

### Frontend Tests

```powershell
cd client
npm test
```

## Project Structure

```
.
├── backend/              # Express.js backend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── client/               # React frontend
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── k8s/                  # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── mongodb-deployment.yaml
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── docker-compose.yml
└── README.md
```

## CI/CD Pipeline

The project uses GitHub Actions for automated:

1. **Build**: Compiles frontend and backend
2. **Test**: Runs unit and integration tests
3. **Docker**: Builds and pushes images to Docker Hub
4. **Deploy**: Automated Kubernetes deployment

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- Sri Manikanta Battu

## Acknowledgments

- React team for the amazing frontend framework
- Express.js community
- MongoDB team
- Docker and Kubernetes communities
