# ┌─────────────────────────────────────────────────────┐
# │  Makefile — DevOps Command Shortcuts               │
# │                                                    │
# │  WHAT IS A MAKEFILE?                               │
# │  A file that defines shortcuts (targets) for       │
# │  common commands. Instead of typing long Docker    │
# │  or kubectl commands, just type `make up`.         │
# │                                                    │
# │  Usage:                                            │
# │    make help     → Show all available commands     │
# │    make up       → Start with Docker Compose       │
# │    make down     → Stop everything                 │
# │    make deploy   → Deploy to Kubernetes            │
# └─────────────────────────────────────────────────────┘

.PHONY: help build up down logs restart deploy clean status

# Default target — shows help
help: ## 📋 Show available commands
	@echo ""
	@echo "╔══════════════════════════════════════════════╗"
	@echo "║   Todo App — DevOps Commands                 ║"
	@echo "╚══════════════════════════════════════════════╝"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""

# ── Docker Compose Commands ────────────────────────────

build: ## 🔨 Build all Docker images
	docker-compose build

up: ## 🚀 Start all services (MongoDB + Backend + Frontend)
	docker-compose up -d --build
	@echo ""
	@echo "✅ App running at: http://localhost:3000"
	@echo "📡 API running at: http://localhost:4000"

down: ## 🛑 Stop all services
	docker-compose down

down-clean: ## 🧹 Stop all services AND delete data volumes
	docker-compose down -v

logs: ## 📜 Show logs from all services
	docker-compose logs -f

logs-backend: ## 📜 Show backend logs only
	docker-compose logs -f backend

restart: ## 🔄 Restart all services
	docker-compose restart

status: ## 📊 Show status of all services
	docker-compose ps

# ── Docker Image Commands ──────────────────────────────

build-backend: ## 🔨 Build backend Docker image only
	docker build -t todo-backend:latest ./backend

build-frontend: ## 🔨 Build frontend Docker image only
	docker build -t todo-frontend:latest ./client

# ── Kubernetes Commands ────────────────────────────────

deploy: ## ☸️  Deploy to Kubernetes
	bash k8s/scripts/deploy.sh

undeploy: ## ☸️  Remove from Kubernetes
	bash k8s/scripts/cleanup.sh

k8s-status: ## 📊 Show Kubernetes pod/service status
	kubectl get pods -n todo-app
	@echo ""
	kubectl get services -n todo-app

k8s-logs: ## 📜 Show Kubernetes backend logs
	kubectl logs -l app=backend -n todo-app -f

# ── Local Development ──────────────────────────────────

dev-backend: ## 💻 Run backend locally (requires local MongoDB)
	cd backend && npm run dev

dev-frontend: ## 💻 Run frontend locally
	cd client && npm run dev

install: ## 📦 Install all dependencies
	cd backend && npm install
	cd client && npm install

# ── Cleanup ────────────────────────────────────────────

clean: ## 🧹 Remove all containers, images, and volumes
	docker-compose down -v --rmi all 2>/dev/null || true
	@echo "✅ Cleaned up all Docker resources"
