#!/bin/bash
# ┌─────────────────────────────────────────────────────┐
# │  Kubernetes Deployment Script                       │
# │  Deploys all resources in the correct order         │
# └─────────────────────────────────────────────────────┘

set -e  # Exit on any error

echo "🚀 Deploying Todo App to Kubernetes..."
echo "======================================="

# Step 1: Create the namespace (if it doesn't exist)
echo ""
echo "📁 Step 1: Creating namespace..."
kubectl apply -f k8s/base/namespace.yaml

# Step 2: Create ConfigMap (config before the apps that use it)
echo ""
echo "⚙️  Step 2: Creating ConfigMap..."
kubectl apply -f k8s/base/configmap.yaml

# Step 3: Create PVC (storage before the database that uses it)
echo ""
echo "💾 Step 3: Creating PersistentVolumeClaim..."
kubectl apply -f k8s/base/mongodb-pvc.yaml

# Step 4: Deploy MongoDB (database before the backend that connects to it)
echo ""
echo "🍃 Step 4: Deploying MongoDB..."
kubectl apply -f k8s/base/mongodb-deployment.yaml

# Step 5: Wait for MongoDB to be ready
echo ""
echo "⏳ Step 5: Waiting for MongoDB to be ready..."
kubectl rollout status deployment/mongodb -n todo-app --timeout=120s

# Step 6: Deploy Backend
echo ""
echo "🔧 Step 6: Deploying Backend..."
kubectl apply -f k8s/base/backend-deployment.yaml

# Step 7: Deploy Frontend
echo ""
echo "🎨 Step 7: Deploying Frontend..."
kubectl apply -f k8s/base/frontend-deployment.yaml

# Step 8: Wait for all deployments
echo ""
echo "⏳ Step 8: Waiting for all deployments to be ready..."
kubectl rollout status deployment/backend -n todo-app --timeout=120s
kubectl rollout status deployment/frontend -n todo-app --timeout=120s

# Step 9: Show status
echo ""
echo "======================================="
echo "✅ Deployment complete!"
echo ""
echo "📊 Pod Status:"
kubectl get pods -n todo-app
echo ""
echo "🌐 Services:"
kubectl get services -n todo-app
echo ""
echo "🔗 Access the app at: http://localhost:30080"
