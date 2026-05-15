# Apply all Kubernetes manifests
kubectl apply -f k8s/

# Or apply individually in order:
kubectl apply -f k8s/mongodb-pvc.yaml
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Check status
kubectl get pods
kubectl get services

# Access the app
# If using Minikube:
minikube service frontend --url

# If using Docker Desktop Kubernetes or other local cluster:
# Access at http://localhost:30080
