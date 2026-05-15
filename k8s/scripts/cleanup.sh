#!/bin/bash
# ┌─────────────────────────────────────────────────────┐
# │  Kubernetes Cleanup Script                          │
# │  Removes all Todo App resources from the cluster    │
# └─────────────────────────────────────────────────────┘

set -e

echo "🧹 Cleaning up Todo App from Kubernetes..."
echo "==========================================="

# Delete in reverse order of creation
echo ""
echo "🎨 Removing Frontend..."
kubectl delete -f k8s/base/frontend-deployment.yaml --ignore-not-found

echo "🔧 Removing Backend..."
kubectl delete -f k8s/base/backend-deployment.yaml --ignore-not-found

echo "🍃 Removing MongoDB..."
kubectl delete -f k8s/base/mongodb-deployment.yaml --ignore-not-found

echo "💾 Removing PersistentVolumeClaim..."
kubectl delete -f k8s/base/mongodb-pvc.yaml --ignore-not-found

echo "⚙️  Removing ConfigMap..."
kubectl delete -f k8s/base/configmap.yaml --ignore-not-found

echo "📁 Removing Namespace..."
kubectl delete -f k8s/base/namespace.yaml --ignore-not-found

echo ""
echo "==========================================="
echo "✅ Cleanup complete!"
