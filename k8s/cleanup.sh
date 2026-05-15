# Delete all resources
kubectl delete -f k8s/

# Or delete individually:
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/mongodb-deployment.yaml
kubectl delete -f k8s/mongodb-pvc.yaml
