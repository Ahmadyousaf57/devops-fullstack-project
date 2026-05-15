# GitHub Actions Secrets Setup

To enable the CI/CD workflows, you need to configure the following secrets in your GitHub repository:

## Required Secrets

Navigate to: **Repository Settings → Secrets and variables → Actions → New repository secret**

### For Docker Hub Push (cd-docker.yml)

1. **DOCKER_HUB_USERNAME**
   - Your Docker Hub username
   - Example: `yourusername`

2. **DOCKER_HUB_TOKEN**
   - Docker Hub access token (not your password)
   - Create at: https://hub.docker.com/settings/security
   - Click "New Access Token" and copy the token

### For Kubernetes Deployment (deploy-k8s.yml)

3. **KUBE_CONFIG**
   - Your Kubernetes cluster config file content
   - Get it by running: `cat ~/.kube/config`
   - Copy the entire content and paste as secret
   - **Important:** Make sure to sanitize any sensitive info if sharing

## How to Add Secrets

1. Go to your repository on GitHub
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter the secret name and value
6. Click **Add secret**

## Optional: Environment Protection

For the Kubernetes deployment workflow, you can add environment protection rules:

1. Go to **Settings** → **Environments**
2. Create environments: `staging` and `production`
3. Add protection rules:
   - Required reviewers
   - Wait timer
   - Deployment branches

## Workflow Triggers

- **CI Workflow (`ci.yml`)**: Runs on every push to main/develop and PRs
- **Docker Compose Test (`docker-compose-test.yml`)**: Runs on every push to main/develop and PRs
- **Docker Hub Push (`cd-docker.yml`)**: Runs on push to main or version tags (e.g., v1.0.0)
- **Kubernetes Deploy (`deploy-k8s.yml`)**: Manual trigger via GitHub Actions UI

## Testing the Workflows

After setting up secrets:

1. Push code to trigger CI workflow
2. Create a git tag to trigger Docker Hub push:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
3. Manually trigger Kubernetes deployment from GitHub Actions tab
